import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import { mockUsers } from '../../shared/data/mockData';

function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    if (password.length < 8) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/[a-z]/.test(password)) return false;
    if (!/[0-9]/.test(password)) return false;
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;
    return true;
  };

  const validateName = (name) => {
    if (name.trim().length < 2) return false;
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) return false;
    return true;
  };

  const handleSignup = () => {
    setError('');
    const nameTrim = name.trim();
    const emailTrim = email.trim();

    if (!nameTrim) { setError('Full name is required'); return; }
    if (!validateName(nameTrim)) { setError('Name must be at least 2 characters and contain only letters and spaces'); return; }
    if (!emailTrim) { setError('Email is required'); return; }
    if (!validateEmail(emailTrim)) { setError('Please enter a valid email address'); return; }
    if (!password) { setError('Password is required'); return; }
    if (!validatePassword(password)) { setError('Password must be at least 8 characters with uppercase, lowercase, number, and special character'); return; }
    if (!confirmPassword) { setError('Please confirm your password'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match'); return; }
    if (mockUsers[emailTrim]) { setError('An account with this email already exists'); return; }

    mockUsers[emailTrim] = { password, name: nameTrim, profileImagePath: '' };

    setShowSuccess(true);
    setTimeout(() => { navigate('/login'); }, 2000);
  };

  return (
    <>
      <Box sx={{ minHeight: '100vh', backgroundImage: 'url(/assets/bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'center', position: 'relative', py: { xs: 2, md: 0 }, '&::before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 1 } }}>
        <Box sx={{ position: 'absolute', right: { xs: '50%', md: '10%' }, top: '50%', transform: { xs: 'translate(50%, -50%)', md: 'translateY(-50%)' }, textAlign: { xs: 'center', md: 'left' }, color: 'white', zIndex: 2, display: { xs: 'none', md: 'block' }, backgroundColor: 'rgba(0,0,0,0.35)', p: 2.5, borderRadius: 2, backdropFilter: 'blur(2px)' }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2, textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>JOIN<br />BABA HARDWARE</Typography>
          <Typography variant="h6" sx={{ maxWidth: 400, lineHeight: 1.6, textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
            Create your account to access our complete catalog of electrical supplies, get exclusive deals, and enjoy fast checkout for all your hardware needs.
          </Typography>
        </Box>

        {/* Compact hero for mobile */}
        <Box sx={{ position: { xs: 'static', md: 'absolute' }, top: { md: 20 }, left: { md: 0 }, right: { md: 0 }, px: 2, zIndex: 2, display: { xs: 'block', md: 'none' }, textAlign: 'center', mb: { xs: 3.5, md: 0 }, pointerEvents: 'none' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.5)', lineHeight: 1.2, fontSize: { xs: 18, sm: 20 } }}>
            JOIN
            <br />
            BABA HARDWARE
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)', mt: 0.5, fontSize: { xs: 12, sm: 14 } }}>
            Create your account to access our complete catalog of electrical supplies, get exclusive deals, and enjoy fast checkout for all your hardware needs.
          </Typography>
        </Box>

        <Box sx={{ position: 'relative', zIndex: { xs: 4, md: 2 }, left: { xs: 0, md: '-20%' }, mt: { xs: 0, md: 0 } }}>
          <Box sx={{ width: { xs: '92vw', sm: 380 }, padding: { xs: 2, sm: 2.5 }, backgroundColor: '#212121', borderRadius: '20px', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3), 0 5px 30px rgba(255, 193, 7, 0.1)', mx: 2 }}>
            <Box textAlign="center" mb={2}>
              <img src="/assets/logo1.png" alt="BABA Hardware" style={{ height: 100, width: 150, marginBottom: 8, display: 'block', marginLeft: 'auto', marginRight: 'auto' }} onError={(e) => { e.target.style.display = 'none'; }} />
              <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>Create Account</Typography>
            </Box>

            {error && (<Typography sx={{ color: 'red', mb: 1, textAlign: 'center', fontSize: 14 }}>{error}</Typography>)}

            <Box sx={{ mb: 1 }}>
              <Typography sx={{ color: 'white', fontSize: 14, mb: 0.5, textAlign: 'left' }}>Full Name</Typography>
              <TextField fullWidth size="small" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" sx={{ '& .MuiOutlinedInput-root': { backgroundColor: 'white', borderRadius: 1 } }} />
            </Box>

            <Box sx={{ mb: 1 }}>
              <Typography sx={{ color: 'white', fontSize: 14, mb: 0.5, textAlign: 'left' }}>Email</Typography>
              <TextField fullWidth size="small" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" sx={{ '& .MuiOutlinedInput-root': { backgroundColor: 'white', borderRadius: 1 } }} />
            </Box>

            <Box sx={{ mb: 1.5 }}>
              <Typography sx={{ color: 'white', fontSize: 14, mb: 0.5, textAlign: 'left' }}>Password</Typography>
              <TextField fullWidth type="password" size="small" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" sx={{ '& .MuiOutlinedInput-root': { backgroundColor: 'white', borderRadius: 1 } }} />
            </Box>

            <Box sx={{ mb: 1.5 }}>
              <Typography sx={{ color: 'white', fontSize: 14, mb: 0.5, textAlign: 'left' }}>Confirm Password</Typography>
              <TextField fullWidth type="password" size="small" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your password" sx={{ '& .MuiOutlinedInput-root': { backgroundColor: 'white', borderRadius: 1 } }} />
            </Box>

            <Button fullWidth onClick={handleSignup} sx={{ background: 'linear-gradient(90deg, #FFC107 0%, #FF9800 100%)', color: 'white', py: 1.25, borderRadius: 1.5, fontWeight: 'bold', fontSize: 16, textTransform: 'none', boxShadow: '0 4px 8px rgba(255, 193, 7, 0.3)', '&:hover': { background: 'linear-gradient(90deg, #FFB300 0%, #F57C00 100%)', boxShadow: '0 6px 12px rgba(255, 193, 7, 0.4)' } }}>Create Hardware Account</Button>

            <Box textAlign="center" sx={{ mt: 2 }}>
              <Typography component={Link} to="/login" sx={{ color: '#FFC107', textDecoration: 'underline' }}>Already have an account? Log in here</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Snackbar open={showSuccess} autoHideDuration={3000} onClose={() => setShowSuccess(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" onClose={() => setShowSuccess(false)}>Account created successfully! Please log in.</Alert>
      </Snackbar>
    </>
  );
}

export default SignupPage;


