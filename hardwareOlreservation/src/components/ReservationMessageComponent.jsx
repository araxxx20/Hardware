import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Divider, 
  IconButton,
  Collapse,
  Chip
} from '@mui/material';
import { 
  Send, 
  Message, 
  ExpandMore, 
  ExpandLess, 
  Delete 
} from '@mui/icons-material';
import MessageService from '../shared/services/MessageService';

function ReservationMessageComponent({ reservationId, reservationCode }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handler = () => {
      setMessages(MessageService.getMessagesForReservation(reservationId));
    };
    
    // Load initial messages
    handler();
    
    // Listen for updates
    window.addEventListener('reservationMessagesUpdated', handler);
    return () => window.removeEventListener('reservationMessagesUpdated', handler);
  }, [reservationId]);

  const handleSendMessage = () => {
    if (message.trim()) {
      MessageService.add({ text: message.trim() }, reservationId);
      setMessage('');
    }
  };

  const handleDeleteMessage = (messageId) => {
    MessageService.deleteMessage(messageId);
  };

  return (
    <Paper elevation={1} sx={{ 
      mt: 2, 
      backgroundColor: '#ffffff', 
      border: '1px solid #EEEEEE', 
      borderRadius: 2,
      overflow: 'hidden'
    }}>
      {/* Header */}
      <Box 
        sx={{ 
          p: 2, 
          backgroundColor: 'rgba(255, 193, 7, 0.1)', 
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Message sx={{ color: '#FF9800' }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Messages for Reservation #{reservationCode}
          </Typography>
          {messages.length > 0 && (
            <Chip 
              label={messages.length} 
              size="small" 
              sx={{ 
                backgroundColor: '#FF9800', 
                color: 'white',
                fontSize: '0.7rem',
                height: 20
              }} 
            />
          )}
        </Box>
        <IconButton size="small">
          {expanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>

      {/* Content */}
      <Collapse in={expanded}>
        <Box sx={{ p: 2 }}>
          {/* Message Input */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Send a message about this reservation (e.g., pickup time changes, special requests)
            </Typography>
            <TextField 
              fullWidth 
              multiline 
              minRows={2}
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              placeholder="Write a message about this reservation..."
              sx={{ 
                '& .MuiOutlinedInput-root': { 
                  backgroundColor: '#fff', 
                  borderRadius: 2 
                } 
              }} 
            />
            <Button 
              startIcon={<Send />}
              onClick={handleSendMessage}
              disabled={!message.trim()}
              sx={{ 
                mt: 1,
                background: 'linear-gradient(90deg, #FFC107 0%, #FF9800 100%)',
                color: 'white',
                py: 1,
                px: 3,
                borderRadius: 2,
                fontWeight: 'bold',
                textTransform: 'none',
                boxShadow: '0 2px 4px rgba(255, 193, 7, 0.3)',
                '&:hover': { 
                  background: 'linear-gradient(90deg, #FFB300 0%, #F57C00 100%)', 
                  boxShadow: '0 4px 8px rgba(255, 193, 7, 0.4)' 
                },
                '&:disabled': {
                  background: 'rgba(0,0,0,0.12)',
                  color: 'rgba(0,0,0,0.26)'
                }
              }}
            >
              Send Message
            </Button>
          </Box>

          <Divider sx={{ my: 2, borderColor: '#FFE082' }} />

          {/* Messages List */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              Previous Messages ({messages.length})
            </Typography>
            
            {messages.length === 0 ? (
              <Typography color="text.secondary" sx={{ fontStyle: 'italic' }}>
                No messages yet for this reservation.
              </Typography>
            ) : (
              <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
                {messages.map((msg) => (
                  <Box 
                    key={msg.id} 
                    sx={{ 
                      mb: 2, 
                      p: 2, 
                      backgroundColor: 'rgba(255, 193, 7, 0.05)', 
                      borderRadius: 2,
                      border: '1px solid rgba(255, 193, 7, 0.2)',
                      position: 'relative'
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                          {new Date(msg.date).toLocaleString()}
                        </Typography>
                        <Typography variant="body1">
                          {msg.text}
                        </Typography>
                      </Box>
                      <IconButton 
                        size="small" 
                        onClick={() => handleDeleteMessage(msg.id)}
                        sx={{ 
                          color: '#f44336',
                          '&:hover': { backgroundColor: 'rgba(244, 67, 54, 0.1)' }
                        }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
}

export default ReservationMessageComponent;
