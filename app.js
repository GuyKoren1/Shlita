// ==================== Configuration ====================
const PASSWORDS = {
    primary: '7368',   // Admin access
    secondary: '6711'  // Viewer access
};

// ==================== Embedded Personnel Data ====================
const INITIAL_PERSONNEL_DATA = [
  {"rank":"רס\"ל","name":"תום ורמן","profession":"נהג","team":"אבני","department":"121","personalId":"8811109","weaponId":"1956957","notes":""},
  {"rank":"סמל","name":"יעקב אראל","profession":"תותחן","team":"אבני","department":"121","personalId":"8396175","weaponId":"5029635","notes":"חסר טופס החתמה"},
  {"rank":"סרן","name":"אבשלום ברסלב","profession":"מפקץ","team":"אבשה","department":"","personalId":"","weaponId":"5067198","notes":""},
  {"rank":"רס\"ם","name":"רועי איו","profession":"נהג","team":"אורין","department":"121","personalId":"5913071","weaponId":"9256977","notes":""},
  {"rank":"סרן","name":"אוריין מגן","profession":"מפקץ","team":"אורין","department":"121","personalId":"8050933","weaponId":"","notes":""},
  {"rank":"רס\"ר","name":"דוד בראז","profession":"טען","team":"אורין","department":"121","personalId":"6104961","weaponId":"4084434","notes":"חסר טופס החתמה"},
  {"rank":"רס\"ם","name":"דור בן מאיר","profession":"תותחן","team":"אורין","department":"121","personalId":"5771680","weaponId":"5041607","notes":""},
  {"rank":"רס\"ר","name":"עמנואל טואטי","profession":"תותחן","team":"אידלבוים","department":"121","personalId":"8230202","weaponId":"5047565","notes":""},
  {"rank":"סמ\"ר","name":"ניתאי כספי","profession":"נהג","team":"אידלבוים","department":"121","personalId":"7527065","weaponId":"5171714","notes":""},
  {"rank":"סרן","name":"יונתן אידלבוים","profession":"מפקץ","team":"אידלבוים","department":"121","personalId":"7597913","weaponId":"9133307","notes":""},
  {"rank":"רס\"ל","name":"אוהד עילם","profession":"טען","team":"אידלבוים","department":"121","personalId":"8853274","weaponId":"9448833","notes":""},
  {"rank":"רס\"ר","name":"אורי ויזל","profession":"תותחן","team":"בוקסבוים","department":"121","personalId":"7640983","weaponId":"5016412","notes":""},
  {"rank":"רס\"ר","name":"ארז דנינו","profession":"נהג","team":"בוקסבוים","department":"121","personalId":"6176151","weaponId":"3444077","notes":""},
  {"rank":"סרן","name":"איתן בוקסבוים","profession":"מפקץ","team":"בוקסבוים","department":"121","personalId":"5865402","weaponId":"4625793","notes":""},
  {"rank":"רס\"ר","name":"עודד נבנצל","profession":"טען","team":"בוקסבוים","department":"121","personalId":"6909483","weaponId":"4984063","notes":""},
  {"rank":"רס\"ר","name":"אדם פינקווסקי","profession":"טען","team":"בוקסבוים","department":"121","personalId":"7725004","weaponId":"","notes":""},
  {"rank":"רס\"ם","name":"משה יפה","profession":"נהג","team":"גיא לנדנר","department":"89","personalId":"5791198","weaponId":"5180999","notes":""},
  {"rank":"סמ\"ר","name":"אהרון ויצמן","profession":"תותחן","team":"גיא לנדנר","department":"89","personalId":"7545629","weaponId":"9248758","notes":""},
  {"rank":"רס\"ם","name":"יונתן שפנגלט","profession":"תותחן","team":"יובל","department":"89","personalId":"5307243","weaponId":"9227283","notes":""},
  {"rank":"רס\"ר","name":"ישראל גליק","profession":"טען","team":"יובל","department":"89","personalId":"7673711","weaponId":"5102417","notes":""},
  {"rank":"סרן","name":"יובל קרן","profession":"מפקץ","team":"יובל","department":"89","personalId":"8296053","weaponId":"9265177","notes":"אופסן ביום חמישי 03.7"},
  {"rank":"רס\"ם","name":"משה וולף","profession":"נהג","team":"יובל","department":"89","personalId":"7395564","weaponId":"","notes":""},
  {"rank":"רס\"ם","name":"אלעד רובינסון","profession":"תותחן","team":"ליאון","department":"129","personalId":"5801485","weaponId":"5126934","notes":""},
  {"rank":"רס\"ן","name":"ליאון בן נדבה","profession":"מפקץ","team":"ליאון","department":"129","personalId":"5947066","weaponId":"5172307","notes":""},
  {"rank":"רס\"ר","name":"אופיר קולט","profession":"נהג","team":"ליאון","department":"129","personalId":"5998450","weaponId":"5246048","notes":""},
  {"rank":"רס\"ר","name":"עמרי צרפתי","profession":"טען","team":"ליאון","department":"129","personalId":"7723386","weaponId":"9446866","notes":""},
  {"rank":"סרן","name":"משה יאיר שושן","profession":"מפקץ","team":"מושי","department":"89","personalId":"6109029","weaponId":"4554658","notes":""},
  {"rank":"רס\"ר","name":"הראל בלום","profession":"תותחן","team":"מושי","department":"89","personalId":"8271842","weaponId":"5165122","notes":""},
  {"rank":"רס\"ל","name":"חיים אלטבך","profession":"טען","team":"מושי","department":"89","personalId":"7552722","weaponId":"9167085","notes":""},
  {"rank":"רס\"ר","name":"יואל רענן","profession":"נהג","team":"מושי","department":"89","personalId":"5817725","weaponId":"9388188","notes":""},
  {"rank":"סמ\"ר","name":"נועם גולדמן","profession":"תותחן","team":"ספייר","department":"89","personalId":"8517180","weaponId":"","notes":""},
  {"rank":"רס\"ם","name":"נבות עלי","profession":"תותחן","team":"ספייר","department":"129","personalId":"5871598","weaponId":"9417272","notes":""},
  {"rank":"סגן","name":"עומרי בן חיים","profession":"מפקץ","team":"עומרי","department":"89","personalId":"8894722","weaponId":"9446489","notes":""},
  {"rank":"סרן","name":"עקיבא יעקבוביץ","profession":"מפקץ","team":"עקיבא","department":"121","personalId":"5981832","weaponId":"9164788","notes":""},
  {"rank":"רס\"ר","name":"אביתר לרנר","profession":"נהג","team":"עקיבא","department":"121","personalId":"7535343","weaponId":"5127172","notes":""},
  {"rank":"רס\"ם","name":"יהונתן טאוב","profession":"תותחן","team":"עקיבא","department":"121","personalId":"7707600","weaponId":"5148622","notes":""},
  {"rank":"רס\"ר","name":"דוד סולטן","profession":"טען","team":"עקיבא","department":"121","personalId":"6046692","weaponId":"5177629","notes":""},
  {"rank":"רס\"ר","name":"עדי אברהם","profession":"נהג","team":"רהב","department":"121","personalId":"6178363","weaponId":"5647874","notes":""},
  {"rank":"רס\"ל","name":"איתמר אסרף","profession":"תותחן","team":"רהב","department":"121","personalId":"8375283","weaponId":"9179803","notes":"חסר טופס החתמה"},
  {"rank":"סגן","name":"רהב נוריאליאן עג'מי","profession":"מפקץ","team":"רהב","department":"121","personalId":"8764453","weaponId":"9446133","notes":"חסר טופס החתמה"},
  {"rank":"רס\"ל","name":"דניאל בוטקביץ","profession":"טען","team":"שטרן","department":"129","personalId":"8757623","weaponId":"5081291","notes":""},
  {"rank":"רס\"ל","name":"גיא מויאל","profession":"נהג","team":"שטרן","department":"129","personalId":"8189629","weaponId":"5167442","notes":""},
  {"rank":"סרן","name":"נדב שטרן","profession":"מפקץ","team":"שטרן","department":"129","personalId":"7559964","weaponId":"5191394","notes":""},
  {"rank":"רס\"ל","name":"בן ישראל","profession":"תותחן","team":"שטרן","department":"129","personalId":"8183988","weaponId":"9229884","notes":""},
  {"rank":"סגן","name":"שי בצ'ינסקי","profession":"מפקץ","team":"שי בצ'ינסקי","department":"129","personalId":"8783439","weaponId":"5073811","notes":"חסר טופס החתמה"},
  {"rank":"סמל","name":"דביר אבני","profession":"טען","team":"שי בצ'ינסקי","department":"","personalId":"8434955","weaponId":"5079252","notes":"חסר טופס החתמה"},
  {"rank":"רס\"ל","name":"חנן וקנין","profession":"נהג","team":"שי בצ'ינסקי","department":"129","personalId":"8874899","weaponId":"9180988","notes":""},
  {"rank":"סמ\"ר","name":"ניר זנד","profession":"טען","team":"שמולביץ","department":"129","personalId":"8402357","weaponId":"4982225","notes":""},
  {"rank":"סרן","name":"גל שמולוביץ","profession":"מפקץ","team":"שמולביץ","department":"129","personalId":"5892142","weaponId":"5083537","notes":""},
  {"rank":"רס\"ר","name":"איתן אברמן","profession":"נהג","team":"שמולביץ","department":"129","personalId":"5803413","weaponId":"5095719","notes":""},
  {"rank":"סמ\"ר","name":"הדר וולף","profession":"תותחן","team":"שמולביץ","department":"129","personalId":"8563998","weaponId":"5162564","notes":""},
  {"rank":"רס\"ר","name":"איל שלו","profession":"ק. שליטה","team":"Mמפלג","department":"","personalId":"5816827","weaponId":"4163198","notes":""},
  {"rank":"סא\"ל","name":"דניאל ציון","profession":"מ\"פ","team":"Mמפלג","department":"","personalId":"7691433","weaponId":"5037920","notes":""},
  {"rank":"סרן","name":"דור אפללו","profession":"קלג","team":"Mמפלג","department":"","personalId":"5415367","weaponId":"5079539","notes":""},
  {"rank":"רס\"ל","name":"יותם אופק","profession":"נהג מפלג","team":"Mמפלג","department":"","personalId":"8257190","weaponId":"5116740","notes":""},
  {"rank":"רס\"ר","name":"תום מלמד","profession":"סמבצ","team":"Mמפלג","department":"","personalId":"8109237","weaponId":"5123219","notes":""},
  {"rank":"סרן","name":"גיא קורן","profession":"קהד","team":"Mמפלג","department":"","personalId":"5674877","weaponId":"5167650","notes":""},
  {"rank":"רס\"ר","name":"ערן עזרא","profession":"רספ","team":"Mמפלג","department":"","personalId":"5812924","weaponId":"5185935","notes":""},
  {"rank":"רס\"ר","name":"אלעד גינזבורג","profession":"סמבצ","team":"Mמפלג","department":"","personalId":"5866372","weaponId":"5023633","notes":""},
  {"rank":"רס\"ם","name":"אמיר טנצר","profession":"שליש","team":"Mמפלג","department":"","personalId":"7682499","weaponId":"9227203","notes":""},
  {"rank":"רס\"ן","name":"יאיר יודקובסקי","profession":"קהד","team":"Mמפלג","department":"","personalId":"7177661","weaponId":"9251542","notes":""},
  {"rank":"רס\"ר","name":"איתי שגב","profession":"סרספ","team":"Mמפלג","department":"","personalId":"8319695","weaponId":"9265013","notes":""},
  {"rank":"רס\"ן","name":"חן שטורמן","profession":"סמפ","team":"Mמפלג","department":"","personalId":"7092932","weaponId":"9412168","notes":""},
  {"rank":"רס\"ם","name":"בוריס סמטנין","profession":"סרספ","team":"Mמפלג","department":"","personalId":"5324895","weaponId":"9424110","notes":""}
];

