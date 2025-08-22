import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Card, CardContent, CardMedia, IconButton, Button, Checkbox, TextField, Divider, Paper } from '@mui/material';
import { Add, Remove, Delete, ShoppingCartCheckout } from '@mui/icons-material';
import ReservationService from './services/ReservationService';

function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(ReservationService.getItems().map(i => ({ ...i, checked: true })));

  useEffect(() => {
    const handler = () => setCartItems(ReservationService.getItems().map(i => ({ ...i, checked: true })));
    window.addEventListener('reservationUpdated', handler);
    return () => window.removeEventListener('reservationUpdated', handler);
  }, []);

  const updateQuantity = (id, newQty) => {
    ReservationService.updateQuantity(id, newQty);
    setCartItems(items => items.map(item => item.id === id ? { ...item, qty: newQty } : item));
  };

  const toggleItemCheck = (id) => {
    setCartItems(items => items.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const removeItem = (id) => {
    ReservationService.removeItem(id);
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const parsePrice = (p) => parseFloat(String(p).replace('₱', '').replace(/,/g, '')) || 0;
  const getItemTotal = (item) => parsePrice(item.price) * (item.qty || 1);
  const checkedItems = cartItems.filter(item => item.checked);
  const getSubTotal = () => checkedItems.reduce((t, item) => t + getItemTotal(item), 0);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 300, textAlign: 'center' }}>
          <ShoppingCartCheckout sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Your cart is empty
          </Typography>
          <Button variant="contained" onClick={() => navigate('/user')} sx={{ mt: 2 }}>
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <Box>
          {cartItems.map((item) => (
            <Card key={item.id} sx={{ mb: 2 }}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Checkbox checked={!!item.checked} onChange={() => toggleItemCheck(item.id)} color="primary" />
                  <CardMedia component="img" sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 1, ml: 1 }} image={item.imagePath} alt={item.name} onError={(e) => { e.target.src = 'https://via.placeholder.com/80x80?text=No+Image'; }} />
                  <Box sx={{ flex: 1, ml: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>{item.name}</Typography>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>{item.price}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" sx={{ mx: 2 }}>
                    <IconButton onClick={() => updateQuantity(item.id, Math.max(1, (item.qty || 1) - 1))} disabled={(item.qty || 1) <= 1}>
                      <Remove />
                    </IconButton>
                    <TextField value={item.qty || 1} onChange={(e) => { const value = parseInt(e.target.value) || 1; updateQuantity(item.id, value); }} inputProps={{ style: { textAlign: 'center', width: '50px' }, min: 1 }} variant="outlined" size="small" />
                    <IconButton onClick={() => updateQuantity(item.id, (item.qty || 1) + 1)}>
                      <Add />
                    </IconButton>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', minWidth: '80px', textAlign: 'right' }}>
                    ₱{getItemTotal(item).toFixed(2)}
                  </Typography>
                  <IconButton onClick={() => removeItem(item.id)} color="error" sx={{ ml: 1 }}>
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}

          <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Reservation Summary
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography>Subtotal ({checkedItems.length} items):</Typography>
              <Typography>₱{getSubTotal().toFixed(2)}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
              <Typography>Reservation Fee:</Typography>
              <Typography>₱0.00</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box display="flex" justifyContent="space-between" sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total:</Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }} color="primary">₱{getSubTotal().toFixed(2)}</Typography>
            </Box>
            <Button fullWidth variant="contained" size="large" disabled={checkedItems.length === 0} onClick={() => navigate('/user/checkout', { state: { items: checkedItems, subtotal: getSubTotal(), deliveryFee: 0, total: getSubTotal() } })} sx={{ py: 1.5 }}>
              Reserve Items ({checkedItems.length})
            </Button>
          </Paper>
        </Box>
      )}
    </Container>
  );
}

export default CartPage;


