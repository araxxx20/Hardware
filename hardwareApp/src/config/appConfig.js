// App Configuration
export const APP_CONFIG = {
  // Flutter App Configuration
  FLUTTER_APP: {
    URL: 'http://localhost:8080', // Flutter web default port
    NAME: 'BABA Hardware Ordering App',
    DESCRIPTION: 'Customer ordering application for BABA Hardware',
  },
  
  // React App Configuration
  REACT_APP: {
    NAME: 'BABA Hardware Management',
    VERSION: '1.0.0',
  },
  
  // API Configuration (if needed in the future)
  API: {
    BASE_URL: 'http://localhost:8000',
    TIMEOUT: 10000,
  },
  
  // Feature Flags
  FEATURES: {
    ENABLE_ORDERING_REDIRECT: true,
    ENABLE_ANALYTICS: false,
  },
};

// Helper function to get Flutter app URL
export const getFlutterAppUrl = () => APP_CONFIG.FLUTTER_APP.URL;

// Helper function to check if ordering redirect is enabled
export const isOrderingRedirectEnabled = () => APP_CONFIG.FEATURES.ENABLE_ORDERING_REDIRECT;
