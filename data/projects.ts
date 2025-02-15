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
  'prime-cube': {
    id: 'prime-cube',
    title: 'Prime Cube Game',
    description: 'An educational math game where players tap or slice composite number cubes to split them into prime factors, featuring multiple difficulty levels and combo systems.',
    techStack: [
      'Swift',
      'SpriteKit',
      'UIKit',
      'GameplayKit',
      'CoreAnimation'
    ],
    features: [
      {
        title: 'Gameplay Mechanics',
        details: [
          'Tap-based cube splitting mechanics',
          'Multiple difficulty modes (Easy, Normal, Special)',
          'Combo system with score multipliers',
          'Life system with penalty mechanics',
          'Real-time prime factorization gameplay',
          'Hint system for large numbers (80+)',
          'Score multiplier for quick reactions'
        ]
      },
      {
        title: 'Game Modes',
        details: [
          'Easy Mode: Focus on 2x and 3x multiples',
          'Normal Mode: Increased difficulty with larger numbers',
          'Special Mode: Challenge mode with complex numbers',
          'Custom gravity settings per difficulty level',
          'Varying cube generation ranges per mode'
        ]
      },
      {
        title: 'Educational Features',
        details: [
          'Prime factorization practice',
          'Minimum prime factor hints',
          'Score-based learning feedback',
          'Progressive difficulty system',
          'Real-time mathematical problem solving'
        ]
      }
    ],
    images: [
      '/assets/prime-cube/IMG_0354.png',
      '/assets/prime-cube/IMG_0356.png',
      '/assets/prime-cube/IMG_0355.png',
      '/assets/prime-cube/IMG_0357.png'
    ],
    highlights: [
      {
        title: 'Modes',
        value: '5',
        description: 'Difficulty levels'
      },
      {
        title: 'Range',
        value: '16-3999',
        description: 'Number range'
      },
      {
        title: 'Time',
        value: '60-120s',
        description: 'Game duration'
      }
    ]
  },
  'ventus-talk': {
    id: 'ventus-talk',
    title: 'Ventus-Talk',
    description: 'A high-performance, real-time chat application with advanced features and optimized user experience.',
    techStack: [
      'Firestore',
      'JavaScript',
      'PWA',
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
          'Multi-server architecture with 4 Firestore servers',
          'Automatic YouTube link conversion and embedding',
          'QR code friend addition system',
          'File sharing support',
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
    description: 'A modern Shogi (Japanese Chess) application built for iPad, featuring AI integration, multiplayer capabilities, and extensive game analysis tools.',
    techStack: [
      'Swift',
      'SpriteKit',
      'Firebase',
      'WebSocket',
      'GIKOU AI API',
      'UIKit',
      'CoreData'
    ],
    features: [
      {
        title: 'Game Modes',
        details: [
          'Real-time online multiplayer with chat system',
          'AI opponent mode using GIKOU engine',
          'Solo study mode with move analysis',
          'Game replay and analysis features',
          'Spectator mode with board rotation',
          'Move history and game state persistence'
        ]
      },
      {
        title: 'Technical Features',
        details: [
          'Real-time game synchronization (avg. 3s latency)',
          'Custom Shogi notation parser',
          'Integrated chat system for players',
          'Move validation system',
          'Game state persistence and restoration',
          'Check (王手) detection system'
        ]
      },
      {
        title: 'Version History',
        details: [
          'v2.31: Fixed opponent move visibility in online matches',
          'v2.30: Added in-game private chat',
          'v2.28: Room ID copying and UI improvements',
          'v2.0: Online multiplayer implementation',
          'v1.8: Solo study mode completion',
          'v1.0: GUI and core features implementation'
        ]
      }
    ],
    images: [
      '/assets/cecon/IMG_0342.png',
      '/assets/cecon/IMG_0339.png',
      '/assets/cecon/IMG_0345.png',
      '/assets/cecon/IMG_0346.png'
    ],
    highlights: [
      {
        title: 'Updates',
        value: '30+',
        description: 'Version iterations'
      },
      {
        title: 'Modes',
        value: '3',
        description: 'Play styles available'
      },
      {
        title: 'Latency',
        value: '~3s',
        description: 'Online play response'
      }
    ],
    architecture: {
      diagram: '/assets/cecon/architecture.svg',
      description: 'Client-server architecture with AI integration and real-time multiplayer support using WebSocket connections.'
    },
    demoVideo: '/assets/cecon/ScreenRecording_02-14-2025 09-49-30_1.mp4'
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
    images: [
      '/assets/python-filter/IMG_0385.png',
      '/assets/python-filter/IMG_0384.png'
    ]
  },
  'edu-open-4step': {
    id: 'edu-open-4step',
    title: 'Filtering Ignore web site',
    description: 'A web-based platform designed to enhance educational resource accessibility through a four-step verification process.',
    techStack: [
      'JavaScript',
      'Scraping',
      'CSS',
      'Filtering',
      'Rest API',
      'Network Protocols',
      'Web Security',
      'HTML'
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
    images: [
      '/assets/edu-open-4step/IMG_0066.jpeg',
      '/assets/edu-open-4step/IMG_0362.png',
      '/assets/edu-open-4step/IMG_0363.png'
    ]
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
    images: [
      '/assets/youtube-tool-1.jpg',
      '/assets/youtube-tool-2.jpg'
    ]
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
    images: [
      '/assets/bookmarklet/scraping/IMG_0365.png',
      '/assets/bookmarklet/scraping/IMG_0364.png',
      '/assets/bookmarklet/scraping/IMG_0366.png'
    ]
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
    images: [
      '/assets/bookmarklet/developer/IMG_0378.png',
      '/assets/bookmarklet/developer/IMG_0382.png'
    ]
  },
  'kanji-journey': {
    id: 'kanji-journey',
    title: 'Kanji Journey - Reimagined',
    description: 'A reimagined version of the classic Kanji de GO!, with enhanced visuals and improved difficulty levels for kanji challenges.',
    techStack: [
      'Swift',
      'SpriteKit',
      'Firebase',
      'UIKit',
      'CoreData'
    ],
    features: [
      {
        title: 'Game Modes',
        details: [
          'Tiered mode with progressive difficulty levels',
          'Unlimited mode for continuous play',
          'Online leaderboard for each difficulty level using Firebase Realtime Database',
          'Real-time multiplayer capabilities',
          'Comprehensive kanji study tools'
        ]
      },
      {
        title: 'Technical Features',
        details: [
          'Real-time game synchronization',
          'Integrated chat system for players',
          'Kanji recognition and validation system',
          'Game state persistence and restoration',
          'Dynamic difficulty adjustment based on player performance'
        ]
      },
      {
        title: 'Version History',
        details: [
          'v1.0: Initial release with core game features and enhanced visuals',
          'v1.1: Added online leaderboard',
          'v1.2: Implemented real-time multiplayer mode',
          'v1.3: Improved kanji recognition accuracy',
          'v1.4: Added dynamic difficulty adjustment'
        ]
      }
    ],
    images: [
      '/assets/kanji-de-go/IMG_0347.png',
      '/assets/kanji-de-go/IMG_0350.png',
      '/assets/kanji-de-go/IMG_0352.png',
      '/assets/kanji-de-go/IMG_0348.png',
      '/assets/kanji-de-go/IMG_0353.png'
    ],
    highlights: [
      {
        title: 'Updates',
        value: '5+',
        description: 'Version iterations'
      },
      {
        title: 'Game Modes',
        value: '2',
        description: 'Play styles available'
      },
      {
        title: 'Multiplayer',
        value: 'Real-time',
        description: 'Play with friends and compete in real-time'
      }
    ],
    architecture: {
      diagram: '/assets/kanji-journey/architecture.svg',
      description: 'Client-server architecture with real-time multiplayer support and Firebase Realtime Database integration.'
    }
  }
}; 
