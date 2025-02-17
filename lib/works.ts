import fs from 'fs';
import path from 'path';
import { Project } from '../types/content';

export function getWorks(): Project[] {
  const worksDirectory = path.join(process.cwd(), 'data', 'works');
  const filenames = fs.readdirSync(worksDirectory);
  
  const works = filenames
    .filter(filename => filename.endsWith('.json'))
    .map(filename => {
      const filePath = path.join(worksDirectory, filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileContent) as Project;
    });

  return works;
} 