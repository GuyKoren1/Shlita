// ==================== Fault Tracking ====================
let _faultEditVehicleId = null;
let _faultEditFaultId = null;

function renderFaultTracking() {
    const container = document.getElementById('faultTrackingList');
    if (!container) return;

    const records = getActiveFaultRecords();
    const isAdmin = state.accessLevel === 'admin';
    const isSnapshot = isViewingSnapshot();

    if (records.length === 0) {
        container.innerHTML = `
            <div class="no-data">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                <p>אין כלים במעקב</p>
            </div>`;
        return;
    }

    // Stats summary
    const allFaults = records.flatMap(v => v.faults);
    const totalOpen = allFaults.filter(f => !f.resolved).length;
    const totalCritical = allFaults.filter(f => !f.resolved && f.critical).length;
    const totalResolved = allFaults.filter(f => f.resolved).length;

    // Filters
    const searchEl = document.getElementById('faultSearchInput');
    const statusEl = document.getElementById('faultStatusFilter');
    const categoryEl = document.getElementById('faultCategoryFilter');
    const searchTerm = searchEl ? searchEl.value.toLowerCase() : '';
    const statusFilter = statusEl ? statusEl.value : '';
    const categoryFilter = categoryEl ? categoryEl.value : '';

    let html = `<div class="fault-stats-bar">
        <div class="fault-stat">
            <span class="fault-stat-value">${records.length}</span>
            <span class="fault-stat-label">כלים</span>
        </div>
        <div class="fault-stat">
            <span class="fault-stat-value fault-stat-open">${totalOpen}</span>
            <span class="fault-stat-label">תקלות פתוחות</span>
        </div>
        <div class="fault-stat">
            <span class="fault-stat-value fault-stat-critical">${totalCritical}</span>
            <span class="fault-stat-label">קריטיות</span>
        </div>
        <div class="fault-stat">
            <span class="fault-stat-value fault-stat-resolved">${totalResolved}</span>
            <span class="fault-stat-label">טופלו</span>
        </div>
    </div>`;
    records.forEach(vehicle => {
        // Apply filters
        let filteredFaults = vehicle.faults;
        if (statusFilter === 'open') filteredFaults = filteredFaults.filter(f => !f.resolved);
        else if (statusFilter === 'critical') filteredFaults = filteredFaults.filter(f => !f.resolved && f.critical);
        else if (statusFilter === 'resolved') filteredFaults = filteredFaults.filter(f => f.resolved);

        if (categoryFilter) {
            filteredFaults = filteredFaults.filter(f => f.category === categoryFilter);
        }

        if (searchTerm) {
            const vehicleMatch = vehicle.name.toLowerCase().includes(searchTerm);
            filteredFaults = filteredFaults.filter(f =>
                vehicleMatch || f.title.toLowerCase().includes(searchTerm) || (f.description || '').toLowerCase().includes(searchTerm)
            );
        }

        // Skip vehicles with no matching faults (unless no filters active or vehicle name matches)
        const vehicleNameMatch = searchTerm && vehicle.name.toLowerCase().includes(searchTerm);
        if (filteredFaults.length === 0 && !vehicleNameMatch && (searchTerm || statusFilter || categoryFilter)) return;

        const openFaults = filteredFaults.filter(f => !f.resolved);
        const criticalOpen = openFaults.filter(f => f.critical).length;
        const closedFaults = filteredFaults.filter(f => f.resolved);
        const sortedFaults = [...openFaults, ...closedFaults];

        html += `<div class="vehicle-card">
            <div class="vehicle-card-header">
                <h3>${escapeHtml(vehicle.name)}</h3>
                <div class="vehicle-card-badges">
                    <span class="count-badge">${openFaults.length} פתוחות</span>
                    ${criticalOpen > 0 ? `<span class="count-badge critical-badge">${criticalOpen} קריטיות</span>` : ''}
                    ${closedFaults.length > 0 ? `<span class="count-badge resolved-badge">${closedFaults.length} טופלו</span>` : ''}
                </div>
                ${isAdmin && !isSnapshot ? `<div class="vehicle-card-actions">
                    <button class="btn btn-sm btn-secondary" onclick="openAddFaultModal('${vehicle.id}')">+ תקלה</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteVehicle('${vehicle.id}')">מחק כלי</button>
                </div>` : ''}
            </div>`;

        if (sortedFaults.length === 0) {
            html += `<div class="fault-empty">אין תקלות רשומות</div>`;
        } else {
            html += `<table class="fault-table">
                <thead><tr>
                    <th>תקלה</th>
                    <th>תחום</th>
                    <th>תאריך דיווח</th>
                    <th>ימים פתוחים</th>
                    <th>סטטוס</th>
                    ${isAdmin && !isSnapshot ? '<th>פעולות</th>' : ''}
                </tr></thead><tbody>`;

            sortedFaults.forEach(fault => {
                const days = getDaysOpen(fault.reportDate, fault.closedDate);
                const resolvedClass = fault.resolved ? 'fault-resolved' : '';
                const criticalClass = !fault.resolved && fault.critical ? 'fault-critical-row' : '';
                const daysBadgeClass = fault.resolved ? 'days-resolved' : days >= 14 ? 'days-red' : days >= 7 ? 'days-yellow' : 'days-green';
                const criticalIcon = fault.critical ? '<span class="critical-icon" title="קריטי">&#9888;</span> ' : '';

                html += `<tr class="${resolvedClass} ${criticalClass}" onclick="openFaultDetail('${vehicle.id}', '${fault.id}')" style="cursor:pointer">
                    <td class="fault-title-cell">${criticalIcon}${escapeHtml(fault.title)}</td>
                    <td>${fault.category ? escapeHtml(fault.category) : '-'}</td>
                    <td>${formatDateHe(fault.reportDate)}</td>
                    <td><span class="days-badge ${daysBadgeClass}">${days} ימים</span></td>
                    <td>${fault.resolved
                        ? `<span class="fault-status-badge resolved">טופלה</span>`
                        : `<span class="fault-status-badge open">פתוחה</span>`}</td>
                    ${isAdmin && !isSnapshot ? `<td class="fault-actions" onclick="event.stopPropagation()">
                        <button title="ערוך" onclick="openEditFaultModal('${vehicle.id}', '${fault.id}')">&#9998;</button>
                        <button title="${fault.critical ? 'הסר קריטי' : 'סמן קריטי'}" class="${fault.critical ? 'critical-active' : ''}" onclick="toggleFaultCritical('${vehicle.id}', '${fault.id}')">&#9888;</button>
                        <button title="${fault.resolved ? 'פתח מחדש' : 'סמן טופלה'}" onclick="toggleFaultResolved('${vehicle.id}', '${fault.id}')">${fault.resolved ? '&#8634;' : '&#10003;'}</button>
                    </td>` : ''}
                </tr>`;
            });

            html += `</tbody></table>`;
        }
        html += `</div>`;
    });

    container.innerHTML = html;
}

