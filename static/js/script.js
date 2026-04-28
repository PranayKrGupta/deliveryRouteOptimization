// Global variables
queueArray = [];
let selectedCustomerNode = null;
let cy = null;

// Centralized Physics Refresh
function refreshGraphLayout() {
    cy.layout({
        name: 'cose',
        animate: true,
        fit: true,
        idealEdgeLength: 150,
        nodeRepulsion: 800000,
        gravity: 0.25
    }).run();
}

// Initialize Cytoscape graph
function initializeGraph() {
    cy = cytoscape({
        container: document.getElementById('cy'),
        boxSelectionEnabled: false,
        autounselectify: false,
        elements: [
            // Nodes
            { data: { id: 'W1', label: 'Main Warehouse', type: 'warehouse' } },
            { data: { id: 'C1', label: 'Customer 1', type: 'customer' } },
            { data: { id: 'C2', label: 'Customer 2', type: 'customer' } },
            { data: { id: 'C3', label: 'Customer 3', type: 'customer' } },
            { data: { id: 'C4', label: 'Customer 4', type: 'customer' } },
            { data: { id: 'C5', label: 'Customer 5', type: 'customer' } },
            { data: { id: 'C6', label: 'Customer 6', type: 'customer' } },
            { data: { id: 'J1', label: 'Junction 1', type: 'junction' } },
            { data: { id: 'J2', label: 'Junction 2', type: 'junction' } },
            { data: { id: 'J3', label: 'Junction 3', type: 'junction' } },
            { data: { id: 'J4', label: 'Junction 4', type: 'junction' } },
            { data: { id: 'J5', label: 'Junction 5', type: 'junction' } },
            { data: { id: 'J6', label: 'Junction 6', type: 'junction' } },
            { data: { id: 'J7', label: 'Junction 7', type: 'junction' } },
            { data: { id: 'J8', label: 'Junction 8', type: 'junction' } },

            // Edges
            { data: { id: 'e1', source: 'W1', target: 'J1', weight: 2.1 } },
            { data: { id: 'e2', source: 'J1', target: 'J2', weight: 1.8 } },
            { data: { id: 'e3', source: 'J1', target: 'C1', weight: 1.2 } },
            { data: { id: 'e4', source: 'J2', target: 'C2', weight: 1.5 } },
            { data: { id: 'e5', source: 'J2', target: 'J3', weight: 2.3 } },
            { data: { id: 'e6', source: 'J3', target: 'C3', weight: 1.7 } },
            { data: { id: 'e7', source: 'J3', target: 'J4', weight: 1.9 } },
            { data: { id: 'e8', source: 'J4', target: 'C4', weight: 1.4 } },
            { data: { id: 'e9', source: 'J4', target: 'J5', weight: 2.2 } },
            { data: { id: 'e10', source: 'J5', target: 'C5', weight: 1.6 } },
            { data: { id: 'e11', source: 'J5', target: 'J6', weight: 1.8 } },
            { data: { id: 'e12', source: 'J6', target: 'C6', weight: 1.3 } },
            { data: { id: 'e13', source: 'J6', target: 'J7', weight: 2.4 } },
            { data: { id: 'e16', source: 'J7', target: 'J8', weight: 1.7 } },
            { data: { id: 'e21', source: 'J1', target: 'J4', weight: 3.2 } },
            { data: { id: 'e22', source: 'J2', target: 'J5', weight: 2.7 } },
            { data: { id: 'e23', source: 'J3', target: 'J6', weight: 2.9 } },
            { data: { id: 'e24', source: 'C1', target: 'J2', weight: 2.1 } },
            { data: { id: 'e25', source: 'C2', target: 'J3', weight: 1.9 } },
            { data: { id: 'e26', source: 'C3', target: 'J4', weight: 2.2 } },
            { data: { id: 'e27', source: 'C4', target: 'J5', weight: 1.8 } },
            { data: { id: 'e28', source: 'C5', target: 'J6', weight: 2.0 } },
            { data: { id: 'e29', source: 'C6', target: 'J7', weight: 1.6 } },
            { data: { id: 'e30', source: 'J4', target: 'J7', weight: 3.1 } }
        ],
        style: [
            {
                selector: 'node',
                style: {
                    'background-color': '#e5e7eb',
                    'label': 'data(label)',
                    'text-valign': 'bottom',
                    'text-halign': 'center',
                    'text-margin-y': 6,
                    'color': '#ffffff',
                    'font-size': '14px',
                    'font-weight': 'bold',
                    'width': '40px',
                    'height': '40px',
                    'border-width': '2px',
                    'border-color': '#9ca3af',
                    'text-outline-width': 2,
                    'text-outline-color': '#1e293b'
                }
            },
            {
                selector: 'node[type="warehouse"]',
                style: {
                    'background-color': '#ef4444',
                    'border-color': '#dc2626',
                    'shape': 'diamond',
                    'width': '55px',
                    'height': '55px'
                }
            },
            {
                selector: 'node[type="customer"]',
                style: {
                    'background-color': '#6366f1',
                    'border-color': '#4f46e5',
                    'shape': 'rectangle'
                }
            },
            {
                selector: 'node[type="junction"]',
                style: {
                    'background-color': '#94a3b8',
                    'border-color': '#64748b',
                    'shape': 'circle',
                    'width': '30px',
                    'height': '30px'
                }
            },
            {
                selector: 'edge',
                style: {
                    'width': '4px',
                    'line-color': '#64748b',
                    'curve-style': 'bezier',
                    'label': 'data(weight)',
                    'font-size': '14px',
                    'color': '#ffffff',
                    'text-outline-width': '3px',
                    'text-outline-color': '#1e293b'
                }
            },
            {
                selector: '.selected',
                style: {
                    'border-color': '#f59e0b',
                    'border-width': '5px',
                    'background-color': '#fbbf24'
                }
            },
            {
                selector: '.highlighted',
                style: {
                    'background-color': '#10b981',
                    'border-color': '#059669',
                    'border-width': '5px'
                }
            },
            {
                selector: 'edge.highlighted',
                style: {
                    'line-color': '#10b981',
                    'target-arrow-color': '#10b981',
                    'width': '6px'
                }
            }
        ],
        layout: {
            name: 'cose',
            animate: true,
            nodeRepulsion: 800000,
            idealEdgeLength: 150,
            gravity: 0.25
        }
    });

    cy.on('tap', 'node', function (evt) {
        const node = evt.target;
        if (node.data('type') === 'customer') {
            selectCustomerNode(node);
        }
    });

    cy.on('mouseover', 'node', function (evt) {
        evt.target.style('text-outline-width', '3px');
    });

    cy.on('mouseout', 'node', function (evt) {
        evt.target.style('text-outline-width', '2px');
    });

    updateNodeDropdowns();
}