const FIXED_COLUMNS = [
    { key: 'name', label: 'שם', type: 'text' },
    { key: 'rank', label: 'דרגה', type: 'text' },
    { key: 'profession', label: 'מקצוע', type: 'text' },
    { key: 'team', label: 'צוות', type: 'text' },
    { key: 'department', label: 'מחלקה', type: 'text' },
    { key: 'personalId', label: 'מס אישי', type: 'text' }
];

// ==================== State ====================
let state = {
    accessLevel: null, // 'admin' or 'viewer'
    personnel: [],
    customColumns: [],
    activities: [],
    sortColumn: null,
    sortDirection: 'asc',
    editingCell: null,
    editingPersonIndex: null, // for edit mode in modal
    currentActivityId: null
};

// ==================== Initialize ====================
document.addEventListener('DOMContentLoaded', async () => {
    initTheme();
    await loadState();
    document.getElementById('passwordInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLogin();
    });
});

// ==================== Auth ====================
function handleLogin() {
    const password = document.getElementById('passwordInput').value;
    const errorEl = document.getElementById('loginError');

    if (password === PASSWORDS.primary) {
        state.accessLevel = 'admin';
    } else if (password === PASSWORDS.secondary) {
        state.accessLevel = 'viewer';
    } else {
        errorEl.textContent = 'סיסמה שגויה';
        document.getElementById('passwordInput').value = '';
        return;
    }

    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('mainApp').classList.remove('hidden');

    const badge = document.getElementById('accessLevel');
    if (state.accessLevel === 'admin') {
        badge.textContent = 'מנהל';
        badge.className = 'access-badge admin';
    } else {
        badge.textContent = 'צפייה';
        badge.className = 'access-badge viewer';
    }

    initApp();
}

