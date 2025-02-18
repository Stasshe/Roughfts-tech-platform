import fs from 'fs';
import path from 'path';
import { Gists } from '../types/content';


export function getExperiences(): Gists[] {
  try {
    const worksDirectory = path.join(process.cwd(), 'data', 'works');
    const filenames = fs.readdirSync(worksDirectory);
    
    const experiences = filenames
      .filter(filename => filename.endsWith('.json'))
      .map(filename => {
        const filePath = path.join(worksDirectory, filename);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContent) as Gists;
      })
      // Sort experiences if needed (assuming there's a date field)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return experiences;
  } catch (error) {
    console.error('Error loading experiences:', error);
    return [];
  }
} 