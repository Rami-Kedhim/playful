
/**
 * Result of SEO optimization for a specific piece of content
 */
export interface SeoOptimizationResult {
  pageUrl: string;
  title: string;
  metaDescription: string;
  h1: string;
  contentScore: number;
  visibilityScore: number;
  mobileCompatibility: number;
  pageSpeed: number;
  backlinks: number;
  priorityKeywords: string[];
  recommendations: string[];
  lastUpdated: string;
}

/**
 * Request format for SEO optimization
 */
export interface SeoOptimizationRequest {
  contentId: string;
  contentType: 'profile' | 'content' | 'livecam' | 'event';
  title: string;
  description: string;
  keywords: string[];
}

/**
 * SEO metrics for tracked content
 */
export interface SeoMetrics {
  pageUrl: string;
  score: number;
  visibility: number;
  ranking: number;
  lastChecked: string;
}
