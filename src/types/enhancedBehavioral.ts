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
  Advocacy = "advocacy",
  Investment = "investment", // Added for compatibility
  Identity = "identity" // Added for compatibility
}

export enum BrandResonanceStage {
  Awareness = "awareness",
  Consideration = "consideration",
  Preference = "preference",
  Purchase = "purchase",
  Loyalty = "loyalty",
  Performance = "performance", // Added for compatibility
  Imagery = "imagery", // Added for compatibility
  Judgments = "judgments", // Added for compatibility
  Feelings = "feelings", // Added for compatibility
  Resonance = "resonance" // Added for compatibility
}

export enum ConsumerDecisionStage {
  ProblemRecognition = "problem_recognition",
  InformationSearch = "information_search",
  AlternativeEvaluation = "alternative_evaluation",
  PurchaseDecision = "purchase_decision",
  PostPurchaseEvaluation = "post_purchase_evaluation",
  Evaluation = "evaluation", // Added for compatibility
  PostPurchase = "post_purchase" // Added for compatibility
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
  contentPreferences?: string[];
  marketingOptimizations?: any;
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
