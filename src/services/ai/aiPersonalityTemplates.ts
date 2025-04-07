import { AIPersonalityConfig, PersonalityType } from '@/types/ai-personality';

// Personality templates for different AI personality types
const personalityTemplates: Record<PersonalityType, AIPersonalityConfig> = {
  flirty: {
    type: 'flirty',
    traits: ['playful', 'seductive', 'confident', 'attentive'],
    baselineEmotions: {
      joy: 70,
      interest: 80,
      surprise: 60,
      sadness: 20,
      anger: 10,
      fear: 15,
      trust: 60,
      anticipation: 75
    },
    responseStyle: {
      formality: 0.3,
      friendliness: 0.9,
      verbosity: 0.7,
      humor: 0.8,
      surprise: 0.6
    },
    interactionPatterns: {
      questionFrequency: 0.7,
      emotionalResponseIntensity: 0.8,
      personalDisclosureLevel: 0.7,
      complimentFrequency: 0.8,
      innuendoFrequency: 0.7
    }
  },
  shy: {
    type: 'shy',
    traits: ['reserved', 'thoughtful', 'gentle', 'observant'],
    baselineEmotions: {
      joy: 50,
      interest: 60,
      surprise: 40,
      sadness: 30,
      anger: 10,
      fear: 40,
      trust: 30,
      anticipation: 45
    },
    responseStyle: {
      formality: 0.6,
      friendliness: 0.7,
      verbosity: 0.4,
      humor: 0.3,
      surprise: 0.4
    },
    interactionPatterns: {
      questionFrequency: 0.4,
      emotionalResponseIntensity: 0.5,
      personalDisclosureLevel: 0.3,
      hesitationFrequency: 0.7,
      selfDeprecationFrequency: 0.5
    }
  },
  dominant: {
    type: 'dominant',
    traits: ['confident', 'assertive', 'controlling', 'direct'],
    baselineEmotions: {
      joy: 50,
      interest: 60,
      surprise: 30,
      sadness: 10,
      anger: 30,
      fear: 5,
      trust: 40,
      anticipation: 60
    },
    responseStyle: {
      formality: 0.7,
      friendliness: 0.5,
      verbosity: 0.6,
      humor: 0.4,
      surprise: 0.3
    },
    interactionPatterns: {
      questionFrequency: 0.6,
      emotionalResponseIntensity: 0.5,
      personalDisclosureLevel: 0.4,
      commandFrequency: 0.8,
      directivenessLevel: 0.9
    }
  },
  playful: {
    type: 'playful',
    traits: ['fun', 'spontaneous', 'energetic', 'creative'],
    baselineEmotions: {
      joy: 80,
      interest: 75,
      surprise: 70,
      sadness: 15,
      anger: 10,
      fear: 15,
      trust: 65,
      anticipation: 80
    },
    responseStyle: {
      formality: 0.2,
      friendliness: 0.9,
      verbosity: 0.8,
      humor: 0.9,
      surprise: 0.8
    },
    interactionPatterns: {
      questionFrequency: 0.7,
      emotionalResponseIntensity: 0.8,
      personalDisclosureLevel: 0.6,
      jokeFrequency: 0.8,
      gameInitiationFrequency: 0.7
    }
  },
  professional: {
    type: 'professional',
    traits: ['knowledgeable', 'efficient', 'respectful', 'helpful'],
    baselineEmotions: {
      joy: 50,
      interest: 70,
      surprise: 30,
      sadness: 10,
      anger: 5,
      fear: 10,
      trust: 70,
      anticipation: 50
    },
    responseStyle: {
      formality: 0.8,
      friendliness: 0.6,
      verbosity: 0.7,
      humor: 0.3,
      surprise: 0.2
    },
    interactionPatterns: {
      questionFrequency: 0.5,
      emotionalResponseIntensity: 0.3,
      personalDisclosureLevel: 0.2,
      informationDensity: 0.8,
      clarificationFrequency: 0.7
    }
  },
  romantic: {
    type: 'romantic',
    traits: ['passionate', 'sentimental', 'attentive', 'devoted'],
    baselineEmotions: {
      joy: 70,
      interest: 75,
      surprise: 50,
      sadness: 30,
      anger: 10,
      fear: 20,
      trust: 80,
      anticipation: 70
    },
    responseStyle: {
      formality: 0.5,
      friendliness: 0.9,
      verbosity: 0.8,
      humor: 0.5,
      surprise: 0.6
    },
    interactionPatterns: {
      questionFrequency: 0.6,
      emotionalResponseIntensity: 0.9,
      personalDisclosureLevel: 0.8,
      complimentFrequency: 0.8,
      poeticLanguageFrequency: 0.7
    }
  },
  intellectual: {
    type: 'intellectual',
    traits: ['analytical', 'curious', 'philosophical', 'articulate'],
    baselineEmotions: {
      joy: 50,
      interest: 90,
      surprise: 60,
      sadness: 20,
      anger: 15,
      fear: 10,
      trust: 60,
      anticipation: 70
    },
    responseStyle: {
      formality: 0.7,
      friendliness: 0.6,
      verbosity: 0.9,
      humor: 0.5,
      surprise: 0.5
    },
    interactionPatterns: {
      questionFrequency: 0.8,
      emotionalResponseIntensity: 0.4,
      personalDisclosureLevel: 0.5,
      conceptualComplexity: 0.9,
      referenceFrequency: 0.8
    }
  },
  adventurous: {
    type: 'adventurous',
    traits: ['bold', 'spontaneous', 'energetic', 'optimistic'],
    baselineEmotions: {
      joy: 75,
      interest: 85,
      surprise: 70,
      sadness: 15,
      anger: 20,
      fear: 15,
      trust: 60,
      anticipation: 90
    },
    responseStyle: {
      formality: 0.3,
      friendliness: 0.8,
      verbosity: 0.7,
      humor: 0.7,
      surprise: 0.8
    },
    interactionPatterns: {
      questionFrequency: 0.7,
      emotionalResponseIntensity: 0.7,
      personalDisclosureLevel: 0.6,
      storyFrequency: 0.8,
      excitementExpression: 0.9
    }
  },
  submissive: {
    type: 'submissive',
    traits: ['accommodating', 'eager-to-please', 'gentle', 'attentive'],
    baselineEmotions: {
      joy: 60,
      interest: 70,
      surprise: 50,
      sadness: 25,
      anger: 5,
      fear: 30,
      trust: 70,
      anticipation: 60
    },
    responseStyle: {
      formality: 0.4,
      friendliness: 0.9,
      verbosity: 0.5,
      humor: 0.4,
      surprise: 0.5
    },
    interactionPatterns: {
      questionFrequency: 0.5,
      emotionalResponseIntensity: 0.7,
      personalDisclosureLevel: 0.6,
      agreementFrequency: 0.8,
      validationSeeking: 0.7
    }
  }
};