function handleLogout() {
    state.accessLevel = null;
    document.getElementById('mainApp').classList.add('hidden');
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('passwordInput').value = '';
    document.getElementById('loginError').textContent = '';
}

// ==================== Storage ====================
async function loadState() {
    try {
        const res = await fetch('/api/data');
        if (res.ok) {
            const data = await res.json();
            state.personnel = data.personnel || [];
            state.customColumns = data.customColumns || [];
            state.activities = data.activities || [];
            return;
        }
    } catch (err) {
        console.warn('Server unavailable, falling back to localStorage:', err);
    }
    // Fallback to localStorage if server is unreachable
    const saved = localStorage.getItem('shlita_data');
    if (saved) {
        const parsed = JSON.parse(saved);
        state.personnel = parsed.personnel || [];
        state.customColumns = parsed.customColumns || [];
        state.activities = parsed.activities || [];
    }
}

let _saveTimeout = null;
function saveState() {
    // Debounce: wait 300ms before saving to avoid excessive writes
    clearTimeout(_saveTimeout);
    _saveTimeout = setTimeout(() => _saveStateNow(), 300);
}

async function _saveStateNow() {
    const payload = {
        personnel: state.personnel,
        customColumns: state.customColumns,
        activities: state.activities
    };
    try {
        const res = await fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Save failed');
    } catch (err) {
        console.warn('Server save failed, falling back to localStorage:', err);
        localStorage.setItem('shlita_data', JSON.stringify(payload));
    }
}

