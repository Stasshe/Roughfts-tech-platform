import { Project } from '../data/projects';

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
}