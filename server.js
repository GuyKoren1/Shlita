const express = require('express');
const session = require('express-session');
const compression = require('compression');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
app.use(compression());
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');
const FEEDBACK_FILE = path.join(__dirname, 'feedback.json');
const MONGODB_URI = process.env.MONGODB_URI;

// --- Auth constants (server-side only) ---
const PASSWORDS = {
    '7368': 'admin',
    '6711': 'viewer'
};

app.use(express.json({ limit: '10mb' }));

// --- Session middleware ---
app.use(session({
    secret: process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex'),
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

app.use(express.static(__dirname, {
    maxAge: '1d',
    setHeaders(res, filePath) {
        if (filePath.endsWith('.html')) {
            res.setHeader('Cache-Control', 'no-cache, must-revalidate');
        }
    }
}));

// --- Auth middleware ---
function requireAuth(req, res, next) {
    if (!req.session.accessLevel) {
        return res.status(401).json({ error: 'Authentication required' });
    }
    next();
}

function requireAdmin(req, res, next) {
    if (req.session.accessLevel !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
    }
    next();
}

// --- MongoDB setup (only when MONGODB_URI is set) ---
let db = null;

function getCollection() {
    return db.collection('state');
}

async function connectMongo() {
    const { MongoClient } = require('mongodb');
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db('shlita');
    console.log('Connected to MongoDB Atlas');
}

// --- Seed data helper ---
function buildSeedData() {
    let personnel = [];
    const personnelFile = path.join(__dirname, 'personnel_data.json');
    if (fs.existsSync(personnelFile)) {
        const raw = fs.readFileSync(personnelFile, 'utf8');
        const parsed = JSON.parse(raw);
        personnel = parsed.map(p => ({
            id: '_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36),
            ...p
        }));
    }
    return {
        personnel,
        customColumns: [],
        activities: [],
        snapshots: []
    };
}

// --- File-based functions (fallback for local dev) ---
function initDataFile() {
    if (fs.existsSync(DATA_FILE)) return;
    const data = buildSeedData();
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    console.log('Initialized data.json with', data.personnel.length, 'personnel records');
}

// --- MongoDB-based functions ---
async function initDataMongo() {
    const col = getCollection();
    const existing = await col.findOne({ _id: 'app_state' });
    if (existing) return;
    const data = buildSeedData();
    await col.insertOne({ _id: 'app_state', ...data });
    console.log('Initialized MongoDB with', data.personnel.length, 'personnel records');
}

// --- Auth Routes ---

// POST /api/login
app.post('/api/login', (req, res) => {
    const { password } = req.body;
    const accessLevel = PASSWORDS[password];
    if (!accessLevel) {
        return res.status(401).json({ error: 'סיסמה שגויה' });
    }
    req.session.accessLevel = accessLevel;
    res.json({ accessLevel });
});

// POST /api/logout
app.post('/api/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({ ok: true });
    });
});

// GET /api/session
app.get('/api/session', (req, res) => {
    res.json({ accessLevel: req.session.accessLevel || null });
});

// --- Data Routes ---

// GET /api/data
app.get('/api/data', requireAuth, async (req, res) => {
    try {
        if (db) {
            const col = getCollection();
            let doc = await col.findOne({ _id: 'app_state' });
            if (!doc) {
                await initDataMongo();
                doc = await col.findOne({ _id: 'app_state' });
            }
            const { _id, ...data } = doc;
            console.log('[GET] shootingRecords:', (data.shootingRecords || []).length);
            res.json(data);
        } else {
            if (!fs.existsSync(DATA_FILE)) {
                initDataFile();
            }
            const raw = fs.readFileSync(DATA_FILE, 'utf8');
            res.json(JSON.parse(raw));
        }
    } catch (err) {
        console.error('Error reading data:', err);
        res.status(500).json({ error: 'Failed to read data' });
    }
});

// POST /api/data
app.post('/api/data', requireAuth, requireAdmin, async (req, res) => {
    try {
        const { personnel, customColumns, activities, columnConfig, cameras, faultRecords, shootingRecords, report1, snapshots } = req.body;
        const data = {
            personnel: personnel || [],
            customColumns: customColumns || [],
            activities: activities || [],
            columnConfig: columnConfig || null,
            cameras: cameras || [],
            faultRecords: faultRecords || [],
            shootingRecords: shootingRecords || [],
            report1: report1 || { startDate: null, entries: {}, excluded: [] },
            snapshots: snapshots || []
        };

        console.log('[POST] shootingRecords:', (data.shootingRecords || []).length);
        if (db) {
            const col = getCollection();
            await col.replaceOne({ _id: 'app_state' }, { _id: 'app_state', ...data }, { upsert: true });
        } else {
            fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
        }
        res.json({ ok: true });
    } catch (err) {
        console.error('Error saving data:', err);
        res.status(500).json({ error: 'Failed to save data' });
    }
});

