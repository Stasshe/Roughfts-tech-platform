export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  features: {
    title: string;
    details: string[];
  }[];
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
