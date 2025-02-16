export interface Experience {
  id: string;
  slug: string;
  title: string;
  title_ja: string;
  year: string;
  category: string;
  description: string;
  description_ja: string;
  details: ExperienceDetail[];
}

interface ExperienceDetail {
  title: string;
  title_ja: string;
  content: string[];
  content_ja: string[];
  subDetails?: SubDetail[];
}

interface SubDetail {
  title: string;
  title_ja: string;
  content: string[];
  content_ja: string[];
}

export const experiences = [
  require('./experiences/development-tips.json')
]; 