import React from 'react';
import OrderForm from '../../components/forms/OrderForm';

export default function AddOrder() {
  const handleSave = (response) => {
    console.warn('Order saved', response);
  };

  return (
    <OrderForm onSave={handleSave} isNew />
  );
}
