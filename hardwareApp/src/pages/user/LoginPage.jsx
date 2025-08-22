import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';
import { mockUsers } from './data/mockData';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    setError('');
    const emailTrim = email.trim();
    if (emailTrim === '' && password === '') { setError('Email and password are required'); return; }
    if (emailTrim === '') { setError('Email is required'); return; }
    if (!validateEmail(emailTrim)) { setError('Please enter a valid email address'); return; }
    if (password === '') { setError('Password is required'); return; }
    if (!mockUsers[emailTrim]) { setError('No account found with this email address'); return; }
    if (mockUsers[emailTrim].password !== password) { setError('Incorrect password'); return; }
    sessionStorage.setItem('user', JSON.stringify({ name: mockUsers[emailTrim].name, email: emailTrim, profileImagePath: mockUsers[emailTrim].profileImagePath || '' }));
    navigate('/user');
  };

  return (
    <Box sx={{ minHeight: '100vh', width: '100%', backgroundImage: 'url(/assets/images/bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', '&::before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 1 } }}>
      {/* Welcome Text */}
      <Box sx={{ position: 'absolute', right: { xs: '5%', md: '10%' }, top: '50%', transform: 'translateY(-50%)', textAlign: 'left', color: 'white', zIndex: 2 }}>
        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2, textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          WELCOME TO<br />
          BABA HARDWARE
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: 400, lineHeight: 1.6, textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
          Your trusted partner for all electrical supplies and hardware needs. 
          Quality products, competitive prices, and exceptional service since day one.
        </Typography>
      </Box>

      <Box sx={{ position: 'relative', zIndex: 2, left: { xs: 0, md: '-20%' } }}>
        <Box sx={{ width: { xs: '90vw', sm: 400 }, p: 4, backgroundColor: '#212121', borderRadius: '25px', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3), 0 5px 30px rgba(255, 193, 7, 0.1)', mx: 2 }}>
          <Box textAlign="center" mb={3}>
            <img src="/assets/images/logo1.png" alt="BABA Hardware" style={{ height: 100, width: 150, marginBottom: 16, display: 'block', marginLeft: 'auto', marginRight: 'auto' }} onError={(e) => { e.target.style.display = 'none'; }} />
            <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>Log In</Typography>
          </Box>
          {error && (<Typography sx={{ color: 'red', mb: 1, textAlign: 'center' }}>{error}</Typography>)}
          <Box sx={{ mb: 1.5 }}>
            <Typography sx={{ color: 'white', fontSize: 14, mb: 0.5 }}>Email</Typography>
            <TextField fullWidth value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" sx={{ '& .MuiOutlinedInput-root': { backgroundColor: 'white', borderRadius: 1 } }} />
          </Box>
          <Box sx={{ mb: 2.5 }}>
            <Typography sx={{ color: 'white', fontSize: 14, mb: 0.5 }}>Password</Typography>
            <TextField fullWidth type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" sx={{ '& .MuiOutlinedInput-root': { backgroundColor: 'white', borderRadius: 1 } }} />
          </Box>
          <Button fullWidth onClick={handleLogin} sx={{ background: 'linear-gradient(90deg, #FFC107 0%, #FF9800 100%)', color: 'white', py: 1.5, borderRadius: 1.5, fontWeight: 'bold', fontSize: 16, textTransform: 'none', boxShadow: '0 4px 8px rgba(255, 193, 7, 0.3)', '&:hover': { background: 'linear-gradient(90deg, #FFB300 0%, #F57C00 100%)', boxShadow: '0 6px 12px rgba(255, 193, 7, 0.4)' } }}>Log in</Button>
          <Box textAlign="center" sx={{ mt: 2.5 }}>
            <Typography component={Link} to="/user/signup" sx={{ color: '#FFC107', textDecoration: 'underline' }}>New to BABA Hardware? Sign up here</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginPage;


