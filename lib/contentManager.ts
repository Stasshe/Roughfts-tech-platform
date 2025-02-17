import { ProjectContent, PageContent, WorkContent } from '../types/content';
import ProjectData from './projectData';
import PageData from './pageData';

export class ContentManager {
  private static instance: ContentManager;
  private projectData: ProjectData;
  private pageData: PageData;

  private constructor() {
    this.projectData = ProjectData.getInstance();
    this.pageData = PageData.getInstance();
  }

  public static getInstance(): ContentManager {
    if (!ContentManager.instance) {
      ContentManager.instance = new ContentManager();
    }
    return ContentManager.instance;
  }

  public getProject(id: string, locale: string = 'en'): ProjectContent | null {
    return this.projectData.getProject(id, locale);
  }

  public getPage(id: string, locale: string = 'en'): PageContent | null {
    return this.pageData.getPage(id, locale);
  }

  public getAllProjects(locale: string = 'en'): ProjectContent[] {
    return this.projectData.getAllProjects(locale);
  }

  public getWorkContent(slug: string, locale: string = 'en'): WorkContent | null {
    return this.projectData.getWorkContent(slug, locale);
  }

  public getFeaturedWorks(): WorkContent[] {
    return this.projectData.getFeaturedWorks();
  }
}

export const getWorkContent = (slug: string, locale: string = 'en'): WorkContent | null => {
  return ContentManager.getInstance().getWorkContent(slug, locale);
};
