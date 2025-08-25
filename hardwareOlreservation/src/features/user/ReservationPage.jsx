import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Card, CardContent, Chip, Divider, Button } from '@mui/material';
import { ReceiptLong } from '@mui/icons-material';
import ReservationHistoryService from '../../shared/services/ReservationHistoryService';

function ReservationPage() {
  const [reservations, setReservations] = useState(ReservationHistoryService.list());

  useEffect(() => {
    const handler = () => setReservations(ReservationHistoryService.list());
    window.addEventListener('reservationHistoryUpdated', handler);
    return () => window.removeEventListener('reservationHistoryUpdated', handler);
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>My Reservations</Typography>
      </Box>
      <Divider sx={{ mb: 3, borderColor: '#FFE082' }} />

      {reservations.length === 0 ? (
        <Box textAlign="center" sx={{ py: 6 }}>
          <ReceiptLong sx={{ fontSize: 64, color: '#FFB300', mb: 2 }} />
          <Typography color="text.secondary">No reservations yet</Typography>
        </Box>
      ) : (
        <Box>
          {reservations.map((r) => (
            <Card key={r.id} sx={{ mb: 3, backgroundColor: '#ffffff', border: '1px solid #EEEEEE', borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      Reservation #{r.code}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Created {new Date(r.date).toLocaleString()}
                    </Typography>
                  </Box>
                  <Chip label={r.status} sx={{
                    backgroundColor: 'rgba(255, 193, 7, 0.15)',
                    color: '#FF8F00',
                    border: '1px solid #FFE082',
                    fontWeight: 600
                  }} />
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Items ({r.items.length}):
                  </Typography>
                  {r.items.map((item, i) => (
                    <Box key={i} display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
                      <Typography variant="body2">
                        {item.name} × {item.qty}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#FF9800' }}>
                        ₱{(parseFloat(String(item.price).replace('₱', '').replace(/,/g, '')) * (item.qty || 1)).toFixed(2)}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Subtotal: ₱{Number(r.subtotal).toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Reservation Fee: ₱{Number(r.deliveryFee).toFixed(2)}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#212121' }}>
                      Total: ₱{Number(r.total).toFixed(2)}
                    </Typography>
                  </Box>
                  <Box display="flex" gap={1}>
                    <Button variant="outlined" size="small" onClick={() => window.print()} sx={{ borderColor: '#FFC107', color: '#FF8F00', '&:hover': { borderColor: '#FFB300', backgroundColor: 'rgba(255,193,7,0.08)' } }}>
                      Print
                    </Button>
                    <Button variant="text" color="error" size="small" disabled={String(r.status).toLowerCase().includes('ready') || String(r.status).toLowerCase().includes('cancel')} onClick={() => ReservationHistoryService.cancelReservation(r.id)}>
                      Cancel Reservation
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
}

export default ReservationPage;
