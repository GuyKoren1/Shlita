// ==================== Dashboard ====================
let _groupChart = null;
let _activityChart = null;

function updateDashboard() {
    document.getElementById('totalPersonnel').textContent = state.personnel.length;
    document.getElementById('totalActivities').textContent = state.activities.length;

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
    const groups = [...new Set(state.personnel.map(p => p[groupCol.key]).filter(Boolean))];
    document.getElementById('totalTeams').textContent = groups.length;
    document.getElementById('teamsLabel').textContent = groupCol.label;

    // Avg completion
    if (state.activities.length > 0) {
        const totalPercent = state.activities.reduce((sum, act) => {
            const total = act.participants.length;
            const completed = act.participants.filter(p => p.completed).length;
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
        let html = '';
        [...state.activities].reverse().slice(0, 5).forEach(act => {
            const total = act.participants.length;
            const completed = act.participants.filter(p => p.completed).length;
            const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
            html += `<div class="activity-mini">
                <span class="activity-mini-name">${escapeHtml(act.name)}</span>
                <div class="activity-mini-progress">
                    <div class="mini-bar"><div class="mini-fill" style="width:${percent}%"></div></div>
                    <span>${percent}%</span>
                </div>
            </div>`;
        });
        recentContainer.innerHTML = html;
    }

    // Group breakdown
    const teamContainer = document.getElementById('teamBreakdown');
    const groupCounts = {};
    state.personnel.forEach(p => {
        const val = p[groupCol.key];
        if (val) {
            groupCounts[val] = (groupCounts[val] || 0) + 1;
        }
    });
    let teamHtml = '';
    const sortedGroups = Object.entries(groupCounts).sort((a, b) => b[1] - a[1]);
    sortedGroups.forEach(([group, count]) => {
        teamHtml += `<div class="team-card">
            <div class="team-name">${escapeHtml(group)}</div>
            <div class="team-count">${count} אנשים</div>
        </div>`;
    });
    teamContainer.innerHTML = teamHtml || '<p style="color:var(--text-muted)">אין נתונים</p>';

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
        const total = a.participants.length;
        const done = a.participants.filter(p => p.completed).length;
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
