
// Hermes Flow Utilities
// Helper functions for user journey tracking and analysis

/**
 * Format a path for display in UI
 */
export const formatPathForDisplay = (path: string): string => {
  if (!path) return '';
  
  // Strip leading slash and replace dashes with spaces
  return path
    .replace(/^\//, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
};

/**
 * Calculate user engagement score based on journey data
 */
export const calculateEngagementScore = (
  pathCount: number, 
  uniquePaths: number, 
  timeSpentMinutes: number
): number => {
  // Simple engagement formula based on activity metrics
  const baseScore = Math.min(pathCount * 5, 50);
  const uniqueBonus = Math.min(uniquePaths * 10, 30);
  const timeBonus = Math.min(timeSpentMinutes / 2, 20);
  
  return Math.min(Math.round(baseScore + uniqueBonus + timeBonus), 100);
};

/**
 * Get next best action recommendation based on current path
 */
export const getRecommendedAction = (
  currentPath: string, 
  previousPaths: string[] = []
): string => {
  // Production version would use ML models
  
  // Simple rule-based recommender
  if (currentPath.includes('search')) {
    return 'escorts';
  } else if (currentPath.includes('escorts') || currentPath.includes('persona')) {
    return 'messages';
  } else if (currentPath.includes('messages')) {
    return 'metaverse';
  } else if (currentPath.includes('wallet')) {
    return 'pulse-boost';
  } else if (previousPaths.length > 5 && !previousPaths.some(p => p.includes('ai-companions'))) {
    return 'ai-companions';
  }
  
  // Default to search if no specific pattern detected
  return 'search';
};

/**
 * Anonymize path data for privacy while preserving journey analysis
 */
export const anonymizePath = (path: string): string => {
  // Strip any IDs or personal identifiers
  return path
    .replace(/\/[0-9a-f]{8,}/gi, '/[ID]')
    .replace(/user\/\w+/gi, 'user/[USERNAME]');
};

/**
 * Calculate time-based relevance decay
 * Newer activities should have more influence than older ones
 */
export const calculateRelevanceDecay = (
  ageInMinutes: number,
  halfLifeMinutes: number = 30
): number => {
  return Math.pow(0.5, ageInMinutes / halfLifeMinutes);
};

/**
 * Sort paths by relevance, considering recency and importance
 */
export const sortPathsByRelevance = (
  paths: Array<{path: string, timestamp: number, importance?: number}>
): Array<{path: string, timestamp: number, importance?: number}> => {
  return [...paths].sort((a, b) => {
    const now = Date.now();
    const aAgeMinutes = (now - a.timestamp) / (1000 * 60);
    const bAgeMinutes = (now - b.timestamp) / (1000 * 60);
    
    const aRelevance = calculateRelevanceDecay(aAgeMinutes) * (a.importance || 1);
    const bRelevance = calculateRelevanceDecay(bAgeMinutes) * (b.importance || 1);
    
    return bRelevance - aRelevance;
  });
};

/**
 * Extract journey patterns from path history
 */
export const extractJourneyPatterns = (
  paths: string[]
): Array<{pattern: string[], frequency: number}> => {
  // This would be much more sophisticated with ML in production
  // For now, identify simple sequential patterns
  
  const patterns: Record<string, number> = {};
  
  // Look for bi-grams and tri-grams
  for (let i = 0; i < paths.length - 1; i++) {
    // Bi-gram
    const bigram = `${paths[i]} → ${paths[i+1]}`;
    patterns[bigram] = (patterns[bigram] || 0) + 1;
    
    // Tri-gram
    if (i < paths.length - 2) {
      const trigram = `${paths[i]} → ${paths[i+1]} → ${paths[i+2]}`;
      patterns[trigram] = (patterns[trigram] || 0) + 1;
    }
  }
  
  // Convert to array and sort
  return Object.entries(patterns)
    .map(([pattern, frequency]) => ({
      pattern: pattern.split(' → '),
      frequency
    }))
    .sort((a, b) => b.frequency - a.frequency);
};
