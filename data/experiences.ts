export interface Experience {
  id: string;
  title: string;
  title_ja: string;
  year: string;
  category: string;
  techStack: string[];
  description: string;
  description_ja: string;
  details: ExperienceDetail[];
}

interface ExperienceDetail {
  caption: string;
  caption_ja: string;
  content: string[];
  content_ja: string[];
  subDetails?: SubDetail[];
}

interface SubDetail {
  caption: string;
  caption_ja: string;
  content: string[];
  content_ja: string[];
}

export const experiences = [
  require('./experiences/development-tips.json'),
  require('./experiences/ipad-restriction-guide.json'),
]; 