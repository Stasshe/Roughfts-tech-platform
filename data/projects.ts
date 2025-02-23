export interface Feature {
  title: string;
  details: string[];
}

export interface Project {
  id: string;
  title: string;
  title_ja: string;
  description: string;
  description_ja: string;
  techStack: string[];
  features: Feature[];
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


export const projects = [
  require('./projects/lists.json'),
  require('./projects/edu-open-4step.json'),
  require('./projects/shogi-app.json'),
  require('./projects/bookmarklet-developer.json'),
  require('./projects/bookmarklet-scraping.json'),
  require('./projects/bookmarklet-youtube.json'),
  require('./projects/kanji-journey.json'),
  require('./projects/prime-cube.json'),
  require('./projects/ventus-talk.json'),
  require('./projects/python-filter.json'),
  require('./projects/novnc-virtual-browser.json')
];
