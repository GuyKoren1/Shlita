// ==================== Snapshots ====================
function isViewingSnapshot() {
    return state.viewingSnapshotId !== null;
}

function getActivePersonnel() {
    if (isViewingSnapshot()) {
        const snap = state.snapshots.find(s => s.id === state.viewingSnapshotId);
        return snap ? snap.personnel : [];
    }
    return state.personnel;
}

function getActiveColumnConfig() {
    if (isViewingSnapshot()) {
        const snap = state.snapshots.find(s => s.id === state.viewingSnapshotId);
        if (snap && snap.columnConfig) return snap.columnConfig;
    }
    return getColumnConfig();
}

function getActiveCustomColumns() {
    if (isViewingSnapshot()) {
        const snap = state.snapshots.find(s => s.id === state.viewingSnapshotId);
        return snap ? (snap.customColumns || []) : [];
    }
    return state.customColumns;
}

function getActiveFaultRecords() {
    if (isViewingSnapshot()) {
        const snap = state.snapshots.find(s => s.id === state.viewingSnapshotId);
        return snap && snap.faultRecords ? snap.faultRecords : [];
    }
    return state.faultRecords;
}

function getActiveCameras() {
    if (isViewingSnapshot()) {
        const snap = state.snapshots.find(s => s.id === state.viewingSnapshotId);
        return snap && snap.cameras ? snap.cameras : [];
    }
    return state.cameras;
}

function addNewDay() {
    if (state.accessLevel !== 'admin') {
        showToast('אין הרשאה לביצוע פעולה זו');
        return;
    }

    const today = new Date().toLocaleDateString('he-IL', { day: 'numeric', month: 'numeric', year: 'numeric' });
    if (!confirm(`לשמור תמונת מצב ליום ${today}?`)) return;

    const snapshot = {
        id: generateId(),
        date: new Date().toISOString(),
        label: today,
        personnel: JSON.parse(JSON.stringify(state.personnel)),
        customColumns: JSON.parse(JSON.stringify(state.customColumns)),
        columnConfig: state.columnConfig ? JSON.parse(JSON.stringify(state.columnConfig)) : null,
        cameras: JSON.parse(JSON.stringify(state.cameras)),
        faultRecords: JSON.parse(JSON.stringify(state.faultRecords)),
        report1: JSON.parse(JSON.stringify(state.report1))
    };

    state.snapshots.push(snapshot);
    saveState();
    renderSnapshotSelector();
    showToast(`תמונת מצב ליום ${today} נשמרה`);
}

function viewSnapshot(id) {
    if (id === null) {
        state.viewingSnapshotId = null;
    } else {
        state.viewingSnapshotId = id;
    }
    populateFilters();
    renderPersonnelTable();
    renderCameras();
    renderSnapshotSelector();
}

function deleteSnapshot(id) {
    if (state.accessLevel !== 'admin') return;
    const snap = state.snapshots.find(s => s.id === id);
    if (!snap) return;
    if (!confirm(`למחוק את תמונת המצב מ-${snap.label}?`)) return;

    state.snapshots = state.snapshots.filter(s => s.id !== id);
    if (state.viewingSnapshotId === id) {
        state.viewingSnapshotId = null;
    }
    saveState();
    populateFilters();
    renderPersonnelTable();
    renderCameras();
    renderSnapshotSelector();
    showToast('תמונת מצב נמחקה');
}

function renderSnapshotSelector() {
    _renderSnapshotBar('snapshotBar');
    _renderSnapshotBar('camerasSnapshotBar');
}

function _renderSnapshotBar(barId) {
    const bar = document.getElementById(barId);
    if (!bar) return;

    if (state.snapshots.length === 0 && !isViewingSnapshot()) {
        bar.classList.add('hidden');
        bar.innerHTML = '';
        return;
    }

    bar.classList.remove('hidden');
    let html = '';

    // Read-only banner when viewing a snapshot
    if (isViewingSnapshot()) {
        const snap = state.snapshots.find(s => s.id === state.viewingSnapshotId);
        const label = snap ? snap.label : '';
        html += `<div class="snapshot-banner">
            <span>צפייה בתמונת מצב מיום ${escapeHtml(label)} (קריאה בלבד)</span>
            <button class="banner-back" onclick="viewSnapshot(null)">חזור ליום נוכחי</button>
        </div>`;
    }

    // Chips
    html += '<div class="snapshot-chips">';
    // Current day chip
    const currentActive = !isViewingSnapshot() ? 'active' : '';
    html += `<span class="snapshot-chip ${currentActive}" onclick="viewSnapshot(null)">היום (נוכחי)</span>`;

    // Snapshot chips (newest first)
    [...state.snapshots].reverse().forEach(snap => {
        const activeClass = state.viewingSnapshotId === snap.id ? 'active' : '';
        const deleteBtn = state.accessLevel === 'admin'
            ? `<span class="chip-delete" onclick="event.stopPropagation(); deleteSnapshot('${snap.id}')" title="מחק">&times;</span>`
            : '';
        html += `<span class="snapshot-chip ${activeClass}" onclick="viewSnapshot('${snap.id}')">${escapeHtml(snap.label)}${deleteBtn}</span>`;
    });

    html += '</div>';
    bar.innerHTML = html;
}
