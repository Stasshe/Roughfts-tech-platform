export const translations = {
  en: {
    menu: {
      home: 'Home',
      works: 'Works',
      about: 'About',
      contact: 'Contact',
      language: 'Language',
      experiences: 'Experiences',
      search: 'Search'
    },
    buttons: {
      viewProject: 'View Project',
      returnToWorks: 'Return to Works'
    },
    sections: {
      selectedWorks: 'Selected Works',
      technologies: 'Technologies Used',
      features: 'Features',
      seeInAction: 'See it in Action',
      systemArchitecture: 'System Architecture',
      projectNotFound: 'Project Not Found'
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success'
    },
    pages: {
      home: {
        welcome: 'Welcome',
        intro: 'Discover our projects and innovations'
      },
      about: {
        title: 'About Us',
        description: 'Learn more about our team and mission'
      },
      contact: {
        title: 'Contact Us',
        description: 'Get in touch with our team'
      }
    }
  },
  ja: {
    menu: {
      home: 'ホーム',
      works: '作品',
      about: 'プロフィール',
      contact: 'お問い合わせ',
      language: '言語',
      experiences: '経験',
      search: '検索'
    },
    buttons: {
      viewProject: 'プロジェクトを見る',
      returnToWorks: '作品一覧に戻る'
    },
    sections: {
      selectedWorks: '作品',
      technologies: '使用技術',
      features: '機能',
      seeInAction: 'デモ映像',
      systemArchitecture: 'システム構成',
      projectNotFound: 'プロジェクトが見つかりません'
    },
    common: {
      loading: '読み込み中...',
      error: 'エラー',
      success: '成功'
    },
    pages: {
      home: {
        welcome: 'ようこそ',
        intro: '私たちのプロジェクトとイノベーションをご覧ください'
      },
      about: {
        title: '私たちについて',
        description: 'チームとミッションについて詳しく知る'
      },
      contact: {
        title: 'お問い合わせ',
        description: 'チームへのご連絡'
      }
    }
  }
} as const;

export type TranslationKey = keyof typeof translations.en; 