
/**
 * Chase Hughes Behavioral Model Types
 * Based on the Behavioral Table of Elements and Chain of Influence
 */

/**
 * Sensory Preference according to Chase Hughes' Behavioral Table of Elements
 */
export type SensoryPreference = 'visual' | 'auditory' | 'kinesthetic';

/**
 * Emotional phases in the Chain of Influence
 */
export type InfluencePhase = 
  | 'interest'    // Initial curiosity and attention
  | 'trust'       // Building confidence and reliability
  | 'desire'      // Creating emotional want and need
  | 'action'      // Prompting specific behaviors
  | 'loyalty';    // Establishing ongoing commitment

/**
 * Micro-expressions as defined by Chase Hughes for behavioral analysis
 */
export type MicroExpression =
  | 'contempt'
  | 'anger'
  | 'fear'
  | 'disgust'
  | 'happiness'
  | 'sadness'
  | 'surprise';

/**
 * Chase Hughes influence techniques
 */
export type InfluenceTechnique = 
  | 'interrogation_encapsulation'
  | 'bte_mapping'
  | 'yes_ladder'
  | 'reciprocity_trigger'
  | 'social_proof'
  | 'commitment_consistency'
  | 'authority_positioning'
  | 'scarcity_framing'
  | 'likeability_enhancement';

/**
 * Chase Hughes Behavioral Profile
 */
export interface ChaseHughesBehavioralProfile {
  primarySensoryPreference: SensoryPreference;
  secondarySensoryPreference?: SensoryPreference;
  currentInfluencePhase: InfluencePhase;
  influencePhaseProgress: number; // 0-100%, how far along in current phase
  detectedMicroExpressions: MicroExpression[];
  responsiveToTechniques: InfluenceTechnique[];
  suggestedApproach: {
    technique: InfluenceTechnique;
    languagePattern: string;
    visualCues?: string[];
    audioElements?: string[];
  };
  trustScore: number; // 0-100%
  desireScore: number; // 0-100%
  engagementScore: number; // 0-100%
  // Removed userId field as it doesn't belong in this type
}
