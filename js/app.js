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

    // Close mobile sidebar after navigation
    document.querySelector('.sidebar').classList.remove('open');
    const overlay = document.getElementById('sidebarOverlay');
    if (overlay) overlay.classList.remove('visible');
}

// ==================== Mobile Sidebar ====================
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('visible');
}

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
        }
    } catch (err) {
        console.warn('Session check failed:', err);
    }
});

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
