// ==================== Auth ====================
async function handleLogin() {
    const password = document.getElementById('passwordInput').value;
    const errorEl = document.getElementById('loginError');

    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });

        if (!res.ok) {
            errorEl.textContent = 'סיסמה שגויה';
            document.getElementById('passwordInput').value = '';
            return;
        }

        const { accessLevel } = await res.json();
        state.accessLevel = accessLevel;
    } catch (err) {
        errorEl.textContent = 'שגיאת התחברות לשרת';
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

    await loadState();
    initApp();
    updateFeedbackFabVisibility();
}

async function handleLogout() {
    await fetch('/api/logout', { method: 'POST' });
    state.accessLevel = null;
    document.getElementById('mainApp').classList.add('hidden');
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('passwordInput').value = '';
    document.getElementById('loginError').textContent = '';
    updateFeedbackFabVisibility();
}
