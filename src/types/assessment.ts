
import { EnhancedBehavioralProfile } from './enhancedBehavioral';
import { ChaseHughesBehavioralProfile } from './chaseHughes';

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
  timestamp: string;
  assessmentId: string;
  insightSummary: string;
  scores: {
    engagementPotential: number;
    contentAffinity: number;
    monetizationPropensity: number;
    retentionLikelihood: number;
  };
  recommendations: string[];
  overallScore: number; // 0-100
  insights: AssessmentInsight[];
  summary: string;
  strengthAreas: string[];
  improvementAreas: string[];
  engagementHealthScore: number; // 0-100
  conversionPotentialScore: number; // 0-100
  retentionRiskScore: number; // 0-100, higher is more risky
  psychographicProfile?: EnhancedBehavioralProfile['psychographicProfile']; // Added to connect with Hermes-Oxum
  chaseHughesProfile?: ChaseHughesBehavioralProfile; // Added Chase Hughes behavioral profile
}

/**
 * Assessment Preferences
 */
export interface AssessmentPreferences {
  focusAreas: AssessmentCategory[];
  insightThreshold: number; // Minimum confidence score to include insights
  autoRunFrequency?: 'daily' | 'weekly' | 'monthly' | 'never';
  includeChaseHughesAnalysis?: boolean; // Whether to include Chase Hughes behavioral analysis
  influenceTechniquePreferences?: string[]; // Preferred influence techniques to apply
}
