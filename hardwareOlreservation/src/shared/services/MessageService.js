const KEY = 'userMessages';

export default class MessageService {
  static list() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  static add(message) {
    const list = MessageService.list();
    const item = { id: `${Date.now()}`, date: new Date().toISOString(), ...message };
    list.unshift(item);
    localStorage.setItem(KEY, JSON.stringify(list));
    try { window.dispatchEvent(new Event('userMessagesUpdated')); } catch (_) {}
    return item;
  }
}


