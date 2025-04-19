
import { useState, useEffect, useCallback } from 'react';
import { 
  AIPersonalityConfig,
  EmotionalState,
  PersonalityType
} from '@/types/ai-personality';
import { AIPersonalityService } from '@/services/ai/aiPersonalityService';

export interface UseAIPersonalityProps {
  personalityType: PersonalityType;
  initialEmotionalState?: EmotionalState;
}

export const useAIPersonality = ({ 
  personalityType, 
  initialEmotionalState 
}: UseAIPersonalityProps) => {
  const [personalityConfig, setPersonalityConfig] = useState<AIPersonalityConfig | null>(null);
  const [emotionalState, setEmotionalState] = useState<EmotionalState | null>(
    initialEmotionalState || null
  );

  useEffect(() => {
    // Since getPersonalityTemplate not present, set default dummy config
    const personality = {
      type: personalityType,
      traits: [],
      baselineEmotions: {},
      responseStyle: {
        formality: 50,
        friendliness: 50,
        verbosity: 50,
        humor: 0,
        surprise: 0,
      },
      interactionPatterns: {},
    } as AIPersonalityConfig;
    
    setPersonalityConfig(personality);
    
    if (!initialEmotionalState) {
      const defaultState: EmotionalState = {
        primary: 'neutral',
        intensity: 0,
        intensityLevel: 0,
        dominantEmotion: 'neutral',
        joy: 0,
        trust: 0,
        fear: 0,
        surprise: 0,
        sadness: 0,
        anger: 0,
        anticipation: 0,
        interest: 0,
        lastUpdated: new Date().toISOString()
      };
      setEmotionalState(defaultState);
    }
  }, [personalityType, initialEmotionalState]);

  // Mock updateMood to avoid error (original methods missing)
  const updateEmotionalState = useCallback(async (message: string) => {
    if (!emotionalState) return null;
    return emotionalState;
  }, [emotionalState]);

  const generateResponseTone = useCallback(() => {
    if (!emotionalState) return 'friendly and welcoming';
    return 'friendly and welcoming';
  }, [emotionalState]);

  const modifyEmotionalState = useCallback((updates: Partial<EmotionalState>) => {
    if (!emotionalState) return;
    
    const updatedState = {
      ...emotionalState,
      ...updates,
    };
    
    if (!updates.dominantEmotion) {
      const emotions = [
        { name: 'joy', value: updatedState.joy || 0 },
        { name: 'trust', value: updatedState.trust || 0 },
        { name: 'fear', value: updatedState.fear || 0 },
        { name: 'surprise', value: updatedState.surprise || 0 },
        { name: 'sadness', value: updatedState.sadness || 0 },
        { name: 'anger', value: updatedState.anger || 0 },
        { name: 'anticipation', value: updatedState.anticipation || 0 },
        { name: 'interest', value: updatedState.interest || 0 }
      ];
      
      const dominant = emotions.reduce((max, emotion) => 
        emotion.value > max.value ? emotion : max
      );
      
      updatedState.dominantEmotion = dominant.name;
    }
    
    setEmotionalState(updatedState);
    return updatedState;
  }, [emotionalState]);

  return {
    personalityConfig,
    emotionalState,
    updateEmotionalState,
    generateResponseTone,
    modifyEmotionalState
  };
};

export default useAIPersonality;