function formatDateHe(isoStr) {
    if (!isoStr) return '-';
    const d = new Date(isoStr);
    return d.toLocaleDateString('he-IL', { day: 'numeric', month: 'numeric', year: 'numeric' });
}

function getDaysOpen(reportDate, closedDate) {
    const start = new Date(reportDate);
    const end = closedDate ? new Date(closedDate) : new Date();
    return Math.max(0, Math.floor((end - start) / (1000 * 60 * 60 * 24)));
}

// --- Vehicle CRUD ---
function openAddVehicleModal() {
    document.getElementById('vehicleNameInput').value = '';
    openModal('addVehicleModal');
}

function saveVehicle() {
    const name = document.getElementById('vehicleNameInput').value.trim();
    if (!name) { showToast('יש להזין שם כלי'); return; }

    state.faultRecords.push({
        id: generateId(),
        name,
        faults: []
    });
    saveState();
    closeModal('addVehicleModal');
    renderFaultTracking();
    showToast('כלי נוסף בהצלחה');
}

function deleteVehicle(id) {
    const vehicle = state.faultRecords.find(v => v.id === id);
    if (!vehicle) return;
    if (!confirm(`למחוק את "${vehicle.name}" וכל התקלות שלו?`)) return;

    state.faultRecords = state.faultRecords.filter(v => v.id !== id);
    saveState();
    renderFaultTracking();
    showToast('כלי נמחק');
}

