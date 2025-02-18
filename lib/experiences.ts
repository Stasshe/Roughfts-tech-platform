import fs from 'fs';
import path from 'path';
import { Gists } from '../types/content';


export function getExperiences(): Gists[] {
  const worksDirectory = path.join(process.cwd(), 'data', 'works');
  const filenames = fs.readdirSync(worksDirectory);
  
  const experiences = filenames
    .filter(filename => filename.endsWith('.json'))
    .map(filename => {
      const filePath = path.join(worksDirectory, filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileContent) as Gists;
    });

  return experiences;
} 