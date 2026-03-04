// ==================== Dashboard ====================
let _groupChart = null;
let _activityChart = null;

function _populateDashboardFilters() {
    const container = document.getElementById('dashboardFilters');
    if (!container) return;
    const config = getColumnConfig();
    const filterColumns = config.filter(c => c.isFilter);
    const f = ['<div class="filter-group"><input type="text" id="dashSearchInput" placeholder="חיפוש חופשי..." oninput="updateDashboard()"></div>'];
    filterColumns.forEach(col => {
        const values = [...new Set(state.personnel.map(p => p[col.key]).filter(Boolean))].sort();
        f.push(`<div class="filter-group"><select id="dashFilter_${col.key}" onchange="updateDashboard()">`);
        f.push(`<option value="">כל ${col.label}</option>`);
        values.forEach(v => { f.push(`<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`); });
        f.push('</select></div>');
    });
    f.push('<button class="btn btn-ghost" onclick="clearDashboardFilters()">נקה סינון</button>');
    container.innerHTML = f.join('');
}

function _getDashboardFilteredPersonnel() {
    const config = getColumnConfig();
    const filterColumns = config.filter(c => c.isFilter);
    const searchEl = document.getElementById('dashSearchInput');
    const search = searchEl ? searchEl.value.toLowerCase() : '';
    const activeFilters = [];
    filterColumns.forEach(col => {
        const el = document.getElementById('dashFilter_' + col.key);
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

function clearDashboardFilters() {
    const searchEl = document.getElementById('dashSearchInput');
    if (searchEl) searchEl.value = '';
    const config = getColumnConfig();
    config.filter(c => c.isFilter).forEach(col => {
        const el = document.getElementById('dashFilter_' + col.key);
        if (el) el.value = '';
    });
    updateDashboard();
}

function updateDashboard() {
    // Build filters on first render (check if already populated)
    const filtersContainer = document.getElementById('dashboardFilters');
    if (filtersContainer && filtersContainer.children.length === 0) {
        _populateDashboardFilters();
    }

    const filteredPersonnel = _getDashboardFilteredPersonnel();
    const filteredIds = new Set(filteredPersonnel.map(p => p.id));

    document.getElementById('totalPersonnel').textContent = filteredPersonnel.length;
    document.getElementById('totalActivities').textContent = state.activities.length;

    // Fault stats
    const allFaults = state.faultRecords.flatMap(v => v.faults);
    const openFaults = allFaults.filter(f => !f.resolved).length;
    const criticalFaults = allFaults.filter(f => !f.resolved && f.critical).length;
    document.getElementById('totalOpenFaults').textContent = openFaults;
    document.getElementById('totalCriticalFaults').textContent = criticalFaults;
    const faultCritEl = document.getElementById('totalCriticalFaults');
    faultCritEl.style.color = criticalFaults > 0 ? 'var(--danger)' : '';

    const dashConfig = getColumnConfig();
    const filterCols = dashConfig.filter(c => c.isFilter);

    // Populate group-by dropdown
    const dropdown = document.getElementById('dashboardGroupBy');
    const prevValue = dropdown.value;
    dropdown.innerHTML = filterCols.map(c =>
        `<option value="${c.key}"${c.key === prevValue ? ' selected' : ''}>${c.label}</option>`
    ).join('');
    if (!prevValue && filterCols.length > 0) {
        dropdown.value = filterCols[0].key;
    }

    const selectedKey = dropdown.value;
    const groupCol = filterCols.find(c => c.key === selectedKey) || filterCols[0] || dashConfig[0];
    const groups = [...new Set(filteredPersonnel.map(p => p[groupCol.key]).filter(Boolean))];
    document.getElementById('totalTeams').textContent = groups.length;
    document.getElementById('teamsLabel').textContent = groupCol.label;

    // Avg completion (personnel + vehicles)
    if (state.activities.length > 0) {
        const totalPercent = state.activities.reduce((sum, act) => {
            const pTotal = act.participants.length;
            const pDone = act.participants.filter(p => p.completed).length;
            const vTotal = (act.vehicleParticipants || []).length;
            const vDone = (act.vehicleParticipants || []).filter(p => p.completed).length;
            const total = pTotal + vTotal;
            const completed = pDone + vDone;
            return sum + (total > 0 ? (completed / total) * 100 : 0);
        }, 0);
        document.getElementById('avgCompletion').textContent = Math.round(totalPercent / state.activities.length) + '%';
    } else {
        document.getElementById('avgCompletion').textContent = '0%';
    }

    // Recent activities
    const recentContainer = document.getElementById('recentActivities');
    if (state.activities.length === 0) {
        recentContainer.innerHTML = '<p style="color:var(--text-muted);padding:12px">אין פעילויות</p>';
    } else {
        const rp = [];
        [...state.activities].reverse().slice(0, 5).forEach(act => {
            const pTotal = act.participants.length;
            const pDone = act.participants.filter(p => p.completed).length;
            const vTotal = (act.vehicleParticipants || []).length;
            const vDone = (act.vehicleParticipants || []).filter(p => p.completed).length;
            const total = pTotal + vTotal;
            const completed = pDone + vDone;
            const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
            rp.push(`<div class="activity-mini">
                <span class="activity-mini-name">${escapeHtml(act.name)}</span>
                <div class="activity-mini-progress">
                    <div class="mini-bar"><div class="mini-fill" style="width:${percent}%"></div></div>
                    <span>${completed}/${total} (${percent}%)</span>
                </div>
            </div>`);
        });
        recentContainer.innerHTML = rp.join('');
    }

    // Group breakdown
    const teamContainer = document.getElementById('teamBreakdown');
    const groupCounts = {};
    filteredPersonnel.forEach(p => {
        const val = p[groupCol.key];
        if (val) {
            groupCounts[val] = (groupCounts[val] || 0) + 1;
        }
    });
    const sortedGroups = Object.entries(groupCounts).sort((a, b) => b[1] - a[1]);
    const tp = sortedGroups.map(([group, count]) => `<div class="team-card">
            <div class="team-name">${escapeHtml(group)}</div>
            <div class="team-count">${count} אנשים</div>
        </div>`);
    teamContainer.innerHTML = tp.length ? tp.join('') : '<p style="color:var(--text-muted)">אין נתונים</p>';

    // --- Chart.js Charts ---
    renderGroupChart(sortedGroups, groupCol.label);
    renderActivityChart();
}

function renderGroupChart(sortedGroups, label) {
    const ctx = document.getElementById('groupChart');
    if (!ctx) return;

    if (_groupChart) _groupChart.destroy();

    const labels = sortedGroups.map(g => g[0]);
    const data = sortedGroups.map(g => g[1]);
    const colors = generateChartColors(labels.length);

    _groupChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels,
            datasets: [{
                data,
                backgroundColor: colors,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    rtl: true,
                    labels: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim() || '#e4e4e7',
                        font: { family: 'inherit', size: 12 },
                        padding: 12
                    }
                },
                title: {
                    display: true,
                    text: `חלוקה לפי ${label}`,
                    color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim() || '#e4e4e7',
                    font: { family: 'inherit', size: 14, weight: '600' }
                }
            }
        }
    });
}

