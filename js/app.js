// ==================== App Init ====================
function initApp() {
    loadInitialData();
    renderSnapshotSelector();
    populateFilters();
    renderPersonnelTable();
    renderActivities();
    updateDashboard();

    // Show "Add New Day" buttons for admin only
    ['addNewDayBtn', 'addNewDayCamerasBtn'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.style.display = state.accessLevel === 'admin' ? '' : 'none';
    });
}

// ==================== View Switching ====================
function switchView(viewName) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    document.getElementById(viewName + 'View').classList.add('active');
    document.querySelector(`[data-view="${viewName}"]`).classList.add('active');

    if (viewName === 'dashboard') updateDashboard();
    if (viewName === 'activities') renderActivities();
    if (viewName === 'cameras') renderCameras();
    if (viewName === 'faultTracking') renderFaultTracking();
    if (viewName === 'shooting') renderShooting();
    if (viewName === 'report1') renderReport1();

    // Close mobile sidebar after navigation
    document.querySelector('.sidebar').classList.remove('open');
    const overlay = document.getElementById('sidebarOverlay');
    if (overlay) overlay.classList.remove('visible');
    const hamburger = document.querySelector('.hamburger-btn');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
}

// ==================== Mobile Sidebar ====================
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const hamburger = document.querySelector('.hamburger-btn');
    sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('visible');
    // Accessibility: toggle aria-expanded
    if (hamburger) hamburger.setAttribute('aria-expanded', sidebar.classList.contains('open'));
}

// ==================== Swipe to close sidebar ====================
(function initSidebarSwipe() {
    let touchStartX = null;
    let touchCurrentX = null;
    const SWIPE_THRESHOLD = 60;

    document.addEventListener('touchstart', (e) => {
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar || !sidebar.classList.contains('open')) return;
        touchStartX = e.touches[0].clientX;
        touchCurrentX = touchStartX;
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        if (touchStartX === null) return;
        touchCurrentX = e.touches[0].clientX;
    }, { passive: true });

    document.addEventListener('touchend', () => {
        if (touchStartX === null || touchCurrentX === null) return;
        const diff = touchCurrentX - touchStartX;
        // RTL: swipe right (positive diff) to close sidebar that opens from the right
        if (diff > SWIPE_THRESHOLD) {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar && sidebar.classList.contains('open')) {
                toggleSidebar();
            }
        }
        touchStartX = null;
        touchCurrentX = null;
    }, { passive: true });
})();

// ==================== Mobile touch edit (single tap for editable cells) ====================
(function initTouchEdit() {
    if (!('ontouchstart' in window)) return;

    let lastTapTarget = null;
    let lastTapTime = 0;

    document.addEventListener('click', (e) => {
        const cell = e.target.closest('.editable, .camera-info-cell');
        if (!cell) return;

        const now = Date.now();
        // If same cell tapped within 400ms, treat as double-tap → trigger edit
        if (cell === lastTapTarget && now - lastTapTime < 400) {
            // The dblclick handler is already bound via ondblclick attribute
            // Dispatch a synthetic dblclick so the existing handler fires
            cell.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
            lastTapTarget = null;
            lastTapTime = 0;
            return;
        }
        lastTapTarget = cell;
        lastTapTime = now;
    });
})();

// ==================== Initialize ====================
document.addEventListener('DOMContentLoaded', async () => {
    initTheme();
    document.getElementById('passwordInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLogin();
    });

    // Check for existing session
    try {
        const res = await fetch('/api/session');
        const { accessLevel } = await res.json();
        if (accessLevel) {
            state.accessLevel = accessLevel;
            document.getElementById('loginScreen').classList.add('hidden');
            document.getElementById('mainApp').classList.remove('hidden');

            const badge = document.getElementById('accessLevel');
            if (accessLevel === 'admin') {
                badge.textContent = 'מנהל';
                badge.className = 'access-badge admin';
            } else {
                badge.textContent = 'צפייה';
                badge.className = 'access-badge viewer';
            }

            await loadState();
            initApp();
            startSyncPolling();
            updateFeedbackFabVisibility();
        }
    } catch (err) {
        console.warn('Session check failed:', err);
    }
});

// Keyboard support for nav items (Enter/Space to activate)
document.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('nav-item')) {
        e.preventDefault();
        e.target.click();
    }
});

// Close modal on overlay click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.add('hidden');
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Escape - close modals
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay:not(.hidden)').forEach(m => m.classList.add('hidden'));
    }
    // Ctrl+Z - undo
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        // Don't undo if typing in an input/textarea
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        e.preventDefault();
        undoState();
    }
    // Ctrl+Y or Ctrl+Shift+Z - redo
    if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        e.preventDefault();
        redoState();
    }
});

// Warn before leaving with unsaved changes
window.addEventListener('beforeunload', (e) => {
    if (_hasPendingChanges || !_lastSaveOk) {
        e.preventDefault();
    }
});
