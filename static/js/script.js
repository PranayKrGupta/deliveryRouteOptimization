// Global variables
queueArray = [];
let selectedCustomerNode = null;
let cy = null;

// Initialize Cytoscape graph
function initializeGraph() {
    cy = cytoscape({
        container: document.getElementById('cy'),

        elements: [
            // Nodes
            { data: { id: 'W1', label: 'Main Warehouse', type: 'warehouse' } },

            // Customers
            { data: { id: 'C1', label: 'Customer 1', type: 'customer' } },
            { data: { id: 'C2', label: 'Customer 2', type: 'customer' } },
            { data: { id: 'C3', label: 'Customer 3', type: 'customer' } },
            { data: { id: 'C4', label: 'Customer 4', type: 'customer' } },
            { data: { id: 'C5', label: 'Customer 5', type: 'customer' } },
            { data: { id: 'C6', label: 'Customer 6', type: 'customer' } },

            // Junctions
            { data: { id: 'J1', label: 'Junction 1', type: 'junction' } },
            { data: { id: 'J2', label: 'Junction 2', type: 'junction' } },
            { data: { id: 'J3', label: 'Junction 3', type: 'junction' } },
            { data: { id: 'J4', label: 'Junction 4', type: 'junction' } },
            { data: { id: 'J5', label: 'Junction 5', type: 'junction' } },
            { data: { id: 'J6', label: 'Junction 6', type: 'junction' } },
            { data: { id: 'J7', label: 'Junction 7', type: 'junction' } },
            { data: { id: 'J8', label: 'Junction 8', type: 'junction' } },

            // Edges with weights
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
                    'text-valign': 'center',
                    'text-halign': 'center',
                    'color': '#1f2937',
                    'font-size': '12px',
                    'font-weight': 'bold',
                    'width': '60px',
                    'height': '60px',
                    'border-width': '3px',
                    'border-color': '#9ca3af',
                    'text-outline-width': '2px',
                    'text-outline-color': '#ffffff'
                }
            },
            {
                selector: 'node[type="warehouse"]',
                style: {
                    'background-color': '#ef4444',
                    'border-color': '#dc2626',
                    'shape': 'diamond',
                    'width': '70px',
                    'height': '70px'
                }
            },
            {
                selector: 'node[type="customer"]',
                style: {
                    'background-color': '#3b82f6',
                    'border-color': '#2563eb',
                    'shape': 'rectangle'
                }
            },
            {
                selector: 'node[type="junction"]',
                style: {
                    'background-color': '#8b5cf6',
                    'border-color': '#7c3aed',
                    'shape': 'circle',
                    'width': '45px',
                    'height': '45px'
                }
            },
            {
                selector: 'edge',
                style: {
                    'width': '3px',
                    'line-color': '#d1d5db',
                    'curve-style': 'bezier',
                    'label': 'data(weight)',
                    'font-size': '15px',
                    'color': '#6b7280',
                    'text-outline-width': '3px',
                    'text-outline-color': '#ffffff'
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
                    'background-color': '#f59e0b',
                    'border-color': '#d97706',
                    'border-width': '5px'
                }
            },
            {
                selector: 'edge.highlighted',
                style: {
                    'line-color': '#f59e0b',
                    'target-arrow-color': '#f59e0b',
                    'width': '6px'
                }
            }
        ],

        layout: {
            name: 'preset',
            positions: {
                'W1': { x: 100, y: 300 },
                'J1': { x: 200, y: 300 },
                'J2': { x: 300, y: 200 },
                'J3': { x: 400, y: 250 },
                'J4': { x: 500, y: 300 },
                'J5': { x: 600, y: 200 },
                'J6': { x: 700, y: 250 },
                'J7': { x: 800, y: 300 },
                'J8': { x: 900, y: 350 },
                'C1': { x: 150, y: 150 },
                'C2': { x: 250, y: 100 },
                'C3': { x: 350, y: 150 },
                'C4': { x: 450, y: 100 },
                'C5': { x: 550, y: 100 },
                'C6': { x: 650, y: 150 }
            }
        }
    });

    // Add click event for customer selection
    cy.on('tap', 'node', function (evt) {
        const node = evt.target;
        if (node.data('type') === 'customer') {
            selectCustomerNode(node);
        }
    });

    // Add hover tooltips
    cy.on('mouseover', 'node', function (evt) {
        const node = evt.target;
        node.style('text-outline-width', '3px');
    });

    cy.on('mouseout', 'node', function (evt) {
        const node = evt.target;
        node.style('text-outline-width', '2px');
    });
}

let optimizationEnabled = false;

function toggleRoutingMode() {
    optimizationEnabled = document.getElementById('modeSwitch').checked;
    let mes = optimizationEnabled
            ? "Route Optimization Enabled: Nearest Neighbor algorithm"
            : "Sequential Mode Enabled: Visiting customers in queue order";
    showNotification(
        mes,"info"
    );
}

// Select customer node function
function selectCustomerNode(node) {
    const nodeId = node.data('id');

    // If the node is already selected, deselect it
    if (selectedCustomerNode === nodeId) {
        node.removeClass('selected');
        selectedCustomerNode = null;
        showNotification(`Deselected ${node.data('label')}`, 'info');
        return;
    }

    // Deselect any previously selected node
    if (selectedCustomerNode) {
        const previousNode = cy.getElementById(selectedCustomerNode);
        previousNode.removeClass('selected');
    }

    // Select the new node
    selectedCustomerNode = nodeId;
    node.addClass('selected');

    showNotification('Customer selected: ' + node.data('label'), 'success');
}

