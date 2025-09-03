import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Chip } from '@mui/material';

function ProductCard({ product, onClick }) {
  return (
    <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer', backgroundColor: '#ffffff', border: '1px solid #EEEEEE', borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 } }} onClick={onClick}>
      <CardMedia 
        component="img" 
        image={product.imagePath} 
        alt={product.name} 
        sx={{ 
          width: '100%',
          height: { xs: 140, sm: 160 },
          objectFit: 'contain',
          backgroundColor: '#FAFAFA',
          p: 1
        }} 
        loading="lazy"
        onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'; }} 
      />
      <CardContent sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1, flexGrow: 1, minHeight: 0 }}>
        <Typography 
          variant="subtitle1" 
          component="h3" 
          sx={{ 
            fontWeight: 600, 
            fontSize: { xs: '0.85rem', sm: '0.9rem' }, 
            mb: 1, 
            display: '-webkit-box', 
            WebkitLineClamp: 2, 
            WebkitBoxOrient: 'vertical', 
            overflow: 'hidden'
          }}
        >
          {product.name}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', fontSize: { xs: '0.95rem', sm: '1rem' }, mb: 0.5 }}>
          {product.basePrice || product.price}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 'auto' }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
            Sold: {product.soldCount}
          </Typography>
          <Chip label="Available" size="small" color="success" variant="outlined" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }} />
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProductCard;


