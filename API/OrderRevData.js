import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const fetchRevenueData = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/revenue`, {
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
        reject(new Error('Failed to fetch revenue data.'));
      }
    })
    .catch((error) => {
      reject(error);
    });
});

export default fetchRevenueData;
