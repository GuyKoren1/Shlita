// ==================== Storage ====================
async function loadState() {
    try {
        const res = await fetch('/api/data');
        if (res.ok) {
            const data = await res.json();
            state.personnel = data.personnel || [];
            state.customColumns = data.customColumns || [];
            state.activities = data.activities || [];
            state.columnConfig = data.columnConfig || null;
            state.cameras = data.cameras || [];
            state.faultRecords = data.faultRecords || [];
            state.snapshots = data.snapshots || [];
            return;
        }
    } catch (err) {
        console.warn('Server unavailable, falling back to localStorage:', err);
    }
    // Fallback to localStorage if server is unreachable
    const saved = localStorage.getItem('shlita_data');
    if (saved) {
        const parsed = JSON.parse(saved);
        state.personnel = parsed.personnel || [];
        state.customColumns = parsed.customColumns || [];
        state.activities = parsed.activities || [];
        state.columnConfig = parsed.columnConfig || null;
        state.cameras = parsed.cameras || [];
        state.faultRecords = parsed.faultRecords || [];
        state.snapshots = parsed.snapshots || [];
    }
}

let _saveTimeout = null;
function saveState() {
    // Debounce: wait 300ms before saving to avoid excessive writes
    clearTimeout(_saveTimeout);
    _saveTimeout = setTimeout(() => _saveStateNow(), 300);
}

async function _saveStateNow() {
    const payload = {
        personnel: state.personnel,
        customColumns: state.customColumns,
        activities: state.activities,
        columnConfig: state.columnConfig,
        cameras: state.cameras,
        faultRecords: state.faultRecords,
        snapshots: state.snapshots
    };
    try {
        const res = await fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Save failed');
    } catch (err) {
        console.warn('Server save failed, falling back to localStorage:', err);
        localStorage.setItem('shlita_data', JSON.stringify(payload));
    }
}

function loadInitialData() {
    // Load cameras if empty
    if (state.cameras.length === 0) {
        state.cameras = JSON.parse(JSON.stringify(INITIAL_CAMERAS_DATA));
    }

    // Server handles initialization - just check if data loaded
    if (state.personnel.length > 0) {
        saveState();
        return;
    }

    // Fallback: load from embedded data if server returned empty
    state.personnel = INITIAL_PERSONNEL_DATA.map(p => ({
        id: generateId(),
        ...p
    }));
    saveState();
    showToast('נתוני כוח אדם נטענו בהצלחה');
}
