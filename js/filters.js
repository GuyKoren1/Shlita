// ==================== Filters ====================
function populateFilters() {
    const config = isViewingSnapshot() ? getActiveColumnConfig() : getColumnConfig();
    const filterColumns = config.filter(c => c.isFilter);
    const activePersonnel = getActivePersonnel();

    // Build main filters container
    const mainContainer = document.getElementById('filtersContainer');
    const m = ['<div class="filter-group"><input type="text" id="searchInput" placeholder="חיפוש חופשי..." oninput="applyFilters()"></div>'];
    filterColumns.forEach(col => {
        const values = [...new Set(activePersonnel.map(p => p[col.key]).filter(Boolean))].sort();
        m.push(`<div class="filter-group"><select id="filter_${col.key}" onchange="applyFilters()">`);
        m.push(`<option value="">כל ${col.label}</option>`);
        values.forEach(v => { m.push(`<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`); });
        m.push(`</select></div>`);
    });
    m.push('<button class="btn btn-ghost" onclick="clearFilters()">נקה סינון</button>');
    m.push('<span id="personnelCount" class="count-badge"></span>');
    mainContainer.innerHTML = m.join('');

    // Build activity modal filters container
    const actContainer = document.getElementById('actFiltersContainer');
    const a = ['<div class="filter-group"><input type="text" id="actSearchInput" placeholder="חיפוש..." oninput="filterActivityParticipants()"></div>'];
    filterColumns.forEach(col => {
        const values = [...new Set(state.personnel.map(p => p[col.key]).filter(Boolean))].sort();
        a.push(`<div class="filter-group"><select id="actFilter_${col.key}" onchange="filterActivityParticipants()">`);
        a.push(`<option value="">כל ${col.label}</option>`);
        values.forEach(v => { a.push(`<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`); });
        a.push(`</select></div>`);
    });
    actContainer.innerHTML = a.join('');
}

function getFilteredPersonnel() {
    const searchEl = document.getElementById('searchInput');
    const search = searchEl ? searchEl.value.toLowerCase() : '';
    const config = isViewingSnapshot() ? getActiveColumnConfig() : getColumnConfig();
    const filterColumns = config.filter(c => c.isFilter);

    // Collect active filter values
    const activeFilters = [];
    filterColumns.forEach(col => {
        const el = document.getElementById('filter_' + col.key);
        if (el && el.value) activeFilters.push({ key: col.key, value: el.value });
    });

    return getActivePersonnel().filter(p => {
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

function applyFilters() {
    renderPersonnelTable();
}

function clearFilters() {
    const searchEl = document.getElementById('searchInput');
    if (searchEl) searchEl.value = '';
    const config = getColumnConfig();
    config.filter(c => c.isFilter).forEach(col => {
        const el = document.getElementById('filter_' + col.key);
        if (el) el.value = '';
    });
    renderPersonnelTable();
}
