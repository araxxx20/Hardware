import React from 'react';
import { Container, Typography, Box, Avatar, Paper, Divider, Button } from '@mui/material';
import { Edit, Phone, Email, LocationOn } from '@mui/icons-material';

function ProfilePage() {
  const user = React.useMemo(() => {
    try { return JSON.parse(sessionStorage.getItem('user') || '{}'); } catch { return {}; }
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Profile Header */}
      <Paper elevation={2} sx={{ p: 4, backgroundColor: '#ffffff', border: '1px solid #EEEEEE', borderRadius: 2, mb: 3 }}>
        <Box display="flex" alignItems="center" gap={3} sx={{ mb: 3 }}>
          <Avatar sx={{ width: 80, height: 80, fontSize: '2rem' }} src={user.profileImagePath || ''}>
            {(user.name || 'U').charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>{user.name || 'Guest User'}</Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>{user.email || 'No email provided'}</Typography>
            <Button
              startIcon={<Edit />}
              variant="outlined"
              sx={{
                borderColor: '#FFC107',
                color: '#FF8F00',
                '&:hover': { borderColor: '#FFB300', backgroundColor: 'rgba(255,193,7,0.08)' }
              }}
            >
              Edit Profile
            </Button>
          </Box>
        </Box>
        <Divider sx={{ borderColor: '#FFE082' }} />
      </Paper>

      {/* Profile Information */}
      <Paper elevation={2} sx={{ p: 3, backgroundColor: '#ffffff', border: '1px solid #EEEEEE', borderRadius: 2, mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Profile Information</Typography>
        <Divider sx={{ mb: 3, borderColor: '#FFE082' }} />
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box display="flex" alignItems="center" gap={2}>
            <Email sx={{ color: '#FF9800' }} />
            <Box>
              <Typography variant="body2" color="text.secondary">Email Address</Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>{user.email || 'Not provided'}</Typography>
            </Box>
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <Phone sx={{ color: '#FF9800' }} />
            <Box>
              <Typography variant="body2" color="text.secondary">Phone Number</Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>{user.phone || 'Not provided'}</Typography>
            </Box>
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <LocationOn sx={{ color: '#FF9800' }} />
            <Box>
              <Typography variant="body2" color="text.secondary">Address</Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>{user.address || 'Not provided'}</Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Account Statistics */}
      <Paper elevation={2} sx={{ p: 3, backgroundColor: '#ffffff', border: '1px solid #EEEEEE', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Account Statistics</Typography>
        <Divider sx={{ mb: 3, borderColor: '#FFE082' }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'rgba(255, 193, 7, 0.1)', borderRadius: 2, minWidth: 200 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FF8F00' }}>0</Typography>
            <Typography variant="body2" color="text.secondary">Total Reservations</Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default ProfilePage;


