// ==================== Activities ====================
let _editingActivityId = null;
let selectedParticipants = new Set();
let selectedVehicles = new Set();

function openNewActivityModal() {
    if (state.accessLevel !== 'admin') {
        showToast('אין הרשאה לביצוע פעולה זו');
        return;
    }
    _editingActivityId = null;
    selectedParticipants = new Set();
    selectedVehicles = new Set();

    document.getElementById('activityName').value = '';
    document.getElementById('activityDescription').value = '';
    document.getElementById('activityDeadline').value = '';

    document.querySelector('#newActivityModal .modal-header h3').textContent = 'פעילות חדשה';
    document.getElementById('activitySaveBtn').textContent = 'צור פעילות';

    const actSearch = document.getElementById('actSearchInput');
    if (actSearch) actSearch.value = '';
    getColumnConfig().filter(c => c.isFilter).forEach(col => {
        const el = document.getElementById('actFilter_' + col.key);
        if (el) el.value = '';
    });

    renderActivityParticipants();
    renderActivityVehicles();
    openModal('newActivityModal');
}

function editActivity(activityId) {
    if (state.accessLevel !== 'admin') {
        showToast('אין הרשאה לביצוע פעולה זו');
        return;
    }
    const activity = state.activities.find(a => a.id === activityId);
    if (!activity) return;

    _editingActivityId = activityId;

    document.getElementById('activityName').value = activity.name;
    document.getElementById('activityDescription').value = activity.description || '';
    document.getElementById('activityDeadline').value = activity.deadline || '';

    document.querySelector('#newActivityModal .modal-header h3').textContent = 'עריכת פעילות';
    document.getElementById('activitySaveBtn').textContent = 'שמור שינויים';

    selectedParticipants = new Set(activity.participants.map(p => p.personId));
    selectedVehicles = new Set((activity.vehicleParticipants || []).map(v => v.vehicleId));

    const actSearch = document.getElementById('actSearchInput');
    if (actSearch) actSearch.value = '';
    getColumnConfig().filter(c => c.isFilter).forEach(col => {
        const el = document.getElementById('actFilter_' + col.key);
        if (el) el.value = '';
    });

    renderActivityParticipants();
    renderActivityVehicles();
    closeModal('activityDetailModal');
    openModal('newActivityModal');
}

function getActivityFilteredPersonnel() {
    const searchEl = document.getElementById('actSearchInput');
    const search = searchEl ? searchEl.value.toLowerCase() : '';
    const config = getColumnConfig();
    const filterColumns = config.filter(c => c.isFilter);

    const activeFilters = [];
    filterColumns.forEach(col => {
        const el = document.getElementById('actFilter_' + col.key);
        if (el && el.value) activeFilters.push({ key: col.key, value: el.value });
    });

    return state.personnel.filter(p => {
        for (const f of activeFilters) {
            if (p[f.key] !== f.value) return false;
        }
        if (search) {
            const allValues = Object.values(p).join(' ').toLowerCase();
            if (!allValues.includes(search)) return false;
        }
        return true;
    });
}

function renderActivityParticipants() {
    const filtered = getActivityFilteredPersonnel();
    const container = document.getElementById('participantsList');

    let html = '';
    const config = getColumnConfig();
    const primaryCol = config.find(c => c.isPrimary) || config[0];
    const metaCols = config.filter(c => !c.isPrimary).slice(0, 3);

    filtered.forEach(person => {
        const checked = selectedParticipants.has(person.id) ? 'checked' : '';
        const selectedClass = selectedParticipants.has(person.id) ? 'selected' : '';
        const metaText = metaCols.map(c => person[c.key] || '').filter(Boolean).join(' | ');
        html += `<div class="participant-item ${selectedClass}" onclick="toggleParticipant('${person.id}', this)">
            <input type="checkbox" ${checked} onclick="event.stopPropagation(); toggleParticipant('${person.id}', this.parentElement)">
            <div class="participant-info">
                <span class="name">${escapeHtml(person[primaryCol.key] || '')}</span>
                <span class="meta">${escapeHtml(metaText)}</span>
            </div>
        </div>`;
    });

    container.innerHTML = html || '<div style="padding:20px;text-align:center;color:var(--text-muted)">לא נמצאו תוצאות</div>';
    updateSelectedCount();
}

