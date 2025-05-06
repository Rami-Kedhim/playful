
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
  originalContent?: string;
  optimizedContent?: string;
  readabilityScore?: number;
  keywordDensity?: Record<string, number>;
  metaTags?: string[];
  seoScore?: number;
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

/**
 * HERMES insight definitions for SEO and other metrics
 */
export interface HermesInsight {
  id: string;
  type: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  created: string;
  status: 'new' | 'viewed' | 'actioned';
  data?: {
    boostOffer?: {
      profileId?: string;
      recommendation?: string;
      potentialIncrease?: string;
      cost?: string;
      duration?: string;
      value?: string;
      expires?: string;
      category?: string;
    };
    profileId?: string;
    affectedPages?: number;
    potentialImpact?: string;
    increase?: string;
    source?: string;
    value?: string;
    recommendedProfileId?: string;
    popularCategory?: string;
    trendingTag?: string;
  };
  source: string;
}
