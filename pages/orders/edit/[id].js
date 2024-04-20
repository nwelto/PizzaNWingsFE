import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, CircularProgress } from '@mui/material';
import { getOrder } from '../../../API/orderData';
import OrderForm from '../../../components/forms/OrderForm';

export default function EditOrder() {
  const [editOrder, setEditOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (id) {
          const order = await getOrder(id);
          setEditOrder(order);
        }
      } catch (error) {
        console.error('Failed to fetch order', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleSave = (updatedOrder) => {
    console.log('Updated order:', updatedOrder);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!editOrder) {
    return <div>Order not found</div>;
  }

  return <OrderForm order={{ ...editOrder, orderStatus: editOrder.orderStatus.toString() }} onSave={handleSave} />;
}
