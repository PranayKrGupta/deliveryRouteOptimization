import { state } from './state.js';
import { showNotification } from './utils.js';

export function refreshGraphLayout() {
    state.cy.layout({
        name: 'cose',
        animate: true,
        fit: true,
        idealEdgeLength: 150,
        nodeRepulsion: 800000,
        gravity: 0.25
    }).run();
}

export function updateNodeDropdowns() {
    const selects = [
        'edgeSource', 'edgeTarget', 
        'deleteNodeSelect', 'deleteEdgeSource', 'deleteEdgeTarget'
    ];
    
    const elements = selects.map(id => document.getElementById(id)).filter(el => el);
    
    if (elements.length === 0) return;

    const placeholders = elements.map(el => el.options[0]);
    
    elements.forEach(el => el.innerHTML = '');
    
    elements.forEach((el, i) => {
        if (placeholders[i]) el.appendChild(placeholders[i]);
    });
    
    state.cy.nodes().forEach(node => {
        const id = node.id();
        const label = node.data('label') || id;
        const type = node.data('type');
        
        elements.forEach(el => {
            if (el.id === 'deleteNodeSelect' && type === 'warehouse') {
                return;
            }
            el.add(new Option(label, id));
        });
    });
}

export function initializeGraph(selectCustomerNode) {
    state.cy = cytoscape({
        container: document.getElementById('cy'),
        boxSelectionEnabled: false,
        autounselectify: false,
        elements: [
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

    state.cy.on('tap', 'node', function (evt) {
        const node = evt.target;
        if (node.data('type') === 'customer') {
            selectCustomerNode(node);
        }
    });

    state.cy.on('mouseover', 'node', function (evt) {
        evt.target.style('text-outline-width', '3px');
    });

    state.cy.on('mouseout', 'node', function (evt) {
        evt.target.style('text-outline-width', '2px');
    });

    updateNodeDropdowns();
}
