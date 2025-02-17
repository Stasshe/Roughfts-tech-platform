export interface Feature {
  title: string;
  details: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
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

// Import your JSON files and export them as a collection
import eduOpen4Step from './projects/edu-open-4step.json';
import shogiApp from './projects/shogi-app.json';
import bookmarkletDeveloper from './projects/bookmarklet-developer.json';
import bokmarkleScraiping from './projects/bookmarklet-scraping.json';
import bookmarkletYoutube from './projects/bookmarklet-youtube.json';
import kanjiJourney from './projects/kanji-journey.json';
import primeCube from './projects/prime-cube.json';
import ventusTalk from './projects/ventus-talk.json';
import pythonFilter from './projects/python-filter.json';


// Import other project JSON files as needed

export const projects: { [key: string]: Project } = {
  'edu-open-4step': eduOpen4Step as Project,
  'shogi-app': shogiApp as Project,
  'bookmarklet-developer': bookmarkletDeveloper as Project,
  'bokmarkle-scraping': bokmarkleScraiping as Project,
  'bookmarklet-youtube': bookmarkletYoutube as Project,
  'kanji-journey': kanjiJourney as Project,
  'prime-cube': primeCube as Project,
  'ventus-talk': ventusTalk as Project,
  'python-filter': pythonFilter as Project,
};
