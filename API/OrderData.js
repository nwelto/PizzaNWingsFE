import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const createOrder = (order) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getOrder = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orders/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(data);
      } else {
        resolve(null);
      }
    })
    .catch(reject);
});

const getOrders = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(data);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const updateOrder = (id, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orders/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteOrder = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orders/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(() => resolve({ message: `Order with ID ${id} has been successfully deleted.` }))
    .catch(reject);
});

export {
  createOrder, getOrder, getOrders, updateOrder, deleteOrder,
};
