import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box, TextField, Button, Typography, Modal, InputAdornment,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { getMenuItem, updateMenuItem, createMenuItem } from '../../API/MenuItemData';

function MenuItemForm({ menuItemId, onClose, refreshMenuItems }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    available: true,
  });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (menuItemId) {
      getMenuItem(menuItemId).then((data) => {
        if (data) {
          setFormData({
            name: data.name,
            price: data.price,
            description: data.description,
            available: data.available,
          });
        }
      });
    } else {
      setFormData({
        name: '',
        price: '',
        description: '',
        available: true,
      });
    }
  }, [menuItemId]);

  const handleChange = (event) => {
    const {
      name, value, type, checked,
    } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      name: formData.name,
      price: parseFloat(formData.price),
      description: formData.description,
      available: formData.available,
    };
    const action = menuItemId ? () => updateMenuItem(menuItemId, payload) : () => createMenuItem(payload);

    try {
      await action();
      enqueueSnackbar(`Menu item ${menuItemId ? 'updated' : 'created'} successfully!`, { variant: 'success' });
      refreshMenuItems();
      onClose();
    } catch (error) {
      enqueueSnackbar(`Failed to ${menuItemId ? 'update' : 'create'} menu item.`, { variant: 'error' });
      console.error('Form submission error:', error);
    }
  };

  const formTitle = menuItemId ? 'Edit Menu Item' : 'Add New Menu Item';

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
        '& .MuiTextField-root': { marginBottom: 2 },
        '& .MuiInputBase-input': { color: 'white' },
        '& .MuiInputAdornment-root': { color: 'white' },
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
        '& .MuiInputLabel-root': { color: 'white' },
        '& .MuiButton-root': { marginTop: 2 },
      }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {formTitle}
        </Typography>
        <Box
          component="form"
          sx={{ mt: 2 }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label=""
            variant="outlined"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            required
          />
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            name="description"
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
          />
          <Button type="submit" color="primary" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

MenuItemForm.propTypes = {
  menuItemId: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  refreshMenuItems: PropTypes.func.isRequired,
};

MenuItemForm.defaultProps = {
  menuItemId: null,
};

export default MenuItemForm;
