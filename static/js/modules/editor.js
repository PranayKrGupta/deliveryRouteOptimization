import { state } from './state.js';
import { showNotification } from './utils.js';
import { refreshGraphLayout, updateNodeDropdowns } from './graph.js';

export function addNode() {
    const idInput = document.getElementById('nodeId');
    const typeSelect = document.getElementById('nodeType');
    const id = idInput.value.trim();
    const type = typeSelect.value;

    if (!id) {
        alert("Error: Node ID cannot be empty.");
        return;
    }

    if (state.cy.getElementById(id).length > 0) {
        alert(`Error: Node ID "${id}" already exists in the map.`);
        return;
    }

    state.cy.add({
        group: 'nodes',
        data: { id: id, label: id, type: type }
    });

    idInput.value = '';
    updateNodeDropdowns();
    refreshGraphLayout();
    showNotification(`Node ${id} created successfully.`, "success");
}

export function addEdge() {
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

    if (state.cy.getElementById(source).length === 0) {
        alert(`Error: Source node "${source}" does not exist!`);
        return;
    }

    if (state.cy.getElementById(target).length === 0) {
        alert(`Error: Target node "${target}" does not exist!`);
        return;
    }

    if (isNaN(weight) || weight <= 0) {
        alert("Error: Weight must be a valid number greater than 0.");
        return;
    }

    const edgeId = `e_${source}_${target}_${Date.now()}`;
    state.cy.add({
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
