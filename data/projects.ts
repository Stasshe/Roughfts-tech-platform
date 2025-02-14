export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  features: {
    title: string;
    details: string[];
  }[];
  images: string[];
  highlights?: {
    title: string;
    value: string;
    description: string;
  }[];
  architecture?: {
    diagram: string;
    description: string;
  };
  demoVideo?: string;
}

export const projects: { [key: string]: Project } = {
  'ventus-talk': {
    id: 'ventus-talk',
    title: 'Ventus-Talk',
    description: 'A high-performance, real-time chat application with advanced features and optimized user experience.',
    techStack: [
      'Firebase Firestore',
      'Express.js',
      'React',
      'Node.js',
      'FCM (Firebase Cloud Messaging)',
      'Google Drive API',
      'WebRTC',
      'Service Workers'
    ],
    features: [
      {
        title: 'Core Features',
        details: [
          'Real-time messaging with 0.05-0.15 second update speed',
          'Multi-server architecture with 3 Firestore servers',
          'Efficient 4MB static site deployment',
          'Automatic YouTube link conversion and embedding',
          'QR code friend addition system',
          'File sharing with drag & drop support',
          'Push notifications via Service Workers'
        ]
      },
      {
        title: 'User Experience',
        details: [
          '15 customizable font variations',
          '5 theme color options',
          'Responsive design for all devices',
          'Offline message caching',
          'Read status indicators',
          'Message search functionality',
          'Any type of characters'
        ]
      },
      {
        title: 'Technical Achievements',
        details: [
          'Handles 10,000+ messages per day',
          'Load-balanced database architecture',
          'Optimized image compression',
          'Secure password hashing',
          'Real-time presence detection',
          'Efficient data synchronization',
          'Cross-platform compatibility'
        ]
      }
    ],
    images: [
      '/assets/ventus-talk/IMG_0226.png',
      '/assets/ventus-talk/IMG_0153.png',
      '/assets/ventus-talk/IMG_0230.png',
      '/assets/ventus-talk/IMG_0146.png',
      '/assets/ventus-talk/IMG_0232.png'
    ],
    highlights: [
      {
        title: 'Performance',
        value: '0.05s',
        description: 'Message update speed'
      },
      {
        title: 'Scale',
        value: '10K+',
        description: 'Messages per day'
      },
      {
        title: 'Size',
        value: '4MB',
        description: 'Static deployment'
      }
    ],
    architecture: {
      diagram: '/assets/ventus-talk/architecture.svg',
      description: 'Multi-server architecture utilizing Firebase Firestore for optimal performance and scalability.'
    },
    demoVideo: '/assets/ventus-talk/demo.mp4'
  },
  'shogi-app': {
    id: 'shogi-app',
    title: 'Shogi App - CeConV2.31',
    description: 'A modern Shogi (Japanese Chess) application built for iPad, featuring AI integration and multiplayer capabilities.',
    techStack: [
      'Swift',
      'SpriteKit',
      'Firebase',
      'WebSocket',
      'AI Integration'
    ],
    features: [
      {
        title: 'Game Features',
        details: [
          'Real-time multiplayer matches',
          'AI opponent with adjustable difficulty',
          'Interactive game board with piece movement validation',
          'Move history and game replay functionality',
          'Traditional Japanese chess piece designs'
        ]
      },
      {
        title: 'Technical Features',
        details: [
          'Custom move parser for Shogi notation',
          'Real-time game state synchronization',
          'Integrated chat system for players',
          'Profile management system',
          'Game state persistence'
        ]
      },
      {
        title: 'User Experience',
        details: [
          'Intuitive drag-and-drop interface',
          'Visual move suggestions',
          'In-game chat functionality',
          'Customizable game settings',
          'Performance optimized for iPad'
        ]
      }
    ],
    images: [
      '/assets/IMG_0342.png',
      '/assets/IMG_0339.png',
      '/assets/IMG_0345.png',
      '/assets/IMG_0346.png'
    ]
  },
  'python-filter': {
    id: 'python-filter',
    title: 'School Filter Bypass - Python',
    description: 'A Python-based solution for educational network access, enabling students to access legitimate learning resources.',
    techStack: [
      'Python',
      'Socket Programming',
      'Network Protocols',
      'Proxy Server',
      'HTTP/HTTPS'
    ],
    features: [
      {
        title: 'Core Features',
        details: [
          'Custom proxy server implementation',
          'Protocol-level network handling',
          'Efficient data routing',
          'Low-latency connection management',
          'Educational resource access'
        ]
      },
      {
        title: 'Technical Implementation',
        details: [
          'Socket-based communication',
          'Multi-threaded connection handling',
          'Secure data transmission',
          'Minimal resource footprint',
          'Cross-platform compatibility'
        ]
      }
    ],
    images: ['/assets/python-filter-1.jpg', '/assets/python-filter-2.jpg']
  },
  'edu-open-4step': {
    id: 'edu-open-4step',
    title: 'Educational Open 4Step',
    description: 'A web-based platform designed to enhance educational resource accessibility through a four-step verification process.',
    techStack: [
      'HTML',
      'JavaScript',
      'CSS',
      'Network Protocols',
      'Web Security'
    ],
    features: [
      {
        title: 'Core Functionality',
        details: [
          'Four-step verification process',
          'Secure resource access',
          'User-friendly interface',
          'Cross-browser compatibility',
          'Minimal setup requirements'
        ]
      },
      {
        title: 'Security Features',
        details: [
          'Protocol-level security',
          'Data encryption',
          'Session management',
          'Access control mechanisms'
        ]
      }
    ],
    images: ['/assets/edu-open-1.jpg', '/assets/edu-open-2.jpg']
  },
  'bookmarklet-youtube': {
    id: 'bookmarklet-youtube',
    title: 'YouTube Educational Access',
    description: 'A bookmarklet tool for seamless access to educational YouTube content in restricted environments.',
    techStack: [
      'JavaScript',
      'Bookmarklet',
      'YouTube API',
      'DOM Manipulation'
    ],
    features: [
      {
        title: 'Features',
        details: [
          'One-click activation',
          'YouTube content access',
          'Video quality optimization',
          'Minimal browser impact'
        ]
      }
    ],
    images: ['/assets/youtube-tool-1.jpg', '/assets/youtube-tool-2.jpg']
  },
  'bookmarklet-scraping': {
    id: 'bookmarklet-scraping',
    title: 'Web Content Scraping Tool',
    description: 'A bookmarklet for efficient web content extraction and analysis in educational contexts.',
    techStack: [
      'JavaScript',
      'DOM Scraping',
      'Data Parsing',
      'Bookmarklet'
    ],
    features: [
      {
        title: 'Capabilities',
        details: [
          'Selective content extraction',
          'Data formatting',
          'Custom parsing rules',
          'Export functionality'
        ]
      }
    ],
    images: ['/assets/scraping-1.jpg', '/assets/scraping-2.jpg']
  },
  'bookmarklet-developer': {
    id: 'bookmarklet-developer',
    title: 'Developer Tools Bookmarklet',
    description: 'A comprehensive suite of development tools packaged as a bookmarklet for educational environments.',
    techStack: [
      'JavaScript',
      'Developer Tools',
      'Debugging Utilities',
      'Bookmarklet'
    ],
    features: [
      {
        title: 'Development Tools',
        details: [
          'DOM inspection',
          'Network monitoring',
          'Console utilities',
          'Performance analysis'
        ]
      },
      {
        title: 'Educational Features',
        details: [
          'Code learning tools',
          'Debugging assistance',
          'Resource examination',
          'Development practice aids'
        ]
      }
    ],
    images: ['/assets/dev-tools-1.jpg', '/assets/dev-tools-2.jpg']
  }
}; 
