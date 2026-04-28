import { state } from './state.js';
import { showNotification, updateRouteStatus } from './utils.js';
import { renderQueue } from './queue.js';

export function toggleRoutingMode() {
    state.optimizationEnabled = document.getElementById('modeSwitch').checked;
    showNotification(
        state.optimizationEnabled ? "Optimized Mode Active" : "Sequential Mode Active",
        "info"
    );
}

export function resetApplicationState() {
    state.cy.elements().removeClass('highlighted');
    state.cy.nodes().removeClass('selected');
    state.selectedCustomerNode = null;
    state.queueArray = [];

    renderQueue();
    document.getElementById('productInput').value = '';

    updateRouteStatus('waiting', 'Waiting for input...');
    document.getElementById('routeInfo').style.display = 'none';
    document.getElementById('routeDistance').textContent = '-- km';
    document.getElementById('routeETA').textContent = '-- min';

    showNotification("System state reset successfully", "info");
}
