import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const createOrderItem = (orderId, menuItemId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orderItems`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ orderId, menuItemId }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(data);
      } else {
        reject(new Error('Failed to create order item.'));
      }
    })
    .catch(reject);
});

const deleteOrderItem = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orderItems/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        resolve({ message: `OrderItem with ID ${id} has been successfully deleted.` });
      } else {
        reject(new Error(`Failed to delete order item with ID ${id}.`));
      }
    })
    .catch(reject);
});
const getOrderItems = (orderId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orderItems/order/${orderId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        resolve(data);
      } else {
        reject(new Error(`No order items found for Order ID ${orderId}.`));
      }
    })
    .catch((error) => {
      console.error('Failed to fetch order items:', error);
      reject(new Error('Error fetching order items.'));
    });
});
export {
  createOrderItem,
  deleteOrderItem,
  getOrderItems,
};
