
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

  // Handle string dates
  if (typeof lastInteractionValue === 'string') {
    const date = new Date(lastInteractionValue);
    return isNaN(date.getTime()) ? null : date;
  }

  // Handle boolean - if true, return current date
  if (typeof lastInteractionValue === 'boolean') {
    return lastInteractionValue ? new Date() : null;
  }

  // Handle Date objects
  if (lastInteractionValue instanceof Date) {
    return isNaN(lastInteractionValue.getTime()) ? null : lastInteractionValue;
  }

  return null;
};
