
// Enhanced behavioral profiling system types
// Implements HERMES, OXUM, Gould, and Chase Hughes frameworks

export enum TrustLevel {
  Low = "low",
  Moderate = "moderate",
  High = "high"
}

export enum PriceSensitivity {
  Low = "low",
  Moderate = "moderate", 
  High = "high"
}

export enum BehavioralLoop {
  Discovery = "discovery",
  Engagement = "engagement",
  Conversion = "conversion",
  Retention = "retention",
  Advocacy = "advocacy"
}

export enum BrandResonanceStage {
  Awareness = "awareness",
  Consideration = "consideration",
  Preference = "preference",
  Purchase = "purchase",
  Loyalty = "loyalty"
}

export enum ConsumerDecisionStage {
  ProblemRecognition = "problem_recognition",
  InformationSearch = "information_search",
  AlternativeEvaluation = "alternative_evaluation",
  PurchaseDecision = "purchase_decision",
  PostPurchaseEvaluation = "post_purchase_evaluation"
}

export enum ValueOrientation {
  Practical = "practical",
  Emotional = "emotional",
  Social = "social",
  Spiritual = "spiritual",
  Intellectual = "intellectual"
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
  generateEngagementStrategy: () => Promise<string[]>;
  lastAnalyzedAt: Date | null;
}
