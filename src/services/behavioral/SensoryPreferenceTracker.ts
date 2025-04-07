
import { SensoryPreference } from '@/types/chaseHughes';
import { toast } from '@/components/ui/use-toast';

// Visual cues that indicate visual preference
const VISUAL_INDICATORS = [
  'see', 'look', 'view', 'watch', 'appear', 'show', 'picture', 'image', 
  'visualize', 'perspective', 'sight', 'scene', 'notice', 'observe'
];

// Auditory cues that indicate auditory preference
const AUDITORY_INDICATORS = [
  'hear', 'listen', 'sound', 'say', 'tell', 'talk', 'discuss', 'voice', 
  'loud', 'quiet', 'noise', 'audio', 'ring', 'silence', 'click'
];

// Kinesthetic cues that indicate kinesthetic preference
const KINESTHETIC_INDICATORS = [
  'feel', 'touch', 'grab', 'hold', 'heavy', 'light', 'rough', 'smooth', 
  'handle', 'movement', 'pressure', 'warm', 'cold', 'comfortable', 'solid'
];

// Interface for tracking message data
interface MessageData {
  content: string;
  timestamp: Date;
  userId: string;
}

/**
 * SensoryPreferenceTracker - Service for detecting and tracking user sensory preferences
 * based on Chase Hughes' Behavioral Table of Elements
 */
export class SensoryPreferenceTracker {
  private static instance: SensoryPreferenceTracker;
  private userPreferences: Record<string, {
    visual: number;
    auditory: number;
    kinesthetic: number;
    primaryPreference?: SensoryPreference;
    secondaryPreference?: SensoryPreference;
    totalMessages: number;
  }> = {};

  private constructor() {}

  public static getInstance(): SensoryPreferenceTracker {
    if (!SensoryPreferenceTracker.instance) {
      SensoryPreferenceTracker.instance = new SensoryPreferenceTracker();
    }
    return SensoryPreferenceTracker.instance;
  }

  /**
   * Process a new message to update sensory preference scores
   */
  public processMessage(message: MessageData): void {
    const { content, userId } = message;
    
    if (!content || !userId) return;
    
    // Initialize user data if not exists
    if (!this.userPreferences[userId]) {
      this.userPreferences[userId] = {
        visual: 0,
        auditory: 0,
        kinesthetic: 0,
        totalMessages: 0
      };
    }
    
    const userData = this.userPreferences[userId];
    
    // Normalize content
    const normalizedContent = content.toLowerCase();
    
    // Count sensory predicates
    let visualCount = 0;
    let auditoryCount = 0;
    let kinestheticCount = 0;
    
    // Check for visual indicators
    for (const indicator of VISUAL_INDICATORS) {
      if (normalizedContent.includes(indicator)) {
        visualCount++;
      }
    }
    
    // Check for auditory indicators
    for (const indicator of AUDITORY_INDICATORS) {
      if (normalizedContent.includes(indicator)) {
        auditoryCount++;
      }
    }
    
    // Check for kinesthetic indicators
    for (const indicator of KINESTHETIC_INDICATORS) {
      if (normalizedContent.includes(indicator)) {
        kinestheticCount++;
      }
    }
    
    // Update user preference scores
    userData.visual += visualCount;
    userData.auditory += auditoryCount;
    userData.kinesthetic += kinestheticCount;
    userData.totalMessages++;
    
    // Recalculate primary and secondary preferences
    this.calculatePreferences(userId);
    
    console.log('Updated sensory preferences for user:', userId, this.userPreferences[userId]);
  }
  
  /**
   * Calculate the primary and secondary sensory preferences for a user
   */
  private calculatePreferences(userId: string): void {
    const userData = this.userPreferences[userId];
    if (!userData) return;
    
    // Get scores
    const { visual, auditory, kinesthetic } = userData;
    
    // Create sorted array of preferences
    const preferences: Array<{type: SensoryPreference, score: number}> = [
      { type: 'visual', score: visual },
      { type: 'auditory', score: auditory },
      { type: 'kinesthetic', score: kinesthetic }
    ];
    
    // Sort by score descending
    preferences.sort((a, b) => b.score - a.score);
    
    // Assign primary and secondary preferences if we have enough data
    if (userData.totalMessages >= 3) {
      const oldPrimary = userData.primaryPreference;
      
      userData.primaryPreference = preferences[0].score > 0 ? preferences[0].type : undefined;
      userData.secondaryPreference = preferences[1].score > 0 ? preferences[1].type : undefined;
      
      // Notify if primary preference has changed
      if (oldPrimary && oldPrimary !== userData.primaryPreference) {
        toast({
          title: "Sensory Preference Updated",
          description: `User now shows primarily ${userData.primaryPreference} sensory preference`,
        });
      }
    }
  }
  
  /**
   * Get the current sensory preferences for a user
   */
  public getUserPreferences(userId: string): {
    primary: SensoryPreference | undefined;
    secondary: SensoryPreference | undefined;
    scores: { visual: number; auditory: number; kinesthetic: number };
    confidence: number;
  } {
    const userData = this.userPreferences[userId];
    
    if (!userData) {
      return {
        primary: undefined,
        secondary: undefined,
        scores: { visual: 0, auditory: 0, kinesthetic: 0 },
        confidence: 0
      };
    }
    
    // Calculate confidence based on message count and differential between primary and secondary
    let confidence = Math.min(1, userData.totalMessages / 10);
    
    if (userData.primaryPreference && userData.secondaryPreference) {
      const primaryScore = userData[userData.primaryPreference];
      const secondaryScore = userData[userData.secondaryPreference];
      const differential = primaryScore - secondaryScore;
      
      // Stronger differential between primary and secondary increases confidence
      confidence *= (1 + Math.min(1, differential / Math.max(1, primaryScore)));
    }
    
    return {
      primary: userData.primaryPreference,
      secondary: userData.secondaryPreference,
      scores: {
        visual: userData.visual,
        auditory: userData.auditory,
        kinesthetic: userData.kinesthetic
      },
      confidence: Math.min(1, confidence)
    };
  }
  
  /**
   * Get a callback function that can be used to watch messages for sensory preferences
   */
  public getMessageWatcher() {
    return (message: MessageData) => this.processMessage(message);
  }
  
  /**
   * Clear user sensory preference data
   */
  public clearUserData(userId: string): void {
    delete this.userPreferences[userId];
  }
}

export const sensoryPreferenceTracker = SensoryPreferenceTracker.getInstance();
export default sensoryPreferenceTracker;
