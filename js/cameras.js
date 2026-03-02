// ==================== Cameras ====================
function renderCameras() {
    const cameras = getActiveCameras();
    if (!cameras || cameras.length === 0) return;

    const viewing = isViewingSnapshot();
    const canEdit = state.accessLevel === 'admin' && !viewing;
    const thead = document.getElementById('camerasHead');
    const tbody = document.getElementById('camerasBody');

    // Header: # | ציוד | tank1 | tank2 | ... | (actions if admin)
    let headHtml = '<tr class="camera-header-row"><th>#</th><th>ציוד</th>';
    cameras.forEach(c => {
        headHtml += `<th>${escapeHtml(c.tank)}</th>`;
    });
    if (canEdit) headHtml += '<th></th>';
    headHtml += '</tr>';
    thead.innerHTML = headHtml;

    let bodyHtml = '';

    // Commander row
    bodyHtml += '<tr class="camera-commander-row"><td></td><td style="text-align:right">מפקד</td>';
    cameras.forEach((c, tankIdx) => {
        if (canEdit) {
            bodyHtml += `<td class="camera-info-cell" ondblclick="editCameraInfoCell(event, ${tankIdx}, 'commander')">${escapeHtml(c.commander)}</td>`;
        } else {
            bodyHtml += `<td>${escapeHtml(c.commander)}</td>`;
        }
    });
    if (canEdit) bodyHtml += '<td></td>';
    bodyHtml += '</tr>';

    // Source brigade row
    bodyHtml += '<tr class="camera-brigade-row"><td></td><td style="text-align:right">חטיבת מקור</td>';
    cameras.forEach((c, tankIdx) => {
        if (canEdit) {
            bodyHtml += `<td class="camera-info-cell" ondblclick="editCameraInfoCell(event, ${tankIdx}, 'sourceBrigade')">${escapeHtml(c.sourceBrigade)}</td>`;
        } else {
            bodyHtml += `<td>${escapeHtml(c.sourceBrigade)}</td>`;
        }
    });
    if (canEdit) bodyHtml += '<td></td>';
    bodyHtml += '</tr>';

    // Equipment rows
    const equipmentCount = cameras[0].items.length;
    for (let itemIdx = 0; itemIdx < equipmentCount; itemIdx++) {
        bodyHtml += `<tr><td>${itemIdx + 1}</td><td style="text-align:right">${escapeHtml(cameras[0].items[itemIdx].name)}</td>`;
        cameras.forEach((cam, tankIdx) => {
            const item = cam.items[itemIdx];
            const isFaulty = item.status === 'תקול';
            const dotClass = isFaulty ? 'faulty' : 'ok';
            const cellClass = isFaulty ? 'camera-cell faulty' : 'camera-cell';
            const serial = escapeHtml(item.serial);

            if (canEdit) {
                bodyHtml += `<td class="${cellClass}" onclick="toggleCameraStatus(${tankIdx}, ${itemIdx})">`;
            } else {
                bodyHtml += `<td class="${cellClass}">`;
            }
            bodyHtml += `<div class="camera-cell-content">`;
            if (serial) {
                bodyHtml += `<span class="camera-serial">${serial}</span>`;
            }
            bodyHtml += `<span class="camera-status-dot ${dotClass}"></span>`;
            if (canEdit) {
                bodyHtml += `<button class="camera-edit-btn" onclick="event.stopPropagation(); editCameraCell(event, ${tankIdx}, ${itemIdx})" title="ערוך מספר סידורי"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>`;
            }
            bodyHtml += `</div></td>`;
        });
        if (canEdit) {
            bodyHtml += `<td class="camera-actions-cell"><button class="btn-icon delete-row-btn" onclick="deleteCameraRow(${itemIdx})" title="מחק שורה"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button></td>`;
        }
        bodyHtml += '</tr>';
    }

    // Summary row: count faulty per tank
    bodyHtml += '<tr class="camera-brigade-row"><td></td><td style="text-align:right;font-weight:600">תקולים</td>';
    cameras.forEach(cam => {
        const faultyCount = cam.items.filter(i => i.status === 'תקול').length;
        const color = faultyCount > 0 ? 'var(--danger)' : 'var(--success)';
        bodyHtml += `<td style="font-weight:700;color:${color}">${faultyCount}</td>`;
    });
    if (canEdit) bodyHtml += '<td></td>';
    bodyHtml += '</tr>';

    tbody.innerHTML = bodyHtml;
}

