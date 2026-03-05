// ==================== Shooting Tracking ====================
let _shootingEditId = null;

function renderShooting() {
    const container = document.getElementById('shootingList');
    if (!container) return;

    const records = state.shootingRecords || [];
    const isAdmin = state.accessLevel === 'admin';

    // Filters
    const searchEl = document.getElementById('shootingSearchInput');
    const commanderEl = document.getElementById('shootingCommanderFilter');
    const vehicleEl = document.getElementById('shootingVehicleFilter');
    const searchTerm = searchEl ? searchEl.value.toLowerCase() : '';
    const commanderFilter = commanderEl ? commanderEl.value : '';
    const vehicleFilter = vehicleEl ? vehicleEl.value : '';

    // Populate filter dropdowns
    _populateShootingFilters(records);

    // Filter records
    let filtered = records;
    if (commanderFilter) filtered = filtered.filter(r => r.commander === commanderFilter);
    if (vehicleFilter) filtered = filtered.filter(r => r.vehicle === vehicleFilter);
    if (searchTerm) {
        filtered = filtered.filter(r =>
            (r.commander || '').toLowerCase().includes(searchTerm) ||
            (r.gunner || '').toLowerCase().includes(searchTerm) ||
            (r.vehicle || '').toLowerCase().includes(searchTerm) ||
            (r.framework || '').toLowerCase().includes(searchTerm) ||
            (r.targetType || '').toLowerCase().includes(searchTerm) ||
            (r.targetDescription || '').toLowerCase().includes(searchTerm) ||
            (r.shellType || '').toLowerCase().includes(searchTerm)
        );
    }

    // Sort by date descending
    filtered.sort((a, b) => {
        const da = a.date ? new Date(a.date) : new Date(0);
        const db = b.date ? new Date(b.date) : new Date(0);
        return db - da;
    });

    // Stats
    const totalShots = filtered.reduce((sum, r) => sum + (parseInt(r.quantity) || 0), 0);
    const uniqueCommanders = [...new Set(filtered.map(r => r.commander).filter(Boolean))];
    const uniqueVehicles = [...new Set(filtered.map(r => r.vehicle).filter(Boolean))];

    if (records.length === 0) {
        container.innerHTML = `
            <div class="no-data">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l2 2"/></svg>
                <p>אין רשומות ירי</p>
            </div>`;
        return;
    }

    const parts = [];

    // Stats bar
    parts.push(`<div class="fault-stats-bar">
        <div class="fault-stat">
            <span class="fault-stat-value">${filtered.length}</span>
            <span class="fault-stat-label">רשומות</span>
        </div>
        <div class="fault-stat">
            <span class="fault-stat-value fault-stat-open">${totalShots}</span>
            <span class="fault-stat-label">סה"כ פגזים</span>
        </div>
        <div class="fault-stat">
            <span class="fault-stat-value">${uniqueCommanders.length}</span>
            <span class="fault-stat-label">מפק"צים</span>
        </div>
        <div class="fault-stat">
            <span class="fault-stat-value">${uniqueVehicles.length}</span>
            <span class="fault-stat-label">כלים</span>
        </div>
    </div>`);

    // Table
    parts.push(`<div class="fault-table-wrap"><table class="fault-table shooting-table">
        <thead><tr>
            <th>תאריך</th>
            <th>מפק"צ</th>
            <th>תותחן</th>
            <th>כלי</th>
            <th>מסגרת</th>
            <th>סוג מטרה</th>
            <th>סוג פגז</th>
            <th>כמות</th>
            <th>טווח</th>
            ${isAdmin ? '<th>פעולות</th>' : ''}
        </tr></thead><tbody>`);

    filtered.forEach(record => {
        parts.push(`<tr onclick="openShootingDetail('${record.id}')" style="cursor:pointer">
            <td>${record.date ? formatDateHe(record.date) : '-'}</td>
            <td>${escapeHtml(record.commander || '')}</td>
            <td>${escapeHtml(record.gunner || '')}</td>
            <td>${escapeHtml(record.vehicle || '')}</td>
            <td>${escapeHtml(record.framework || '')}</td>
            <td>${escapeHtml(record.targetType || '')}</td>
            <td>${escapeHtml(record.shellType || '')}</td>
            <td>${record.quantity || '-'}</td>
            <td>${record.range || '-'}</td>
            ${isAdmin ? `<td class="fault-actions" onclick="event.stopPropagation()">
                <button title="ערוך" onclick="openEditShootingModal('${record.id}')">&#9998;</button>
                <button title="מחק" onclick="deleteShootingRecord('${record.id}')">&#128465;</button>
            </td>` : ''}
        </tr>`);
    });

    parts.push(`</tbody></table></div>`);
    container.innerHTML = parts.join('');
}

