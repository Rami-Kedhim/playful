
import { EnhancedBehavioralProfile } from './enhancedBehavioral';

/**
 * Assessment result severity levels
 */
export type AssessmentSeverityLevel = 'critical' | 'warning' | 'opportunity' | 'positive';

/**
 * Assessment categories
 */
export type AssessmentCategory = 
  | 'engagement'
  | 'conversion' 
  | 'retention'
  | 'monetization'
  | 'trust';

/**
 * Assessment Insight - Individual finding from analysis
 */
export interface AssessmentInsight {
  id: string;
  category: AssessmentCategory;
  title: string;
  description: string;
  severityLevel: AssessmentSeverityLevel;
  impact: number; // 1-100
  confidenceScore: number; // 1-100
  recommendedActions: string[];
}

/**
 * Assessment Result - Full analysis result
 */
export interface AssessmentResult {
  userId: string;
  timestamp: Date;
  overallScore: number; // 0-100
  insights: AssessmentInsight[];
  summary: string;
  strengthAreas: string[];
  improvementAreas: string[];
  engagementHealthScore: number; // 0-100
  conversionPotentialScore: number; // 0-100
  retentionRiskScore: number; // 0-100, higher is more risky
  psychographicProfile?: EnhancedBehavioralProfile['psychographicProfile']; // Added to connect with Hermes-Oxum
}

/**
 * Assessment Preferences
 */
export interface AssessmentPreferences {
  focusAreas: AssessmentCategory[];
  insightThreshold: number; // Minimum confidence score to include insights
  autoRunFrequency?: 'daily' | 'weekly' | 'monthly' | 'never';
}
