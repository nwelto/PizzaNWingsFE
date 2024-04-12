import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const createMenuItem = (menuItem) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/menuitems`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(menuItem),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

const getMenuItem = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/menuitems/${id}`, {
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

const getMenuItems = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/menuitems`, {
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

const updateMenuItem = (id, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/menuitems/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteMenuItem = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/menuitems/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(() => resolve({ message: `MenuItem with ID ${id} has been successfully deleted.` }))
    .catch(reject);
});

export {
  createMenuItem, getMenuItem, getMenuItems, updateMenuItem, deleteMenuItem,
};
