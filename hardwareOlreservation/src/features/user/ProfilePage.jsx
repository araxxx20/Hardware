import React from 'react';
import { Container, Typography, Box, Avatar, TextField, Button, Paper, Divider } from '@mui/material';
import MessageService from "../../shared/services/MessageService";

function ProfilePage() {
  const user = React.useMemo(() => {
    try { return JSON.parse(sessionStorage.getItem('user') || '{}'); } catch { return {}; }
  }, []);

  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState(MessageService.list());

  React.useEffect(() => {
    const handler = () => setMessages(MessageService.list());
    window.addEventListener('userMessagesUpdated', handler);
    return () => window.removeEventListener('userMessagesUpdated', handler);
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar sx={{ width: 64, height: 64 }} src={user.profileImagePath || ''}>{(user.name || 'U').charAt(0)}</Avatar>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>{user.name || 'Guest'}</Typography>
          <Typography color="text.secondary">{user.email || ''}</Typography>
        </Box>
      </Box>

      <Paper elevation={2} sx={{ p: 3, mt: 3, backgroundColor: '#ffffff', border: '1px solid #EEEEEE', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>Message the Shop</Typography>
        <Divider sx={{ mb: 2, borderColor: '#FFE082' }} />
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Example: "I can’t pick up today; please hold until tomorrow." or any pickup updates.
        </Typography>
        <TextField fullWidth multiline minRows={3} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write a message to the shop..." sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#fff', borderRadius: 2 } }} />
        <Button 
          fullWidth
          sx={{ 
            mt: 2,
            background: 'linear-gradient(90deg, #FFC107 0%, #FF9800 100%)',
            color: 'white',
            py: 1.25,
            borderRadius: 2,
            fontWeight: 'bold',
            textTransform: 'none',
            boxShadow: '0 4px 8px rgba(255, 193, 7, 0.3)',
            '&:hover': { background: 'linear-gradient(90deg, #FFB300 0%, #F57C00 100%)', boxShadow: '0 6px 12px rgba(255, 193, 7, 0.4)' }
          }}
          disabled={!message.trim()}
          onClick={() => { MessageService.add({ text: message.trim() }); setMessage(''); }}
        >
          Send Message
        </Button>
      </Paper>

      <Paper elevation={1} sx={{ p: 3, mt: 2, backgroundColor: '#ffffff', border: '1px solid #EEEEEE', borderRadius: 2 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>Previous Messages</Typography>
        </Box>
        <Divider sx={{ mb: 2, borderColor: '#FFE082' }} />
        {messages.length === 0 ? (
          <Typography color="text.secondary">No messages yet.</Typography>
        ) : (
          messages.map(m => (
            <Box key={m.id} sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">{new Date(m.date).toLocaleString()}</Typography>
              <Typography>{m.text}</Typography>
            </Box>
          ))
        )}
      </Paper>
    </Container>
  );
}

export default ProfilePage;