// --- Fault CRUD ---
function openAddFaultModal(vehicleId) {
    _faultEditVehicleId = vehicleId;
    _faultEditFaultId = null;
    document.getElementById('faultModalTitle').textContent = 'תקלה חדשה';
    document.getElementById('faultTitleInput').value = '';
    document.getElementById('faultDescInput').value = '';
    document.getElementById('faultCategoryInput').value = '';
    document.getElementById('faultDateInput').value = new Date().toISOString().split('T')[0];
    document.getElementById('faultCriticalInput').checked = false;
    openModal('faultModal');
}

function openEditFaultModal(vehicleId, faultId) {
    const vehicle = state.faultRecords.find(v => v.id === vehicleId);
    if (!vehicle) return;
    const fault = vehicle.faults.find(f => f.id === faultId);
    if (!fault) return;

    _faultEditVehicleId = vehicleId;
    _faultEditFaultId = faultId;
    document.getElementById('faultModalTitle').textContent = 'עריכת תקלה';
    document.getElementById('faultTitleInput').value = fault.title;
    document.getElementById('faultDescInput').value = fault.description || '';
    document.getElementById('faultCategoryInput').value = fault.category || '';
    document.getElementById('faultDateInput').value = fault.reportDate ? fault.reportDate.split('T')[0] : '';
    document.getElementById('faultCriticalInput').checked = !!fault.critical;
    openModal('faultModal');
}

function saveFault() {
    const title = document.getElementById('faultTitleInput').value.trim();
    const description = document.getElementById('faultDescInput').value.trim();
    const category = document.getElementById('faultCategoryInput').value;
    const dateVal = document.getElementById('faultDateInput').value;
    const critical = document.getElementById('faultCriticalInput').checked;
    if (!title) { showToast('יש להזין כותרת תקלה'); return; }
    if (!dateVal) { showToast('יש להזין תאריך דיווח'); return; }

    const vehicle = state.faultRecords.find(v => v.id === _faultEditVehicleId);
    if (!vehicle) return;

    if (_faultEditFaultId) {
        // Edit existing
        const fault = vehicle.faults.find(f => f.id === _faultEditFaultId);
        if (!fault) return;
        fault.title = title;
        fault.description = description;
        fault.category = category;
        fault.reportDate = new Date(dateVal).toISOString();
        fault.critical = critical;
    } else {
        // New fault
        vehicle.faults.push({
            id: generateId(),
            title,
            description,
            category,
            reportDate: new Date(dateVal).toISOString(),
            closedDate: null,
            resolved: false,
            critical
        });
    }

    saveState();
    closeModal('faultModal');
    renderFaultTracking();
    showToast(_faultEditFaultId ? 'תקלה עודכנה' : 'תקלה נוספה');
}

function toggleFaultCritical(vehicleId, faultId) {
    const vehicle = state.faultRecords.find(v => v.id === vehicleId);
    if (!vehicle) return;
    const fault = vehicle.faults.find(f => f.id === faultId);
    if (!fault) return;

    fault.critical = !fault.critical;
    saveState();
    renderFaultTracking();
    showToast(fault.critical ? 'תקלה סומנה כקריטית' : 'סימון קריטי הוסר');
}

