const STORAGE_KEY = 'reservationItems';

export default class ReservationService {
  static getItems() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  static setItems(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    ReservationService.notifyUpdated();
  }

  static addItem(newItem) {
    const items = ReservationService.getItems();
    
    // Create a unique key for the item including variations
    const itemKey = newItem.id + '_' + JSON.stringify(newItem.variations || {});
    const existingIndex = items.findIndex(i => {
      const existingKey = i.id + '_' + JSON.stringify(i.variations || {});
      return existingKey === itemKey;
    });
    
    if (existingIndex >= 0) {
      const mergedQty = (items[existingIndex].qty || 1) + (newItem.qty || 1);
      items[existingIndex] = { ...items[existingIndex], qty: mergedQty };
    } else {
      items.push({ ...newItem, qty: newItem.qty || 1 });
    }
    ReservationService.setItems(items);
  }

  static updateQuantity(id, qty, variations = {}) {
    if (qty < 1) return;
    const itemKey = id + '_' + JSON.stringify(variations);
    const items = ReservationService.getItems().map(i => {
      const existingKey = i.id + '_' + JSON.stringify(i.variations || {});
      return existingKey === itemKey ? { ...i, qty } : i;
    });
    ReservationService.setItems(items);
  }

  static removeItem(id, variations = {}) {
    const itemKey = id + '_' + JSON.stringify(variations);
    const items = ReservationService.getItems().filter(i => {
      const existingKey = i.id + '_' + JSON.stringify(i.variations || {});
      return existingKey !== itemKey;
    });
    ReservationService.setItems(items);
  }

  static clear() {
    ReservationService.setItems([]);
  }

  static getSubtotal() {
    return ReservationService.getItems().reduce((total, item) => {
      const price = parseFloat(String(item.price).replace('₱', '').replace(/,/g, '')) || 0;
      const qty = item.qty || 1;
      return total + price * qty;
    }, 0);
  }

  static notifyUpdated() {
    try {
      const event = new Event('reservationUpdated');
      window.dispatchEvent(event);
    } catch (e) {}
  }
}


