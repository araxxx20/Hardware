import React from 'react';
import { Container, Typography, Box, Avatar, TextField, Button, Paper, Divider } from '@mui/material';
import MessageService from './services/MessageService';

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
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{user.name || 'Guest'}</Typography>
          <Typography color="text.secondary">{user.email || ''}</Typography>
        </Box>
      </Box>

      <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Message the Shop</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Example: "I can’t pick up today; please hold until tomorrow." or any pickup updates.
        </Typography>
        <TextField fullWidth multiline minRows={3} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write a message to the shop..." />
        <Button variant="contained" sx={{ mt: 2 }} disabled={!message.trim()} onClick={() => { MessageService.add({ text: message.trim() }); setMessage(''); }}>Send Message</Button>
      </Paper>

      <Paper elevation={1} sx={{ p: 3, mt: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Previous Messages</Typography>
        <Divider sx={{ mb: 2 }} />
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