function toggleFaultResolved(vehicleId, faultId) {
    const vehicle = state.faultRecords.find(v => v.id === vehicleId);
    if (!vehicle) return;
    const fault = vehicle.faults.find(f => f.id === faultId);
    if (!fault) return;

    fault.resolved = !fault.resolved;
    fault.closedDate = fault.resolved ? new Date().toISOString() : null;
    saveState();
    renderFaultTracking();
    showToast(fault.resolved ? 'תקלה סומנה כטופלה' : 'תקלה נפתחה מחדש');
}

function openFaultDetail(vehicleId, faultId) {
    const vehicle = state.faultRecords.find(v => v.id === vehicleId);
    if (!vehicle) return;
    const fault = vehicle.faults.find(f => f.id === faultId);
    if (!fault) return;

    const days = getDaysOpen(fault.reportDate, fault.closedDate);

    document.getElementById('faultDetailTitle').textContent = fault.title;
    document.getElementById('faultDetailVehicle').textContent = vehicle.name;
    document.getElementById('faultDetailDesc').textContent = fault.description || 'אין פירוט';
    document.getElementById('faultDetailDate').textContent = formatDateHe(fault.reportDate);
    document.getElementById('faultDetailDays').textContent = `${days} ימים`;
    document.getElementById('faultDetailStatus').textContent = fault.resolved ? 'טופלה' : 'פתוחה';
    document.getElementById('faultDetailStatus').className = 'fault-status-badge ' + (fault.resolved ? 'resolved' : 'open');

    const categoryRow = document.getElementById('faultDetailCategoryRow');
    if (fault.category) {
        categoryRow.classList.remove('hidden');
        document.getElementById('faultDetailCategory').textContent = fault.category;
    } else {
        categoryRow.classList.add('hidden');
    }

    const criticalRow = document.getElementById('faultDetailCriticalRow');
    if (fault.critical) {
        criticalRow.classList.remove('hidden');
    } else {
        criticalRow.classList.add('hidden');
    }

    const closedRow = document.getElementById('faultDetailClosedRow');
    if (fault.closedDate) {
        closedRow.classList.remove('hidden');
        document.getElementById('faultDetailClosedDate').textContent = formatDateHe(fault.closedDate);
    } else {
        closedRow.classList.add('hidden');
    }

    openModal('faultDetailModal');
}

// --- Export ---
function exportFaultsXLSX() {
    const records = getActiveFaultRecords();
    const rows = [];
    records.forEach(vehicle => {
        vehicle.faults.forEach(fault => {
            rows.push({
                'כלי': vehicle.name,
                'תקלה': fault.title,
                'תחום': fault.category || '',
                'קריטי': fault.critical ? 'כן' : '',
                'פירוט': fault.description || '',
                'תאריך דיווח': formatDateHe(fault.reportDate),
                'ימים פתוחים': getDaysOpen(fault.reportDate, fault.closedDate),
                'סטטוס': fault.resolved ? 'טופלה' : 'פתוחה',
                'תאריך סגירה': fault.closedDate ? formatDateHe(fault.closedDate) : ''
            });
        });
    });

    if (rows.length === 0) {
        showToast('אין נתונים לייצוא');
        return;
    }

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'תקלות');
    XLSX.writeFile(wb, 'fault_tracking.xlsx');
    showToast('קובץ XLSX יוצא בהצלחה');
}

let _pdfFontCache = null;

async function _loadHebrewFont() {
    if (_pdfFontCache) return _pdfFontCache;
    const resp = await fetch('https://fonts.gstatic.com/s/rubik/v31/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-B4iFVUUw.ttf');
    const buf = await resp.arrayBuffer();
    const bytes = new Uint8Array(buf);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    _pdfFontCache = btoa(binary);
    return _pdfFontCache;
}