function renderActivityChart() {
    const ctx = document.getElementById('activityChart');
    if (!ctx) return;

    if (_activityChart) _activityChart.destroy();

    const recent = [...state.activities].reverse().slice(0, 7);
    if (recent.length === 0) {
        _activityChart = null;
        return;
    }

    const labels = recent.map(a => a.name.length > 20 ? a.name.slice(0, 20) + '...' : a.name);
    const completedData = recent.map(a => {
        const pTotal = a.participants.length;
        const pDone = a.participants.filter(p => p.completed).length;
        const vTotal = (a.vehicleParticipants || []).length;
        const vDone = (a.vehicleParticipants || []).filter(p => p.completed).length;
        const total = pTotal + vTotal;
        const done = pDone + vDone;
        return total > 0 ? Math.round((done / total) * 100) : 0;
    });

    const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim() || '#e4e4e7';
    const borderColor = getComputedStyle(document.documentElement).getPropertyValue('--border').trim() || '#27272a';

    _activityChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: '% השלמה',
                data: completedData,
                backgroundColor: completedData.map(v => v === 100 ? '#22c55e' : '#3b82f6'),
                borderRadius: 6,
                barPercentage: 0.6
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    min: 0,
                    max: 100,
                    ticks: { color: textColor, callback: v => v + '%' },
                    grid: { color: borderColor }
                },
                y: {
                    ticks: { color: textColor, font: { size: 11 } },
                    grid: { display: false }
                }
            },
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'התקדמות פעילויות אחרונות',
                    color: textColor,
                    font: { family: 'inherit', size: 14, weight: '600' }
                }
            }
        }
    });
}

function generateChartColors(count) {
    const palette = [
        '#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6',
        '#ec4899', '#06b6d4', '#f97316', '#14b8a6', '#6366f1',
        '#84cc16', '#e11d48', '#0891b2', '#a855f7', '#d946ef'
    ];
    const colors = [];
    for (let i = 0; i < count; i++) {
        colors.push(palette[i % palette.length]);
    }
    return colors;
}
