import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem as MUIMenuItem,
  FormControl,
  Select,
  InputLabel,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useRouter } from 'next/router'; // Import useRouter
import { updateOrder, createOrder } from '../../API/orderData'; // Import updateOrder and createOrder
import { getMenuItems } from '../../API/MenuItemData';

function OrderForm({ order, onSave, isNew = false }) {
  const router = useRouter(); // Initialize useRouter
  const [formData, setFormData] = useState({
    customerPhone: order?.customerPhone || '',
    customerEmail: order?.customerEmail || '',
    orderType: order?.orderType || '',
    orderStatus: isNew ? 0 : order?.orderStatus || 0,
    orderItems: [],
  });
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState('');

  useEffect(() => {
    let isMounted = true;
    getMenuItems()
      .then((data) => {
        if (isMounted) {
          setMenuItems(data);
        }
      })
      .catch(console.error);

    return () => { isMounted = false; };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMenuItemChange = (event) => {
    setSelectedMenuItem(event.target.value);
  };

  const addMenuItemToOrder = () => {
    const itemToAdd = menuItems.find((item) => item.id === parseInt(selectedMenuItem, 10));
    if (itemToAdd) {
      const newItem = {
        menuItemId: itemToAdd.id,
        name: itemToAdd.name,
        price: itemToAdd.price,
        quantity: 1,
      };
      setFormData((prev) => ({
        ...prev,
        orderItems: [...prev.orderItems, newItem],
      }));
      setSelectedMenuItem('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const submissionData = {
      customerPhone: formData.customerPhone,
      customerEmail: formData.customerEmail,
      orderType: formData.orderType,
      orderStatusString: formData.orderStatus.toString(), // Convert orderStatus to string if necessary
      orderItems: formData.orderItems.map((item) => ({
        menuItemId: item.menuItemId,
        quantity: item.quantity,
      })), // Make sure this contains the necessary data structure
    };

    const orderId = order.id; // Get the order ID from the current order
    const action = isNew ? createOrder : updateOrder; // Determine the action based on isNew
    await action(orderId, submissionData) // Call the appropriate action
      .then((response) => {
        onSave(response);
        router.back(); // Navigate back after saving
      })
      .catch((error) => {
        console.error('API Error:', error);
        alert(`API Error: ${error.message}`);
      });
  };

  return (
    <Paper sx={{ p: 2, backgroundColor: 'white', color: 'black' }}>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Typography variant="h6">{isNew ? 'Create New Order' : 'Edit Order Details'}</Typography>
        <TextField
          margin="normal"
          fullWidth
          label="Customer Phone"
          name="customerPhone"
          value={formData.customerPhone}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Customer Email"
          name="customerEmail"
          value={formData.customerEmail}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Order Type</InputLabel>
          <Select
            name="orderType"
            value={formData.orderType}
            label="Order Type"
            onChange={handleChange}
          >
            <MUIMenuItem value="Takeout">Takeout</MUIMenuItem>
            <MUIMenuItem value="Delivery">Delivery</MUIMenuItem>
          </Select>
        </FormControl>
        {!isNew && (
          <FormControl fullWidth margin="normal">
            <InputLabel>Order Status</InputLabel>
            <Select
              name="orderStatus"
              value={formData.orderStatus}
              label="Order Status"
              onChange={handleChange}
            >
              <MUIMenuItem value={0}>Open</MUIMenuItem>
              <MUIMenuItem value={1}>Paid</MUIMenuItem>
              <MUIMenuItem value={2}>Closed</MUIMenuItem>
            </Select>
          </FormControl>
        )}
        <FormControl fullWidth margin="normal">
          <InputLabel id="menu-item-select-label">Menu Item</InputLabel>
          <Select
            labelId="menu-item-select-label"
            value={selectedMenuItem}
            label="Menu Item"
            onChange={handleMenuItemChange}
          >
            {menuItems.map((item) => (
              <MUIMenuItem key={item.id} value={item.id}>
                {item.name} - ${item.price.toFixed(2)}
              </MUIMenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={addMenuItemToOrder} variant="contained" sx={{ mt: 1, mb: 2 }}>
          Add Item to Order
        </Button>
        <List>
          {formData.orderItems.map((item) => (
            <ListItem key={`${item.menuItemId}-${item.name}`}>
              <ListItemText
                primary={`${item.name}`}
                secondary={`Quantity: ${item.quantity}`}
              />
            </ListItem>
          ))}
        </List>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {isNew ? 'Create Order' : 'Save Changes'}
        </Button>
      </Box>
    </Paper>
  );
}

OrderForm.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    customerPhone: PropTypes.string,
    customerEmail: PropTypes.string,
    orderType: PropTypes.string,
    orderStatus: PropTypes.number,
    orderItems: PropTypes.arrayOf(PropTypes.shape({
      menuItemId: PropTypes.number,
      name: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
    })),
  }),
  onSave: PropTypes.func.isRequired,
  isNew: PropTypes.bool,
};

OrderForm.defaultProps = {
  order: {},
  isNew: false,
};

export default OrderForm;