// Submit product function (placeholder for backend integration)
function submitQueue() {
    if (queueArray.length === 0) {
        showNotification("Queue is empty! Add at least one customer and product.", "error");
        return;
    }

    updateRouteStatus('processing', 'Processing delivery route...');

    const routeEndpoint = optimizationEnabled ? '/route_optimized' : '/route_sequential';

    fetch(routeEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ queue: queueArray })
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                showNotification(data.error, "error");
                updateRouteStatus('waiting', 'Error processing route');
                return;
            }
            const path = data.path;
            highlightFullRoute(path);
            updateRouteStatus('complete', `Route generated via ${optimizationEnabled ? 'Optimized' : 'Sequential'} mode.`);

            document.getElementById('routeInfo').style.display = 'block';
            document.getElementById('routeDistance').textContent = data.distance + ' km';
            document.getElementById('routeETA').textContent = data.eta + ' min';

            showNotification("Route calculated!", "success");
        })
        .catch(err => {
            console.error(err);
            showNotification("Backend error. Please try again.", "error");
            updateRouteStatus('waiting', 'Waiting for input...');
        });
}

function addToQueue() {
    const product = document.getElementById('productInput').value.trim();

    if (!product || !selectedCustomerNode) {
        showNotification('Please enter a product and select a customer.', 'error');
        return;
    }

    // Check for duplicate customer
    const alreadyInQueue = queueArray.some(entry => entry.customer === selectedCustomerNode);
    if (alreadyInQueue) {
        showNotification(`Customer ${selectedCustomerNode} is already in the queue.`, 'error');
        return;
    }

    // Add to queue
    queueArray.push({ customer: selectedCustomerNode, product });

    // Visual confirmation
    const node = cy.getElementById(selectedCustomerNode);
    node.addClass('selected'); // Visually mark as selected

    // Update queue list visually
    const queueDisplay = document.getElementById('queueCustomerList');
    const listItem = document.createElement('li');
    listItem.textContent = `${selectedCustomerNode} → ${product}`;
    queueDisplay.appendChild(listItem);

    // Reset input and selection
    document.getElementById('productInput').value = '';
    selectedCustomerNode = null;

    showNotification(`Added ${queueArray[queueArray.length - 1].customer} to queue.`, 'success');
}

// Highlight full route function with animation
function highlightFullRoute(pathArray) {
    // Clear previous highlights
    cy.elements().removeClass('highlighted');

    // Animate route highlighting step by step
    let currentIndex = 0;

    function animateNextStep() {
        if (currentIndex >= pathArray.length) {
            return; // Animation complete
        }

        // Highlight current nodes
        const currentNode = cy.getElementById(pathArray[currentIndex]);
        currentNode.addClass('highlighted');

        // Add pulsing animation to current node
        currentNode.animate({
            style: {
                'width': '80px',
                'height': '80px'
            }
        }, {
            duration: 300,
            complete: function () {
                currentNode.animate({
                    style: {
                        'width': currentNode.data('type') === 'warehouse' ? '70px' :
                            currentNode.data('type') === 'junction' ? '45px' : '60px',
                        'height': currentNode.data('type') === 'warehouse' ? '70px' :
                            currentNode.data('type') === 'junction' ? '45px' : '60px'
                    }
                }, {
                    duration: 200
                });
            }
        });

        // Highlight edge to next node
        if (currentIndex < pathArray.length - 1) {
            const source = pathArray[currentIndex];
            const target = pathArray[currentIndex + 1];

            // Find edge between source and target
            const edge = cy.edges().filter(function (ele) {
                return (ele.source().id() === source && ele.target().id() === target) ||
                    (ele.source().id() === target && ele.target().id() === source);
            });

            setTimeout(() => {
                edge.addClass('highlighted');

                // Animate edge
                edge.animate({
                    style: {
                        'width': '8px'
                    }
                }, {
                    duration: 300,
                    complete: function () {
                        edge.animate({
                            style: {
                                'width': '6px'
                            }
                        }, {
                            duration: 200
                        });
                    }
                });
            }, 150);
        }

        currentIndex++;
        setTimeout(animateNextStep, 600); // Next step after 600ms
    }

    // Start animation
    animateNextStep();
}

// Update route status
function updateRouteStatus(status, message) {
    const statusDiv = document.getElementById('routeStatus');
    statusDiv.className = 'status-display status-' + status;
    statusDiv.textContent = message;
}

// Show notification
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Reset route function
function resetRoute() {
    cy.elements().removeClass('highlighted');
    selectedCustomerNode = null;
    cy.nodes().removeClass('selected');
    document.getElementById('selectedCustomerDisplay').style.display = 'none';
    document.getElementById('routeInfo').style.display = 'none';
    document.getElementById('productInput').value = '';
    updateRouteStatus('waiting', 'Waiting for input...');
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    initializeGraph();

    // Add Enter key support for product input
    document.getElementById('productInput').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            submitQueue();
        }
    });
});

// Expose functions for backend integration
window.LogisticsDelivery = {
    highlightFullRoute: highlightFullRoute,
    selectCustomerNode: function (nodeId) {
        const node = cy.getElementById(nodeId);
        if (node.length > 0) {
            selectCustomerNode(node);
        }
    },
    resetRoute: resetRoute,
    getSelectedCustomer: function () {
        return selectedCustomerNode;
    },
    updateRouteStatus: updateRouteStatus,
    showNotification: showNotification
};
