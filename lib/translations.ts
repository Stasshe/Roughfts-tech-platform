export const translations = {
  en: {
    menu: {
      home: 'Home',
      works: 'Works',
      about: 'About',
      contact: 'Contact',
      language: 'Language'
    },
    buttons: {
      viewProject: 'View Project'
    },
    sections: {
      selectedWorks: 'Selected Works'
    }
  },
  ja: {
    menu: {
      home: 'ホーム',
      works: '作品',
      about: '私について',
      contact: 'お問い合わせ',
      language: '言語'
    },
    buttons: {
      viewProject: 'プロジェクトを見る'
    },
    sections: {
      selectedWorks: '選択された作品'
    }
  }
} as const;

export type TranslationKey = keyof typeof translations.en; 