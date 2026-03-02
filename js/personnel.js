// ==================== Bulk Selection ====================
let _bulkSelected = new Set();

function toggleBulkSelect(personId) {
    if (_bulkSelected.has(personId)) {
        _bulkSelected.delete(personId);
    } else {
        _bulkSelected.add(personId);
    }
    updateBulkUI();
}

function toggleBulkSelectAll() {
    const filtered = getFilteredPersonnel();
    const allSelected = filtered.every(p => _bulkSelected.has(p.id));
    if (allSelected) {
        filtered.forEach(p => _bulkSelected.delete(p.id));
    } else {
        filtered.forEach(p => _bulkSelected.add(p.id));
    }
    renderPersonnelTable();
}

function clearBulkSelection() {
    _bulkSelected = new Set();
    updateBulkUI();
    renderPersonnelTable();
}

function updateBulkUI() {
    const bar = document.getElementById('bulkActionsBar');
    const countEl = document.getElementById('bulkSelectedCount');
    if (_bulkSelected.size > 0) {
        bar.classList.remove('hidden');
        countEl.textContent = `${_bulkSelected.size} נבחרו`;
    } else {
        bar.classList.add('hidden');
    }
    // Update checkboxes without full re-render
    document.querySelectorAll('.bulk-checkbox').forEach(cb => {
        cb.checked = _bulkSelected.has(cb.dataset.id);
    });
    // Update select-all checkbox
    const selectAllCb = document.getElementById('bulkSelectAll');
    if (selectAllCb) {
        const filtered = getFilteredPersonnel();
        selectAllCb.checked = filtered.length > 0 && filtered.every(p => _bulkSelected.has(p.id));
    }
}

function bulkDeleteSelected() {
    if (_bulkSelected.size === 0) return;
    if (!confirm(`למחוק ${_bulkSelected.size} שורות?`)) return;

    state.personnel = state.personnel.filter(p => !_bulkSelected.has(p.id));
    _bulkSelected = new Set();
    saveState();
    populateFilters();
    renderPersonnelTable();
    updateBulkUI();
    showToast('נמחקו בהצלחה');
}

function bulkEditSelected() {
    if (_bulkSelected.size === 0) return;
    const columns = getAllColumns();
    const select = document.getElementById('bulkEditField');
    select.innerHTML = columns.map(c => `<option value="${c.key}">${escapeHtml(c.label)}</option>`).join('');
    document.getElementById('bulkEditValue').value = '';
    openModal('bulkEditModal');
}

function confirmBulkEdit() {
    const field = document.getElementById('bulkEditField').value;
    const value = document.getElementById('bulkEditValue').value.trim();

    state.personnel.forEach(p => {
        if (_bulkSelected.has(p.id)) {
            p[field] = value;
        }
    });

    _bulkSelected = new Set();
    saveState();
    populateFilters();
    renderPersonnelTable();
    updateBulkUI();
    closeModal('bulkEditModal');
    showToast('עודכנו בהצלחה');
}

// ==================== Personnel Table ====================
function getColumnConfig() {
    return state.columnConfig || DEFAULT_COLUMN_CONFIG;
}

function getAllColumns() {
    const config = isViewingSnapshot() ? getActiveColumnConfig() : getColumnConfig();
    // Map columnConfig entries to column objects (with type 'text' for table rendering)
    const cols = config.map(c => ({ key: c.key, label: c.label, type: 'text' }));
    // Also append any legacy custom columns not in config
    const customCols = isViewingSnapshot() ? getActiveCustomColumns() : state.customColumns;
    const colConfig = isViewingSnapshot() ? null : state.columnConfig;
    if (!colConfig) {
        customCols.forEach(cc => {
            if (!cols.find(c => c.key === cc.key)) {
                cols.push(cc);
            }
        });
    }
    return cols;
}