function loadInitialData() {
    // Server handles initialization - just check if data loaded
    if (state.personnel.length > 0) return;

    // Fallback: load from embedded data if server returned empty
    state.personnel = INITIAL_PERSONNEL_DATA.map(p => ({
        id: generateId(),
        ...p
    }));
    saveState();
    showToast('נתוני כוח אדם נטענו בהצלחה');
}

// ==================== Theme ====================
function initTheme() {
    const saved = localStorage.getItem('shlita_theme');
    if (saved === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    updateThemeIcon();
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    if (current === 'light') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('shlita_theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('shlita_theme', 'light');
    }
    updateThemeIcon();
}

function updateThemeIcon() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const moonSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    const sunSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
    const icon = isLight ? moonSvg : sunSvg;

    const btn = document.getElementById('themeToggle');
    if (btn) btn.innerHTML = icon;

    const loginBtn = document.getElementById('loginThemeToggle');
    if (loginBtn) {
        const bigIcon = icon.replace('width="18" height="18"', 'width="20" height="20"');
        loginBtn.innerHTML = bigIcon;
    }
}

// ==================== App Init ====================
function initApp() {
    loadInitialData();
    populateFilters();
    renderPersonnelTable();
    renderActivities();
    updateDashboard();
}

// ==================== View Switching ====================
function switchView(viewName) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    document.getElementById(viewName + 'View').classList.add('active');
    document.querySelector(`[data-view="${viewName}"]`).classList.add('active');

    if (viewName === 'dashboard') updateDashboard();
    if (viewName === 'activities') renderActivities();
}