function renderActivityVehicles() {
    const container = document.getElementById('vehiclesList');
    if (!container) return;

    const vehicles = state.faultRecords || [];
    if (vehicles.length === 0) {
        container.innerHTML = '<div style="padding:12px;text-align:center;color:var(--text-muted);font-size:13px">אין כלים במעקב תקלות</div>';
        updateSelectedCount();
        return;
    }

    let html = '';
    vehicles.forEach(v => {
        const checked = selectedVehicles.has(v.id) ? 'checked' : '';
        const selectedClass = selectedVehicles.has(v.id) ? 'selected' : '';
        const openFaults = v.faults.filter(f => !f.resolved).length;
        const meta = openFaults > 0 ? `${openFaults} תקלות פתוחות` : 'תקין';
        html += `<div class="participant-item ${selectedClass}" onclick="toggleVehicleParticipant('${v.id}')">
            <input type="checkbox" ${checked} onclick="event.stopPropagation(); toggleVehicleParticipant('${v.id}')">
            <div class="participant-info">
                <span class="name">${escapeHtml(v.name)}</span>
                <span class="meta">${escapeHtml(meta)}</span>
            </div>
        </div>`;
    });

    container.innerHTML = html;
    updateSelectedCount();
}

function toggleParticipant(personId, element) {
    if (selectedParticipants.has(personId)) {
        selectedParticipants.delete(personId);
    } else {
        selectedParticipants.add(personId);
    }
    renderActivityParticipants();
    renderActivityVehicles();
}

function toggleVehicleParticipant(vehicleId) {
    if (selectedVehicles.has(vehicleId)) {
        selectedVehicles.delete(vehicleId);
    } else {
        selectedVehicles.add(vehicleId);
    }
    renderActivityVehicles();
    renderActivityParticipants();
}

function selectAllFiltered() {
    const filtered = getActivityFilteredPersonnel();
    filtered.forEach(p => selectedParticipants.add(p.id));
    renderActivityParticipants();
}

function deselectAllFiltered() {
    const filtered = getActivityFilteredPersonnel();
    filtered.forEach(p => selectedParticipants.delete(p.id));
    renderActivityParticipants();
}

function filterActivityParticipants() {
    renderActivityParticipants();
}

function updateSelectedCount() {
    const total = selectedParticipants.size + selectedVehicles.size;
    document.getElementById('selectedCount').textContent = `${total} נבחרו`;
}

function _getActivityTotals(activity) {
    const pCount = activity.participants.length;
    const vCount = (activity.vehicleParticipants || []).length;
    const pDone = activity.participants.filter(p => p.completed).length;
    const vDone = (activity.vehicleParticipants || []).filter(v => v.completed).length;
    const total = pCount + vCount;
    const completed = pDone + vDone;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, percent, pCount, vCount };
}

function saveActivity() {
    const name = document.getElementById('activityName').value.trim();
    if (!name) {
        showToast('יש להזין שם פעילות');
        return;
    }
    if (selectedParticipants.size === 0 && selectedVehicles.size === 0) {
        showToast('יש לבחור לפחות משתתף או כלי אחד');
        return;
    }

    if (_editingActivityId) {
        const activity = state.activities.find(a => a.id === _editingActivityId);
        if (!activity) return;

        activity.name = name;
        activity.description = document.getElementById('activityDescription').value.trim();
        activity.deadline = document.getElementById('activityDeadline').value;

        // Personnel - preserve completion status
        const existingMap = {};
        activity.participants.forEach(p => { existingMap[p.personId] = p; });
        activity.participants = Array.from(selectedParticipants).map(id => {
            if (existingMap[id]) return existingMap[id];
            return { personId: id, completed: false, completedAt: null };
        });

        // Vehicles - preserve completion status
        const existingVMap = {};
        (activity.vehicleParticipants || []).forEach(v => { existingVMap[v.vehicleId] = v; });
        activity.vehicleParticipants = Array.from(selectedVehicles).map(id => {
            if (existingVMap[id]) return existingVMap[id];
            return { vehicleId: id, completed: false, completedAt: null };
        });

        _editingActivityId = null;
        selectedParticipants = new Set();
        selectedVehicles = new Set();
        saveState();
        renderActivities();
        closeModal('newActivityModal');
        showToast('פעילות עודכנה בהצלחה');
    } else {
        const activity = {
            id: generateId(),
            name,
            description: document.getElementById('activityDescription').value.trim(),
            deadline: document.getElementById('activityDeadline').value,
            createdAt: new Date().toISOString(),
            participants: Array.from(selectedParticipants).map(id => ({
                personId: id, completed: false, completedAt: null
            })),
            vehicleParticipants: Array.from(selectedVehicles).map(id => ({
                vehicleId: id, completed: false, completedAt: null
            }))
        };

        state.activities.push(activity);
        selectedParticipants = new Set();
        selectedVehicles = new Set();
        saveState();
        renderActivities();
        closeModal('newActivityModal');
        showToast('פעילות נוצרה בהצלחה');
    }
}

