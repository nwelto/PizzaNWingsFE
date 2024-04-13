import React, { useEffect, useState } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import MenuItemCard from '../components/cards/MenuItemCard';
import { getMenuItems } from '../API/MenuItemData';
import MenuItemForm from '../components/forms/MenuItemForm';

function MenuItems() {
  const [menuItems, setMenuItems] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const getAllMenuItems = () => {
    getMenuItems().then(setMenuItems);
  };

  useEffect(() => {
    getAllMenuItems();
  }, []);

  const handleOpen = (item) => {
    setCurrentItem(item);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setCurrentItem(null);
  };

  return (
    <div style={{ padding: '20px', minHeight: '100vh', backgroundColor: 'black' }}>
      <h1 style={{ color: 'white', fontWeight: 'bold' }}>Menu Items</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {menuItems.map((menuItem) => (
          <MenuItemCard key={menuItem.id} menuItem={menuItem} onUpdate={getAllMenuItems} onEdit={handleOpen} />
        ))}
      </div>
      <Fab
        variant="extended"
        color="primary"
        style={{ position: 'fixed', bottom: '20px', right: '20px' }}
        onClick={() => handleOpen(null)}
      >
        <AddIcon />
        New Menu Item
      </Fab>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: '80%', maxWidth: 400,
        }}
        >
          <MenuItemForm menuItemId={currentItem?.id} onClose={handleClose} refreshMenuItems={getAllMenuItems} />
        </Box>
      </Modal>
    </div>
  );
}

export default MenuItems;
