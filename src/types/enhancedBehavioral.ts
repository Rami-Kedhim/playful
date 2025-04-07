
import { BehaviorTag, ToneFilter, HermesMode } from './behavioral';

/**
 * Enhanced behavioral concepts based on Chase Hughes' principles
 */
export type MicroexpressionSignal = 
  | 'trust'
  | 'distrust'
  | 'interest'
  | 'disinterest'
  | 'confusion'
  | 'commitment'
  | 'resistance';

export type BehavioralLoop = 
  | 'discovery'       // Initial exploration
  | 'engagement'      // Active participation
  | 'investment'      // Time/resource commitment
  | 'identity'        // Personal identification with service
  | 'advocacy';       // Promoting to others

/**
 * Marketing concepts from Chernev, Keller and Kotler
 */
export type BrandResonanceStage =
  | 'awareness'       // Keller's first stage - knowing the brand exists
  | 'performance'     // Functional needs fulfillment
  | 'imagery'         // Psychological needs fulfillment
  | 'judgments'       // Personal opinions and evaluations
  | 'feelings'        // Emotional responses and reactions
  | 'resonance';      // Ultimate relationship and level of identification

export type ConsumerDecisionStage =
  | 'problem_recognition'
  | 'information_search'
  | 'evaluation'
  | 'purchase_decision'
  | 'post_purchase';

export interface PsychographicProfile {
  behavioralLoop: BehavioralLoop;
  brandResonance: BrandResonanceStage;
  decisionStage: ConsumerDecisionStage;
  priceSensitivity: number; // 0-100
  valueOrientation: 'economic' | 'functional' | 'emotional' | 'symbolic';
  trustLevel: number; // 0-100
  identifiedSignals: MicroexpressionSignal[];
  engagementPatterns: {
    timeOfDayPreference: number[]; // 0-23 hours, multiple entries
    sessionFrequency: number; // Average sessions per week
    sessionDuration: number; // Average minutes per session
    contentPreferences: string[];
    pricePoints: number[]; // Past purchase amounts
    responseToIncentives: number; // 0-100
  };
}

/**
 * Enhanced behavioral profile with marketing psychology concepts
 */
export interface EnhancedBehavioralProfile {
  standardProfile: {
    behaviorTags: BehaviorTag[];
    hermesMode: HermesMode;
    toneFilter: ToneFilter;
    trustScore: number;
  };
  psychographicProfile: PsychographicProfile;
  marketingOptimizations: {
    optimalOfferTiming: number; // Hour of day (0-23)
    suggestedPricePoints: number[];
    recommendedToneStyle: string;
    valuePropositionFocus: string;
    engagementStrategy: string;
    retentionRisk: number; // 0-100
    lifetimeValueEstimate: number;
    nextBestAction: string;
  };
}

/**
 * Response from the engagement optimizer
 */
export interface EngagementOptimization {
  contentRecommendations: {
    contentType: string;
    timing: string;
    presentationStyle: string;
  }[];
  offerStrategies: {
    offerType: string;
    pricingStructure: string;
    incentiveType: string;
    deadline: string;
    presentationStyle: string;
  };
  communicationStrategy: {
    tone: string;
    emotionalAppeals: string[];
    keyMessages: string[];
    psychologicalTriggers: string[];
  };
}
