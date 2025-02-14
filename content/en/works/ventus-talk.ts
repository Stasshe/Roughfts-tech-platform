import { WorkContent } from "../../../types/content";

export const ventusTalkEn: WorkContent = {
  id: 'ventus-talk',
  title: 'Ventus-Talk',
  shortIntro: 'A high-performance chat application handling 10,000+ messages daily with real-time synchronization and rich features.',
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
        'Multi-server architecture with 3 Firestore servers',
        'Efficient 4MB static site deployment',
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
}; 