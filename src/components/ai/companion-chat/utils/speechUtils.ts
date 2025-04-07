
import { voiceService } from '../../../../services/voiceService';

/**
 * Speak a message using ElevenLabs text-to-speech API
 * @param text - The text to speak
 * @param voiceType - Optional voice type to use (sultry, deep, soft, etc)
 * @returns True if speech started successfully, false otherwise
 */
export const speakMessage = (text: string, voiceType?: string): boolean => {
  try {
    // Remove any markdown or special formatting that might interfere with speech
    const cleanText = text
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markdown
      .replace(/\*(.*?)\*/g, '$1')     // Remove italic markdown
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links but keep text
      .replace(/```.*?```/gs, '')      // Remove code blocks
      .replace(/`(.*?)`/g, '$1');      // Remove inline code

    // Prepare voice settings based on voice type
    const settings: any = { voice: voiceType || 'neutral' };
    
    // Adjust rate based on voice type
    if (voiceType) {
      switch (voiceType.toLowerCase()) {
        case 'deep':
          settings.rate = 0.9;
          break;
        case 'soft':
          settings.rate = 0.9;
          break;
        case 'sultry':
          settings.rate = 0.85;
          break;
        case 'sophisticated':
          settings.rate = 0.95;
          break;
        case 'bubbly':
          settings.rate = 1.1;
          break;
        case 'breathy':
          settings.rate = 0.9;
          break;
        case 'cheerful':
          settings.rate = 1.05;
          break;
        case 'serious':
          settings.rate = 0.95;
          break;
        case 'authoritative':
          settings.rate = 0.95;
          break;
        case 'friendly':
          settings.rate = 1.0;
          break;
      }
    }
    
    // Use the voiceService to speak the message
    return voiceService.speak(cleanText, settings);
  } catch (error) {
    console.error("Speech synthesis error:", error);
    return false;
  }
};

/**
 * Stop any ongoing speech
 */
export const stopSpeaking = (): void => {
  try {
    voiceService.stop();
  } catch (error) {
    console.error("Error stopping speech:", error);
  }
};

/**
 * Check if speech is currently in progress
 * @returns true if speech is in progress, false otherwise
 */
export const isSpeaking = (): boolean => {
  try {
    return voiceService.isSpeaking();
  } catch (error) {
    console.error("Error checking speech status:", error);
    return false;
  }
};
