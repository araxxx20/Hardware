import React from 'react';
import { Drawer, Box, Typography, IconButton, Divider, Button, Card, CardContent, CardMedia, TextField } from '@mui/material';
import { Close, Add, Remove, Delete } from '@mui/icons-material';
import ReservationService from '../../shared/services/ReservationService';

function ReservationDrawer({ open, onClose, onConfirm }) {
  const [items, setItems] = React.useState(ReservationService.getItems());

  React.useEffect(() => {
    const handler = () => setItems(ReservationService.getItems());
    window.addEventListener('reservationUpdated', handler);
    return () => window.removeEventListener('reservationUpdated', handler);
  }, []);

  const parsePrice = (p) => parseFloat(String(p).replace('₱', '').replace(/,/g, '')) || 0;
  const subtotal = items.reduce((t, i) => t + parsePrice(i.price) * (i.qty || 1), 0);

  return (
    <Drawer 
      anchor="right" 
      open={open} 
      onClose={onClose} 
      PaperProps={{ 
        sx: { 
          width: { xs: '100%', sm: 420 },
          backgroundColor: '#212121',
          color: 'white'
        } 
      }}
    >
      <Box sx={{ 
        p: 3, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        background: 'linear-gradient(135deg, #212121 0%, #424242 100%)',
        borderBottom: '2px solid #FFC107'
      }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'white' }}>My Reservation</Typography>
        <IconButton onClick={onClose} sx={{ color: '#FFC107' }}><Close /></IconButton>
      </Box>
      
      <Box sx={{ p: 3, flex: 1, overflowY: 'auto', backgroundColor: '#212121' }}>
        {items.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="#FFC107" sx={{ fontSize: 18, mb: 1 }}>No items selected</Typography>
            <Typography color="rgba(255,255,255,0.7)" sx={{ fontSize: 14 }}>Add products to your reservation</Typography>
          </Box>
        ) : (
          items.map((item) => (
            <Card key={item.id} sx={{ 
              mb: 2, 
              backgroundColor: '#424242',
              border: '1px solid #FFC107',
              borderRadius: 2,
              '&:hover': {
                boxShadow: '0 4px 12px rgba(255, 193, 7, 0.2)',
                transform: 'translateY(-2px)',
                transition: 'all 0.3s ease'
              }
            }}>
              <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                <Box display="flex" alignItems="center" sx={{ justifyContent: 'space-between', flexWrap: 'nowrap', columnGap: { xs: 0.5, sm: 1 } }}>
                  <CardMedia 
                    component="img" 
                    sx={{ 
                      width: { xs: 56, sm: 70 }, 
                      height: { xs: 56, sm: 70 }, 
                      objectFit: 'cover', 
                      borderRadius: 2, 
                      mr: 2,
                      border: '2px solid #FFC107'
                    }} 
                    image={item.imagePath} 
                    alt={item.name} 
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/70'; }} 
                  />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography noWrap sx={{ fontWeight: 600, color: 'white', mb: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', fontSize: { xs: 13, sm: 14 } }}>{item.name}</Typography>
                    <Typography sx={{ fontWeight: 'bold', color: '#FFC107', fontSize: { xs: 14, sm: 18 } }}>{item.price}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" sx={{ mx: { xs: 0.5, sm: 1 }, columnGap: { xs: 0.5, sm: 1 }, flexShrink: 0, whiteSpace: 'nowrap' }}>
                    <IconButton size="small"
                      onClick={() => ReservationService.updateQuantity(item.id, Math.max(1, (item.qty || 1) - 1))} 
                      disabled={(item.qty || 1) <= 1}
                      sx={{ 
                        color: '#FFC107',
                        backgroundColor: 'rgba(255, 193, 7, 0.1)',
                        '&:hover': { backgroundColor: 'rgba(255, 193, 7, 0.2)' },
                        '&:disabled': { color: 'rgba(255,255,255,0.3)' },
                        p: 0.25,
                        '& .MuiSvgIcon-root': { fontSize: 18 }
                      }}
                    >
                      <Remove />
                    </IconButton>
                    <TextField 
                      value={item.qty || 1} 
                      onChange={(e) => ReservationService.updateQuantity(item.id, parseInt(e.target.value) || 1)} 
                      size="small" 
                      sx={{ 
                        width: { xs: 44, sm: 70 },
                        mx: { xs: 0.5, sm: 1 },
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'white',
                          borderRadius: 1,
                          '& fieldset': { borderColor: '#FFC107' },
                          '&:hover fieldset': { borderColor: '#FFB300' },
                          '&.Mui-focused fieldset': { borderColor: '#FFC107' }
                        },
                        '& .MuiInputBase-input': {
                          p: '4px 6px',
                          textAlign: 'center',
                          fontSize: 12
                        }
                      }} 
                    />
                    <IconButton size="small"
                      onClick={() => ReservationService.updateQuantity(item.id, (item.qty || 1) + 1)}
                      sx={{ 
                        color: '#FFC107',
                        backgroundColor: 'rgba(255, 193, 7, 0.1)',
                        '&:hover': { backgroundColor: 'rgba(255, 193, 7, 0.2)' },
                        p: 0.25,
                        '& .MuiSvgIcon-root': { fontSize: 18 }
                      }}
                    >
                      <Add />
                    </IconButton>
                  </Box>
                  <IconButton size="small"
                    onClick={() => ReservationService.removeItem(item.id)} 
                    sx={{ 
                      color: '#f44336',
                      backgroundColor: 'rgba(244, 67, 54, 0.1)',
                      '&:hover': { backgroundColor: 'rgba(244, 67, 54, 0.2)' },
                      ml: 1,
                      flexShrink: 0
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))
        )}
      </Box>
      
      <Box sx={{ 
        p: 3, 
        backgroundColor: '#424242',
        borderTop: '2px solid #FFC107'
      }}>
        <Box display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography sx={{ color: 'white', fontSize: 18, fontWeight: 600 }}>Subtotal</Typography>
          <Typography sx={{ color: '#FFC107', fontSize: 20, fontWeight: 'bold' }}>₱{subtotal.toFixed(2)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
          <Button 
            color="error"
            variant="outlined"
            disabled={items.length === 0}
            onClick={() => { ReservationService.clear(); onClose && onClose(); }}
            sx={{ 
              flex: 1,
              borderColor: 'rgba(244,67,54,0.6)',
              color: '#ef9a9a',
              py: 1.5,
              borderRadius: 2,
              fontWeight: 'bold',
              fontSize: 16,
              textTransform: 'none',
              backgroundColor: 'transparent',
              '&:hover': { backgroundColor: 'rgba(244,67,54,0.16)', borderColor: '#ef5350' },
              '&:disabled': { color: 'rgba(255,255,255,0.3)', borderColor: 'rgba(255,255,255,0.2)' }
            }}
          >
            Cancel Reservation
          </Button>
          <Button 
            onClick={onClose}
            sx={{ 
              flex: 1,
              color: '#FFC107',
              border: '1px solid #FFC107',
              py: 1.5,
              borderRadius: 2,
              fontWeight: 'bold',
              fontSize: 16,
              textTransform: 'none',
              backgroundColor: 'transparent',
              '&:hover': { backgroundColor: 'rgba(255,193,7,0.08)', borderColor: '#FFB300' }
            }}
          >
            Continue Reserving
          </Button>
          <Button 
            disabled={items.length === 0} 
            onClick={() => onConfirm(items, subtotal)} 
            sx={{ 
              flex: 1,
              background: 'linear-gradient(90deg, #FFC107 0%, #FF9800 100%)',
              color: 'white',
              py: 1.5,
              borderRadius: 2,
              fontWeight: 'bold',
              fontSize: 16,
              textTransform: 'none',
              boxShadow: '0 4px 8px rgba(255, 193, 7, 0.3)',
              '&:hover': {
                background: 'linear-gradient(90deg, #FFB300 0%, #F57C00 100%)',
                boxShadow: '0 6px 12px rgba(255, 193, 7, 0.4)'
              },
              '&:disabled': {
                background: 'rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.3)'
              }
            }}
          >
            Confirm Reservation
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}

export default ReservationDrawer;


