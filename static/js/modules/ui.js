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

export function switchTab(tabId) {
    // Remove active class from all buttons and panels
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active-panel'));
    
    // Add active class to target panel
    document.getElementById(tabId).classList.add('active-panel');
    
    // Add active class to clicked button
    const btn = document.querySelector(`.tab-btn[onclick="switchTab('${tabId}')"]`);
    if (btn) btn.classList.add('active');
}
