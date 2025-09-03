import React from 'react';
import { Box, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Chip } from '@mui/material';

function ProductVariationSelector({ product, selectedVariations, onVariationChange }) {
  if (!product.variations) {
    return null;
  }

  const calculateTotalPrice = () => {
    let totalPrice = parseFloat(product.basePrice.replace('₱', '').replace(/,/g, '')) || 0;
    
    Object.values(product.variations).forEach(variation => {
      const selectedOption = variation.options.find(opt => opt.value === selectedVariations[variation.label]);
      if (selectedOption) {
        totalPrice += selectedOption.priceModifier;
      }
    });
    
    return totalPrice;
  };

  const formatPrice = (price) => {
    return `₱${price.toLocaleString()}`;
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Product Options
      </Typography>
      
      {Object.entries(product.variations).map(([key, variation]) => (
        <FormControl key={key} component="fieldset" sx={{ mb: 3, width: '100%' }}>
          <FormLabel component="legend" sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}>
            {variation.label}
          </FormLabel>
          <RadioGroup
            value={selectedVariations[variation.label] || variation.options[0].value}
            onChange={(e) => onVariationChange(variation.label, e.target.value)}
            sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 1 }}
          >
            {variation.options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio size="small" />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2">
                      {option.label}
                    </Typography>
                    {option.priceModifier !== 0 && (
                      <Chip
                        size="small"
                        label={option.priceModifier > 0 ? `+${formatPrice(option.priceModifier)}` : formatPrice(option.priceModifier)}
                        color={option.priceModifier > 0 ? 'primary' : 'success'}
                        variant="outlined"
                        sx={{ fontSize: '0.7rem', height: 20 }}
                      />
                    )}
                  </Box>
                }
                sx={{
                  border: '1px solid #E0E0E0',
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  m: 0,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 193, 7, 0.08)',
                    borderColor: '#FFC107'
                  },
                  '&.Mui-checked': {
                    backgroundColor: 'rgba(255, 193, 7, 0.15)',
                    borderColor: '#FFC107'
                  }
                }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      ))}
      
      <Box sx={{ 
        mt: 3, 
        p: 2, 
        backgroundColor: 'rgba(255, 193, 7, 0.1)', 
        borderRadius: 2, 
        border: '1px solid #FFE082' 
      }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#FF8F00' }}>
          Total Price: {formatPrice(calculateTotalPrice())}
        </Typography>
        {calculateTotalPrice() !== parseFloat(product.basePrice.replace('₱', '').replace(/,/g, '')) && (
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            Base price: {product.basePrice}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default ProductVariationSelector;
