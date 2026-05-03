import { state } from './state.js';
import { showNotification, updateRouteStatus } from './utils.js';

export function highlightFullRoute(path) {
    state.cy.elements().removeClass('highlighted');
    let i = 0;
    function step() {
        if (i >= path.length) return;
        
        const node = state.cy.getElementById(path[i]);
        node.addClass('highlighted');
        
        if (i < path.length - 1) {
            const edge = state.cy.edges().filter(e => 
                (e.source().id() === path[i] && e.target().id() === path[i+1]) ||
                (e.source().id() === path[i+1] && e.target().id() === path[i])
            );
            edge.addClass('highlighted');
        }
        
        i++;
        setTimeout(step, 500);
    }
    step();
}

export function submitQueue() {
    if (state.queueArray.length === 0) {
        showNotification("Add at least one delivery to the queue.", "error");
        return;
    }

    updateRouteStatus('processing', 'Calculating optimal path...');

    const edges = state.cy.edges().map(e => ({
        source: e.data('source'),
        target: e.data('target'),
        weight: e.data('weight')
    }));

    const endpoint = state.optimizationEnabled ? '/route_optimized' : '/route_sequential';

    const speedInput = document.getElementById('vehicleSpeedInput');
    const speed = speedInput ? parseFloat(speedInput.value) : 24.0;

    fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ queue: state.queueArray, edges: edges, speed: speed })
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) throw new Error(data.error);
        
        highlightFullRoute(data.path);
        updateRouteStatus('complete', 'Route ready!');
        
        const info = document.getElementById('routeInfo');
        info.style.display = 'block';
        document.getElementById('routePath').textContent = data.path.join(' → ');
        document.getElementById('routeDistance').textContent = data.distance + ' km';
        document.getElementById('routeETA').textContent = data.eta + ' min';
    })
    .catch(err => {
        showNotification(err.message, "error");
        updateRouteStatus('waiting', 'Error encountered');
    });
}
