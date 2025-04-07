
/**
 * Types for the enhanced behavioral analysis module
 * Integrating Hughes behavioral frameworks with Kotler marketing principles
 */

// Decision-making stages in consumer behavior (Kotler framework)
export enum ConsumerDecisionStage {
  ProblemRecognition = 'problem_recognition',
  InformationSearch = 'information_search',
  Evaluation = 'evaluation',
  PurchaseDecision = 'purchase_decision',
  PostPurchaseBehavior = 'post_purchase',
  Loyalty = 'loyalty'
}

// Value orientation categories (Based on Chernev's value framework)
export enum ValueOrientation {
  Economic = 'economic', // Price-focused
  Functional = 'functional', // Feature/utility focused
  Emotional = 'emotional', // Feeling/experience focused
  Symbolic = 'symbolic', // Status/identity focused
  Practical = 'practical' // Default practical orientation
}

// Behavioral loop stages (Based on Nir Eyal's Hook model, adapted)
export enum BehavioralLoop {
  Discovery = 'discovery',
  Engagement = 'engagement',
  Investment = 'investment',
  Action = 'action',
  Reward = 'reward',
  Reengagement = 'reengagement'
}

// Brand resonance levels (Based on Keller's brand resonance pyramid)
export enum BrandResonanceStage {
  Awareness = 'awareness',
  Performance = 'performance',
  Imagery = 'imagery',
  Judgments = 'judgments',
  Feelings = 'feelings',
  Resonance = 'resonance'
}

// Psychographic profile combining multiple behavioral frameworks
export interface PsychographicProfile {
  // Core elements from traditional psychographic analysis
  personalityTraits: string[];
  interests: string[];
  values: string[];
  motivations: string[];
  
  // Advanced behavioral elements (Hughes framework)
  decisionMakingStyle: 'analytical' | 'intuitive' | 'collaborative' | 'procedural';
  trustLevel: number; // 0-100
  priceSensitivity: number; // 0-100
  
  // Loop stage in engagement (Eyal/Hughes adaptation)
  behavioralLoop: BehavioralLoop;
  
  // Marketing framework elements (Kotler/Chernev/Keller)
  decisionStage: ConsumerDecisionStage;
  valueOrientation: ValueOrientation;
  brandResonance: BrandResonanceStage;
  
  // Behavioral signals identified (Hughes FACS-based)
  identifiedSignals: string[];
}

// Enhanced behavioral profile with integrated dimensions
export interface EnhancedBehavioralProfile {
  userId: string;
  behaviorTags: string[];
  interactionHistory: {
    messagesExchanged: number;
    totalSpent: number;
    firstInteractionDate: string;
    lastInteractionDate: string;
  };
  psychographicProfile: PsychographicProfile;
  createdAt: string;
  updatedAt: string;
  confidenceScore: number; // 0-100 confidence in analysis
}

// Content recommendation based on behavioral analysis
export interface ContentRecommendation {
  contentType: 'educational' | 'comparison' | 'testimonials' | 'general';
  timing: 'immediate' | 'during session' | 'prime hours' | 'anytime';
  presentationStyle: 'helpful' | 'detailed' | 'social proof' | 'standard';
}

// Offer strategy based on psychographic profile
export interface OfferStrategy {
  offerType: 'discount' | 'feature upgrade' | 'experience' | 'premium' | 'standard';
  pricingStructure: 'tiered' | 'feature-based' | 'value-based' | 'prestige' | 'fixed';
  incentiveType: 'immediate savings' | 'extra features' | 'exclusive access' | 'status benefits' | 'none';
  deadline: 'limited time' | 'feature limited' | 'special occasion' | 'membership-driven' | 'none';
  presentationStyle: 'value-focused' | 'benefit-focused' | 'story-based' | 'exclusivity' | 'informational';
}

// Communication strategy based on behavioral and emotional analysis
export interface CommunicationStrategy {
  tone: 'neutral' | 'informative' | 'practical' | 'aspirational' | 'credible' | 'warm' | 'familiar';
  emotionalAppeals: string[];
  keyMessages: string[];
  psychologicalTriggers: string[];
}

// Comprehensive engagement optimization based on enhanced behavioral profile
export interface EngagementOptimization {
  contentRecommendations: ContentRecommendation[];
  offerStrategies: OfferStrategy;
  communicationStrategy: CommunicationStrategy;
}