function _populateShootingFilters(records) {
    const commanderEl = document.getElementById('shootingCommanderFilter');
    const vehicleEl = document.getElementById('shootingVehicleFilter');
    if (!commanderEl || !vehicleEl) return;

    const prevCommander = commanderEl.value;
    const prevVehicle = vehicleEl.value;

    const commanders = [...new Set(records.map(r => r.commander).filter(Boolean))].sort();
    const vehicles = [...new Set(records.map(r => r.vehicle).filter(Boolean))].sort();

    commanderEl.innerHTML = '<option value="">כל המפק"צים</option>' +
        commanders.map(c => `<option value="${escapeHtml(c)}"${c === prevCommander ? ' selected' : ''}>${escapeHtml(c)}</option>`).join('');

    vehicleEl.innerHTML = '<option value="">כל הכלים</option>' +
        vehicles.map(v => `<option value="${escapeHtml(v)}"${v === prevVehicle ? ' selected' : ''}>${escapeHtml(v)}</option>`).join('');
}

// --- Manual entry ---
function openAddShootingModal() {
    _shootingEditId = null;
    document.getElementById('shootingModalTitle').textContent = 'הוסף רשומת ירי';
    _clearShootingForm();
    document.getElementById('shootingDateInput').value = new Date().toISOString().split('T')[0];
    openModal('shootingModal');
}

function openEditShootingModal(id) {
    const record = state.shootingRecords.find(r => r.id === id);
    if (!record) return;

    _shootingEditId = id;
    document.getElementById('shootingModalTitle').textContent = 'עריכת רשומת ירי';
    document.getElementById('shootingCommanderInput').value = record.commander || '';
    document.getElementById('shootingGunnerInput').value = record.gunner || '';
    document.getElementById('shootingVehicleInput').value = record.vehicle || '';
    document.getElementById('shootingDateInput').value = record.date ? record.date.split('T')[0] : '';
    document.getElementById('shootingFrameworkInput').value = record.framework || '';
    document.getElementById('shootingVehicleLocationInput').value = record.vehicleLocation || '';
    document.getElementById('shootingTargetLocationInput').value = record.targetLocation || '';
    document.getElementById('shootingTargetTypeInput').value = record.targetType || '';
    document.getElementById('shootingTargetDescInput').value = record.targetDescription || '';
    document.getElementById('shootingShellTypeInput').value = record.shellType || '';
    document.getElementById('shootingQuantityInput').value = record.quantity || '';
    document.getElementById('shootingRangeInput').value = record.range || '';
    openModal('shootingModal');
}

function _clearShootingForm() {
    ['shootingCommanderInput', 'shootingGunnerInput', 'shootingVehicleInput',
     'shootingDateInput', 'shootingFrameworkInput', 'shootingVehicleLocationInput',
     'shootingTargetLocationInput', 'shootingTargetTypeInput', 'shootingTargetDescInput',
     'shootingShellTypeInput', 'shootingQuantityInput', 'shootingRangeInput'
    ].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
}

function saveShootingRecord() {
    const commander = document.getElementById('shootingCommanderInput').value.trim();
    const gunner = document.getElementById('shootingGunnerInput').value.trim();
    const vehicle = document.getElementById('shootingVehicleInput').value.trim();
    const dateVal = document.getElementById('shootingDateInput').value;
    const framework = document.getElementById('shootingFrameworkInput').value.trim();
    const vehicleLocation = document.getElementById('shootingVehicleLocationInput').value.trim();
    const targetLocation = document.getElementById('shootingTargetLocationInput').value.trim();
    const targetType = document.getElementById('shootingTargetTypeInput').value.trim();
    const targetDescription = document.getElementById('shootingTargetDescInput').value.trim();
    const shellType = document.getElementById('shootingShellTypeInput').value.trim();
    const quantity = document.getElementById('shootingQuantityInput').value.trim();
    const range = document.getElementById('shootingRangeInput').value.trim();

    if (!commander && !vehicle) {
        showToast('יש להזין לפחות מפק"צ או כלי');
        return;
    }

    const data = {
        commander, gunner, vehicle,
        date: dateVal ? new Date(dateVal).toISOString() : null,
        framework, vehicleLocation, targetLocation,
        targetType, targetDescription, shellType,
        quantity: quantity || '', range: range || ''
    };

    if (_shootingEditId) {
        const record = state.shootingRecords.find(r => r.id === _shootingEditId);
        if (record) Object.assign(record, data);
    } else {
        state.shootingRecords.push({ id: generateId(), ...data });
    }

    saveState();
    closeModal('shootingModal');
    renderShooting();
    showToast(_shootingEditId ? 'רשומה עודכנה' : 'רשומת ירי נוספה');
}

