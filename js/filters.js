// ==================== Filters ====================
function populateFilters() {
    const config = isViewingSnapshot() ? getActiveColumnConfig() : getColumnConfig();
    const filterColumns = config.filter(c => c.isFilter);
    const activePersonnel = getActivePersonnel();

    // Build main filters container
    const mainContainer = document.getElementById('filtersContainer');
    let mainHtml = '<div class="filter-group"><input type="text" id="searchInput" placeholder="חיפוש חופשי..." oninput="applyFilters()"></div>';
    filterColumns.forEach(col => {
        const values = [...new Set(activePersonnel.map(p => p[col.key]).filter(Boolean))].sort();
        mainHtml += `<div class="filter-group"><select id="filter_${col.key}" onchange="applyFilters()">`;
        mainHtml += `<option value="">כל ${col.label}</option>`;
        values.forEach(v => { mainHtml += `<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`; });
        mainHtml += `</select></div>`;
    });
    mainHtml += '<button class="btn btn-ghost" onclick="clearFilters()">נקה סינון</button>';
    mainHtml += '<span id="personnelCount" class="count-badge"></span>';
    mainContainer.innerHTML = mainHtml;

    // Build activity modal filters container
    const actContainer = document.getElementById('actFiltersContainer');
    let actHtml = '<div class="filter-group"><input type="text" id="actSearchInput" placeholder="חיפוש..." oninput="filterActivityParticipants()"></div>';
    filterColumns.forEach(col => {
        const values = [...new Set(state.personnel.map(p => p[col.key]).filter(Boolean))].sort();
        actHtml += `<div class="filter-group"><select id="actFilter_${col.key}" onchange="filterActivityParticipants()">`;
        actHtml += `<option value="">כל ${col.label}</option>`;
        values.forEach(v => { actHtml += `<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`; });
        actHtml += `</select></div>`;
    });
    actContainer.innerHTML = actHtml;
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
