// ==================== Export ====================
function exportData() {
    const columns = getAllColumns();
    const headers = columns.map(c => c.label);
    const rows = state.personnel.map(person =>
        columns.map(c => (person[c.key] || '').toString())
    );

    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    ws['!cols'] = headers.map(() => ({ wch: 18 }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'כוח אדם');
    XLSX.writeFile(wb, `כוח_אדם_${new Date().toLocaleDateString('he-IL')}.xlsx`);
    showToast('קובץ יוצא בהצלחה');
}

// ==================== Activities Export/Import ====================
function exportActivitiesXLSX() {
    if (state.activities.length === 0) {
        showToast('אין פעילויות לייצוא');
        return;
    }

    const config = getColumnConfig();
    const primaryCol = config.find(c => c.isPrimary) || config[0];

    const rows = [];
    state.activities.forEach(act => {
        const total = act.participants.length;
        const completed = act.participants.filter(p => p.completed).length;
        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

        act.participants.forEach(p => {
            const person = state.personnel.find(per => per.id === p.personId);
            rows.push({
                'פעילות': act.name,
                'תיאור': act.description || '',
                'תאריך יעד': act.deadline ? formatDate(act.deadline) : '',
                'התקדמות': percent + '%',
                'משתתף': person ? person[primaryCol.key] : 'לא נמצא',
                'סטטוס': p.completed ? 'השלים' : 'טרם השלים',
                'תאריך השלמה': p.completedAt ? formatDate(p.completedAt) : ''
            });
        });
    });

    const ws = XLSX.utils.json_to_sheet(rows);
    ws['!cols'] = Object.keys(rows[0] || {}).map(() => ({ wch: 18 }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'פעילויות');
    XLSX.writeFile(wb, `פעילויות_${new Date().toLocaleDateString('he-IL')}.xlsx`);
    showToast('קובץ פעילויות XLSX יוצא בהצלחה');
}

function exportActivities() {
    if (state.activities.length === 0) {
        showToast('אין פעילויות לייצוא');
        return;
    }
    const json = '\uFEFF' + JSON.stringify(state.activities, null, 2);
    const blob = new Blob([json], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `פעילויות_${new Date().toLocaleDateString('he-IL')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('קובץ פעילויות יוצא בהצלחה');
}

function importActivitiesFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    event.target.value = '';

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            let text = e.target.result;
            if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
            const activities = JSON.parse(text);

            if (!Array.isArray(activities)) {
                showToast('קובץ לא תקין - נדרש מערך של פעילויות');
                return;
            }

            for (const act of activities) {
                if (!act.name || !Array.isArray(act.participants)) {
                    showToast('קובץ לא תקין - כל פעילות חייבת לכלול שם ומשתתפים');
                    return;
                }
            }

            const personnelIds = new Set(state.personnel.map(p => p.id));
            let orphanCount = 0;
            let importedCount = 0;

            for (const act of activities) {
                act.id = generateId();
                for (const p of act.participants) {
                    if (!personnelIds.has(p.personId)) {
                        orphanCount++;
                    }
                }
                state.activities.push(act);
                importedCount++;
            }

            saveState();
            renderActivities();

            let msg = `יובאו ${importedCount} פעילויות בהצלחה`;
            if (orphanCount > 0) {
                msg += ` (${orphanCount} משתתפים לא נמצאו בכוח האדם הנוכחי)`;
            }
            showToast(msg);
        } catch (err) {
            showToast('שגיאה בקריאת הקובץ - ודא שזהו קובץ JSON תקין');
        }
    };
    reader.readAsText(file);
}

// ==================== Import ====================
let _importData = null; // { headers: [], rows: [] }

function openImportModal() {
    if (state.accessLevel !== 'admin') {
        showToast('אין הרשאה לביצוע פעולה זו');
        return;
    }
    _importData = null;
    document.getElementById('importStep1').classList.remove('hidden');
    document.getElementById('importStep2').classList.add('hidden');
    document.getElementById('importConfirmBtn').classList.add('hidden');
    document.getElementById('importFileInput').value = '';
    openModal('importModal');

    // Setup drag & drop
    const dropZone = document.getElementById('importDropZone');
    dropZone.onclick = () => document.getElementById('importFileInput').click();

    dropZone.ondragover = (e) => { e.preventDefault(); dropZone.classList.add('drag-over'); };
    dropZone.ondragleave = () => dropZone.classList.remove('drag-over');
    dropZone.ondrop = (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file) handleImportFile(file);
    };
}

function handleImportFileSelect(event) {
    const file = event.target.files[0];
    if (file) handleImportFile(file);
}

function handleImportFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1, defval: '' });

            if (jsonData.length < 2) {
                showToast('הקובץ ריק או שאין בו שורות נתונים');
                return;
            }

            const headers = jsonData[0].map(h => String(h).trim()).filter(Boolean);
            const numHeaders = headers.length;
            const rows = jsonData.slice(1)
                .map(row => row.slice(0, numHeaders))
                .filter(row => row.some(cell => {
                    const v = String(cell ?? '').trim().toLowerCase();
                    return v !== '' && v !== '0' && v !== 'true' && v !== 'false';
                }));

            _importData = { headers, rows };
            renderColumnConfig(headers, rows.length);
        } catch (err) {
            console.error('Import error:', err);
            showToast('שגיאה בקריאת הקובץ');
        }
    };
    reader.readAsArrayBuffer(file);
}

function renderColumnConfig(headers, rowCount) {
    document.getElementById('importStep1').classList.add('hidden');
    document.getElementById('importStep2').classList.remove('hidden');
    document.getElementById('importConfirmBtn').classList.remove('hidden');
    document.getElementById('importRowCount').textContent = `${rowCount} שורות`;

    const tbody = document.getElementById('importConfigBody');
    let html = '';
    headers.forEach((header, idx) => {
        const key = 'col_' + idx;
        html += `<tr>
            <td><input type="checkbox" class="import-include" data-idx="${idx}" checked></td>
            <td class="col-name">${escapeHtml(header)}</td>
            <td><input type="radio" name="importPrimary" value="${idx}" ${idx === 0 ? 'checked' : ''}></td>
            <td><input type="checkbox" class="import-filter" data-idx="${idx}"></td>
        </tr>`;
    });
    tbody.innerHTML = html;
}

function confirmImport() {
    if (!_importData) return;

    if (!confirm('פעולה זו תמחק את כל הנתונים הקיימים. להמשיך?')) return;

    const { headers, rows } = _importData;
    const includeBoxes = document.querySelectorAll('.import-include');
    const filterBoxes = document.querySelectorAll('.import-filter');
    const primaryRadio = document.querySelector('input[name="importPrimary"]:checked');
    const primaryIdx = primaryRadio ? parseInt(primaryRadio.value) : 0;

    // Build columnConfig
    const newColumnConfig = [];
    const includedIndices = [];

    includeBoxes.forEach(cb => {
        const idx = parseInt(cb.dataset.idx);
        if (cb.checked) {
            includedIndices.push(idx);
            const key = headers[idx].replace(/[^a-zA-Z0-9\u0590-\u05FF]/g, '_').toLowerCase() || 'col_' + idx;
            // Ensure unique keys
            let uniqueKey = key;
            let counter = 1;
            while (newColumnConfig.find(c => c.key === uniqueKey)) {
                uniqueKey = key + '_' + counter++;
            }
            const filterCb = filterBoxes[idx];
            newColumnConfig.push({
                key: uniqueKey,
                label: headers[idx],
                isPrimary: idx === primaryIdx,
                isFilter: filterCb ? filterCb.checked : false
            });
        }
    });

    if (newColumnConfig.length === 0) {
        showToast('יש לבחור לפחות עמודה אחת');
        return;
    }

    // Ensure at least one primary
    if (!newColumnConfig.find(c => c.isPrimary)) {
        newColumnConfig[0].isPrimary = true;
    }

    // Build personnel array
    const newPersonnel = rows.map(row => {
        const person = { id: generateId() };
        includedIndices.forEach((origIdx, configIdx) => {
            person[newColumnConfig[configIdx].key] = String(row[origIdx] ?? '').trim();
        });
        return person;
    });

    // Replace all data
    state.personnel = newPersonnel;
    state.customColumns = [];
    state.activities = [];
    state.columnConfig = newColumnConfig;
    state.sortColumn = null;
    state.sortDirection = 'asc';

    saveState();
    populateFilters();
    renderPersonnelTable();
    renderActivities();
    updateDashboard();

    closeModal('importModal');
    _importData = null;
    showToast(`יובאו ${newPersonnel.length} שורות בהצלחה`);
}
