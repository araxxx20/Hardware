import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Card, CardMedia, Button, Chip, IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import DataService from "../../shared/services/DataService";
import ReservationService from "../../shared/services/ReservationService";

function ProductDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product || DataService.getProductById(id);

  const [qty, setQty] = React.useState(1);

  if (!product) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography>No product found.</Typography>
      </Container>
    );
  }

  const addToReservation = () => {
    ReservationService.addItem({ id: product.id, name: product.name, price: product.price, imagePath: product.imagePath, qty });
    // Open the reservation drawer
    window.dispatchEvent(new Event('openReservationDrawer'));
    // Navigate back to products list automatically
    navigate('/home');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Card sx={{ p: 3, display: { xs: 'block', md: 'flex' }, gap: 4, backgroundColor: '#ffffff', border: '1px solid #EEEEEE', borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CardMedia component="img" sx={{ maxHeight: 380, width: '100%', objectFit: 'contain' }} image={product.imagePath} alt={product.name} onError={(e) => { e.target.src = 'https://via.placeholder.com/600x380?text=No+Image'; }} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>{product.name}</Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, mt: 1, color: '#FF9800' }}>{product.price}</Typography>
          <Box sx={{ display: 'flex', gap: 1.5, mt: 1.5 }}>
            {product.soldCount && (
              <Chip size="small" label={`Sold: ${product.soldCount}`} sx={{
                backgroundColor: 'rgba(255, 193, 7, 0.15)',
                color: '#FF8F00',
                border: '1px solid #FFE082',
                fontWeight: 600
              }} />
            )}
            <Chip size="small" variant="outlined" label="In Stock" sx={{ borderColor: '#FFE082', color: '#FF8F00' }} />
          </Box>
          {product.description && (
            <Typography color="text.secondary" sx={{ mt: 2, maxWidth: 560 }}>
              {product.description}
            </Typography>
          )}

          <Box sx={{ mt: 3 }}>
            <Typography sx={{ mb: 1, fontWeight: 600 }}>Quantity:</Typography>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
              <IconButton onClick={() => setQty(Math.max(1, qty - 1))} disabled={qty <= 1}>
                <Remove />
              </IconButton>
              <Box sx={{ px: 2, minWidth: 32, textAlign: 'center', fontWeight: 600 }}>{qty}</Box>
              <IconButton onClick={() => setQty(qty + 1)}>
                <Add />
              </IconButton>
            </Box>
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
            Total: {product.price}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, flexDirection: { xs: 'column', sm: 'row' }, mt: 2 }}>
            <Button
              onClick={() => window.dispatchEvent(new Event('openReservationDrawer'))}
              sx={{
                flex: 1,
                color: '#FF9800',
                border: '1px solid #FFC107',
                py: 1.5,
                px: 3,
                borderRadius: 2,
                fontWeight: 'bold',
                textTransform: 'none',
                backgroundColor: 'transparent',
                '&:hover': { backgroundColor: 'rgba(255,193,7,0.08)', borderColor: '#FFB300' }
              }}
            >
              View Reservation
            </Button>

            <Button
              size="large"
              onClick={addToReservation}
              sx={{
                flex: 1,
                py: 1.5,
                px: 3,
                background: 'linear-gradient(90deg, #FFC107 0%, #FF9800 100%)',
                color: '#fff',
                fontWeight: 'bold',
                textTransform: 'none',
                borderRadius: 2,
                boxShadow: '0 4px 8px rgba(255, 193, 7, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(90deg, #FFB300 0%, #F57C00 100%)',
                  boxShadow: '0 6px 12px rgba(255, 193, 7, 0.4)'
                }
              }}
            >
              Add to Reservation
            </Button>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}

export default ProductDetailPage;


