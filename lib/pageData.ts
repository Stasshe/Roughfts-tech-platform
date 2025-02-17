import { PageContent } from '../types/content';
import aboutPage from '../data/pages/about.json';
import experiencesPage from '../data/pages/experiences.json';

const allPages = {
  'about': aboutPage,
  'experiences': experiencesPage
};

class PageData {
  private static instance: PageData;
  private pages: Map<string, PageContent>;

  private constructor() {
    this.pages = new Map(Object.entries(allPages));
  }

  public static getInstance(): PageData {
    if (!PageData.instance) {
      PageData.instance = new PageData();
    }
    return PageData.instance;
  }

  public getPage(id: string, locale: string = 'en'): PageContent | null {
    const page = this.pages.get(id);
    if (!page) return null;

    return locale === 'ja' ? this.localizePage(page) : page;
  }

  private localizePage(page: PageContent): PageContent {
    return {
      ...page,
      title: page.title_ja,
      description: page.description_ja,
      sections: page.sections ? Object.fromEntries(
        Object.entries(page.sections).map(([key, section]) => [
          key,
          {
            ...section,
            title: section.title_ja,
            content: section.content_ja
          }
        ])
      ) : undefined
    };
  }
}

export default PageData; 