function createActivity() { saveActivity(); }

function renderActivities() {
    const container = document.getElementById('activitiesList');

    if (state.activities.length === 0) {
        container.innerHTML = `<div class="no-data">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
            </svg>
            <p>אין פעילויות עדיין</p>
        </div>`;
        return;
    }

    let html = '';
    [...state.activities].reverse().forEach(activity => {
        const { total, completed, percent, pCount, vCount } = _getActivityTotals(activity);
        const isOverdue = activity.deadline && percent < 100 && new Date(activity.deadline) < new Date();
        const statusClass = percent === 100 ? 'completed' : isOverdue ? 'overdue' : 'in-progress';
        const statusText = percent === 100 ? 'הושלמה' : isOverdue ? 'באיחור' : 'בתהליך';
        const cardClass = isOverdue ? 'activity-card activity-overdue' : 'activity-card';

        const metaParts = [];
        if (pCount > 0) metaParts.push(`👥 ${pCount} אנשים`);
        if (vCount > 0) metaParts.push(`🚗 ${vCount} כלים`);
        metaParts.push(`✅ ${completed} השלימו`);

        html += `<div class="${cardClass}" onclick="openActivityDetail('${activity.id}')">
            <div class="activity-card-header">
                <h3>${escapeHtml(activity.name)}</h3>
                <span class="activity-status ${statusClass}">${statusText}</span>
            </div>
            ${activity.description ? `<p class="activity-card-desc">${escapeHtml(activity.description)}</p>` : ''}
            <div class="activity-card-meta">
                ${metaParts.map(m => `<span>${m}</span>`).join('')}
                ${activity.deadline ? `<span>${isOverdue ? '⚠️' : '📅'} ${formatDate(activity.deadline)}</span>` : ''}
                <span>🕐 ${formatDate(activity.createdAt)}</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${percent}%"></div>
            </div>
        </div>`;
    });

    container.innerHTML = html;
}

// ==================== Activity Detail ====================
function openActivityDetail(activityId) {
    const activity = state.activities.find(a => a.id === activityId);
    if (!activity) return;

    state.currentActivityId = activityId;

    document.getElementById('activityDetailTitle').textContent = activity.name;
    document.getElementById('activityDetailDesc').textContent = activity.description || 'אין תיאור';
    document.getElementById('activityDetailDeadline').textContent = activity.deadline ? `תאריך יעד: ${formatDate(activity.deadline)}` : '';
    document.getElementById('activityDetailCreated').textContent = `נוצרה: ${formatDate(activity.createdAt)}`;

    document.getElementById('detailSearchInput').value = '';
    document.getElementById('detailFilterStatus').value = '';

    const isAdmin = state.accessLevel === 'admin';
    const editBtn = document.getElementById('editActivityBtn');
    if (editBtn) editBtn.style.display = isAdmin ? '' : 'none';
    const deleteBtn = document.querySelector('#activityDetailModal .btn-danger');
    if (deleteBtn) deleteBtn.style.display = isAdmin ? '' : 'none';

    updateActivityProgress(activity);
    renderDetailParticipants(activity);
    openModal('activityDetailModal');
}

function updateActivityProgress(activity) {
    const { total, completed, percent } = _getActivityTotals(activity);
    document.getElementById('activityProgressText').textContent = `${percent}%`;
    document.getElementById('activityProgressBar').style.width = `${percent}%`;
    document.getElementById('activityCompletedCount').textContent = `${completed} השלימו`;
    document.getElementById('activityRemainingCount').textContent = `${total - completed} נותרו`;
}

