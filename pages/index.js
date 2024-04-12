import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  const buttonStyles = {
    connectedButton: {
      bgcolor: 'transparent',
      border: 'none',
      color: 'white',
      borderRadius: 0,
      '&:hover': {
        bgcolor: 'rgba(255, 255, 255, 0.1)',
      },
    },
    orders: {
      bgcolor: 'primary.main',
      '&:hover': {
        bgcolor: 'primary.dark',
      },
    },
    menuItems: {
      bgcolor: 'secondary.main',
      '&:hover': {
        bgcolor: 'secondary.dark',
      },
    },
    revenue: {
      bgcolor: 'success.main',
      '&:hover': {
        bgcolor: 'success.dark',
      },
    },
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '50vh',
        padding: 25,
      }}
    >
      {user && user.fbUser && (
        <Typography variant="h4" sx={{ mt: 2, color: 'white', fontWeight: 'bold' }}>
          {user.fbUser.displayName}
        </Typography>
      )}
      <ButtonGroup variant="contained" aria-label="Basic button group" sx={{ marginTop: 20 }}>
        <Link href="/orders" passHref>
          <Button sx={{ ...buttonStyles.orders, borderRadius: '4px 0px 0px 4px' }} size="large">
            Orders
          </Button>
        </Link>
        <Link href="/menuItems" passHref>
          <Button sx={{ ...buttonStyles.menuItems }} size="large">
            Menu Items
          </Button>
        </Link>
        <Link href="/revenue" passHref>
          <Button sx={{ ...buttonStyles.revenue, borderRadius: '0px 4px 4px 0px' }} size="large">
            Revenue
          </Button>
        </Link>
      </ButtonGroup>
    </div>
  );
}

export default Home;
