import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CircularProgress, Snackbar } from '@mui/material';
import { getOrder, updateOrder } from '../../../API/orderData';
import OrderForm from '../../../components/forms/OrderForm';

export default function EditOrder() {
  const [editOrder, setEditOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getOrder(id)
        .then((data) => {
          if (data) {
            setEditOrder(data);
            setIsLoading(false);
          } else {
            setError('Order not found');
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.error('Failed to fetch order', err);
          setError('Failed to load order');
          setIsLoading(false);
        });
    }
  }, [id]);

  const handleSave = async (updatedOrder) => {
    try {
      await updateOrder(id, updatedOrder);
      router.push('/orders');
    } catch (updateError) {
      console.error('Update failed', updateError);
      setError(`Update failed: ${updateError.message}`);
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Snackbar open autoHideDuration={6000} message={error} onClose={() => setError('')} />;
  }

  if (!editOrder) {
    return <div>Order not found</div>;
  }

  return <OrderForm order={editOrder} onSave={handleSave} isNew={false} />;
}