// ==================== Filters ====================
function populateFilters() {
    const ranks = [...new Set(state.personnel.map(p => p.rank).filter(Boolean))].sort();
    const professions = [...new Set(state.personnel.map(p => p.profession).filter(Boolean))].sort();
    const teams = [...new Set(state.personnel.map(p => p.team).filter(Boolean))].sort();
    const departments = [...new Set(state.personnel.map(p => p.department).filter(Boolean))].sort();

    populateSelect('filterRank', ranks, 'כל הדרגות');
    populateSelect('filterProfession', professions, 'כל המקצועות');
    populateSelect('filterTeam', teams, 'כל הצוותים');
    populateSelect('filterDepartment', departments, 'כל המחלקות');

    // Activity modal filters
    populateSelect('actFilterRank', ranks, 'כל הדרגות');
    populateSelect('actFilterProfession', professions, 'כל המקצועות');
    populateSelect('actFilterTeam', teams, 'כל הצוותים');
    populateSelect('actFilterDepartment', departments, 'כל המחלקות');

    // Person rank select
    const rankSelect = document.getElementById('personRank');
    rankSelect.innerHTML = '<option value="">בחר דרגה</option>';
    ranks.forEach(r => {
        rankSelect.innerHTML += `<option value="${r}">${r}</option>`;
    });
}

function populateSelect(id, values, defaultLabel) {
    const select = document.getElementById(id);
    const currentVal = select.value;
    select.innerHTML = `<option value="">${defaultLabel}</option>`;
    values.forEach(v => {
        select.innerHTML += `<option value="${v}">${v}</option>`;
    });
    select.value = currentVal;
}

