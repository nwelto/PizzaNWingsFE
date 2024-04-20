import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import OrderCard from '../components/cards/OrderCard';
import { getOrders } from '../API/orderData';

function Orders() {
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  const fetchOrders = () => {
    getOrders().then(setOrders).catch((err) => console.error('Failed to fetch orders:', err));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div style={{
      padding: 25, minHeight: '100vh', backgroundColor: '#000', color: 'white',
    }}
    >
      <Typography variant="h4" sx={{ mt: 2, fontWeight: 'bold' }}>
        Orders Dashboard
      </Typography>
      <div style={{ marginTop: 20, width: '100%' }}>
        {orders.length ? (
          orders.map((order) => (
            <OrderCard key={order.id} order={order} onUpdate={fetchOrders} />
          ))
        ) : (
          <Typography>No Orders Found</Typography>
        )}
      </div>
      <Fab
        variant="extended"
        color="primary"
        style={{ position: 'fixed', bottom: 20, right: 20 }}
        onClick={() => router.push('/orders/new')}
      >
        <AddIcon />
        New Order
      </Fab>
    </div>
  );
}

export default Orders;
