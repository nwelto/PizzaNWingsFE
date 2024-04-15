import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import OrderCard from '../components/cards/OrderCard';
import OrderForm from '../components/forms/OrderForm';
import { getOrders } from '../API/orderData';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    getOrders().then(setOrders).catch((err) => console.error('Failed to fetch orders:', err));
  }, []);

  const handleUpdate = () => {
    getOrders().then(setOrders).catch((err) => console.error('Failed to update orders:', err));
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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
            <OrderCard key={order.id} order={order} onUpdate={handleUpdate} />
          ))
        ) : (
          <Typography>No Orders Found</Typography>
        )}
      </div>
      <Fab
        variant="extended"
        color="primary"
        style={{ position: 'fixed', bottom: 20, right: 20 }}
        onClick={handleOpenModal}
      >
        <AddIcon />
        New Order
      </Fab>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: 400,
        }}
        >
          <OrderForm onClose={handleCloseModal} refreshOrders={handleUpdate} />
        </Box>
      </Modal>
    </div>
  );
}

export default Orders;