function renderDetailParticipants(activity) {
    if (!activity) {
        activity = state.activities.find(a => a.id === state.currentActivityId);
    }
    if (!activity) return;

    const searchTerm = document.getElementById('detailSearchInput').value.toLowerCase();
    const statusFilter = document.getElementById('detailFilterStatus').value;

    const container = document.getElementById('detailParticipantsList');
    let html = '';

    const dConfig = getColumnConfig();
    const dPrimaryCol = dConfig.find(c => c.isPrimary) || dConfig[0];
    const dMetaCols = dConfig.filter(c => !c.isPrimary).slice(0, 3);

    // Personnel participants
    activity.participants.forEach((participant, idx) => {
        const person = state.personnel.find(p => p.id === participant.personId);
        if (!person) return;

        const personName = person[dPrimaryCol.key] || '';
        if (searchTerm && !personName.toLowerCase().includes(searchTerm)) return;
        if (statusFilter === 'completed' && !participant.completed) return;
        if (statusFilter === 'pending' && participant.completed) return;

        const checked = participant.completed ? 'checked' : '';
        const completedClass = participant.completed ? 'completed-row' : '';
        const isAdmin = state.accessLevel === 'admin';
        const detailMeta = dMetaCols.map(c => person[c.key] || '').filter(Boolean).join(' | ');

        html += `<div class="detail-participant ${completedClass}">
            <div class="checkbox-wrap">
                <input type="checkbox" ${checked} ${isAdmin ? '' : 'disabled'}
                    onchange="toggleCompletion('${activity.id}', ${idx}, this.checked)">
            </div>
            <span class="p-name">${escapeHtml(personName)}</span>
            <span class="p-meta">${escapeHtml(detailMeta)}</span>
        </div>`;
    });

    // Vehicle participants
    const vParticipants = activity.vehicleParticipants || [];
    if (vParticipants.length > 0) {
        // Check if we should show the vehicles section based on filter
        const filteredVehicles = vParticipants.filter((vp, idx) => {
            const vehicle = state.faultRecords.find(v => v.id === vp.vehicleId);
            if (!vehicle) return false;
            if (searchTerm && !vehicle.name.toLowerCase().includes(searchTerm)) return false;
            if (statusFilter === 'completed' && !vp.completed) return false;
            if (statusFilter === 'pending' && vp.completed) return false;
            return true;
        });

        if (filteredVehicles.length > 0) {
            html += `<div class="detail-section-divider">כלים</div>`;
            vParticipants.forEach((vp, idx) => {
                const vehicle = state.faultRecords.find(v => v.id === vp.vehicleId);
                if (!vehicle) return;
                if (searchTerm && !vehicle.name.toLowerCase().includes(searchTerm)) return;
                if (statusFilter === 'completed' && !vp.completed) return;
                if (statusFilter === 'pending' && vp.completed) return;

                const checked = vp.completed ? 'checked' : '';
                const completedClass = vp.completed ? 'completed-row' : '';
                const isAdmin = state.accessLevel === 'admin';
                const openFaults = vehicle.faults.filter(f => !f.resolved).length;
                const meta = openFaults > 0 ? `${openFaults} תקלות פתוחות` : 'תקין';

                html += `<div class="detail-participant ${completedClass} vehicle-participant">
                    <div class="checkbox-wrap">
                        <input type="checkbox" ${checked} ${isAdmin ? '' : 'disabled'}
                            onchange="toggleVehicleCompletion('${activity.id}', ${idx}, this.checked)">
                    </div>
                    <span class="p-name">🚗 ${escapeHtml(vehicle.name)}</span>
                    <span class="p-meta">${escapeHtml(meta)}</span>
                </div>`;
            });
        }
    }

    container.innerHTML = html || '<div style="padding:20px;text-align:center;color:var(--text-muted)">לא נמצאו משתתפים</div>';
}

function filterDetailParticipants() {
    renderDetailParticipants();
}

function toggleCompletion(activityId, participantIdx, completed) {
    const activity = state.activities.find(a => a.id === activityId);
    if (!activity) return;

    activity.participants[participantIdx].completed = completed;
    activity.participants[participantIdx].completedAt = completed ? new Date().toISOString() : null;

    saveState();
    updateActivityProgress(activity);
    renderDetailParticipants(activity);
    renderActivities();
}

function toggleVehicleCompletion(activityId, vehicleIdx, completed) {
    const activity = state.activities.find(a => a.id === activityId);
    if (!activity || !activity.vehicleParticipants) return;

    activity.vehicleParticipants[vehicleIdx].completed = completed;
    activity.vehicleParticipants[vehicleIdx].completedAt = completed ? new Date().toISOString() : null;

    saveState();
    updateActivityProgress(activity);
    renderDetailParticipants(activity);
    renderActivities();
}

