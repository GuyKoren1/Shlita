// ==================== Activities ====================
function openNewActivityModal() {
    if (state.accessLevel !== 'admin') {
        showToast('אין הרשאה לביצוע פעולה זו');
        return;
    }
    document.getElementById('activityName').value = '';
    document.getElementById('activityDescription').value = '';
    document.getElementById('activityDeadline').value = '';

    // Reset dynamic filters
    const actSearch = document.getElementById('actSearchInput');
    if (actSearch) actSearch.value = '';
    getColumnConfig().filter(c => c.isFilter).forEach(col => {
        const el = document.getElementById('actFilter_' + col.key);
        if (el) el.value = '';
    });

    renderActivityParticipants();
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

// Track selected participants using a Set of person IDs
let selectedParticipants = new Set();

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

function toggleParticipant(personId, element) {
    if (selectedParticipants.has(personId)) {
        selectedParticipants.delete(personId);
    } else {
        selectedParticipants.add(personId);
    }
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
    document.getElementById('selectedCount').textContent = `${selectedParticipants.size} נבחרו`;
}

function createActivity() {
    const name = document.getElementById('activityName').value.trim();
    if (!name) {
        showToast('יש להזין שם פעילות');
        return;
    }
    if (selectedParticipants.size === 0) {
        showToast('יש לבחור לפחות משתתף אחד');
        return;
    }

    const activity = {
        id: generateId(),
        name,
        description: document.getElementById('activityDescription').value.trim(),
        deadline: document.getElementById('activityDeadline').value,
        createdAt: new Date().toISOString(),
        participants: Array.from(selectedParticipants).map(id => ({
            personId: id,
            completed: false,
            completedAt: null
        }))
    };

    state.activities.push(activity);
    selectedParticipants = new Set();
    saveState();
    renderActivities();
    closeModal('newActivityModal');
    showToast('פעילות נוצרה בהצלחה');
}

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
    // Show newest first
    [...state.activities].reverse().forEach(activity => {
        const total = activity.participants.length;
        const completed = activity.participants.filter(p => p.completed).length;
        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
        const statusClass = percent === 100 ? 'completed' : 'in-progress';
        const statusText = percent === 100 ? 'הושלמה' : 'בתהליך';

        html += `<div class="activity-card" onclick="openActivityDetail('${activity.id}')">
            <div class="activity-card-header">
                <h3>${escapeHtml(activity.name)}</h3>
                <span class="activity-status ${statusClass}">${statusText}</span>
            </div>
            ${activity.description ? `<p class="activity-card-desc">${escapeHtml(activity.description)}</p>` : ''}
            <div class="activity-card-meta">
                <span>👥 ${total} משתתפים</span>
                <span>✅ ${completed} השלימו</span>
                ${activity.deadline ? `<span>📅 ${formatDate(activity.deadline)}</span>` : ''}
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

    updateActivityProgress(activity);
    renderDetailParticipants(activity);
    openModal('activityDetailModal');
}

function updateActivityProgress(activity) {
    const total = activity.participants.length;
    const completed = activity.participants.filter(p => p.completed).length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

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

    activity.participants.forEach((participant, idx) => {
        const person = state.personnel.find(p => p.id === participant.personId);
        if (!person) return;

        const personName = person[dPrimaryCol.key] || '';
        // Filter
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

function deleteCurrentActivity() {
    if (state.accessLevel !== 'admin') return;
    if (!confirm('למחוק את הפעילות?')) return;

    state.activities = state.activities.filter(a => a.id !== state.currentActivityId);
    saveState();
    renderActivities();
    closeModal('activityDetailModal');
    showToast('פעילות נמחקה');
}