function _reverseHebrew(text) {
    if (!text) return text;
    // Strip Unicode direction marks (RTL/LTR marks from toLocaleDateString etc.)
    text = text.replace(/[\u200E\u200F\u202A-\u202E\u2066-\u2069]/g, '');
    // Reverse whole string for RTL rendering in LTR PDF
    const reversed = text.split('').reverse().join('');
    // Re-reverse number/Latin runs to keep them LTR, and swap parentheses
    return reversed
        .replace(/[0-9A-Za-z./\-:,]+/g, m => m.split('').reverse().join(''))
        .replace(/[()]/g, m => m === '(' ? ')' : '(');
}

async function exportFaultsPDF() {
    const records = getActiveFaultRecords();
    const criticalRows = [];
    const normalRows = [];

    records.forEach(vehicle => {
        vehicle.faults.forEach(fault => {
            const row = [
                _reverseHebrew(fault.resolved ? 'טופלה' : 'פתוחה'),
                getDaysOpen(fault.reportDate, fault.closedDate).toString(),
                _reverseHebrew(formatDateHe(fault.reportDate)),
                _reverseHebrew(fault.category || '-'),
                _reverseHebrew(fault.title),
                _reverseHebrew(vehicle.name)
            ];
            if (fault.critical) {
                criticalRows.push(row);
            } else {
                normalRows.push(row);
            }
        });
    });

    if (criticalRows.length === 0 && normalRows.length === 0) {
        showToast('אין נתונים לייצוא');
        return;
    }

    try {
        showToast('מייצר PDF...');
        const fontBase64 = await _loadHebrewFont();
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ orientation: 'landscape' });

        doc.addFileToVFS('Rubik-Regular.ttf', fontBase64);
        doc.addFont('Rubik-Regular.ttf', 'Rubik', 'normal');
        doc.setFont('Rubik');
        doc.setFontSize(18);
        const todayStr = new Date().toLocaleDateString('he-IL');
        doc.text(_reverseHebrew(`דוח מעקב תקלות כלים - ${todayStr}`), doc.internal.pageSize.getWidth() / 2, 15, { align: 'center' });

        const tableHead = [[
            _reverseHebrew('סטטוס'),
            _reverseHebrew('ימים'),
            _reverseHebrew('תאריך דיווח'),
            _reverseHebrew('תחום'),
            _reverseHebrew('תקלה'),
            _reverseHebrew('כלי')
        ]];

        let currentY = 25;

        // Critical faults table
        if (criticalRows.length > 0) {
            doc.setFontSize(14);
            doc.setTextColor(239, 68, 68);
            doc.text(_reverseHebrew(`תקלות קריטיות (${criticalRows.length})`), doc.internal.pageSize.getWidth() / 2, currentY, { align: 'center' });
            doc.setTextColor(0, 0, 0);
            currentY += 5;

            doc.autoTable({
                head: tableHead,
                body: criticalRows,
                startY: currentY,
                styles: { halign: 'center', fontSize: 10, font: 'Rubik' },
                headStyles: { fillColor: [220, 53, 53], font: 'Rubik' }
            });

            currentY = doc.lastAutoTable.finalY + 15;
        }

        // Normal faults table
        if (normalRows.length > 0) {
            doc.setFontSize(14);
            doc.setTextColor(0, 0, 0);
            doc.text(_reverseHebrew(`תקלות רגילות (${normalRows.length})`), doc.internal.pageSize.getWidth() / 2, currentY, { align: 'center' });
            currentY += 5;

            doc.autoTable({
                head: tableHead,
                body: normalRows,
                startY: currentY,
                styles: { halign: 'center', fontSize: 10, font: 'Rubik' },
                headStyles: { fillColor: [79, 140, 255], font: 'Rubik' }
            });
        }

        doc.save('fault_tracking.pdf');
        showToast('קובץ PDF יוצא בהצלחה');
    } catch (err) {
        console.error('PDF export error:', err);
        showToast('שגיאה בייצוא PDF');
    }
}
