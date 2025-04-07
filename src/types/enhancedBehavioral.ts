
// Enhanced behavioral profiling system types
// Implements HERMES, OXUM, Gould, and Chase Hughes frameworks

export enum TrustLevel {
  Low = 30,
  Moderate = 50,
  High = 80
}

export enum PriceSensitivity {
  Low = 20,
  Moderate = 50, 
  High = 80
}

export enum BehavioralLoop {
  Discovery = "discovery",
  Engagement = "engagement",
  Conversion = "conversion",
  Retention = "retention",
  Action = "action",
  Reward = "reward",
  Reengagement = "reengagement"
}

export enum BrandResonanceStage {
  Awareness = "awareness",
  Consideration = "consideration",
  Preference = "preference",
  Purchase = "purchase",
  Loyalty = "loyalty",
  Performance = "performance",
  Imagery = "imagery",
  Judgments = "judgments",
  Feelings = "feelings",
  Resonance = "resonance"
}

export enum ConsumerDecisionStage {
  ProblemRecognition = "problem_recognition",
  InformationSearch = "information_search",
  AlternativeEvaluation = "alternative_evaluation",
  PurchaseDecision = "purchase_decision",
  PostPurchaseEvaluation = "post_purchase_evaluation",
  Evaluation = "evaluation",
  PostPurchase = "post_purchase"
}

export enum ValueOrientation {
  Practical = "practical",
  Emotional = "emotional",
  Social = "social",
  Spiritual = "spiritual",
  Intellectual = "intellectual",
  Economic = "economic",
  Functional = "functional",
  Symbolic = "symbolic"
}

export type MicroexpressionSignal = 
  | "interest"
  | "confusion"
  | "doubt"
  | "excitement"
  | "hesitation"
  | "conviction"
  | "objection"
  | "consideration";

// Psychographic profile extension with behavioral insights
export interface PsychographicProfile {
  personalityTraits: string[];
  interests: string[];
  values: string[];
  motivations: string[];
  decisionMakingStyle: string;
  
  // Enhanced behavioral analysis fields
  trustLevel: TrustLevel;
  priceSensitivity: PriceSensitivity;
  behavioralLoop: BehavioralLoop;
  decisionStage: ConsumerDecisionStage;
  valueOrientation: ValueOrientation;
  brandResonance: BrandResonanceStage;
  identifiedSignals: MicroexpressionSignal[];
  engagementPatterns?: string[];
  contentPreferences?: string[];
}

// Marketing optimizations based on behavioral analysis
export interface MarketingOptimizations {
  recommendedApproach: string;
  messagingTone: string;
  contentPreferences: string[];
  callToActionStyle: string;
  idealEngagementTimes: string[];
  
  // Enhanced marketing insights
  nextBestAction: string;
  optimalOfferTiming: string;
  suggestedPricePoints: number[];
  retentionRisk: number;
  lifetimeValueEstimate: number;
  recommendedToneStyle?: string; // Added for compatibility
  marketingOptimizations?: any;
}

export interface EnhancedBehavioralProfile {
  standardProfile: {
    id: string;
    userId: string;
    demographics: {
      ageGroup: string;
      gender: string;
      location: string;
    };
    behaviorTags?: string[];
  };
  
  psychographicProfile: PsychographicProfile;
  marketingOptimizations: MarketingOptimizations;
}

export interface EnhancedBehavioralHookReturn {
  enhancedProfile: EnhancedBehavioralProfile;
  setEnhancedProfile: React.Dispatch<React.SetStateAction<EnhancedBehavioralProfile>>;
  original: any;
  isAnalyzing: boolean;
  analyzeUser: () => Promise<EnhancedBehavioralProfile>;
  generateEngagementStrategy: () => {
    communicationStrategy: {
      tone: string;
      emotionalAppeals: string[];
      keyMessages: string[];
    };
    offerStrategies: {
      offerType: string;
      pricingStructure: string;
      incentiveType: string;
      deadline: string;
      presentationStyle: string;
    };
  };
  lastAnalyzedAt: Date | null;
}

// Types for assessment capabilities
export type AssessmentCategory = 
  | 'engagement'
  | 'conversion' 
  | 'retention'
  | 'monetization'
  | 'trust';

export type AssessmentSeverityLevel = 
  | 'critical' 
  | 'warning' 
  | 'opportunity' 
  | 'positive';

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
  psychographicProfile?: PsychographicProfile; // Added to connect with Hermes-Oxum
  chaseHughesProfile?: any; // Added Chase Hughes behavioral profile
}
