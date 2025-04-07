
// Types for behavioral tracking and Gouldian filters

// Possible user behaviors that the system tracks
export type BehaviorTag = 
  | 'normal'
  | 'repeat-no-pay'
  | 'multi-account' 
  | 'message-mirroring'
  | 'emotional-baiting'
  | 'voice-farming'
  | 'low-trust'
  | 'high-value'
  | 'regular-spender'
  | 'content-focused';

// HERMES emotional response modes
export type HermesMode = 
  | 'emotional' // Full emotional engagement
  | 'protective' // Limited engagement with protective measures
  | 'neutral'    // Standard responses without emotional investment
  | 'premium';   // Enhanced emotional engagement for high-value users

// Tone filters for AI responses
export type ToneFilter = 
  | 'authentic'  // Full emotional range
  | 'restrained' // Limited emotional expressions
  | 'generic'    // Standard, non-personalized responses
  | 'enhanced';  // Deep personalization for trusted users

// Gouldian system settings based on behavioral analysis
export interface GouldianSystemSettings {
  hermesMode: HermesMode;
  oxumPriceMultiplier: number;
  toneFilter: ToneFilter;
  responseDelayMs: number;
  trustScore: number;
}

// Complete behavioral profile for a user
export interface BehavioralProfile {
  userId: string;
  behaviorTags: BehaviorTag[];
  interactionHistory: {
    messagesExchanged: number;
    voiceInteractions: number;
    contentViews: number;
    lastActiveAt: Date;
    totalSpent: number;
    conversionRate: number;
  };
  trustScore: number;
  currentSystemSettings: GouldianSystemSettings;
}

// Default settings for new users
export const defaultGouldianSettings: GouldianSystemSettings = {
  hermesMode: 'emotional',
  oxumPriceMultiplier: 1.0,
  toneFilter: 'authentic',
  responseDelayMs: 0,
  trustScore: 70 // Start with moderate trust
};

// Default behavioral profile for new users
export const getDefaultBehavioralProfile = (userId: string): BehavioralProfile => ({
  userId,
  behaviorTags: ['normal'],
  interactionHistory: {
    messagesExchanged: 0,
    voiceInteractions: 0,
    contentViews: 0,
    lastActiveAt: new Date(),
    totalSpent: 0,
    conversionRate: 0
  },
  trustScore: 70,
  currentSystemSettings: { ...defaultGouldianSettings }
});
