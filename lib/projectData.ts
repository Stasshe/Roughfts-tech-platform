import { ProjectContent, WorkContent } from '../types/content';
import ventusTalk from '../data/projects/ventus-talk.json';
import primeCube from '../data/projects/prime-cube.json';
import shogiApp from '../data/projects/shogi-app.json';
import pythonFilter from '../data/projects/python-filter.json';
import kanjiJourney from '../data/projects/kanji-journey.json';
import bookmarkletYoutube from '../data/projects/bookmarklet-youtube.json';
import bookmarkletScraping from '../data/projects/bookmarklet-scraping.json';
import bookmarkletDeveloper from '../data/projects/bookmarklet-developer.json';
import virtualBrowser from '../data/projects/novnc-virtual-browser.json';

const allProjects = {
  'ventus-talk': ventusTalk,
  'prime-cube': primeCube,
  'shogi-app': shogiApp,
  'python-filter': pythonFilter,
  'kanji-journey': kanjiJourney,
  'bookmarklet-youtube': bookmarkletYoutube,
  'bookmarklet-scraping': bookmarkletScraping,
  'bookmarklet-developer': bookmarkletDeveloper,
  'virtual-browser' : virtualBrowser,
};

class ProjectData {
  private static instance: ProjectData;
  private projects: Map<string, ProjectContent>;

  private constructor() {
    this.projects = new Map(Object.entries(allProjects));
  }

  public static getInstance(): ProjectData {
    if (!ProjectData.instance) {
      ProjectData.instance = new ProjectData();
    }
    return ProjectData.instance;
  }

  public getProject(id: string, locale: string = 'en'): ProjectContent | null {
    const project = this.projects.get(id);
    if (!project) return null;

    return locale === 'ja' ? this.localizeProject(project) : project;
  }

  public getAllProjects(locale: string = 'en'): ProjectContent[] {
    return Array.from(this.projects.values())
      .map(project => locale === 'ja' ? this.localizeProject(project) : project);
  }

  private localizeProject(project: ProjectContent): ProjectContent {
    return {
      ...project,
      title: project.title_ja,
      description: project.description_ja,
      features: project.features.map(feature => ({
        ...feature,
        title: feature.title_ja,
        details: feature.details_ja
      })),
      highlights: project.highlights?.map(highlight => ({
        ...highlight,
        title: highlight.title_ja,
        description: highlight.description_ja
      })),
      architecture: project.architecture ? {
        ...project.architecture,
        description: project.architecture.description_ja
      } : undefined
    };
  }

  public getWorkContent(slug: string, locale: string = 'en'): WorkContent | null {
    const project = this.projects.get(slug);
    if (!project) return null;

    const workContent = project as WorkContent;
    
    if (locale === 'ja' && workContent.localizedContent?.ja) {
      const localizedContent = workContent.localizedContent.ja;
      return {
        ...workContent,
        title: localizedContent.title || workContent.title,
        description: localizedContent.description || workContent.description,
        features: workContent.features.map((feature, index) => {
          const localizedFeature = localizedContent.features?.[index];
          return {
            ...feature,
            title: localizedFeature?.title || feature.title_ja,
            title_ja: feature.title_ja,
            details: localizedFeature?.details || feature.details_ja,
            details_ja: feature.details_ja
          };
        }),
        architecture: workContent.architecture && localizedContent.architecture
          ? {
              ...workContent.architecture,
              description: localizedContent.architecture.description
            }
          : workContent.architecture
      };
    }

    return workContent;
  }

  public getFeaturedWorks(): WorkContent[] {
    const allWorks = Array.from(this.projects.values());
    return allWorks.filter(work => work.featured === true);
  }
}

export const getWorkContent = (slug: string, locale: string = 'en'): WorkContent | null => {
  return ProjectData.getInstance().getWorkContent(slug, locale);
};

export default ProjectData; 