// POST /api/reset
app.post('/api/reset', requireAuth, requireAdmin, async (req, res) => {
    try {
        if (db) {
            const col = getCollection();
            await col.deleteOne({ _id: 'app_state' });
            await initDataMongo();
            const doc = await col.findOne({ _id: 'app_state' });
            const { _id, ...data } = doc;
            res.json(data);
        } else {
            if (fs.existsSync(DATA_FILE)) {
                fs.unlinkSync(DATA_FILE);
            }
            initDataFile();
            const raw = fs.readFileSync(DATA_FILE, 'utf8');
            res.json(JSON.parse(raw));
        }
    } catch (err) {
        console.error('Error resetting data:', err);
        res.status(500).json({ error: 'Failed to reset data' });
    }
});

// --- Feedback Routes (MongoDB with file-based fallback) ---

function getFeedbackCollection() {
    return db.collection('feedback');
}

function readFeedbackFile() {
    if (!fs.existsSync(FEEDBACK_FILE)) return [];
    return JSON.parse(fs.readFileSync(FEEDBACK_FILE, 'utf8'));
}

function writeFeedbackFile(items) {
    fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(items, null, 2), 'utf8');
}

// POST /api/feedback — any logged-in user can submit
app.post('/api/feedback', requireAuth, async (req, res) => {
    try {
        const { type, title, description, page } = req.body;
        if (!type || !title) {
            return res.status(400).json({ error: 'type and title are required' });
        }
        const item = {
            id: '_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36),
            type,
            title,
            description: description || '',
            page: page || '',
            accessLevel: req.session.accessLevel,
            timestamp: new Date().toISOString(),
            resolved: false
        };
        if (MONGODB_URI && db) {
            await getFeedbackCollection().insertOne(item);
        } else {
            const items = readFeedbackFile();
            items.push(item);
            writeFeedbackFile(items);
        }
        res.json({ ok: true, id: item.id });
    } catch (err) {
        console.error('Error saving feedback:', err);
        res.status(500).json({ error: 'Failed to save feedback' });
    }
});

// GET /api/feedback — admin only
app.get('/api/feedback', requireAuth, requireAdmin, async (req, res) => {
    try {
        if (MONGODB_URI && db) {
            const items = await getFeedbackCollection().find({}).toArray();
            res.json(items);
        } else {
            res.json(readFeedbackFile());
        }
    } catch (err) {
        console.error('Error reading feedback:', err);
        res.status(500).json({ error: 'Failed to read feedback' });
    }
});

// DELETE /api/feedback/:id — admin only
app.delete('/api/feedback/:id', requireAuth, requireAdmin, async (req, res) => {
    try {
        if (MONGODB_URI && db) {
            await getFeedbackCollection().deleteOne({ id: req.params.id });
        } else {
            let items = readFeedbackFile();
            items = items.filter(f => f.id !== req.params.id);
            writeFeedbackFile(items);
        }
        res.json({ ok: true });
    } catch (err) {
        console.error('Error deleting feedback:', err);
        res.status(500).json({ error: 'Failed to delete feedback' });
    }
});

// Health check endpoint for keep-alive
app.get('/api/health', (req, res) => {
    res.json({ ok: true });
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// --- Startup ---
async function start() {
    if (MONGODB_URI) {
        try {
            await connectMongo();
            await initDataMongo();
        } catch (err) {
            console.error('MongoDB connection failed:', err);
            process.exit(1);
        }
    } else {
        console.log('No MONGODB_URI set — using file-based storage (data.json)');
        initDataFile();
    }

    app.listen(PORT, () => {
        console.log(`Shlita server running on http://localhost:${PORT}`);

        // Keep-alive: ping self every 14 minutes to prevent Render free tier spin-down
        const RENDER_URL = process.env.RENDER_EXTERNAL_URL;
        if (RENDER_URL) {
            setInterval(() => {
                fetch(`${RENDER_URL}/api/health`).catch(() => {});
            }, 14 * 60 * 1000);
            console.log('Keep-alive enabled: pinging', RENDER_URL, 'every 14 minutes');
        }
    });
}

start();