function deleteShootingRecord(id) {
    if (state.accessLevel !== 'admin') return;
    const record = state.shootingRecords.find(r => r.id === id);
    if (!record) return;
    if (!confirm('למחוק רשומת ירי זו?')) return;

    state.shootingRecords = state.shootingRecords.filter(r => r.id !== id);
    saveState();
    renderShooting();
    showToast('רשומה נמחקה');
}

function openShootingDetail(id) {
    const record = state.shootingRecords.find(r => r.id === id);
    if (!record) return;

    const fields = [
        { label: 'מפק"צ', value: record.commander },
        { label: 'תותחן', value: record.gunner },
        { label: 'כלי', value: record.vehicle },
        { label: 'תאריך', value: record.date ? formatDateHe(record.date) : '-' },
        { label: 'מסגרת', value: record.framework },
        { label: 'מיקום כלי', value: record.vehicleLocation },
        { label: 'מיקום מטרה', value: record.targetLocation },
        { label: 'סוג מטרה', value: record.targetType },
        { label: 'תיאור מטרה', value: record.targetDescription },
        { label: 'סוג פגז', value: record.shellType },
        { label: 'כמות', value: record.quantity },
        { label: 'טווח', value: record.range }
    ];

    const html = fields
        .filter(f => f.value)
        .map(f => `<div class="fault-detail-row">
            <span class="fault-detail-label">${escapeHtml(f.label)}:</span>
            <span>${escapeHtml(String(f.value))}</span>
        </div>`).join('');

    document.getElementById('shootingDetailContent').innerHTML = html;
    openModal('shootingDetailModal');
}

// --- Parse from message ---
function openParseShootingModal() {
    document.getElementById('shootingParseText').value = '';
    document.getElementById('shootingParsePreview').innerHTML = '';
    openModal('shootingParseModal');
}

function previewParsedShooting() {
    const text = document.getElementById('shootingParseText').value.trim();
    if (!text) {
        document.getElementById('shootingParsePreview').innerHTML = '<p style="color:var(--text-secondary)">הדבק הודעה לתצוגה מקדימה</p>';
        return;
    }

    const records = _parseShootingMessages(text);
    if (records.length === 0) {
        document.getElementById('shootingParsePreview').innerHTML = '<p style="color:var(--danger)">לא זוהו רשומות בהודעה</p>';
        return;
    }

    const html = records.map((r, i) => `<div class="parse-preview-card">
        <strong>רשומה ${i + 1}</strong>
        <div class="parse-preview-fields">
            ${r.commander ? `<span>מפק"צ: ${escapeHtml(r.commander)}</span>` : ''}
            ${r.gunner ? `<span>תותחן: ${escapeHtml(r.gunner)}</span>` : ''}
            ${r.vehicle ? `<span>כלי: ${escapeHtml(r.vehicle)}</span>` : ''}
            ${r.date ? `<span>תאריך: ${escapeHtml(r.dateRaw || '')}</span>` : ''}
            ${r.framework ? `<span>מסגרת: ${escapeHtml(r.framework)}</span>` : ''}
            ${r.targetType ? `<span>סוג מטרה: ${escapeHtml(r.targetType)}</span>` : ''}
            ${r.shellType ? `<span>סוג פגז: ${escapeHtml(r.shellType)}</span>` : ''}
            ${r.quantity ? `<span>כמות: ${escapeHtml(r.quantity)}</span>` : ''}
            ${r.range ? `<span>טווח: ${escapeHtml(r.range)}</span>` : ''}
        </div>
    </div>`).join('');

    document.getElementById('shootingParsePreview').innerHTML =
        `<p style="color:var(--success)">זוהו ${records.length} רשומות</p>` + html;
}

function importParsedShooting() {
    try {
    alert('importParsedShooting called');
    const text = document.getElementById('shootingParseText').value.trim();
    if (!text) { showToast('אין טקסט לפענוח'); return; }

    const records = _parseShootingMessages(text);
    alert('records: ' + records.length);
    if (records.length === 0) { showToast('לא זוהו רשומות בהודעה'); return; }

    records.forEach(r => {
        state.shootingRecords.push({
            id: generateId(),
            commander: r.commander || '',
            gunner: r.gunner || '',
            vehicle: r.vehicle || '',
            date: r.date || null,
            framework: r.framework || '',
            vehicleLocation: r.vehicleLocation || '',
            targetLocation: r.targetLocation || '',
            targetType: r.targetType || '',
            targetDescription: r.targetDescription || '',
            shellType: r.shellType || '',
            quantity: r.quantity || '',
            range: r.range || ''
        });
    });

    saveState();
    closeModal('shootingParseModal');
    renderShooting();
    showToast(`${records.length} רשומות ירי נוספו`);
    } catch(e) { alert('ERROR: ' + e.message); }
}

function _stripQuotes(text) {
    // Remove ALL quote-like characters for key comparison
    return text.replace(/["״""׳''`\u05F4\u0022\u201C\u201D\u2018\u2019]/g, '');
}

