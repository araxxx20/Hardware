import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Card, CardMedia, Button, Chip, IconButton } from '@mui/material';
import { Add, Remove, ArrowBack } from '@mui/icons-material';
import DataService from "../../shared/services/DataService";
import ReservationService from "../../shared/services/ReservationService";
import ProductVariationSelector from "../../components/ProductVariationSelector";

function ProductDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product || DataService.getProductById(id);

  const [qty, setQty] = React.useState(1);
  const [selectedVariations, setSelectedVariations] = React.useState({});

  // Initialize default variations when product loads
  React.useEffect(() => {
    if (product?.variations) {
      const defaultVariations = {};
      Object.entries(product.variations).forEach(([key, variation]) => {
        defaultVariations[variation.label] = variation.options[0].value;
      });
      setSelectedVariations(defaultVariations);
    }
  }, [product]);

  const handleVariationChange = (variationLabel, value) => {
    setSelectedVariations(prev => ({
      ...prev,
      [variationLabel]: value
    }));
  };

  const calculateTotalPrice = () => {
    let totalPrice = parseFloat(product.basePrice.replace('₱', '').replace(/,/g, '')) || 0;
    
    if (product.variations) {
      Object.values(product.variations).forEach(variation => {
        const selectedOption = variation.options.find(opt => opt.value === selectedVariations[variation.label]);
        if (selectedOption) {
          totalPrice += selectedOption.priceModifier;
        }
      });
    }
    
    return totalPrice;
  };

  const formatPrice = (price) => {
    return `₱${price.toLocaleString()}`;
  };

  if (!product) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography>No product found.</Typography>
      </Container>
    );
  }

  const addToReservation = () => {
    const totalPrice = calculateTotalPrice();
    const variationString = Object.entries(selectedVariations)
      .map(([label, value]) => {
        const variation = Object.values(product.variations || {}).find(v => v.label === label);
        const option = variation?.options.find(opt => opt.value === value);
        return `${label}: ${option?.label || value}`;
      })
      .join(', ');

    const itemName = variationString ? `${product.name} (${variationString})` : product.name;
    
    ReservationService.addItem({ 
      id: product.id, 
      name: itemName, 
      price: formatPrice(totalPrice), 
      imagePath: product.imagePath, 
      qty,
      variations: selectedVariations,
      basePrice: product.basePrice
    });
    
    // Open the reservation drawer
    window.dispatchEvent(new Event('openReservationDrawer'));
    // Navigate back to products list automatically
    navigate('/home');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back Button */}
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{
            color: '#FF9800',
            border: '1px solid #FFC107',
            py: 1,
            px: 3,
            borderRadius: 2,
            fontWeight: 'bold',
            textTransform: 'none',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'rgba(255,193,7,0.08)',
              borderColor: '#FFB300'
            }
          }}
        >
          Back to Products
        </Button>
      </Box>

      <Card sx={{ p: 3, display: { xs: 'block', md: 'flex' }, gap: 4, backgroundColor: '#ffffff', border: '1px solid #EEEEEE', borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CardMedia component="img" sx={{ maxHeight: 380, width: '100%', objectFit: 'contain' }} image={product.imagePath} alt={product.name} onError={(e) => { e.target.src = 'https://via.placeholder.com/600x380?text=No+Image'; }} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>{product.name}</Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, mt: 1, color: '#FF9800' }}>{formatPrice(calculateTotalPrice())}</Typography>
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

          <ProductVariationSelector 
            product={product}
            selectedVariations={selectedVariations}
            onVariationChange={handleVariationChange}
          />

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
            Total: {formatPrice(calculateTotalPrice() * qty)}
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


