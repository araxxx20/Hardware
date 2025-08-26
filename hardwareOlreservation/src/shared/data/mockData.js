export const categories = [
  { id: 'all', name: 'All', icon: 'all_inclusive', description: 'All products', isActive: true },
  { id: 'tools', name: 'Tools', icon: 'build', description: 'Hand tools and equipment', isActive: true },
  { id: 'switches', name: 'Switches', icon: 'power', description: 'Electrical switches and controls', isActive: true },
  { id: 'lighting', name: 'Lighting', icon: 'lightbulb', description: 'Lighting fixtures and bulbs', isActive: true },
  { id: 'circuit_breakers', name: 'Circuit Breakers', icon: 'electric_bolt', description: 'Circuit breakers and electrical protection', isActive: true },
  { id: 'wiring', name: 'Wiring', icon: 'cable', description: 'Electrical wires and cables', isActive: true }
];

export const products = [
  { id: 'socket_001', name: 'Socket', price: '₱299', soldCount: '2.1k', imagePath: '/assets/socket.jpg', categoryId: 'tools', description: '', rating: 4.5, reviewCount: 128, isAvailable: true },
  { id: 'longnose_001', name: 'Longnose Pliers', price: '₱450', soldCount: '1.8k', imagePath: '/assets/longnose.jpg', categoryId: 'tools', description: '', rating: 4.3, reviewCount: 95, isAvailable: true },
  { id: 'switch_001', name: 'Switch', price: '₱799', soldCount: '3.2k', imagePath: '/assets/switch.jpg', categoryId: 'switches', description: 'Durable wall switch.', rating: 4.7, reviewCount: 203, isAvailable: true },
  { id: 'wire_001', name: 'Electrical Wire', price: '₱1,250', soldCount: '950', imagePath: '/assets/wires.jpg', categoryId: 'wiring', description: '', rating: 4.4, reviewCount: 67, isAvailable: true },
  { id: 'measuring_tape_001', name: 'Measuring Tape', price: '₱899', soldCount: '1.5k', imagePath: '/assets/measuringtape.jpg', categoryId: 'tools', description: '', rating: 4.6, reviewCount: 142, isAvailable: true },
  { id: 'bulb_001', name: 'ECOLUM LED Bulb', price: '₱650', soldCount: '2.7k', imagePath: '/assets/ecolumLED.jpg', categoryId: 'lighting', description: 'Bright and energy-efficient LED bulb.', rating: 4.8, reviewCount: 189, isAvailable: true },
  { id: 'pvc_conduit_20mm', name: 'Orange PVC Conduit 20mm', price: '₱120', soldCount: '1.1k', imagePath: '/assets/orangepvc.jpg', categoryId: 'wiring', description: 'Durable orange PVC conduit for electrical installations.', rating: 4.6, reviewCount: 88, isAvailable: true },
  { id: 'electrical_tape_pack', name: 'Electrical Tapes Pack', price: '₱180', soldCount: '2.4k', imagePath: '/assets/electricaltape.jpg', categoryId: 'wiring', description: 'Color pack of electrical insulation tapes.', rating: 4.7, reviewCount: 134, isAvailable: true },
  { id: 'junction_box_4x4', name: 'Junction Box 4x4', price: '₱95', soldCount: '1.9k', imagePath: '/assets/junctionbox.jpg', categoryId: 'switches', description: 'Standard 4x4 junction box for wiring.', rating: 4.5, reviewCount: 76, isAvailable: true }
  ,{ id: 'pvc_cement_neltex', name: 'NELTEX PVC Pipe Cement', price: '₱210', soldCount: '860', imagePath: '/assets/neltex.jpg', categoryId: 'wiring', description: 'Adhesive for PVC pipes and fittings.', rating: 4.6, reviewCount: 52, isAvailable: true }
  ,{ id: 'common_nails', name: 'Common Nails (per kg)', price: '₱120', soldCount: '3.1k', imagePath: '/assets/nails.jpg', categoryId: 'tools', description: 'High quality steel nails for general use.', rating: 4.4, reviewCount: 97, isAvailable: true }
  ,{ id: 'plastic_faucet', name: 'PVC Faucet', price: '₱85', soldCount: '1.4k', imagePath: '/assets/pvcfaucet.jpg', categoryId: 'tools', description: 'Durable PVC water faucet.', rating: 4.3, reviewCount: 61, isAvailable: true }
  ,{ id: 'mcb_20a', name: 'MCB 20A Circuit Breaker', price: '₱350', soldCount: '820', imagePath: '/assets/circuitbreakers.jpg', categoryId: 'circuit_breakers', description: 'Reliable 20A mini circuit breaker for protection.', rating: 4.6, reviewCount: 58, isAvailable: true }
  // Removed duplicate junction box entry to avoid duplicates in the list
];

export const mockUsers = {
  'demo@hardware.test': {
    password: 'Demo@1234',
    name: 'Demo User',
    profileImagePath: ''
  }
};


