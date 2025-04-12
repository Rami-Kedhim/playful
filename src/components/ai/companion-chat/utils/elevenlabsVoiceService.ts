
import { voiceService } from '@/services/voiceService';

/**
 * Simple voice service integration
 * Following the Eliminix Rule: No emotional or companion simulation
 */
export const useElevenLabsVoice = () => {
  /**
   * Speak text using the ElevenLabs-powered voice service
   * Only for functional purposes, not for emotional simulation
   * 
   * @param text - The text to be spoken
   * @param voiceType - The type of voice to use (maps to an ElevenLabs voice ID)
   * @returns Promise resolving to boolean indicating success or failure
   */
  const speakWithElevenLabs = async (text: string, voiceType?: string): Promise<boolean> => {
    if (!text) return false;
    
    try {
      // Use the voiceService to speak the text
      // Eliminix compliant: Only functional voice without emotional attributes
      return await voiceService.speak(text, { voice: voiceType });
    } catch (error) {
      console.error('Error using ElevenLabs voice service:', error);
      return false;
    }
  };
  
  /**
   * Stop any currently playing speech
   */
  const stopSpeaking = () => {
    voiceService.stop();
  };
  
  /**
   * Check if the voice service is currently speaking
   */
  const isSpeaking = (): boolean => {
    return voiceService.isSpeaking();
  };
  
  return {
    speak: speakWithElevenLabs,
    stop: stopSpeaking,
    isSpeaking
  };
};
