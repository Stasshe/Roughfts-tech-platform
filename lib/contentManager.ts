import { projects } from '../data/projects';
import { Project } from '../data/projects';
import { LocalizedContent, WorkContent } from '../types/content';
// Import other content files...

type Language = 'en' | 'ja';

// Import language-specific content
import { ventusTalkJa } from '../content/ja/works/ventus-talk';
import { shogiAppJa } from '../content/ja/works/shogi-app';
import { pythonFilterJa } from '../content/ja/works/python-filter';
// Import other Japanese content...

// Map of localized content
const localizedContent: { [key: string]: { ja: LocalizedContent } } = {
  'ventus-talk': {
    ja: ventusTalkJa
  },
  'shogi-app': {
    ja: shogiAppJa
  },
  'python-filter': {
    ja: pythonFilterJa
  },
  // Add other projects' localized content
};

function mergeWithLocalizedContent(project: Project, language: Language): WorkContent {
  if (language === 'en') {
    return project as WorkContent;
  }

  const localized = localizedContent[project.id]?.[language];
  if (!localized) {
    return project as WorkContent;
  }

  return {
    ...project,
    title: localized.title ?? project.title,
    description: localized.description ?? project.description,
    features: localized.features ?? project.features,
    architecture: localized.architecture 
      ? { ...project.architecture, description: localized.architecture.description }
      : project.architecture,
    highlights: project.highlights?.map((highlight, index) => ({
      ...highlight,
      title: localized.highlights?.[index]?.title ?? highlight.title,
      description: localized.highlights?.[index]?.description ?? highlight.description
    }))
  };
}

export function getWorkContent(workId: string, language: Language): WorkContent | undefined {
  const project = projects[workId];
  if (!project) return undefined;
  return mergeWithLocalizedContent(project, language);
}

export function getAllWorks(language: Language): WorkContent[] {
  return Object.values(projects).map(project => 
    mergeWithLocalizedContent(project, language)
  );
} 