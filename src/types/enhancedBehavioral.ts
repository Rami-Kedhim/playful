
export interface EnhancedBehavioralProfile {
  standardProfile: {
    id: string;
    userId: string;
    demographics: {
      ageGroup: string;
      gender: string;
      location: string;
    };
  };
  
  psychographicProfile: {
    personalityTraits: string[];
    interests: string[];
    values: string[];
    motivations: string[];
    decisionMakingStyle: string;
  };
  
  marketingOptimizations: {
    recommendedApproach: string;
    messagingTone: string;
    contentPreferences: string[];
    callToActionStyle: string;
    idealEngagementTimes: string[];
  };
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
