export function showNotification(msg, type) {
    const n = document.getElementById('notification');
    n.textContent = msg;
    n.className = `notification ${type} show`;
    setTimeout(() => n.classList.remove('show'), 3000);
}

export function updateRouteStatus(status, msg) {
    const div = document.getElementById('routeStatus');
    div.className = `status-display status-${status}`;
    div.textContent = msg;
}
