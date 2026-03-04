// ==================== Utilities ====================
function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
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

// Plain date string for PDF export — no locale marks, safe for _reverseHebrew
function pdfDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();
}

let _lastFocusedElement = null;

function openModal(id) {
    _lastFocusedElement = document.activeElement;
    const modal = document.getElementById(id);
    modal.classList.remove('hidden');
    const focusable = modal.querySelector('input:not([type="hidden"]):not([style*="display:none"]), textarea, select, button:not(.modal-close)');
    if (focusable) requestAnimationFrame(() => focusable.focus());
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
    if (_lastFocusedElement) {
        _lastFocusedElement.focus();
        _lastFocusedElement = null;
    }
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.remove('hidden');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => toast.classList.add('hidden'), 3000);
}
