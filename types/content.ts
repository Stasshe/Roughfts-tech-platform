export interface LinkItem {
  type: 'github' | 'github-gist' | 'glitch' | 'replit' | 'github-pages' | 'website' | 'render';
  url: string;
  title?: string;
}

export interface Project {
  id: string;
  title: string;
  title_ja: string;
  description: string;
  description_ja: string;
  techStack: string[];
  features: {
    title: string;
    title_ja: string;
    details: string[];
    details_ja: string[];
  }[];
  images: string[];
  highlights?: {
    title: string;
    title_ja: string;
    value: string;
    description: string;
    description_ja: string;
  }[];
  architecture?: {
    diagram: string;
    description: string;
    description_ja: string;
  };
  demoVideo?: string;
  featured?: boolean;
  links?: LinkItem[];
}

export interface SubDetail {
  caption: string;
  caption_ja?: string;
  content: string[];
  content_ja?: string[];
}

export interface Detail {
  caption: string;
  caption_ja?: string;
  content: string[];
  content_ja?: string[];
  subDetails?: SubDetail[];
}

export interface Gists {
  id: string;
  slug: string;
  title: string;
  title_ja: string;
  year: string;
  month: string;
  date: string;
  category: string;
  techStack: string[];
  description: string;
  description_ja: string;
  details: Detail[];
  links?: LinkItem[];
}

// Alias Project as ProjectContent for backward compatibility
export type ProjectContent = Project;

export interface LocalizedContent {
  title?: string;
  description?: string;
  shortIntro?: string;
  features?: {
    title: string;
    details: string[];
  }[];
  architecture?: {
    description: string;
  };
  highlights?: {
    title: string;
    description: string;
  }[];
}

export interface WorkContent extends Project {
  localizedContent?: {
    ja: LocalizedContent;
  };
  featured?: boolean;
}

export interface PageContent {
  title: string;
  title_ja: string;
  description: string;
  description_ja: string;
  sections?: {
    [key: string]: {
      title?: string;
      title_ja?: string;
      content?: string;
      content_ja?: string;
      name?: string;
      icon?: string;
      category?: string;
    };
  };
}