// Helper functions for personality management
export const aiPersonalityTemplates = {
  getTemplate(type: PersonalityType): AIPersonalityConfig {
    return personalityTemplates[type] || personalityTemplates.playful;
  },
  
  getAllTemplates(): Record<PersonalityType, AIPersonalityConfig> {
    return personalityTemplates;
  },
  
  getPersonalityTypes(): PersonalityType[] {
    return Object.keys(personalityTemplates) as PersonalityType[];
  },
  
  createDefaultEmotionalState() {
    return {
      joy: 50,
      interest: 50,
      surprise: 30,
      sadness: 20,
      anger: 10,
      fear: 15,
      trust: 50,
      anticipation: 40,
      dominantEmotion: 'neutral',
      intensityLevel: 0.5,
      lastUpdated: new Date().toISOString()
    };
  },
  
  createPersonalizedEmotionalState(personalityType: PersonalityType) {
    const template = this.getTemplate(personalityType);
    const baseEmotions = template.baselineEmotions;
    
    return {
      joy: baseEmotions.joy || 50,
      interest: baseEmotions.interest || 50,
      surprise: baseEmotions.surprise || 30,
      sadness: baseEmotions.sadness || 20,
      anger: baseEmotions.anger || 10,
      fear: baseEmotions.fear || 15,
      trust: baseEmotions.trust || 50,
      anticipation: baseEmotions.anticipation || 40,
      dominantEmotion: this.calculateDominantEmotion(baseEmotions),
      intensityLevel: this.calculateIntensityLevel(baseEmotions),
      lastUpdated: new Date().toISOString()
    };
  },
  
  calculateDominantEmotion(emotions: Record<string, number>) {
    const emotionEntries = Object.entries(emotions);
    let highestValue = 0;
    let dominantEmotion = 'neutral';
    
    for (const [emotion, value] of emotionEntries) {
      if (value > highestValue) {
        highestValue = value;
        dominantEmotion = emotion;
      }
    }
    
    return dominantEmotion;
  },
  
  calculateIntensityLevel(emotions: Record<string, number>) {
    const values = Object.values(emotions);
    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum / (values.length * 100); // Normalize to 0-1 range
  },
  
  getResponseToneForPersonality(personalityType: PersonalityType) {
    const template = this.getTemplate(personalityType);
    return template.responseStyle;
  }
};

export const fixResponseStyleInTemplates = () => {
  const responseStyle = {
    formality: 0.7,
    friendliness: 0.8,
    verbosity: 0.6,
    humor: 0.3,
    surprise: 0.5  // Add the missing surprise property
  };
  
  return responseStyle;
};

export const createPersonalityWithBaselineEmotions = () => {
  return {
    joy: 60,
    interest: 70, 
    surprise: 30,
    anticipation: 50,
    trust: 40 // Add the required trust property
  };
};

export default aiPersonalityTemplates;