function getFilteredPersonnel() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const rank = document.getElementById('filterRank').value;
    const profession = document.getElementById('filterProfession').value;
    const team = document.getElementById('filterTeam').value;
    const department = document.getElementById('filterDepartment').value;

    return state.personnel.filter(p => {
        if (rank && p.rank !== rank) return false;
        if (profession && p.profession !== profession) return false;
        if (team && p.team !== team) return false;
        if (department && p.department !== department) return false;
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
    document.getElementById('searchInput').value = '';
    document.getElementById('filterRank').value = '';
    document.getElementById('filterProfession').value = '';
    document.getElementById('filterTeam').value = '';
    document.getElementById('filterDepartment').value = '';
    renderPersonnelTable();
}

// ==================== Personnel Table ====================
function getAllColumns() {
    return [...FIXED_COLUMNS, ...state.customColumns];
}

function renderPersonnelTable() {
    const filtered = getFilteredPersonnel();
    const columns = getAllColumns();

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
    const thead = document.getElementById('personnelHead');
    let headerHtml = '<tr><th style="width:40px">#</th>';
    columns.forEach(col => {
        const sortClass = state.sortColumn === col.key
            ? (state.sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc')
            : '';
        headerHtml += `<th class="${sortClass}" onclick="sortBy('${col.key}')">${col.label}</th>`;
    });
    if (state.accessLevel === 'admin') {
        headerHtml += '<th style="width:80px">פעולות</th>';
    }
    headerHtml += '</tr>';
    thead.innerHTML = headerHtml;

    // Body
    const tbody = document.getElementById('personnelBody');
    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="${columns.length + 2}" style="text-align:center;padding:40px;color:var(--text-muted)">לא נמצאו תוצאות</td></tr>`;
    } else {
        let bodyHtml = '';
        filtered.forEach((person, idx) => {
            const globalIdx = state.personnel.indexOf(person);
            bodyHtml += `<tr>`;
            bodyHtml += `<td style="color:var(--text-muted)">${idx + 1}</td>`;
            columns.forEach(col => {
                const val = person[col.key] || '';
                if (state.accessLevel === 'admin') {
                    bodyHtml += `<td class="editable" ondblclick="startCellEdit(this, ${globalIdx}, '${col.key}')">${escapeHtml(val)}</td>`;
                } else {
                    bodyHtml += `<td>${escapeHtml(val)}</td>`;
                }
            });
            if (state.accessLevel === 'admin') {
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

    // Count
    document.getElementById('personnelCount').textContent = `${filtered.length} / ${state.personnel.length}`;
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
function openAddPersonModal() {
    if (state.accessLevel !== 'admin') {
        showToast('אין הרשאה לביצוע פעולה זו');
        return;
    }
    state.editingPersonIndex = null;
    document.getElementById('addPersonModalTitle').textContent = 'הוסף איש חדש';
    clearPersonForm();
    renderCustomFieldsInForm();
    openModal('addPersonModal');
}

function openEditPersonModal(idx) {
    if (state.accessLevel !== 'admin') return;
    state.editingPersonIndex = idx;
    const person = state.personnel[idx];

    document.getElementById('addPersonModalTitle').textContent = 'ערוך פרטים';
    document.getElementById('personName').value = person.name || '';
    document.getElementById('personRank').value = person.rank || '';
    document.getElementById('personProfession').value = person.profession || '';
    document.getElementById('personTeam').value = person.team || '';
    document.getElementById('personDepartment').value = person.department || '';
    document.getElementById('personId').value = person.personalId || '';

    renderCustomFieldsInForm(person);
    openModal('addPersonModal');
}

function clearPersonForm() {
    document.getElementById('personName').value = '';
    document.getElementById('personRank').value = '';
    document.getElementById('personProfession').value = '';
    document.getElementById('personTeam').value = '';
    document.getElementById('personDepartment').value = '';
    document.getElementById('personId').value = '';
}

function renderCustomFieldsInForm(person = null) {
    const container = document.getElementById('customFieldsContainer');
    if (state.customColumns.length === 0) {
        container.innerHTML = '';
        return;
    }

    let html = '<hr><h4>שדות נוספים</h4>';
    const pairs = [];
    state.customColumns.forEach((col, i) => {
        pairs.push(col);
    });

    for (let i = 0; i < pairs.length; i += 2) {
        html += '<div class="form-row">';
        for (let j = i; j < Math.min(i + 2, pairs.length); j++) {
            const col = pairs[j];
            const val = person ? (person[col.key] || '') : '';
            html += `<div class="form-group">
                <label>${col.label}</label>`;
            if (col.type === 'boolean') {
                html += `<select id="custom_${col.key}">
                    <option value="" ${!val ? 'selected' : ''}>-</option>
                    <option value="כן" ${val === 'כן' ? 'selected' : ''}>כן</option>
                    <option value="לא" ${val === 'לא' ? 'selected' : ''}>לא</option>
                </select>`;
            } else if (col.type === 'date') {
                html += `<input type="date" id="custom_${col.key}" value="${val}">`;
            } else if (col.type === 'number') {
                html += `<input type="number" id="custom_${col.key}" value="${val}">`;
            } else {
                html += `<input type="text" id="custom_${col.key}" value="${escapeHtml(val)}">`;
            }
            html += '</div>';
        }
        html += '</div>';
    }
    container.innerHTML = html;
}

function savePerson() {
    const name = document.getElementById('personName').value.trim();
    if (!name) {
        showToast('יש להזין שם');
        return;
    }

    const personData = {
        name,
        rank: document.getElementById('personRank').value,
        profession: document.getElementById('personProfession').value.trim(),
        team: document.getElementById('personTeam').value.trim(),
        department: document.getElementById('personDepartment').value.trim(),
        personalId: document.getElementById('personId').value.trim()
    };

    // Custom fields
    state.customColumns.forEach(col => {
        const el = document.getElementById('custom_' + col.key);
        if (el) personData[col.key] = el.value;
    });

    if (state.editingPersonIndex !== null) {
        // Edit existing
        const existing = state.personnel[state.editingPersonIndex];
        Object.assign(existing, personData);
        showToast('פרטים עודכנו בהצלחה');
    } else {
        // Add new
        personData.id = generateId();
        personData.weaponId = '';
        personData.notes = '';
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
    saveState();
    renderPersonnelTable();
    closeModal('addColumnModal');
    showToast(`עמודה "${name}" נוספה בהצלחה`);
}

// ==================== Activities ====================
function openNewActivityModal() {
    if (state.accessLevel !== 'admin') {
        showToast('אין הרשאה לביצוע פעולה זו');
        return;
    }
    document.getElementById('activityName').value = '';
    document.getElementById('activityDescription').value = '';
    document.getElementById('activityDeadline').value = '';

    // Reset filters
    document.getElementById('actSearchInput').value = '';
    document.getElementById('actFilterRank').value = '';
    document.getElementById('actFilterProfession').value = '';
    document.getElementById('actFilterTeam').value = '';
    document.getElementById('actFilterDepartment').value = '';

    renderActivityParticipants();
    openModal('newActivityModal');
}

function getActivityFilteredPersonnel() {
    const search = document.getElementById('actSearchInput').value.toLowerCase();
    const rank = document.getElementById('actFilterRank').value;
    const profession = document.getElementById('actFilterProfession').value;
    const team = document.getElementById('actFilterTeam').value;
    const department = document.getElementById('actFilterDepartment').value;

    return state.personnel.filter(p => {
        if (rank && p.rank !== rank) return false;
        if (profession && p.profession !== profession) return false;
        if (team && p.team !== team) return false;
        if (department && p.department !== department) return false;
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
    filtered.forEach(person => {
        const checked = selectedParticipants.has(person.id) ? 'checked' : '';
        const selectedClass = selectedParticipants.has(person.id) ? 'selected' : '';
        html += `<div class="participant-item ${selectedClass}" onclick="toggleParticipant('${person.id}', this)">
            <input type="checkbox" ${checked} onclick="event.stopPropagation(); toggleParticipant('${person.id}', this.parentElement)">
            <div class="participant-info">
                <span class="name">${escapeHtml(person.name)}</span>
                <span class="meta">${person.rank} | ${person.profession} | ${person.team}</span>
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

    activity.participants.forEach((participant, idx) => {
        const person = state.personnel.find(p => p.id === participant.personId);
        if (!person) return;

        // Filter
        if (searchTerm && !person.name.toLowerCase().includes(searchTerm)) return;
        if (statusFilter === 'completed' && !participant.completed) return;
        if (statusFilter === 'pending' && participant.completed) return;

        const checked = participant.completed ? 'checked' : '';
        const completedClass = participant.completed ? 'completed-row' : '';
        const isAdmin = state.accessLevel === 'admin';

        html += `<div class="detail-participant ${completedClass}">
            <div class="checkbox-wrap">
                <input type="checkbox" ${checked} ${isAdmin ? '' : 'disabled'}
                    onchange="toggleCompletion('${activity.id}', ${idx}, this.checked)">
            </div>
            <span class="p-name">${escapeHtml(person.name)}</span>
            <span class="p-meta">${person.rank} | ${person.team} | ${person.profession}</span>
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

// ==================== Dashboard ====================
function updateDashboard() {
    document.getElementById('totalPersonnel').textContent = state.personnel.length;
    document.getElementById('totalActivities').textContent = state.activities.length;

    const teams = [...new Set(state.personnel.map(p => p.team).filter(Boolean))];
    document.getElementById('totalTeams').textContent = teams.length;

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

    // Team breakdown
    const teamContainer = document.getElementById('teamBreakdown');
    const teamCounts = {};
    state.personnel.forEach(p => {
        if (p.team) {
            teamCounts[p.team] = (teamCounts[p.team] || 0) + 1;
        }
    });
    let teamHtml = '';
    Object.entries(teamCounts).sort((a, b) => b[1] - a[1]).forEach(([team, count]) => {
        teamHtml += `<div class="team-card">
            <div class="team-name">${escapeHtml(team)}</div>
            <div class="team-count">${count} אנשים</div>
        </div>`;
    });
    teamContainer.innerHTML = teamHtml || '<p style="color:var(--text-muted)">אין נתונים</p>';
}

// ==================== Export ====================
function exportData() {
    const columns = getAllColumns();
    let csv = '\uFEFF'; // BOM for Excel Hebrew support
    csv += columns.map(c => c.label).join(',') + '\n';

    state.personnel.forEach(person => {
        csv += columns.map(c => {
            const val = (person[c.key] || '').toString().replace(/"/g, '""');
            return `"${val}"`;
        }).join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `כוח_אדם_${new Date().toLocaleDateString('he-IL')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('קובץ יוצא בהצלחה');
}

// ==================== Utilities ====================
function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    try {
        const d = new Date(dateStr);
        return d.toLocaleDateString('he-IL', { day: 'numeric', month: 'numeric', year: 'numeric' });
    } catch {
        return dateStr;
    }
}

function openModal(id) {
    document.getElementById(id).classList.remove('hidden');
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.remove('hidden');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => toast.classList.add('hidden'), 3000);
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.add('hidden');
    }
});

// Keyboard shortcut - Escape to close modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay:not(.hidden)').forEach(m => m.classList.add('hidden'));
    }
});
