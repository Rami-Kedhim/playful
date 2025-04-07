
import { voiceService } from '@/services/voiceService';

/**
 * Speaks a message using the browser's Text-to-Speech API
 * 
 * @param text The text to speak
 * @param voiceType Optional voice type for personalization
 */
export const speakMessage = (text: string, voiceType?: string): void => {
  if (!text) return;
  
  // Configure voice settings based on companion's personality
  const settings: {
    voice?: string;
    rate?: number;
    pitch?: number;
  } = {
    rate: 1.0
  };
  
  // Map voice types to actual voice settings
  if (voiceType) {
    switch (voiceType.toLowerCase()) {
      case 'deep':
        settings.pitch = 0.8;
        settings.voice = 'male';
        break;
      case 'soft':
        settings.pitch = 1.1;
        settings.rate = 0.9;
        settings.voice = 'female';
        break;
      case 'sultry':
        settings.pitch = 0.9;
        settings.rate = 0.85;
        settings.voice = 'female';
        break;
      case 'sophisticated':
        settings.pitch = 1.0;
        settings.rate = 0.95;
        settings.voice = 'female';
        break;
      case 'bubbly':
        settings.pitch = 1.2;
        settings.rate = 1.1;
        settings.voice = 'female';
        break;
      case 'breathy':
        settings.pitch = 1.05;
        settings.rate = 0.8;
        settings.voice = 'female';
        break;
      default:
        // Default voice
        settings.voice = 'neutral';
    }
  }
  
  // Use the voice service to speak the text
  voiceService.speak(text, settings);
};

/**
 * Stop any currently speaking voice
 */
export const stopSpeaking = (): void => {
  voiceService.stop();
};

/**
 * Check if the voice is currently speaking
 */
export const isSpeaking = (): boolean => {
  return voiceService.isSpeaking();
};
