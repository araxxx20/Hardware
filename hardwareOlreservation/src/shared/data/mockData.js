export const categories = [
  { id: 'all', name: 'All', icon: 'all_inclusive', description: 'All products', isActive: true },
  { id: 'tools', name: 'Tools', icon: 'build', description: 'Hand tools and equipment', isActive: true },
  { id: 'switches', name: 'Switches', icon: 'power', description: 'Electrical switches and controls', isActive: true },
  { id: 'lighting', name: 'Lighting', icon: 'lightbulb', description: 'Lighting fixtures and bulbs', isActive: true },
  { id: 'circuit_breakers', name: 'Circuit Breakers', icon: 'electric_bolt', description: 'Circuit breakers and electrical protection', isActive: true },
  { id: 'wiring', name: 'Wiring', icon: 'cable', description: 'Electrical wires and cables', isActive: true }
];

export const products = [
  { 
    id: 'socket_001', 
    name: 'Socket', 
    basePrice: '₱299', 
    soldCount: '2.1k', 
    imagePath: '/assets/socket.jpg', 
    categoryId: 'tools', 
    description: '', 
    rating: 4.5, 
    reviewCount: 128, 
    isAvailable: true,
    variations: {
      size: {
        label: 'Size',
        options: [
          { value: 'small', label: 'Small', priceModifier: 0 },
          { value: 'medium', label: 'Medium', priceModifier: 50 },
          { value: 'large', label: 'Large', priceModifier: 100 }
        ]
      }
    }
  },
  { 
    id: 'longnose_001', 
    name: 'Longnose Pliers', 
    basePrice: '₱450', 
    soldCount: '1.8k', 
    imagePath: '/assets/longnose.jpg', 
    categoryId: 'tools', 
    description: '', 
    rating: 4.3, 
    reviewCount: 95, 
    isAvailable: true,
    variations: {
      size: {
        label: 'Size',
        options: [
          { value: '6inch', label: '6 inch', priceModifier: 0 },
          { value: '8inch', label: '8 inch', priceModifier: 80 },
          { value: '10inch', label: '10 inch', priceModifier: 150 }
        ]
      }
    }
  },
  { 
    id: 'switch_001', 
    name: 'Switch', 
    basePrice: '₱799', 
    soldCount: '3.2k', 
    imagePath: '/assets/switch.jpg', 
    categoryId: 'switches', 
    description: 'Durable wall switch.', 
    rating: 4.7, 
    reviewCount: 203, 
    isAvailable: true,
    variations: {
      color: {
        label: 'Color',
        options: [
          { value: 'white', label: 'White', priceModifier: 0 },
          { value: 'black', label: 'Black', priceModifier: 50 },
          { value: 'gray', label: 'Gray', priceModifier: 30 }
        ]
      }
    }
  },
  { 
    id: 'wire_001', 
    name: 'Electrical Wire', 
    basePrice: '₱1,250', 
    soldCount: '950', 
    imagePath: '/assets/wires.jpg', 
    categoryId: 'wiring', 
    description: '', 
    rating: 4.4, 
    reviewCount: 67, 
    isAvailable: true,
    variations: {
      gauge: {
        label: 'Wire Gauge',
        options: [
          { value: '12awg', label: '12 AWG', priceModifier: 0 },
          { value: '14awg', label: '14 AWG', priceModifier: -200 },
          { value: '10awg', label: '10 AWG', priceModifier: 300 }
        ]
      },
      length: {
        label: 'Length',
        options: [
          { value: '50m', label: '50 meters', priceModifier: 0 },
          { value: '100m', label: '100 meters', priceModifier: 800 },
          { value: '200m', label: '200 meters', priceModifier: 1500 }
        ]
      }
    }
  },
  { 
    id: 'measuring_tape_001', 
    name: 'Measuring Tape', 
    basePrice: '₱899', 
    soldCount: '1.5k', 
    imagePath: '/assets/measuringtape.jpg', 
    categoryId: 'tools', 
    description: '', 
    rating: 4.6, 
    reviewCount: 142, 
    isAvailable: true,
    variations: {
      length: {
        label: 'Length',
        options: [
          { value: '3m', label: '3 meters', priceModifier: -200 },
          { value: '5m', label: '5 meters', priceModifier: 0 },
          { value: '8m', label: '8 meters', priceModifier: 300 }
        ]
      }
    }
  },
  { 
    id: 'bulb_001', 
    name: 'ECOLUM LED Bulb', 
    basePrice: '₱650', 
    soldCount: '2.7k', 
    imagePath: '/assets/ecolumLED.jpg', 
    categoryId: 'lighting', 
    description: 'Bright and energy-efficient LED bulb.', 
    rating: 4.8, 
    reviewCount: 189, 
    isAvailable: true,
    variations: {
      wattage: {
        label: 'Wattage',
        options: [
          { value: '9w', label: '9W', priceModifier: -100 },
          { value: '12w', label: '12W', priceModifier: 0 },
          { value: '15w', label: '15W', priceModifier: 150 }
        ]
      },
      color: {
        label: 'Color Temperature',
        options: [
          { value: 'warm', label: 'Warm White', priceModifier: 0 },
          { value: 'cool', label: 'Cool White', priceModifier: 50 },
          { value: 'daylight', label: 'Daylight', priceModifier: 80 }
        ]
      }
    }
  },
  { 
    id: 'pvc_conduit_20mm', 
    name: 'PVC Conduit', 
    basePrice: '₱120', 
    soldCount: '1.1k', 
    imagePath: '/assets/orangepvc.jpg', 
    categoryId: 'wiring', 
    description: 'Durable PVC conduit for electrical installations.', 
    rating: 4.6, 
    reviewCount: 88, 
    isAvailable: true,
    variations: {
      diameter: {
        label: 'Diameter',
        options: [
          { value: '20mm', label: '20mm', priceModifier: 0 },
          { value: '25mm', label: '25mm', priceModifier: 30 },
          { value: '32mm', label: '32mm', priceModifier: 60 }
        ]
      },
      color: {
        label: 'Color',
        options: [
          { value: 'orange', label: 'Orange', priceModifier: 0 },
          { value: 'white', label: 'White', priceModifier: 20 },
          { value: 'gray', label: 'Gray', priceModifier: 15 }
        ]
      },
      length: {
        label: 'Length',
        options: [
          { value: '3m', label: '3 meters', priceModifier: 0 },
          { value: '6m', label: '6 meters', priceModifier: 80 },
          { value: '12m', label: '12 meters', priceModifier: 150 }
        ]
      }
    }
  },
  { 
    id: 'electrical_tape_pack', 
    name: 'Electrical Tapes Pack', 
    basePrice: '₱180', 
    soldCount: '2.4k', 
    imagePath: '/assets/electricaltape.jpg', 
    categoryId: 'wiring', 
    description: 'Color pack of electrical insulation tapes.', 
    rating: 4.7, 
    reviewCount: 134, 
    isAvailable: true,
    variations: {
      colors: {
        label: 'Color Set',
        options: [
          { value: 'basic', label: 'Basic (Black, Red, Blue)', priceModifier: 0 },
          { value: 'extended', label: 'Extended (6 colors)', priceModifier: 50 },
          { value: 'premium', label: 'Premium (10 colors)', priceModifier: 100 }
        ]
      }
    }
  },
  { 
    id: 'junction_box_4x4', 
    name: 'Junction Box', 
    basePrice: '₱95', 
    soldCount: '1.9k', 
    imagePath: '/assets/junctionbox.jpg', 
    categoryId: 'switches', 
    description: 'Standard junction box for wiring.', 
    rating: 4.5, 
    reviewCount: 76, 
    isAvailable: true,
    variations: {
      size: {
        label: 'Size',
        options: [
          { value: '4x4', label: '4x4 inches', priceModifier: 0 },
          { value: '4x6', label: '4x6 inches', priceModifier: 30 },
          { value: '6x6', label: '6x6 inches', priceModifier: 60 }
        ]
      },
      material: {
        label: 'Material',
        options: [
          { value: 'plastic', label: 'Plastic', priceModifier: 0 },
          { value: 'metal', label: 'Metal', priceModifier: 40 }
        ]
      }
    }
  },
  { 
    id: 'pvc_cement_neltex', 
    name: 'NELTEX PVC Pipe Cement', 
    basePrice: '₱210', 
    soldCount: '860', 
    imagePath: '/assets/neltex.jpg', 
    categoryId: 'wiring', 
    description: 'Adhesive for PVC pipes and fittings.', 
    rating: 4.6, 
    reviewCount: 52, 
    isAvailable: true,
    variations: {
      size: {
        label: 'Container Size',
        options: [
          { value: '250ml', label: '250ml', priceModifier: 0 },
          { value: '500ml', label: '500ml', priceModifier: 80 },
          { value: '1L', label: '1 Liter', priceModifier: 150 }
        ]
      }
    }
  },
  { 
    id: 'common_nails', 
    name: 'Common Nails', 
    basePrice: '₱120', 
    soldCount: '3.1k', 
    imagePath: '/assets/nails.jpg', 
    categoryId: 'tools', 
    description: 'High quality steel nails for general use.', 
    rating: 4.4, 
    reviewCount: 97, 
    isAvailable: true,
    variations: {
      size: {
        label: 'Nail Size',
        options: [
          { value: '1inch', label: '1 inch', priceModifier: 0 },
          { value: '2inch', label: '2 inch', priceModifier: 20 },
          { value: '3inch', label: '3 inch', priceModifier: 40 }
        ]
      },
      quantity: {
        label: 'Quantity',
        options: [
          { value: '1kg', label: '1 kg', priceModifier: 0 },
          { value: '2kg', label: '2 kg', priceModifier: 100 },
          { value: '5kg', label: '5 kg', priceModifier: 200 }
        ]
      }
    }
  },
  { 
    id: 'plastic_faucet', 
    name: 'PVC Faucet', 
    basePrice: '₱85', 
    soldCount: '1.4k', 
    imagePath: '/assets/pvcfaucet.jpg', 
    categoryId: 'tools', 
    description: 'Durable PVC water faucet.', 
    rating: 4.3, 
    reviewCount: 61, 
    isAvailable: true,
    variations: {
      size: {
        label: 'Size',
        options: [
          { value: '1/2inch', label: '1/2 inch', priceModifier: 0 },
          { value: '3/4inch', label: '3/4 inch', priceModifier: 30 },
          { value: '1inch', label: '1 inch', priceModifier: 60 }
        ]
      }
    }
  },
  { 
    id: 'mcb_20a', 
    name: 'MCB Circuit Breaker', 
    basePrice: '₱350', 
    soldCount: '820', 
    imagePath: '/assets/circuitbreakers.jpg', 
    categoryId: 'circuit_breakers', 
    description: 'Reliable mini circuit breaker for protection.', 
    rating: 4.6, 
    reviewCount: 58, 
    isAvailable: true,
    variations: {
      amperage: {
        label: 'Amperage',
        options: [
          { value: '10a', label: '10A', priceModifier: -50 },
          { value: '20a', label: '20A', priceModifier: 0 },
          { value: '32a', label: '32A', priceModifier: 100 }
        ]
      }
    }
  }
];

export const mockUsers = {
  'demo@hardware.test': {
    password: 'Demo@1234',
    name: 'Demo User',
    profileImagePath: ''
  }
};


