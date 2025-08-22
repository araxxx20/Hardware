import React from 'react';
import { Container, Box, Paper, Typography } from '@mui/material';

function Reservation() {
  return (
    <Box sx={{ minHeight: '100vh', width: '100%', background: '#23272f', py: 4 }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: '#23272f' }}>
            Online Reservation
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Starter page for user reservations. You can add your reservation form or features here.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default Reservation;


