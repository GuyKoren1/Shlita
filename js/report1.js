// ==================== Report 1 - Attendance Tracking ====================
let _report1ActiveTab = 'entry';

function renderReport1() {
    if (_report1ActiveTab === 'entry') {
        renderReport1Entry();
    } else {
        renderReport1View();
    }
}

function switchReport1Tab(tab) {
    _report1ActiveTab = tab;
    document.getElementById('r1TabEntry').classList.toggle('active', tab === 'entry');
    document.getElementById('r1TabView').classList.toggle('active', tab === 'view');
    document.getElementById('report1EntryTab').classList.toggle('hidden', tab !== 'entry');
    document.getElementById('report1ViewTab').classList.toggle('hidden', tab !== 'view');
    renderReport1();
}

function _toLocalDateStr(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

function _getReport1DateRange() {
    const start = state.report1.startDate;
    if (!start) return [];
    const startDate = new Date(start + 'T12:00:00');
    const today = new Date();
    today.setHours(12, 0, 0, 0);
    const dates = [];
    const d = new Date(startDate);
    while (d <= today) {
        dates.push(_toLocalDateStr(d));
        d.setDate(d.getDate() + 1);
    }
    return dates;
}

function _formatShortDate(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    const day = d.getDate();
    const month = d.getMonth() + 1;
    return day + '/' + month;
}

function _getDayName(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    const days = ['א\'', 'ב\'', 'ג\'', 'ד\'', 'ה\'', 'ו\'', 'ש\''];
    return days[d.getDay()];
}

function renderReport1Entry() {
    const dates = _getReport1DateRange();
    const config = getColumnConfig();
    const primaryCol = config.find(c => c.isPrimary) || config[0];
    const isAdmin = state.accessLevel === 'admin';

    // Set date picker value
    const datePicker = document.getElementById('report1StartDate');
    if (datePicker) {
        datePicker.value = state.report1.startDate || '';
        datePicker.disabled = !isAdmin;
    }

    // Show/hide import button for admins
    const importBtn = document.getElementById('r1ImportBtn');
    if (importBtn) importBtn.style.display = isAdmin ? '' : 'none';

    const head = document.getElementById('report1EntryHead');
    const body = document.getElementById('report1EntryBody');

    // Header row
    const hp = ['<tr><th class="r1-name-col">שם</th>'];
    dates.forEach(dateStr => {
        const isShabbat = new Date(dateStr + 'T00:00:00').getDay() === 6;
        hp.push(`<th class="r1-date-col${isShabbat ? ' r1-shabbat' : ''}">${_formatShortDate(dateStr)}<br><span class="r1-day-name">${_getDayName(dateStr)}</span></th>`);
    });
    hp.push('<th class="r1-excluded-col">לא רלוונטי</th></tr>');
    head.innerHTML = hp.join('');

    // Body rows
    const personnel = state.personnel;
    const bp = [];
    personnel.forEach(person => {
        const isExcluded = state.report1.excluded.includes(person.id);
        const rowClass = isExcluded ? 'r1-excluded' : '';
        const name = escapeHtml(person[primaryCol.key] || person.name || '');
        bp.push(`<tr class="${rowClass}">`);
        bp.push(`<td class="r1-name-col">${name}</td>`);
        dates.forEach(dateStr => {
            const val = (state.report1.entries[person.id] || {})[dateStr] || '';
            let cellContent = '';
            let cellClass = 'r1-cell';
            if (val === 'home') { cellContent = '\u{1F3E0}'; cellClass += ' r1-home'; }
            else if (val === 'base') { cellContent = '\u{1F3DB}\uFE0F'; cellClass += ' r1-base'; }
            const isShabbat = new Date(dateStr + 'T00:00:00').getDay() === 6;
            if (isShabbat) cellClass += ' r1-shabbat';
            const onclick = isAdmin ? `onclick="cycleReport1Cell('${person.id}','${dateStr}')"` : '';
            bp.push(`<td class="${cellClass}" ${onclick}>${cellContent}</td>`);
        });
        // Excluded checkbox
        const checkedAttr = isExcluded ? 'checked' : '';
        const disabledAttr = !isAdmin ? 'disabled' : '';
        bp.push(`<td class="r1-excluded-col"><input type="checkbox" ${checkedAttr} ${disabledAttr} onchange="toggleReport1Excluded('${person.id}')"></td>`);
        bp.push('</tr>');
    });
    body.innerHTML = bp.join('');
}

function cycleReport1Cell(personId, dateStr) {
    if (state.accessLevel !== 'admin') return;
    if (!state.report1.entries[personId]) {
        state.report1.entries[personId] = {};
    }
    const current = state.report1.entries[personId][dateStr] || '';
    if (current === '') {
        state.report1.entries[personId][dateStr] = 'home';
    } else if (current === 'home') {
        state.report1.entries[personId][dateStr] = 'base';
    } else {
        delete state.report1.entries[personId][dateStr];
    }
    saveState();
    renderReport1Entry();
}

function toggleReport1Excluded(personId) {
    if (state.accessLevel !== 'admin') return;
    const idx = state.report1.excluded.indexOf(personId);
    if (idx >= 0) {
        state.report1.excluded.splice(idx, 1);
    } else {
        state.report1.excluded.push(personId);
    }
    saveState();
    renderReport1Entry();
}

function setReport1StartDate(dateStr) {
    if (state.accessLevel !== 'admin') return;
    state.report1.startDate = dateStr || null;
    saveState();
    renderReport1Entry();
}

// ==================== Report 1 - View Tab ====================
function _calcReport1Stats(personId) {
    const dates = _getReport1DateRange();
    let home = 0, base = 0, none = 0;
    const entries = state.report1.entries[personId] || {};
    dates.forEach(dateStr => {
        const val = entries[dateStr];
        if (val === 'home') home++;
        else if (val === 'base') base++;
        else none++;
    });
    return { home, base, none, total: dates.length };
}

function _calcReport1Streak(personId) {
    const dates = _getReport1DateRange();
    if (dates.length === 0) return { type: null, days: 0 };
    const entries = state.report1.entries[personId] || {};
    // Walk backwards from today, skip empty days at the end, then count streak
    let streakType = null;
    let streakDays = 0;
    for (let i = dates.length - 1; i >= 0; i--) {
        const val = entries[dates[i]] || '';
        if (streakType === null) {
            // Skip trailing empty days to find the most recent reported day
            if (val === 'home' || val === 'base') {
                streakType = val;
                streakDays = 1;
            }
        } else if (val === streakType) {
            streakDays++;
        } else {
            break;
        }
    }
    return { type: streakType, days: streakDays };
}

function renderReport1View() {
    _renderReport1CategoryFilters();
    _renderReport1Summary();
}

function _renderReport1CategoryFilters() {
    const container = document.getElementById('r1CategoryFilters');
    const config = getColumnConfig();
    const filterColumns = config.filter(c => c.isFilter);
    let html = '';
    filterColumns.forEach(col => {
        const values = [...new Set(state.personnel.map(p => p[col.key]).filter(Boolean))].sort();
        html += `<div class="filter-group"><select id="r1Filter_${col.key}" onchange="filterReport1View()">`;
        html += `<option value="">כל ${escapeHtml(col.label)}</option>`;
        values.forEach(v => { html += `<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`; });
        html += '</select></div>';
    });
    container.innerHTML = html;
}

function _getReport1FilteredPersonnel() {
    const config = getColumnConfig();
    const filterColumns = config.filter(c => c.isFilter);
    const primaryCol = config.find(c => c.isPrimary) || config[0];

    // Category filters
    const activeFilters = [];
    filterColumns.forEach(col => {
        const el = document.getElementById('r1Filter_' + col.key);
        if (el && el.value) activeFilters.push({ key: col.key, value: el.value });
    });

    // Min days filters
    const minHomeEl = document.getElementById('r1MinHomeDays');
    const minBaseEl = document.getElementById('r1MinBaseDays');
    const minHome = minHomeEl && minHomeEl.value !== '' ? parseInt(minHomeEl.value) : null;
    const minBase = minBaseEl && minBaseEl.value !== '' ? parseInt(minBaseEl.value) : null;

    return state.personnel.filter(p => {
        // Exclude "not relevant"
        if (state.report1.excluded.includes(p.id)) return false;
        // Category filters
        for (const f of activeFilters) {
            if (p[f.key] !== f.value) return false;
        }
        // Streak filters (based on last consecutive days, not total)
        if (minHome !== null || minBase !== null) {
            const streak = _calcReport1Streak(p.id);
            if (minHome !== null) {
                if (streak.type !== 'home' || streak.days < minHome) return false;
            }
            if (minBase !== null) {
                if (streak.type !== 'base' || streak.days < minBase) return false;
            }
        }
        return true;
    });
}

function _renderReport1Summary() {
    const config = getColumnConfig();
    const primaryCol = config.find(c => c.isPrimary) || config[0];
    const filtered = _getReport1FilteredPersonnel();
    const dates = _getReport1DateRange();

    const head = document.getElementById('report1SummaryHead');
    const body = document.getElementById('report1SummaryBody');

    head.innerHTML = `<tr>
        <th>שם</th>
        <th>רצף אחרון</th>
        <th>סה"כ בבית \u{1F3E0}</th>
        <th>סה"כ בבסיס \u{1F3DB}\uFE0F</th>
        <th>ללא דיווח</th>
    </tr>`;

    if (dates.length === 0) {
        body.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--text-muted)">יש להגדיר תאריך התחלה בלשונית הזנת דוח</td></tr>';
        return;
    }

    let bodyHtml = '';
    filtered.forEach(person => {
        const stats = _calcReport1Stats(person.id);
        const streak = _calcReport1Streak(person.id);
        const name = escapeHtml(person[primaryCol.key] || person.name || '');
        let streakText = '-';
        let streakClass = '';
        if (streak.type === 'home') {
            streakText = streak.days + ' ימים בבית';
            streakClass = 'r1-home-cell';
        } else if (streak.type === 'base') {
            streakText = streak.days + ' ימים בבסיס';
            streakClass = 'r1-base-cell';
        }
        bodyHtml += `<tr>
            <td>${name}</td>
            <td class="${streakClass}">${streakText}</td>
            <td class="r1-home-cell">${stats.home}</td>
            <td class="r1-base-cell">${stats.base}</td>
            <td>${stats.none}</td>
        </tr>`;
    });

    if (filtered.length === 0) {
        bodyHtml = '<tr><td colspan="5" style="text-align:center;color:var(--text-muted)">אין נתונים להצגה</td></tr>';
    }

    body.innerHTML = bodyHtml;
}

