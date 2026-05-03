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

export function removeNode() {
    const id = document.getElementById('deleteNodeSelect').value;
    if (!id) {
        showNotification("Please select a node to delete.", "error");
        return;
    }
    const node = state.cy.getElementById(id);
    if (node.length > 0) {
        if (node.data('type') === 'warehouse') {
            showNotification("Cannot delete the main warehouse.", "error");
            return;
        }
        node.remove();
        updateNodeDropdowns();
        refreshGraphLayout();
        showNotification(`Node ${id} deleted successfully.`, "success");
    }
}

export function removeEdge() {
    const source = document.getElementById('deleteEdgeSource').value;
    const target = document.getElementById('deleteEdgeTarget').value;
    
    if (!source || !target) {
        showNotification("Please select source and target nodes to delete the edge.", "error");
        return;
    }
    
    const edges = state.cy.edges(`[source = "${source}"][target = "${target}"], [source = "${target}"][target = "${source}"]`);
    
    if (edges.length > 0) {
        edges.remove();
        refreshGraphLayout();
        showNotification("Edge deleted successfully.", "success");
    } else {
        showNotification("No connecting edge found between these nodes.", "error");
    }
}

export function clearGraph() {
    const modal = document.getElementById('clearGraphModal');
    if (modal) modal.classList.add('active');
}

export function closeModal() {
    const modal = document.getElementById('clearGraphModal');
    if (modal) modal.classList.remove('active');
}

export function confirmClearGraph() {
    state.cy.elements().not('[type="warehouse"]').remove();
    updateNodeDropdowns();
    refreshGraphLayout();
    closeModal();
    showNotification("Graph cleared entirely.", "success");
}
