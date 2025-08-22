import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Card, CardMedia, Button, Chip, IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import DataService from './services/DataService';
import ReservationService from './services/ReservationService';

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
    navigate('/user/reservation/summary');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Card sx={{ p: 3, display: { xs: 'block', md: 'flex' }, gap: 4 }}>
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CardMedia component="img" sx={{ maxHeight: 380, width: '100%', objectFit: 'contain' }} image={product.imagePath} alt={product.name} onError={(e) => { e.target.src = 'https://via.placeholder.com/600x380?text=No+Image'; }} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>{product.name}</Typography>
          <Typography variant="h5" color="primary" sx={{ fontWeight: 800, mt: 1 }}>{product.price}</Typography>
          <Box sx={{ display: 'flex', gap: 1.5, mt: 1.5 }}>
            {product.soldCount && <Chip size="small" label={`Sold: ${product.soldCount}`} />}
            <Chip size="small" variant="outlined" label="In Stock" />
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

          <Button variant="contained" size="large" sx={{ mt: 2, py: 1.5 }} onClick={addToReservation}>
            Add to Reservation
          </Button>
        </Box>
      </Card>
    </Container>
  );
}

export default ProductDetailPage;