function filterReport1View() {
    _renderReport1Summary();
}

// ==================== Report 1 - Excel Import ====================
function importReport1FromExcel(event) {
    const file = event.target.files[0];
    if (!file) return;
    event.target.value = ''; // reset so same file can be re-imported

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            // Find the 'שליטה' sheet
            const sheetName = workbook.SheetNames.find(n => n.trim() === 'שליטה');
            if (!sheetName) {
                showToast('לא נמצאה לשונית בשם "שליטה" בקובץ');
                return;
            }

            const sheet = workbook.Sheets[sheetName];
            const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
            if (rows.length < 2) {
                showToast('הלשונית ריקה או שאין בה שורות נתונים');
                return;
            }

            // Row 0 = header: col A = name, col D onwards = dates
            const headerRow = rows[0];
            const config = getColumnConfig();
            const primaryCol = config.find(c => c.isPrimary) || config[0];

            // Parse dates from header (column D = index 3 onwards)
            const dateColumns = []; // [{index, dateStr}]
            for (let i = 3; i < headerRow.length; i++) {
                const cellVal = headerRow[i];
                const dateStr = _parseExcelDate(cellVal);
                if (dateStr) {
                    dateColumns.push({ index: i, dateStr });
                }
            }

            if (dateColumns.length === 0) {
                showToast('לא נמצאו תאריכים בשורת הכותרת (מעמודה D)');
                return;
            }

            // Build a name-to-person lookup (normalize whitespace)
            const personByName = {};
            state.personnel.forEach(p => {
                const name = (p[primaryCol.key] || p.name || '').trim();
                if (name) personByName[name] = p;
            });

            let matched = 0, unmatched = 0;
            const unmatchedNames = [];

            for (let r = 1; r < rows.length; r++) {
                const row = rows[r];
                const rawName = String(row[0] || '').trim();
                if (!rawName) continue;

                const person = personByName[rawName];
                if (!person) {
                    unmatched++;
                    unmatchedNames.push(rawName);
                    continue;
                }

                if (!state.report1.entries[person.id]) {
                    state.report1.entries[person.id] = {};
                }

                dateColumns.forEach(({ index, dateStr }) => {
                    const cellVal = row[index];
                    const num = Number(cellVal);
                    if (cellVal === '' || cellVal == null || isNaN(num)) return;
                    if (num === 1) {
                        state.report1.entries[person.id][dateStr] = 'base';
                    } else if (num === 0) {
                        state.report1.entries[person.id][dateStr] = 'home';
                    }
                });
                matched++;
            }

            // Auto-set start date if not set yet
            if (!state.report1.startDate && dateColumns.length > 0) {
                state.report1.startDate = dateColumns[0].dateStr;
            }

            saveState();
            renderReport1Entry();

            let msg = `יובאו נתונים עבור ${matched} אנשים`;
            if (unmatched > 0) {
                msg += ` (${unmatched} שמות לא נמצאו: ${unmatchedNames.slice(0, 5).join(', ')}${unmatched > 5 ? '...' : ''})`;
            }
            showToast(msg);

        } catch (err) {
            console.error('Report1 import error:', err);
            showToast('שגיאה בקריאת הקובץ');
        }
    };
    reader.readAsArrayBuffer(file);
}

function _parseExcelDate(val) {
    // Handle Excel serial date numbers
    if (typeof val === 'number' && val > 40000 && val < 60000) {
        const epoch = new Date(1899, 11, 30);
        const d = new Date(epoch.getTime() + val * 86400000);
        return _toLocalDateStr(d);
    }
    // Handle string dates
    if (typeof val === 'string') {
        const trimmed = val.trim();
        // Try ISO format (YYYY-MM-DD)
        if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
        // Try DD/MM/YYYY or D/M/YYYY
        const slashMatch = trimmed.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{4})$/);
        if (slashMatch) {
            const day = slashMatch[1].padStart(2, '0');
            const month = slashMatch[2].padStart(2, '0');
            return `${slashMatch[3]}-${month}-${day}`;
        }
    }
    // Handle Date objects (SheetJS may return them)
    if (val instanceof Date && !isNaN(val)) {
        return _toLocalDateStr(val);
    }
    return null;
}
