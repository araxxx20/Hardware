export const categories = [
  { id: 'all', name: 'All', icon: 'all_inclusive', description: 'All products', isActive: true },
  { id: 'tools', name: 'Tools', icon: 'build', description: 'Hand tools and equipment', isActive: true },
  { id: 'switches', name: 'Switches', icon: 'power', description: 'Electrical switches and controls', isActive: true },
  { id: 'lighting', name: 'Lighting', icon: 'lightbulb', description: 'Lighting fixtures and bulbs', isActive: true },
  { id: 'circuit_breakers', name: 'Circuit Breakers', icon: 'electric_bolt', description: 'Circuit breakers and electrical protection', isActive: true },
  { id: 'wiring', name: 'Wiring', icon: 'cable', description: 'Electrical wires and cables', isActive: true }
];

export const products = [
  { id: 'socket_001', name: 'Socket', price: '₱299', soldCount: '2.1k', imagePath: '/assets/images/outlet_double.svg', categoryId: 'tools', description: '', rating: 4.5, reviewCount: 128, isAvailable: true },
  { id: 'longnose_001', name: 'Longnose Pliers', price: '₱450', soldCount: '1.8k', imagePath: '/assets/images/longnose.jpg', categoryId: 'tools', description: '', rating: 4.3, reviewCount: 95, isAvailable: true },
  { id: 'switch_001', name: 'Switch', price: '₱799', soldCount: '3.2k', imagePath: '/assets/images/dimmer_switch.svg', categoryId: 'switches', description: '', rating: 4.7, reviewCount: 203, isAvailable: true },
  { id: 'wire_001', name: 'Electrical Wire', price: '₱1,250', soldCount: '950', imagePath: '/assets/images/wires.jpg', categoryId: 'wiring', description: '', rating: 4.4, reviewCount: 67, isAvailable: true },
  { id: 'measuring_tape_001', name: 'Measuring Tape', price: '₱899', soldCount: '1.5k', imagePath: '/assets/images/measuringtape.jpg', categoryId: 'tools', description: '', rating: 4.6, reviewCount: 142, isAvailable: true },
  { id: 'bulb_001', name: 'LED Bulb', price: '₱650', soldCount: '2.7k', imagePath: '/assets/images/bulb.jpg', categoryId: 'lighting', description: '', rating: 4.8, reviewCount: 189, isAvailable: true }
];

export const mockUsers = {
  'demo@hardware.test': {
    password: 'Demo@1234',
    name: 'Demo User',
    profileImagePath: ''
  }
};


