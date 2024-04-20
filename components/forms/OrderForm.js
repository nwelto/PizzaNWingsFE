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
import { useRouter } from 'next/router';
import { updateOrder, createOrder } from '../../API/orderData';
import { getMenuItems } from '../../API/MenuItemData';

const OrderForm = ({ order, onSave, isNew = false }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    customerPhone: order?.customerPhone || '',
    customerEmail: order?.customerEmail || '',
    orderType: order?.orderType || '',
    orderStatus: isNew ? '0' : order?.orderStatus.toString(),
    orderItems: order?.orderItems || [],
  });
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState('');

  useEffect(() => {
    let isMounted = true;
    getMenuItems().then((data) => {
      if (isMounted) {
        setMenuItems(data);
      }
    }).catch(console.error);

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
      ...formData,
      orderStatus: parseInt(formData.orderStatus, 10),
      orderItems: formData.orderItems.map((item) => ({
        menuItemId: item.menuItemId,
        quantity: item.quantity,
      })),
    };
    console.log('Submission Data:', submissionData);

    const action = isNew ? createOrder : updateOrder;
    const orderId = router.query.id;
    await action(submissionData, orderId)
      .then((response) => {
        onSave(response);
        router.back();
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
              <MUIMenuItem value="0">Open</MUIMenuItem>
              <MUIMenuItem value="1">Paid</MUIMenuItem>
              <MUIMenuItem value="2">Closed</MUIMenuItem>
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
          {formData.orderItems.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <ListItem key={`${item.menuItemId}-${index}`}>
              <ListItemText
                primary={`${item.name} x ${item.quantity}`}
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
};

OrderForm.propTypes = {
  order: PropTypes.shape({
    customerPhone: PropTypes.string,
    customerEmail: PropTypes.string,
    orderType: PropTypes.string,
    orderStatus: PropTypes.string,
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
