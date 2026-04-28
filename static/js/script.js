import { state } from './modules/state.js';
import { showNotification } from './modules/utils.js';
import { initializeGraph, refreshGraphLayout, updateNodeDropdowns } from './modules/graph.js';
import { addNode, addEdge } from './modules/editor.js';
import { addToQueue, removeFromQueue, selectCustomerNode } from './modules/queue.js';
import { submitQueue } from './modules/routing.js';
import { toggleRoutingMode, resetApplicationState } from './modules/ui.js';

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Pass the selection handler to the graph initializer
    initializeGraph(selectCustomerNode);
    
    // Theme Switcher
    const themeSwitcher = document.getElementById('themeSwitcher');
    if (themeSwitcher) {
        themeSwitcher.addEventListener('change', (e) => {
            document.documentElement.setAttribute('data-theme', e.target.value);
            showNotification(`Theme switched to ${e.target.options[e.target.selectedIndex].text}`, "info");
        });
    }

    // Reset Button
    const resetBtn = document.getElementById('resetMapBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetApplicationState);
    }
    
    // Enter key support for product input
    const productInput = document.getElementById('productInput');
    if (productInput) {
        productInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                submitQueue();
            }
        });
    }
});

// Expose to window for global access (needed for legacy HTML onclick handlers)
window.addNode = addNode;
window.addEdge = addEdge;
window.addToQueue = addToQueue;
window.removeFromQueue = removeFromQueue;
window.submitQueue = submitQueue;
window.toggleRoutingMode = toggleRoutingMode;
window.refreshGraphLayout = refreshGraphLayout;
window.updateNodeDropdowns = updateNodeDropdowns;
window.resetApplicationState = resetApplicationState;
