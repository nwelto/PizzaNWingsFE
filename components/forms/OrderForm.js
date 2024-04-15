import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box, TextField, Button, Typography, Modal, Select, MenuItem, InputLabel, FormControl,
  IconButton, List, ListItem,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useSnackbar } from 'notistack';
import { createOrder } from '../../API/orderData';
import { getMenuItems } from '../../API/MenuItemData';

function OrderForm({ onClose, refreshOrders }) {
  const [formData, setFormData] = useState({
    customerPhone: '',
    customerEmail: '',
    orderType: '',
    orderItems: [],
  });
  const [menuItems, setMenuItems] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getMenuItems().then(setMenuItems);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleItemChange = (uniqueId, field, value) => {
    const newOrderItems = formData.orderItems.map((item) => (item.uniqueId === uniqueId ? { ...item, [field]: value } : item));
    setFormData({ ...formData, orderItems: newOrderItems });
  };

  const addItem = () => {
    setFormData((prevState) => ({
      ...prevState,
      orderItems: [...prevState.orderItems, {
        menuItemId: menuItems[0]?.id || '',
        quantity: 1,
        uniqueId: Date.now() + Math.random(),
      }],
    }));
  };

  const removeItem = (uniqueId) => {
    const newOrderItems = formData.orderItems.filter((item) => item.uniqueId !== uniqueId);
    setFormData({ ...formData, orderItems: newOrderItems });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createOrder(formData);
      enqueueSnackbar('Order created successfully!', { variant: 'success' });
      refreshOrders();
      onClose();
    } catch (error) {
      enqueueSnackbar('Failed to create order.', { variant: 'error' });
      console.error('Order submission error:', error);
    }
  };

  return (
    <Modal open onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#333',
        color: 'white',
        boxShadow: 24,
        p: 4,
        '& .MuiTextField-root': { margin: '8px 0' },
        '& .MuiSelect-root': { color: 'white' },
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
        '& .MuiInputLabel-root': { color: 'white' },
      }}
      >
        <Typography variant="h6" component="h2">
          Create New Order
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          sx={{ mt: 2 }}
        >
          <TextField
            fullWidth
            label="Customer Phone"
            variant="outlined"
            name="customerPhone"
            value={formData.customerPhone}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Customer Email"
            variant="outlined"
            name="customerEmail"
            value={formData.customerEmail}
            onChange={handleChange}
            required
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="order-type-label">Order Type</InputLabel>
            <Select
              labelId="order-type-label"
              label="Order Type"
              name="orderType"
              value={formData.orderType}
              onChange={handleChange}
              required
            >
              <MenuItem value="Takeout">Takeout</MenuItem>
              <MenuItem value="Delivery">Delivery</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
            Order Items
          </Typography>
          <List>
            {formData.orderItems.map((item) => (
              <ListItem
                key={item.uniqueId}
                sx={{
                  pl: 0, pr: 0, bgcolor: '#444', mb: 1,
                }}
              >
                <FormControl fullWidth>
                  <Select
                    value={item.menuItemId}
                    onChange={(e) => handleItemChange(item.uniqueId, 'menuItemId', e.target.value)}
                    displayEmpty
                  >
                    {menuItems.map((menuItem) => (
                      <MenuItem key={menuItem.id} value={menuItem.id}>
                        {menuItem.name} - ${menuItem.price.toFixed(2)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <IconButton edge="end" aria-label="delete" onClick={() => removeItem(item.uniqueId)}>
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <Button startIcon={<AddCircleOutlineIcon />} onClick={addItem} sx={{ mb: 2 }}>
            Add Item
          </Button>
          <Button type="submit" color="primary" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Create Order
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

OrderForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  refreshOrders: PropTypes.func.isRequired,
};

export default OrderForm;
