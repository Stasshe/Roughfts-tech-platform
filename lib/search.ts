import { Project } from '../types/content';

// Utility to normalize text for searching
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .trim();
}

// Calculate relevance score for a match
function calculateScore(matchType: string, originalText: string, searchQuery: string): number {
  const normalizedText = normalizeText(originalText);
  const normalizedQuery = normalizeText(searchQuery);
  
  // Exact match gets highest score
  if (normalizedText === normalizedQuery) return 100;
  
  // Title matches get higher priority
  if (matchType === 'Title' && normalizedText.includes(normalizedQuery)) return 90;
  
  // Word boundary matches get higher priority
  const wordBoundaryRegex = new RegExp(`\\b${normalizedQuery}\\b`);
  if (wordBoundaryRegex.test(normalizedText)) return 80;
  
  // Substring matches get lower priority
  if (normalizedText.includes(normalizedQuery)) return 70;
  
  // Fuzzy matching (simple implementation)
  const maxDistance = Math.floor(normalizedQuery.length / 3);
  const words = normalizedText.split(/\s+/);
  for (const word of words) {
    if (levenshteinDistance(word, normalizedQuery) <= maxDistance) return 60;
  }
  
  return 0;
}

// Levenshtein distance for fuzzy matching
function levenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));

  for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + cost
      );
    }
  }

  return matrix[b.length][a.length];
}

export function searchProjects(projects: Project[], query: string) {
  if (!query) return [];

  const searchMap = new Map<string, { project: Project; matches: any[]; score: number }>();

  projects.forEach(project => {
    const matches: any[] = [];
    let maxScore = 0;

    // Search in title
    const titleScore = calculateScore('Title', project.title, query);
    if (titleScore > 0) {
      matches.push({
        type: 'project',
        matchType: 'Title',
        matchText: project.title,
        score: titleScore
      });
      maxScore = Math.max(maxScore, titleScore);
    }

    // Search in description
    const descScore = calculateScore('Description', project.description, query);
    if (descScore > 0) {
      matches.push({
        type: 'project',
        matchType: 'Description',
        matchText: project.description,
        score: descScore
      });
      maxScore = Math.max(maxScore, descScore);
    }

    // Search in tech stack
    project.techStack.forEach(tech => {
      const techScore = calculateScore('Technology', tech, query);
      if (techScore > 0) {
        matches.push({
          type: 'tech',
          matchType: 'Technology',
          matchText: tech,
          score: techScore
        });
        maxScore = Math.max(maxScore, techScore);
      }
    });

    // Search in features
    project.features.forEach(feature => {
      feature.details.forEach(detail => {
        const featureScore = calculateScore(`Feature: ${feature.title}`, detail, query);
        if (featureScore > 0) {
          matches.push({
            type: 'project',
            matchType: `Feature: ${feature.title}`,
            matchText: detail,
            score: featureScore
          });
          maxScore = Math.max(maxScore, featureScore);
        }
      });
    });

    if (matches.length > 0) {
      searchMap.set(project.id, {
        project,
        matches: matches.sort((a, b) => b.score - a.score).slice(0, 3),
        score: maxScore
      });
    }
  });

  return Array.from(searchMap.values())
    .sort((a, b) => b.score - a.score);
} 