function updateNodeDropdowns() {
    const sourceSelect = document.getElementById('edgeSource');
    const targetSelect = document.getElementById('edgeTarget');

    if (!sourceSelect || !targetSelect) return;

    // Preserve first placeholder option
    const placeholderSource = sourceSelect.options[0];
    const placeholderTarget = targetSelect.options[0];

    sourceSelect.innerHTML = '';
    targetSelect.innerHTML = '';

    sourceSelect.appendChild(placeholderSource);
    targetSelect.appendChild(placeholderTarget);

    cy.nodes().forEach(node => {
        const id = node.id();
        const label = node.data('label') || id;
        
        const optSource = new Option(label, id);
        const optTarget = new Option(label, id);
        
        sourceSelect.add(optSource);
        targetSelect.add(optTarget);
    });
}

// Map Editor Logic
function addNode() {
    const idInput = document.getElementById('nodeId');
    const typeSelect = document.getElementById('nodeType');
    const id = idInput.value.trim();
    const type = typeSelect.value;

    if (!id) {
        alert("Error: Node ID cannot be empty.");
        return;
    }

    if (cy.getElementById(id).length > 0) {
        alert(`Error: Node ID "${id}" already exists in the map.`);
        return;
    }

    cy.add({
        group: 'nodes',
        data: { id: id, label: id, type: type }
    });

    idInput.value = '';
    updateNodeDropdowns();
    refreshGraphLayout();
    showNotification(`Node ${id} created successfully.`, "success");
}

function addEdge() {
    const sourceInput = document.getElementById('edgeSource');
    const targetInput = document.getElementById('edgeTarget');
    const weightInput = document.getElementById('edgeWeight');

    const source = sourceInput.value;
    const target = targetInput.value;
    const weight = parseFloat(weightInput.value);

    if (!source || !target) {
        alert("Error: Source and Target IDs are required.");
        return;
    }

    if (cy.getElementById(source).length === 0) {
        alert(`Error: Source node "${source}" does not exist!`);
        return;
    }

    if (cy.getElementById(target).length === 0) {
        alert(`Error: Target node "${target}" does not exist!`);
        return;
    }

    if (isNaN(weight) || weight <= 0) {
        alert("Error: Weight must be a valid number greater than 0.");
        return;
    }

    const edgeId = `e_${source}_${target}_${Date.now()}`;
    cy.add({
        group: 'edges',
        data: {
            id: edgeId,
            source: source,
            target: target,
            weight: weight
        }
    });

    sourceInput.value = '';
    targetInput.value = '';
    weightInput.value = '';

    refreshGraphLayout();
    showNotification("Edge created successfully.", "success");
}

// Queue & Routing Logic
let optimizationEnabled = false;

function toggleRoutingMode() {
    optimizationEnabled = document.getElementById('modeSwitch').checked;
    showNotification(
        optimizationEnabled ? "Optimized Mode Active" : "Sequential Mode Active",
        "info"
    );
}