function toggleCameraStatus(tankIdx, itemIdx) {
    if (state.accessLevel !== 'admin') return;
    if (isViewingSnapshot()) return;
    const item = state.cameras[tankIdx].items[itemIdx];
    item.status = item.status === 'תקין' ? 'תקול' : 'תקין';
    saveState();
    renderCameras();
}

function editCameraCell(event, tankIdx, itemIdx) {
    if (state.accessLevel !== 'admin') return;
    if (isViewingSnapshot()) return;
    event.stopPropagation();

    const td = event.currentTarget.closest('td');
    const item = state.cameras[tankIdx].items[itemIdx];
    const currentSerial = item.serial;

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'cell-edit';
    input.value = currentSerial;

    td.innerHTML = '';
    td.appendChild(input);
    input.focus();
    input.select();

    const finish = () => {
        const newVal = input.value.trim();
        if (newVal !== currentSerial) {
            item.serial = newVal;
            saveState();
        }
        renderCameras();
    };

    input.addEventListener('blur', finish);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { input.blur(); }
        if (e.key === 'Escape') { input.value = currentSerial; input.blur(); }
    });
}

function editCameraInfoCell(event, tankIdx, field) {
    if (state.accessLevel !== 'admin') return;
    if (isViewingSnapshot()) return;
    event.stopPropagation();

    const td = event.currentTarget;
    const currentVal = state.cameras[tankIdx][field] || '';

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'cell-edit';
    input.value = currentVal;

    td.innerHTML = '';
    td.appendChild(input);
    input.focus();
    input.select();

    const finish = () => {
        const newVal = input.value.trim();
        if (newVal !== currentVal) {
            state.cameras[tankIdx][field] = newVal;
            saveState();
        }
        renderCameras();
    };

    input.addEventListener('blur', finish);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { input.blur(); }
        if (e.key === 'Escape') { input.value = currentVal; input.blur(); }
    });
}

function deleteCameraRow(itemIdx) {
    if (state.accessLevel !== 'admin') return;
    if (isViewingSnapshot()) return;
    const name = state.cameras[0].items[itemIdx].name;
    if (!confirm(`למחוק את ${name}?`)) return;

    state.cameras.forEach(cam => {
        cam.items.splice(itemIdx, 1);
    });
    saveState();
    renderCameras();
    showToast(`${name} נמחק`);
}

function exportCameras() {
    const cameras = state.cameras;
    if (!cameras || cameras.length === 0) {
        showToast('אין נתוני צלמים לייצוא');
        return;
    }

    const rows = [];
    rows.push(['ציוד', ...cameras.map(c => c.tank)]);
    rows.push(['מפקד', ...cameras.map(c => c.commander || '')]);
    rows.push(['חטיבת מקור', ...cameras.map(c => c.sourceBrigade || '')]);

    const equipmentCount = cameras[0].items.length;
    for (let i = 0; i < equipmentCount; i++) {
        const row = [cameras[0].items[i].name];
        cameras.forEach(cam => {
            const item = cam.items[i];
            row.push(item.serial ? `${item.serial} (${item.status})` : item.status);
        });
        rows.push(row);
    }

    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws['!cols'] = rows[0].map(() => ({ wch: 18 }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'צלמים');
    XLSX.writeFile(wb, `צלמים_${new Date().toLocaleDateString('he-IL')}.xlsx`);
    showToast('קובץ צלמים יוצא בהצלחה');
}
