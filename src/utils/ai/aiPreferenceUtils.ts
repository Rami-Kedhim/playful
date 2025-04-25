
import { AIPreferences } from '@/hooks/ai/types';

export const getDefaultPreferences = (): AIPreferences => ({
  anonymized: false,
  personalizedResponses: true,
  adaptivePersonality: true,
  rememberConversations: true,
  suggestContent: true,
  learningEnabled: true,
});

export const processLastInteractionDate = (
  lastInteractionValue: string | boolean | Date | undefined
): Date | null => {
  if (!lastInteractionValue) return null;

  if (typeof lastInteractionValue === 'string') {
    return new Date(lastInteractionValue);
  }

  if (typeof lastInteractionValue === 'boolean') {
    return lastInteractionValue ? new Date() : null;
  }

  if (lastInteractionValue instanceof Date) {
    return lastInteractionValue;
  }

  return new Date();
};