function deleteCurrentActivity() {
    if (state.accessLevel !== 'admin') return;
    if (!confirm('למחוק את הפעילות?')) return;

    state.activities = state.activities.filter(a => a.id !== state.currentActivityId);
    saveState();
    renderActivities();
    closeModal('activityDetailModal');
    showToast('פעילות נמחקה');
}

// ==================== Activities PDF Export ====================
async function exportActivitiesPDF() {
    if (state.activities.length === 0) {
        showToast('אין פעילויות לייצוא');
        return;
    }

    const config = getColumnConfig();
    const primaryCol = config.find(c => c.isPrimary) || config[0];

    try {
        showToast('מייצר PDF...');
        const fontBase64 = await _loadHebrewFont();
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ orientation: 'landscape' });

        doc.addFileToVFS('Rubik-Regular.ttf', fontBase64);
        doc.addFont('Rubik-Regular.ttf', 'Rubik', 'normal');
        doc.setFont('Rubik');
        const pageW = doc.internal.pageSize.getWidth();

        // Title — all doc.text() must use _reverseHebrew (jsPDF has no BiDi)
        doc.setFontSize(18);
        doc.text(_reverseHebrew('דוח פעילויות'), pageW / 2, 15, { align: 'center' });
        const d = new Date();
        const dateStr = d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();
        doc.setFontSize(12);
        doc.text(dateStr, pageW / 2, 22, { align: 'center' });

        let currentY = 30;

        state.activities.forEach(act => {
            const { total, completed, percent, pCount, vCount } = _getActivityTotals(act);
            const statusText = percent === 100 ? 'הושלמה' : 'בתהליך';

            // Activity info as autoTable (avoids doc.text BiDi issues with mixed Hebrew+numbers)
            const infoHead = [[
                _reverseHebrew('תאריך יעד'),
                _reverseHebrew('התקדמות'),
                _reverseHebrew('סטטוס'),
                _reverseHebrew('תיאור'),
                _reverseHebrew('פעילות')
            ]];
            const infoRow = [[
                act.deadline ? pdfDate(act.deadline) : '-',
                percent + '%',
                _reverseHebrew(statusText),
                _reverseHebrew(act.description || '-'),
                _reverseHebrew(act.name)
            ]];

            doc.autoTable({
                head: infoHead,
                body: infoRow,
                startY: currentY,
                styles: { halign: 'center', fontSize: 11, font: 'Rubik' },
                headStyles: { fillColor: [79, 140, 255], font: 'Rubik' }
            });

            currentY = doc.lastAutoTable.finalY + 5;

            // Participants table
            const rows = [];
            act.participants.forEach(p => {
                const person = state.personnel.find(per => per.id === p.personId);
                rows.push([
                    pdfDate(p.completedAt),
                    p.completed ? _reverseHebrew('השלים') : _reverseHebrew('טרם השלים'),
                    _reverseHebrew(person ? person[primaryCol.key] : 'לא נמצא'),
                    _reverseHebrew('כוח אדם')
                ]);
            });
            (act.vehicleParticipants || []).forEach(vp => {
                const vehicle = (state.faultRecords || []).find(v => v.id === vp.vehicleId);
                rows.push([
                    pdfDate(vp.completedAt),
                    vp.completed ? _reverseHebrew('השלים') : _reverseHebrew('טרם השלים'),
                    _reverseHebrew(vehicle ? vehicle.name : 'לא נמצא'),
                    _reverseHebrew('כלי')
                ]);
            });

            const head = [[
                _reverseHebrew('תאריך השלמה'),
                _reverseHebrew('סטטוס'),
                _reverseHebrew('משתתף'),
                _reverseHebrew('סוג')
            ]];

            doc.autoTable({
                head,
                body: rows,
                startY: currentY,
                styles: { halign: 'center', fontSize: 10, font: 'Rubik' },
                headStyles: { fillColor: [100, 116, 139], font: 'Rubik' }
            });

            currentY = doc.lastAutoTable.finalY + 15;

            // New page if running low on space
            if (currentY > doc.internal.pageSize.getHeight() - 30) {
                doc.addPage();
                currentY = 20;
            }
        });

        doc.save(`פעילויות_${dateStr}.pdf`);
        showToast('קובץ PDF יוצא בהצלחה');
    } catch (err) {
        console.error('PDF export error:', err);
        showToast('שגיאה בייצוא PDF');
    }
}
