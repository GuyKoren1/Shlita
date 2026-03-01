const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(express.json({ limit: '10mb' }));
app.use(express.static(__dirname));

// Initialize data file from personnel_data.json if it doesn't exist
function initDataFile() {
    if (fs.existsSync(DATA_FILE)) return;

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

    const initialData = {
        personnel,
        customColumns: [],
        activities: []
    };

    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2), 'utf8');
    console.log('Initialized data.json with', personnel.length, 'personnel records');
}

// GET /api/data - return all data
app.get('/api/data', (req, res) => {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            initDataFile();
        }
        const raw = fs.readFileSync(DATA_FILE, 'utf8');
        res.json(JSON.parse(raw));
    } catch (err) {
        console.error('Error reading data:', err);
        res.status(500).json({ error: 'Failed to read data' });
    }
});

// POST /api/data - save all data
app.post('/api/data', (req, res) => {
    try {
        const { personnel, customColumns, activities, columnConfig, cameras } = req.body;
        const data = {
            personnel: personnel || [],
            customColumns: customColumns || [],
            activities: activities || [],
            columnConfig: columnConfig || null,
            cameras: cameras || []
        };
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
        res.json({ ok: true });
    } catch (err) {
        console.error('Error saving data:', err);
        res.status(500).json({ error: 'Failed to save data' });
    }
});

// POST /api/reset - reset to initial personnel data
app.post('/api/reset', (req, res) => {
    try {
        if (fs.existsSync(DATA_FILE)) {
            fs.unlinkSync(DATA_FILE);
        }
        initDataFile();
        const raw = fs.readFileSync(DATA_FILE, 'utf8');
        res.json(JSON.parse(raw));
    } catch (err) {
        console.error('Error resetting data:', err);
        res.status(500).json({ error: 'Failed to reset data' });
    }
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

initDataFile();

app.listen(PORT, () => {
    console.log(`Shlita server running on http://localhost:${PORT}`);
});
