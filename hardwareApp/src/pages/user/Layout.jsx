import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Badge, BottomNavigation, BottomNavigationAction, Box, Container } from '@mui/material';
import { ShoppingCart, Store, ReceiptLong, Person, Logout } from '@mui/icons-material';
import ReservationService from './services/ReservationService';
import ReservationDrawer from './components/ReservationDrawer.jsx';

function Layout({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();

  const getBottomNavValue = () => {
    if (location.pathname === '/user') return 0;
    if (location.pathname.startsWith('/user/orders')) return 1;
    if (location.pathname.startsWith('/user/profile')) return 2;
    return 0;
  };

  const handleBottomNavChange = (event, newValue) => {
    switch (newValue) {
      case 0:
        navigate('/user');
        break;
      case 1:
        navigate('/user/orders');
        break;
      case 2:
        navigate('/user/profile');
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    if (setIsLoggedIn) setIsLoggedIn(false);
    navigate('/user/login');
  };

  const [reservationCount, setReservationCount] = React.useState(
    ReservationService.getItems().reduce((total, item) => total + (item.qty || 1), 0)
  );

  React.useEffect(() => {
    const handler = () => {
      const count = ReservationService.getItems().reduce((total, item) => total + (item.qty || 1), 0);
      setReservationCount(count);
    };
    window.addEventListener('reservationUpdated', handler);
    return () => window.removeEventListener('reservationUpdated', handler);
  }, []);

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const handleConfirmFromDrawer = (items, subtotal) => {
    setDrawerOpen(false);
    navigate('/user/reservation/receipt', { state: { items, subtotal, deliveryFee: 0, total: subtotal } });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="sticky" elevation={2} sx={{ background: 'linear-gradient(90deg, #212121 0%, #303030 100%)', color: '#ffffff' }}>
        <Toolbar>
          <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: '#ffffff' }}>
              Hardware
            </Typography>
          </Box>
          <IconButton onClick={() => setDrawerOpen(true)} sx={{ mr: 1, color: '#ffffff' }}>
            <Badge badgeContent={reservationCount} color="warning">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <IconButton onClick={handleLogout} sx={{ color: '#d32f2f' }}>
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ flex: 1, py: 2 }}>
        <Outlet />
      </Container>

      <BottomNavigation value={getBottomNavValue()} onChange={handleBottomNavChange} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, borderTop: 1, borderColor: 'divider', backgroundColor: '#FFFFFF', zIndex: 1000 }}>
        <BottomNavigationAction label="Products" icon={<Store />} />
        <BottomNavigationAction label="Reservations" icon={<ReceiptLong />} />
        <BottomNavigationAction label="Profile" icon={<Person />} />
      </BottomNavigation>

      <Box sx={{ height: 56 }} />

      <ReservationDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onConfirm={handleConfirmFromDrawer} />
    </Box>
  );
}

export default Layout;


