
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

export interface HermesInsight {
  id: string;
  type: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  created: string;
  status: 'new' | 'viewed' | 'actioned' | 'dismissed';
  data: any;
  source: string;
}
