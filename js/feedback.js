// ==================== Feedback FAB ====================
let _feedbackType = 'bug';

const PAGE_NAMES = {
    personnel: 'כוח אדם',
    activities: 'פעילויות',
    cameras: 'צלמים',
    faultTracking: 'תקלות כלים',
    report1: 'דוח נוכחות',
    dashboard: 'לוח בקרה'
};

function toggleFeedbackMenu() {
    const menu = document.getElementById('feedbackMenu');
    menu.classList.toggle('open');
}

function openFeedbackModal(type) {
    _feedbackType = type;
    document.getElementById('feedbackModalTitle').textContent =
        type === 'bug' ? 'דיווח על באג' : 'הצעה לשיפור';
    document.getElementById('feedbackTitle').value = '';
    document.getElementById('feedbackDescription').value = '';
    document.getElementById('feedbackMenu').classList.remove('open');
    openModal('feedbackModal');
}

async function submitFeedback() {
    const title = document.getElementById('feedbackTitle').value.trim();
    const description = document.getElementById('feedbackDescription').value.trim();

    if (!title) {
        showToast('יש למלא כותרת');
        return;
    }

    const activeView = document.querySelector('.nav-item.active');
    const page = activeView ? activeView.dataset.view : '';

    try {
        const res = await fetch('/api/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: _feedbackType, title, description, page })
        });
        if (!res.ok) throw new Error('Failed');
        closeModal('feedbackModal');
        showToast('הדיווח נשלח בהצלחה');
    } catch (err) {
        showToast('שגיאה בשליחת הדיווח');
    }
}

// --- Admin: view feedback list ---
async function openFeedbackList() {
    document.getElementById('feedbackMenu').classList.remove('open');
    document.getElementById('feedbackListContent').innerHTML =
        '<p style="text-align:center;color:var(--text-muted)">טוען...</p>';
    openModal('feedbackListModal');

    try {
        const res = await fetch('/api/feedback');
        if (!res.ok) throw new Error('Failed');
        const items = await res.json();
        renderFeedbackList(items);
    } catch (err) {
        document.getElementById('feedbackListContent').innerHTML =
            '<p style="text-align:center;color:var(--danger)">שגיאה בטעינת דיווחים</p>';
    }
}

function renderFeedbackList(items) {
    const container = document.getElementById('feedbackListContent');

    if (!items.length) {
        container.innerHTML = '<p class="feedback-empty">אין דיווחים</p>';
        return;
    }

    // Sort newest first
    items.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    container.innerHTML = items.map(item => {
        const typeBadge = item.type === 'bug'
            ? '<span class="feedback-type-badge bug">באג</span>'
            : '<span class="feedback-type-badge suggestion">הצעה</span>';
        const pageName = PAGE_NAMES[item.page] || '';
        const pageTag = pageName ? `<span class="feedback-page-tag">${escapeHtml(pageName)}</span>` : '';
        const date = new Date(item.timestamp).toLocaleDateString('he-IL', {
            day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });
        const from = item.accessLevel === 'admin' ? 'מנהל' : 'צופה';

        return `<div class="feedback-item" data-id="${item.id}">
            <div class="feedback-item-header">
                <div class="feedback-item-tags">${typeBadge}${pageTag}</div>
                <button class="feedback-delete-btn" onclick="deleteFeedbackItem('${item.id}')" title="מחק">✕</button>
            </div>
            <div class="feedback-item-title">${escapeHtml(item.title)}</div>
            ${item.description ? `<div class="feedback-item-desc">${escapeHtml(item.description)}</div>` : ''}
            <div class="feedback-item-meta">${date} · ${from}</div>
        </div>`;
    }).join('');
}

async function deleteFeedbackItem(id) {
    try {
        const res = await fetch('/api/feedback/' + id, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed');
        const el = document.querySelector(`.feedback-item[data-id="${id}"]`);
        if (el) {
            el.style.opacity = '0';
            el.style.transform = 'scale(0.95)';
            setTimeout(() => {
                el.remove();
                if (!document.querySelectorAll('.feedback-item').length) {
                    document.getElementById('feedbackListContent').innerHTML =
                        '<p class="feedback-empty">אין דיווחים</p>';
                }
            }, 200);
        }
    } catch (err) {
        showToast('שגיאה במחיקה');
    }
}

// Show/hide FAB + admin button
function updateFeedbackFabVisibility() {
    const fab = document.getElementById('feedbackFab');
    if (!fab) return;
    const loggedIn = !document.getElementById('mainApp').classList.contains('hidden');
    fab.classList.toggle('hidden', !loggedIn);

    // Show "view reports" button only for admin
    const viewBtn = document.getElementById('feedbackViewBtn');
    if (viewBtn) {
        viewBtn.style.display = (loggedIn && state.accessLevel === 'admin') ? '' : 'none';
    }
}

// Close speed-dial on outside click
document.addEventListener('click', (e) => {
    const fab = document.getElementById('feedbackFab');
    if (fab && !fab.contains(e.target)) {
        document.getElementById('feedbackMenu').classList.remove('open');
    }
});
