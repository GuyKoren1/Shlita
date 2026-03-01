const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json({ limit: '10mb' }));
app.use(express.static(__dirname));

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

// --- Routes ---

// GET /api/data
app.get('/api/data', async (req, res) => {
    try {
        if (db) {
            const col = getCollection();
            let doc = await col.findOne({ _id: 'app_state' });
            if (!doc) {
                await initDataMongo();
                doc = await col.findOne({ _id: 'app_state' });
            }
            const { _id, ...data } = doc;
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
app.post('/api/data', async (req, res) => {
    try {
        const { personnel, customColumns, activities, columnConfig, cameras, snapshots } = req.body;
        const data = {
            personnel: personnel || [],
            customColumns: customColumns || [],
            activities: activities || [],
            columnConfig: columnConfig || null,
            cameras: cameras || [],
            snapshots: snapshots || []
        };

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
app.post('/api/reset', async (req, res) => {
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
    });
}

start();
