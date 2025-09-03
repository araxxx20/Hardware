const KEY = 'reservationMessages';

export default class MessageService {
  static list(reservationId = null) {
    try {
      const raw = localStorage.getItem(KEY);
      const allMessages = raw ? JSON.parse(raw) : [];
      
      if (reservationId) {
        return allMessages.filter(msg => msg.reservationId === reservationId);
      }
      
      return allMessages;
    } catch (e) {
      return [];
    }
  }

  static add(message, reservationId) {
    const list = MessageService.list();
    const item = { 
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, 
      date: new Date().toISOString(), 
      reservationId: reservationId || 'general',
      ...message 
    };
    list.unshift(item);
    localStorage.setItem(KEY, JSON.stringify(list));
    try { 
      window.dispatchEvent(new Event('reservationMessagesUpdated'));
      if (reservationId) {
        window.dispatchEvent(new CustomEvent('reservationMessagesUpdated', { detail: { reservationId } }));
      }
    } catch (_) {}
    return item;
  }

  static getMessagesForReservation(reservationId) {
    return MessageService.list(reservationId);
  }

  static deleteMessage(messageId) {
    const list = MessageService.list();
    const filtered = list.filter(msg => msg.id !== messageId);
    localStorage.setItem(KEY, JSON.stringify(filtered));
    try { window.dispatchEvent(new Event('reservationMessagesUpdated')); } catch (_) {}
  }
}


