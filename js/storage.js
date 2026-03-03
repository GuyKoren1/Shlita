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
            state.report1 = data.report1 || { startDate: null, entries: {}, excluded: [] };
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
        state.report1 = parsed.report1 || { startDate: null, entries: {}, excluded: [] };
        state.snapshots = parsed.snapshots || [];
    }
}

let _saveTimeout = null;
let _lastSaveOk = true;
let _lastSaveTime = null;
let _hasPendingChanges = false;

// Undo/Redo history
const _undoStack = [];
const _redoStack = [];
const _MAX_UNDO = 30;
let _isUndoRedo = false;

function _snapshotState() {
    return JSON.stringify(_buildPayload());
}

function saveState() {
    // Push to undo stack (unless this save is from undo/redo itself)
    if (!_isUndoRedo) {
        const snap = _snapshotState();
        _undoStack.push(snap);
        if (_undoStack.length > _MAX_UNDO) _undoStack.shift();
        _redoStack.length = 0; // clear redo on new change
    }
    _isUndoRedo = false;

    _hasPendingChanges = true;
    _updateSaveStatus();
    clearTimeout(_saveTimeout);
    _saveTimeout = setTimeout(() => _saveStateNow(), 300);
}

function undoState() {
    if (_undoStack.length === 0) { showToast('אין פעולות לביטול'); return; }
    // Save current state to redo
    _redoStack.push(_snapshotState());
    // Restore previous state
    const prev = JSON.parse(_undoStack.pop());
    _applyPayload(prev);
    _isUndoRedo = true;
    saveState();
    _refreshAllViews();
    showToast('בוטלה פעולה אחרונה');
}

function redoState() {
    if (_redoStack.length === 0) { showToast('אין פעולות לשחזור'); return; }
    // Save current state to undo
    _undoStack.push(_snapshotState());
    // Restore redo state
    const next = JSON.parse(_redoStack.pop());
    _applyPayload(next);
    _isUndoRedo = true;
    saveState();
    _refreshAllViews();
    showToast('שוחזרה פעולה');
}

function _applyPayload(data) {
    state.personnel = data.personnel || [];
    state.customColumns = data.customColumns || [];
    state.activities = data.activities || [];
    state.columnConfig = data.columnConfig || null;
    state.cameras = data.cameras || [];
    state.faultRecords = data.faultRecords || [];
    state.report1 = data.report1 || { startDate: null, entries: {}, excluded: [] };
    state.snapshots = data.snapshots || [];
}

function _refreshAllViews() {
    populateFilters();
    renderPersonnelTable();
    renderActivities();
    renderCameras();
    renderFaultTracking();
    renderSnapshotSelector();
}

function _buildPayload() {
    return {
        personnel: state.personnel,
        customColumns: state.customColumns,
        activities: state.activities,
        columnConfig: state.columnConfig,
        cameras: state.cameras,
        faultRecords: state.faultRecords,
        report1: state.report1,
        snapshots: state.snapshots
    };
}

async function _saveStateNow() {
    const payload = _buildPayload();
    try {
        const res = await fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Save failed');
        _lastSaveOk = true;
        _lastSaveTime = new Date();
        _hasPendingChanges = false;
    } catch (err) {
        console.warn('Server save failed, falling back to localStorage:', err);
        localStorage.setItem('shlita_data', JSON.stringify(payload));
        _lastSaveOk = false;
        _hasPendingChanges = false;
    }
    _updateSaveStatus();
}

function retrySave() {
    _hasPendingChanges = true;
    _updateSaveStatus();
    _saveStateNow();
}

function _formatSaveTime(date) {
    if (!date) return '';
    return date.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });
}

function _updateSaveStatus() {
    const el = document.getElementById('saveStatus');
    if (!el) return;
    if (_hasPendingChanges) {
        el.className = 'save-status saving';
        el.innerHTML = '<span class="save-dot"></span> שומר...';
    } else if (!_lastSaveOk) {
        el.className = 'save-status error';
        el.innerHTML = '<span class="save-dot"></span> שמירה נכשלה <button class="save-retry-btn" onclick="retrySave()">נסה שוב</button>';
    } else if (_lastSaveTime) {
        el.className = 'save-status ok';
        el.innerHTML = '<span class="save-dot"></span> נשמר ' + _formatSaveTime(_lastSaveTime);
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
