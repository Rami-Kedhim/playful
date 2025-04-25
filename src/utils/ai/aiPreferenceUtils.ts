
import { AIPreferences } from '@/hooks/ai/types';

export const getDefaultPreferences = (): AIPreferences => {
  return {
    anonymized: false,
    personalizedResponses: true,
    adaptivePersonality: true,
    rememberConversations: true,
    suggestContent: true,
    learningEnabled: true,
    voiceType: 'default',
    voiceSettings: {
      voice: 'default',
      speed: 1.0,
      pitch: 1.0
    },
    isEnabled: true
  };
};

export const validatePreferences = (preferences: any): AIPreferences => {
  const defaultPrefs = getDefaultPreferences();
  return {
    ...defaultPrefs,
    ...preferences
  };
};
