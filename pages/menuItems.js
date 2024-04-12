import React, { useEffect, useState } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import MenuItemCard from '../components/cards/MenuItemCard';
import { getMenuItems } from '../API/MenuItemData';

function MenuItems() {
  const [menuItems, setMenuItems] = useState([]);

  const getAllMenuItems = () => {
    getMenuItems().then((data) => setMenuItems(data));
  };

  useEffect(() => {
    getAllMenuItems();
  }, []);

  return (
    <div style={{ padding: '20px', minHeight: '100vh' }}>
      <h1 style={{ color: 'white', fontWeight: 'bold' }}>Menu Items</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {menuItems.map((menuItem) => (
          <MenuItemCard key={menuItem.id} menuItem={menuItem} onUpdate={getAllMenuItems} />
        ))}
      </div>
      <Fab
        variant="extended"
        color="primary"
        style={{ position: 'fixed', bottom: '20px', right: '20px' }}
      >
        <AddIcon />
        New Menu Item
      </Fab>
    </div>
  );
}

export default MenuItems;
