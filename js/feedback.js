// ==================== Feedback FAB ====================
let _feedbackType = 'bug';

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

    // Detect current page
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

// Show/hide FAB based on login state
function updateFeedbackFabVisibility() {
    const fab = document.getElementById('feedbackFab');
    if (!fab) return;
    const loggedIn = !document.getElementById('mainApp').classList.contains('hidden');
    fab.classList.toggle('hidden', !loggedIn);
}

// Close speed-dial on outside click
document.addEventListener('click', (e) => {
    const fab = document.getElementById('feedbackFab');
    if (fab && !fab.contains(e.target)) {
        document.getElementById('feedbackMenu').classList.remove('open');
    }
});
