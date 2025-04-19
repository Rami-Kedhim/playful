
import { useState, useEffect, useCallback } from 'react';
import { 
  AIPersonalityConfig,
  EmotionalState,
  PersonalityType
} from '@/types/ai-personality';
import AIPersonalityService from '@/services/ai/aiPersonalityService';

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

  // Load personality configuration on mount
  useEffect(() => {
    const personality = AIPersonalityService.getPersonalityTemplate(personalityType);
    setPersonalityConfig(personality);
    
    if (!initialEmotionalState) {
      const defaultState = AIPersonalityService.createPersonalizedEmotionalState(personalityType);
      setEmotionalState(defaultState);
    }
  }, [personalityType, initialEmotionalState]);

  // Update emotional state based on a user message
  const updateEmotionalState = useCallback(async (message: string) => {
    if (!emotionalState) return null;

    try {
      const updatedState = await AIPersonalityService.updateEmotionalState(
        emotionalState,
        message,
        personalityType
      );
      
      setEmotionalState(updatedState);
      return updatedState;
    } catch (error) {
      console.error('Error updating emotional state:', error);
      return emotionalState;
    }
  }, [emotionalState, personalityType]);

  // Generate response tone based on current emotional state
  const generateResponseTone = useCallback(() => {
    if (!emotionalState) return 'friendly and welcoming';
    
    return AIPersonalityService.generateResponseTone(
      emotionalState, 
      personalityType
    );
  }, [emotionalState, personalityType]);

  // Update emotional state manually (e.g., after certain events)
  const modifyEmotionalState = useCallback((updates: Partial<EmotionalState>) => {
    if (!emotionalState) return;
    
    const updatedState = {
      ...emotionalState,
      ...updates,
    };
    
    // Recalculate dominant emotion if needed
    if (!updates.dominantEmotion) {
      const emotions = [
        { name: 'joy', value: updatedState.joy },
        { name: 'trust', value: updatedState.trust },
        { name: 'fear', value: updatedState.fear },
        { name: 'surprise', value: updatedState.surprise },
        { name: 'sadness', value: updatedState.sadness },
        { name: 'anger', value: updatedState.anger },
        { name: 'anticipation', value: updatedState.anticipation },
        { name: 'interest', value: updatedState.interest }
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