function _parseShootingMessages(text) {
    // Split on lines that start with מפק"צ/מפק״צ/מפקצ followed by colon
    const blocks = text.split(/(?=מפק[""״׳\u05F4]?צ\s*:)/);
    const results = [];

    blocks.forEach(block => {
        block = block.trim();
        if (!block) return;

        // Parse key:value pairs, stripping quotes from keys for matching
        const fieldMap = {};
        const lines = block.split(/\r?\n/);
        lines.forEach(line => {
            const match = line.match(/^([^:]+):\s*(.*)/);
            if (match) {
                const rawKey = match[1].trim();
                const key = _stripQuotes(rawKey);
                const val = match[2].trim();
                fieldMap[key] = val;
            }
        });

        // Must have at least one field
        if (Object.keys(fieldMap).length === 0) return;

        const record = {
            commander: fieldMap['מפקצ'] || '',
            gunner: fieldMap['תותחן'] || '',
            vehicle: fieldMap['כלי'] || '',
            dateRaw: fieldMap['תאריך'] || '',
            date: null,
            framework: fieldMap['מסגרת'] || '',
            vehicleLocation: fieldMap['מיקום כלי'] || '',
            targetLocation: fieldMap['מיקום מטרה'] || '',
            targetType: fieldMap['סוג מטרה'] || '',
            targetDescription: fieldMap['תיאור מטרה כללי'] || fieldMap['תיאור מטרה'] || '',
            shellType: fieldMap['סוג פגז'] || '',
            quantity: fieldMap['כמות'] || '',
            range: fieldMap['טווח'] || ''
        };

        // Parse date: supports "3.3", "3.3.25", "03.03.2025"
        if (record.dateRaw) {
            const dateParts = record.dateRaw.split('.');
            if (dateParts.length >= 2) {
                const day = parseInt(dateParts[0]);
                const month = parseInt(dateParts[1]) - 1;
                let year = dateParts.length >= 3 ? parseInt(dateParts[2]) : new Date().getFullYear();
                if (year < 100) year += 2000;
                const d = new Date(year, month, day);
                if (!isNaN(d.getTime())) record.date = d.toISOString();
            }
        }

        results.push(record);
    });

    return results;
}

// --- Export ---
function exportShootingXLSX() {
    const records = state.shootingRecords || [];
    if (records.length === 0) { showToast('אין נתונים לייצוא'); return; }

    const rows = records.map(r => ({
        'מפק"צ': r.commander || '',
        'תותחן': r.gunner || '',
        'כלי': r.vehicle || '',
        'תאריך': r.date ? formatDateHe(r.date) : '',
        'מסגרת': r.framework || '',
        'מיקום כלי': r.vehicleLocation || '',
        'מיקום מטרה': r.targetLocation || '',
        'סוג מטרה': r.targetType || '',
        'תיאור מטרה': r.targetDescription || '',
        'סוג פגז': r.shellType || '',
        'כמות': r.quantity || '',
        'טווח': r.range || ''
    }));

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'מעקב ירי');
    XLSX.writeFile(wb, 'shooting_tracking.xlsx');
    showToast('קובץ XLSX יוצא בהצלחה');
}
