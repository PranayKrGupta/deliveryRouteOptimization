import { state } from './state.js';
import { showNotification } from './utils.js';

export function selectCustomerNode(node) {
    const nodeId = node.data('id');
    if (state.selectedCustomerNode === nodeId) {
        node.removeClass('selected');
        state.selectedCustomerNode = null;
        return;
    }
    if (state.selectedCustomerNode) {
        state.cy.getElementById(state.selectedCustomerNode).removeClass('selected');
    }
    state.selectedCustomerNode = nodeId;
    node.addClass('selected');
    showNotification(`Customer ${nodeId} selected`, 'success');
}

export function addToQueue() {
    const productInput = document.getElementById('productInput');
    const product = productInput.value.trim();

    if (!product || !state.selectedCustomerNode) {
        showNotification('Please enter a product and select a customer node.', 'error');
        return;
    }

    if (state.queueArray.some(e => e.customer === state.selectedCustomerNode)) {
        showNotification(`Customer ${state.selectedCustomerNode} is already in queue.`, 'error');
        return;
    }

    state.queueArray.push({ customer: state.selectedCustomerNode, product });
    renderQueue();
    
    productInput.value = '';
    state.selectedCustomerNode = null;
    state.cy.nodes().removeClass('selected');
}

export function removeFromQueue(index) {
    state.queueArray.splice(index, 1);
    renderQueue();
}

export function renderQueue() {
    const list = document.getElementById('queueCustomerList');
    list.innerHTML = '';
    state.queueArray.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.customer}: ${item.product}</span>
            <button class="remove-btn" data-index="${index}">✕</button>
        `;
        list.appendChild(li);
    });

    // Re-attach event listeners for remove buttons (since they are dynamic)
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.onclick = () => removeFromQueue(parseInt(btn.dataset.index));
    });
}
