import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Card, CardContent, Typography, IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LockIcon from '@mui/icons-material/Lock';
import { getOrder, updateOrder, deleteOrder } from '../../API/orderData';

function ViewOrder() {
  const [orderDetails, setOrderDetails] = useState({
    orderItems: [],
    customerPhone: '',
    customerEmail: '',
    orderStatus: 0,
  });
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getOrder(id).then(setOrderDetails);
    }
  }, [id]);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete Order #${id}?`)) {
      deleteOrder(id).then(() => router.push('/orders'));
    }
  };

  const handlePay = () => {
    updateOrder(id, { orderStatus: 1 }).then(() => {
      setOrderDetails((prev) => ({ ...prev, orderStatus: 1 }));
    });
  };

  const handleCloseOrder = () => {
    updateOrder(id, { orderStatus: 2 }).then(() => {
      setOrderDetails((prev) => ({ ...prev, orderStatus: 2 }));
    });
  };

  const calculateTotal = () => orderDetails.orderItems.reduce((total, item) => {
    const price = Number(item.menuItem?.price || 0);
    return total + price;
  }, 0);

  return (
    <div style={{
      padding: '20px', minHeight: '100vh', backgroundColor: 'black', color: 'white',
    }}
    >
      <Card variant="outlined" style={{ backgroundColor: '#333333', color: 'white', margin: '15px' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Order #{orderDetails.id}
          </Typography>
          <Typography variant="body2" component="p">
            Customer Phone: {orderDetails.customerPhone}
          </Typography>
          <Typography variant="body2" component="p">
            Customer Email: {orderDetails.customerEmail}
          </Typography>
          {orderDetails.orderItems.map((item) => (
            <Typography key={item.menuItem.id} variant="body2" component="p">
              {item.menuItem?.name} - Price: ${Number(item.menuItem?.price || 0).toFixed(2)}
            </Typography>
          ))}
          <Typography variant="h6" component="div" style={{ marginTop: '10px' }}>
            Total: ${calculateTotal().toFixed(2)}
          </Typography>
          <Typography variant="subtitle1">
            Status: {['Open', 'Paid', 'Closed'][orderDetails.orderStatus]}
          </Typography>
          <div>
            {orderDetails.orderStatus === 0 && (
              <IconButton color="primary" onClick={handlePay}>
                <ShoppingCartIcon />
              </IconButton>
            )}
            {orderDetails.orderStatus === 1 && (
              <IconButton color="secondary" onClick={handleCloseOrder}>
                <LockIcon />
              </IconButton>
            )}
            <IconButton color="primary" onClick={() => router.push(`/orders/edit/${id}`)}>
              <EditIcon />
            </IconButton>
            <IconButton color="error" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ViewOrder;
