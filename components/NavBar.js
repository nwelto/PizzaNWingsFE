import React, { useState } from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { ListItemText } from '@mui/material';
import Divider from '@mui/material/Divider';
import ButtonBase from '@mui/material/ButtonBase';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';

export default function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user } = useAuth();

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const DrawerList = (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      style={{ width: 250, backgroundColor: '#424242', color: 'white' }}
    >
      <List>
        {['Home', 'Menu Items', 'Orders', 'Revenue'].map((text) => {
          // eslint-disable-next-line no-nested-ternary
          const href = text === 'Home' ? '/' : text === 'Menu Items' ? '/menuItems' : text === 'Orders' ? '/orders' : '/revenue';
          return (
            <Link href={href} passHref key={text}>
              <ButtonBase component="a" style={{ width: '100%' }}>
                <ListItem>
                  <ListItemText primary={text} />
                </ListItem>
              </ButtonBase>
            </Link>
          );
        })}
      </List>
      <Divider />
      <List>
        <ListItem>
          <ButtonBase onClick={signOut} style={{ width: '100%' }}>
            <ListItemText primary="Sign Out" />
          </ButtonBase>
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img src="/pnw.png" alt="App Logo" style={{ height: '80px', marginRight: '10px' }} />
          </Typography>
          {user && user.fbUser && (
            <Avatar alt="Profile" src={user.fbUser.photoURL} />
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { backgroundColor: '#424242', color: 'white' },
        }}
      >
        {DrawerList}
      </Drawer>
    </>
  );
}