function selectCustomerNode(node) {
    const nodeId = node.data('id');
    if (selectedCustomerNode === nodeId) {
        node.removeClass('selected');
        selectedCustomerNode = null;
        return;
    }
    if (selectedCustomerNode) {
        cy.getElementById(selectedCustomerNode).removeClass('selected');
    }
    selectedCustomerNode = nodeId;
    node.addClass('selected');
    showNotification(`Customer ${nodeId} selected`, 'success');
}

function addToQueue() {
    const productInput = document.getElementById('productInput');
    const product = productInput.value.trim();

    if (!product || !selectedCustomerNode) {
        showNotification('Please enter a product and select a customer node.', 'error');
        return;
    }

    if (queueArray.some(e => e.customer === selectedCustomerNode)) {
        showNotification(`Customer ${selectedCustomerNode} is already in queue.`, 'error');
        return;
    }

    queueArray.push({ customer: selectedCustomerNode, product });
    renderQueue();
    
    productInput.value = '';
    selectedCustomerNode = null;
    cy.nodes().removeClass('selected');
}

function removeFromQueue(index) {
    queueArray.splice(index, 1);
    renderQueue();
}

function renderQueue() {
    const list = document.getElementById('queueCustomerList');
    list.innerHTML = '';
    queueArray.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.customer}: ${item.product}</span>
            <button class="remove-btn" onclick="removeFromQueue(${index})">✕</button>
        `;
        list.appendChild(li);
    });
}

function submitQueue() {
    if (queueArray.length === 0) {
        showNotification("Add at least one delivery to the queue.", "error");
        return;
    }

    updateRouteStatus('processing', 'Calculating optimal path...');

    // Dynamic Payload Syncing
    const edges = cy.edges().map(e => ({
        source: e.data('source'),
        target: e.data('target'),
        weight: e.data('weight')
    }));

    const endpoint = optimizationEnabled ? '/route_optimized' : '/route_sequential';

    fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ queue: queueArray, edges: edges })
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) throw new Error(data.error);
        
        highlightFullRoute(data.path);
        updateRouteStatus('complete', 'Route ready!');
        
        const info = document.getElementById('routeInfo');
        info.style.display = 'block';
        document.getElementById('routeDistance').textContent = data.distance + ' km';
        document.getElementById('routeETA').textContent = data.eta + ' min';
    })
    .catch(err => {
        showNotification(err.message, "error");
        updateRouteStatus('waiting', 'Error encountered');
    });
}

// Animation Logic
function highlightFullRoute(path) {
    cy.elements().removeClass('highlighted');
    let i = 0;
    function step() {
        if (i >= path.length) return;
        
        const node = cy.getElementById(path[i]);
        node.addClass('highlighted');
        
        if (i < path.length - 1) {
            const edge = cy.edges().filter(e => 
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

function updateRouteStatus(status, msg) {
    const div = document.getElementById('routeStatus');
    div.className = `status-display status-${status}`;
    div.textContent = msg;
}

function showNotification(msg, type) {
    const n = document.getElementById('notification');
    n.textContent = msg;
    n.className = `notification ${type} show`;
    setTimeout(() => n.classList.remove('show'), 3000);
}

function resetApplicationState() {
    // Clear Visuals
    cy.elements().removeClass('highlighted');
    cy.nodes().removeClass('selected');
    selectedCustomerNode = null;

    // Clear Data
    queueArray = [];

    // Clear UI
    renderQueue();
    document.getElementById('productInput').value = '';

    // Reset Status
    updateRouteStatus('waiting', 'Waiting for input...');
    document.getElementById('routeInfo').style.display = 'none';
    document.getElementById('routeDistance').textContent = '-- km';
    document.getElementById('routeETA').textContent = '-- min';

    showNotification("System state reset successfully", "info");
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    initializeGraph();
    
    // Attach event listeners
    const themeSwitcher = document.getElementById('themeSwitcher');
    if (themeSwitcher) {
        themeSwitcher.addEventListener('change', (e) => {
            document.documentElement.setAttribute('data-theme', e.target.value);
            showNotification(`Theme switched to ${e.target.options[e.target.selectedIndex].text}`, "info");
        });
    }

    const resetBtn = document.getElementById('resetMapBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetApplicationState);
    }
    
    // Add Enter key support for product input
    document.getElementById('productInput').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            submitQueue();
        }
    });
});

// Expose to window for global access (needed for onclick)
window.addNode = addNode;
window.addEdge = addEdge;
window.addToQueue = addToQueue;
window.removeFromQueue = removeFromQueue;
window.submitQueue = submitQueue;
window.toggleRoutingMode = toggleRoutingMode;
window.refreshGraphLayout = refreshGraphLayout;
window.updateNodeDropdowns = updateNodeDropdowns;
window.resetApplicationState = resetApplicationState;
