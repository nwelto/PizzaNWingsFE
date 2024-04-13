import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteMenuItem } from '../../API/MenuItemData';

function MenuItemCard({ menuItem, onUpdate, onEdit }) {
  const handleDelete = () => {
    if (window.confirm(`Delete ${menuItem.name}?`)) {
      deleteMenuItem(menuItem.id).then(() => onUpdate());
    }
  };

  return (
    <Card variant="outlined" style={{ backgroundColor: '#333333', color: 'white', marginBottom: '20px' }}>
      <CardContent style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%',
      }}
      >
        <div>
          <Typography variant="h5" component="h2">
            {menuItem.name}
          </Typography>
          <Typography color="textSecondary" gutterBottom style={{ marginBottom: '10px', color: 'white' }}>
            Price: ${menuItem.price.toFixed(2)}
          </Typography>
        </div>
        <Typography color="textSecondary" gutterBottom style={{ marginTop: '10px', color: 'white' }}>
          Available: {menuItem.available ? 'Yes' : 'No'}
        </Typography>
        <div>
          <Typography variant="body2" component="p" style={{ marginTop: 'auto', color: 'white' }}>
            Description: {menuItem.description}
          </Typography>
          <IconButton aria-label="edit" color="primary" onClick={() => onEdit(menuItem)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" color="error" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
}

MenuItemCard.propTypes = {
  menuItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    available: PropTypes.bool.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default MenuItemCard;
