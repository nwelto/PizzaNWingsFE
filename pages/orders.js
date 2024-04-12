import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import { getOrders } from '../API/orderData';
import OrderCard from '../components/cards/OrderCard';

function Orders() {
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getOrders().then(setOrders).catch((err) => console.error('Failed to fetch orders:', err));
  }, []);

  const handleUpdate = () => {
    getOrders().then(setOrders).catch((err) => console.error('Failed to update orders:', err));
  };

  const handleNewOrder = () => {
    router.push('/create-order');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        padding: 25,
        backgroundColor: '#000',
        color: 'white',
      }}
    >
      <Typography variant="h4" sx={{ mt: 2, fontWeight: 'bold', color: 'white' }}>
        Orders Dashboard
      </Typography>
      <div style={{
        marginTop: 20, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}
      >
        {orders.length ? (
          orders.map((order) => (
            <OrderCard key={order.id} order={order} onUpdate={handleUpdate} />
          ))
        ) : (
          <Typography>No Orders Found</Typography>
        )}
      </div>
      <Fab
        variant="extended"
        color="primary"
        aria-label="add"
        style={{ position: 'fixed', bottom: '20px', right: '20px' }}
        onClick={handleNewOrder}
      >
        <AddIcon />
        New Order
      </Fab>
    </div>
  );
}

export default Orders;