function renderPersonnelTable() {
    const filtered = getFilteredPersonnel();
    const columns = getAllColumns();
    const viewing = isViewingSnapshot();
    const canEdit = state.accessLevel === 'admin' && !viewing;
    const activePersonnel = getActivePersonnel();

    // Sort
    if (state.sortColumn) {
        filtered.sort((a, b) => {
            const valA = (a[state.sortColumn] || '').toString();
            const valB = (b[state.sortColumn] || '').toString();
            const cmp = valA.localeCompare(valB, 'he');
            return state.sortDirection === 'asc' ? cmp : -cmp;
        });
    }

    // Header
    const config = isViewingSnapshot() ? getActiveColumnConfig() : getColumnConfig();
    const thead = document.getElementById('personnelHead');
    let headerHtml = '<tr>';
    if (canEdit) {
        const allChecked = filtered.length > 0 && filtered.every(p => _bulkSelected.has(p.id));
        headerHtml += `<th style="width:36px"><input type="checkbox" id="bulkSelectAll" ${allChecked ? 'checked' : ''} onchange="toggleBulkSelectAll()"></th>`;
    }
    headerHtml += '<th style="width:40px">#</th>';
    columns.forEach(col => {
        const sortClass = state.sortColumn === col.key
            ? (state.sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc')
            : '';
        const colConfig = config.find(c => c.key === col.key);
        const isPrimary = colConfig && colConfig.isPrimary;
        const isDeletable = canEdit && !isPrimary;
        const deleteBtn = isDeletable
            ? `<span class="col-delete-btn" onclick="event.stopPropagation(); deleteColumn('${col.key}')" title="מחק עמודה">&times;</span>`
            : '';
        headerHtml += `<th class="${sortClass}" onclick="sortBy('${col.key}')">${col.label}${deleteBtn}</th>`;
    });
    if (canEdit) {
        headerHtml += '<th style="width:80px">פעולות</th>';
    }
    headerHtml += '</tr>';
    thead.innerHTML = headerHtml;

    // Body
    const tbody = document.getElementById('personnelBody');
    const colSpan = columns.length + (canEdit ? 3 : 1);
    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="${colSpan}" style="text-align:center;padding:40px;color:var(--text-muted)">לא נמצאו תוצאות</td></tr>`;
    } else {
        let bodyHtml = '';
        filtered.forEach((person, idx) => {
            const globalIdx = activePersonnel.indexOf(person);
            const isSelected = _bulkSelected.has(person.id);
            bodyHtml += `<tr class="${isSelected ? 'bulk-selected' : ''}">`;
            if (canEdit) {
                bodyHtml += `<td><input type="checkbox" class="bulk-checkbox" data-id="${person.id}" ${isSelected ? 'checked' : ''} onchange="toggleBulkSelect('${person.id}')"></td>`;
            }
            bodyHtml += `<td style="color:var(--text-muted)">${idx + 1}</td>`;
            columns.forEach(col => {
                const val = person[col.key] || '';
                if (canEdit) {
                    bodyHtml += `<td class="editable" ondblclick="startCellEdit(this, ${globalIdx}, '${col.key}')">${escapeHtml(val)}</td>`;
                } else {
                    bodyHtml += `<td>${escapeHtml(val)}</td>`;
                }
            });
            if (canEdit) {
                bodyHtml += `<td>
                    <div class="row-actions">
                        <button title="ערוך" onclick="openEditPersonModal(${globalIdx})">✏️</button>
                        <button class="delete" title="מחק" onclick="deletePerson(${globalIdx})">🗑️</button>
                    </div>
                </td>`;
            }
            bodyHtml += '</tr>';
        });
        tbody.innerHTML = bodyHtml;
    }

    // Update bulk UI bar
    updateBulkUI();

    // Count
    document.getElementById('personnelCount').textContent = `${filtered.length} / ${activePersonnel.length}`;
}

function sortBy(column) {
    if (state.sortColumn === column) {
        state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        state.sortColumn = column;
        state.sortDirection = 'asc';
    }
    renderPersonnelTable();
}

// ==================== Inline Cell Editing ====================
function startCellEdit(td, personIdx, colKey) {
    if (state.accessLevel !== 'admin') return;
    if (isViewingSnapshot()) return;
    if (state.editingCell) return;

    const currentValue = state.personnel[personIdx][colKey] || '';
    state.editingCell = { td, personIdx, colKey };

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'cell-edit';
    input.value = currentValue;

    td.textContent = '';
    td.appendChild(input);
    input.focus();
    input.select();

    input.addEventListener('blur', () => finishCellEdit(input));
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') input.blur();
    });
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            state.editingCell = null;
            renderPersonnelTable();
        }
    });
}

function finishCellEdit(input) {
    if (!state.editingCell) return;
    const { personIdx, colKey } = state.editingCell;
    state.personnel[personIdx][colKey] = input.value;
    state.editingCell = null;
    saveState();
    populateFilters();
    renderPersonnelTable();
}

// ==================== Add/Edit Person ====================
function renderPersonFormFields(person = null) {
    const container = document.getElementById('personFormFields');
    const columns = getAllColumns();
    let html = '';

    for (let i = 0; i < columns.length; i += 2) {
        html += '<div class="form-row">';
        for (let j = i; j < Math.min(i + 2, columns.length); j++) {
            const col = columns[j];
            const val = person ? (person[col.key] || '') : '';
            const config = getColumnConfig();
            const isPrimary = config.find(c => c.key === col.key)?.isPrimary;
            html += `<div class="form-group">
                <label>${escapeHtml(col.label)}</label>
                <input type="text" id="field_${col.key}" value="${escapeHtml(val)}" ${isPrimary ? 'required' : ''}>
            </div>`;
        }
        html += '</div>';
    }
    container.innerHTML = html;
}

function openAddPersonModal() {
    if (state.accessLevel !== 'admin') {
        showToast('אין הרשאה לביצוע פעולה זו');
        return;
    }
    if (isViewingSnapshot()) {
        showToast('לא ניתן לערוך תמונת מצב');
        return;
    }
    state.editingPersonIndex = null;
    document.getElementById('addPersonModalTitle').textContent = 'הוסף איש חדש';
    renderPersonFormFields();
    openModal('addPersonModal');
}

function openEditPersonModal(idx) {
    if (state.accessLevel !== 'admin') return;
    if (isViewingSnapshot()) return;
    state.editingPersonIndex = idx;
    const person = state.personnel[idx];

    document.getElementById('addPersonModalTitle').textContent = 'ערוך פרטים';
    renderPersonFormFields(person);
    openModal('addPersonModal');
}

function savePerson() {
    const columns = getAllColumns();
    const config = getColumnConfig();
    const primaryCol = config.find(c => c.isPrimary) || config[0];

    const primaryEl = document.getElementById('field_' + primaryCol.key);
    if (!primaryEl || !primaryEl.value.trim()) {
        showToast(`יש להזין ${primaryCol.label}`);
        return;
    }

    const personData = {};
    columns.forEach(col => {
        const el = document.getElementById('field_' + col.key);
        if (el) personData[col.key] = el.value.trim();
    });

    if (state.editingPersonIndex !== null) {
        const existing = state.personnel[state.editingPersonIndex];
        Object.assign(existing, personData);
        showToast('פרטים עודכנו בהצלחה');
    } else {
        personData.id = generateId();
        state.personnel.push(personData);
        showToast('איש חדש נוסף בהצלחה');
    }

    saveState();
    populateFilters();
    renderPersonnelTable();
    closeModal('addPersonModal');
}

function deletePerson(idx) {
    if (state.accessLevel !== 'admin') return;
    const person = state.personnel[idx];
    if (!confirm(`למחוק את ${person.name}?`)) return;

    state.personnel.splice(idx, 1);
    saveState();
    populateFilters();
    renderPersonnelTable();
    showToast('נמחק בהצלחה');
}

// ==================== Custom Columns ====================
function openAddColumnModal() {
    if (state.accessLevel !== 'admin') {
        showToast('אין הרשאה לביצוע פעולה זו');
        return;
    }
    document.getElementById('columnName').value = '';
    document.getElementById('columnType').value = 'text';
    openModal('addColumnModal');
}

function addColumn() {
    const name = document.getElementById('columnName').value.trim();
    if (!name) {
        showToast('יש להזין שם עמודה');
        return;
    }

    const key = 'custom_' + Date.now();
    const type = document.getElementById('columnType').value;

    state.customColumns.push({ key, label: name, type });

    // Also add to columnConfig if it exists, so the column is visible
    if (state.columnConfig) {
        state.columnConfig.push({ key, label: name, isPrimary: false, isFilter: false });
    }

    saveState();
    populateFilters();
    renderPersonnelTable();
    closeModal('addColumnModal');
    showToast(`עמודה "${name}" נוספה בהצלחה`);
}

function deleteColumn(colKey) {
    if (state.accessLevel !== 'admin') return;

    const config = getColumnConfig();
    const col = config.find(c => c.key === colKey)
        || state.customColumns.find(c => c.key === colKey);
    if (!col) return;
    if (col.isPrimary) {
        showToast('לא ניתן למחוק עמודה ראשית');
        return;
    }

    const label = col.label || col.key;
    if (!confirm(`למחוק את העמודה "${label}"? הנתונים בעמודה יימחקו.`)) return;

    // Remove from columnConfig
    if (state.columnConfig) {
        state.columnConfig = state.columnConfig.filter(c => c.key !== colKey);
    }

    // Remove from customColumns
    state.customColumns = state.customColumns.filter(c => c.key !== colKey);

    // Remove data from all personnel
    state.personnel.forEach(p => { delete p[colKey]; });

    // Reset sort if sorting by deleted column
    if (state.sortColumn === colKey) {
        state.sortColumn = null;
        state.sortDirection = 'asc';
    }

    saveState();
    populateFilters();
    renderPersonnelTable();
    showToast(`עמודה "${label}" נמחקה`);
}
