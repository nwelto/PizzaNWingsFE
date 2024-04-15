import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { deleteOrder } from '../../API/orderData';

const OrderStatusReadable = {
  0: 'Open',
  1: 'Paid',
  2: 'Closed',
};

function OrderCard({ order, onUpdate }) {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete Order #${order.id}?`)) {
      deleteOrder(order.id).then(onUpdate);
    }
  };

  const calculateTotal = () => order.orderItems.reduce((total, item) => {
    const price = Number(item.menuItem?.price || 0);
    return total + price;
  }, 0);

  return (
    <Card variant="outlined" style={{ backgroundColor: '#333333', color: 'white', marginBottom: '20px' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Order #{order.id}
        </Typography>
        {order.orderItems.map((item) => (
          <Typography key={item.menuItem.id} variant="body2" component="p">
            {item.menuItem?.name} - Price: ${Number(item.menuItem?.price || 0).toFixed(2)}
          </Typography>
        ))}
        <Typography variant="h6" component="div" style={{ marginTop: '10px' }}>
          Total: ${calculateTotal().toFixed(2)}
        </Typography>
        <Typography variant="subtitle1" style={{ marginTop: '10px' }}>
          Status: {OrderStatusReadable[order.orderStatus]}
        </Typography>
        <div style={{ marginTop: '20px' }}>
          <IconButton aria-label="edit" color="primary">
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" color="error" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="more details" color="primary">
            <InfoIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
    orderItems: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      menuItem: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string,
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
      quantity: PropTypes.number,
    })).isRequired,
    orderStatus: PropTypes.number.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default OrderCard;
