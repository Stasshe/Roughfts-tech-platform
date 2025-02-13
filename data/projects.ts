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
}

export const projects: { [key: string]: Project } = {
  'ventus-talk': {
    id: 'ventus-talk',
    title: 'Ventus-Talk',
    description: 'A lightweight, high-performance chat application built with modern web technologies.',
    techStack: [
      'Firebase Firestore',
      'Express.js',
      'React',
      'Node.js',
      'FCM (Firebase Cloud Messaging)',
      'Google Drive API'
    ],
    features: [
      {
        title: 'Performance',
        details: [
          'Approximately 10,000 messages per day capacity',
          'Message update speed of 0.05-0.15 seconds',
          'Efficient 4MB static site (excluding npm modules)',
          'Multi-server architecture using 3 Firebase Firestore servers'
        ]
      },
      {
        title: 'Features',
        details: [
          'Real-time messaging with instant updates',
          'File sharing capabilities (images, videos, documents)',
          'Secure password management with hashing',
          'Cross-platform compatibility',
          'QR code friend addition',
          'YouTube link embedding with automatic conversion',
          '15 font variations and 5 theme options'
        ]
      }
    ],
    images: ['/assets/ventus-talk-1.jpg', '/assets/ventus-talk-2.jpg']
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
    images: ['/assets/shogi-1.jpg', '/assets/shogi-2.jpg']
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