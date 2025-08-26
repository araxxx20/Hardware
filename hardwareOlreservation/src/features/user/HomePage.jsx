import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, InputAdornment, Grid, Typography, Container } from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import ProductCard from '../../components/ProductCard';
import CategoryButton from '../../components/CategoryButton';
import DataService from "../../shared/services/DataService";

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const categories = DataService.getAllCategories();
  const filteredProducts = useMemo(() => {
    return DataService.getFilteredProducts({ categoryId: selectedCategory, searchQuery, availableOnly: false });
  }, [selectedCategory, searchQuery]);

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <Box>
      {/* Hero Banner */}
      <Box sx={{
        backgroundImage: 'url(/assets/bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        width: '100vw',
        mx: 'calc(50% - 50vw)',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.35) 100%)'
        },
        py: { xs: 8, md: 10 },
        mb: 3
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h3" sx={{ color: '#fff', fontWeight: 800, textShadow: '0 2px 6px rgba(0,0,0,0.5)' }}>
            Find Electrical Supplies Fast
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', maxWidth: 640, mt: 1.5 }}>
            Search our curated catalog of tools, switches, lighting, wiring, and more.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2 } }}>
        {/* Search */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fff',
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <Clear sx={{ cursor: 'pointer' }} onClick={() => setSearchQuery('')} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Categories */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Categories</Typography>
        </Box>
        <Box sx={{ mb: 3, display: 'flex', gap: 1, overflowX: 'auto', pb: 1 }}>
          {categories.map((category) => (
            <CategoryButton
              key={category.id}
              label={category.name}
              isSelected={selectedCategory === category.id}
              onPressed={() => setSelectedCategory(category.id)}
            />
          ))}
        </Box>

        {/* Products */}
        {filteredProducts.length === 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 300, textAlign: 'center' }}>
            <Search sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No products found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search or category filter
            </Typography>
          </Box>
        ) : (
          <Grid
            container
            spacing={{ xs: 0, sm: 2, md: 3 }}
            alignItems="stretch"
            sx={{
              mx: 'auto',
              display: { xs: 'grid', sm: 'flex' },
              gridTemplateColumns: { xs: 'repeat(2, 1fr)' },
              gap: { xs: 1 }
            }}
          >
            {filteredProducts.map((product) => (
              <Grid item xs={6} sm={6} md={4} lg={3} key={product.id}>
                <Box sx={{ width: '100%' }}>
                  <ProductCard product={product} onClick={() => handleProductClick(product)} />
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default HomePage;


