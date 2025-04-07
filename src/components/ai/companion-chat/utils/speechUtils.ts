
import { voiceService } from '../../../../services/voiceService';

/**
 * Speak a message using the browser's speech synthesis
 * @param text - The text to speak
 * @param voiceType - Optional voice type to use (male, female, etc)
 */
export const speakMessage = (text: string, voiceType?: string): void => {
  // Remove any markdown or special formatting that might interfere with speech
  const cleanText = text
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markdown
    .replace(/\*(.*?)\*/g, '$1')     // Remove italic markdown
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links but keep text
    .replace(/```.*?```/gs, '')      // Remove code blocks
    .replace(/`(.*?)`/g, '$1');      // Remove inline code

  // Prepare voice settings based on voice type
  const settings: any = { voice: voiceType || 'neutral' };
  
  // Adjust rate and pitch based on voice type
  if (voiceType) {
    switch (voiceType.toLowerCase()) {
      case 'deep':
        settings.pitch = 0.8;
        settings.rate = 0.9;
        break;
      case 'soft':
        settings.pitch = 1.1;
        settings.rate = 0.9;
        break;
      case 'sultry':
        settings.pitch = 0.9;
        settings.rate = 0.85;
        break;
      case 'sophisticated':
        settings.pitch = 1.0;
        settings.rate = 0.95;
        break;
      case 'bubbly':
        settings.pitch = 1.2;
        settings.rate = 1.1;
        break;
      case 'breathy':
        settings.pitch = 1.05;
        settings.rate = 0.9;
        break;
    }
  }
  
  // Use the voiceService to speak the message
  voiceService.speak(cleanText, settings);
};

/**
 * Stop any ongoing speech
 */
export const stopSpeaking = (): void => {
  voiceService.stop();
};

/**
 * Check if speech is currently in progress
 * @returns true if speech is in progress, false otherwise
 */
export const isSpeaking = (): boolean => {
  return voiceService.isSpeaking();
};
