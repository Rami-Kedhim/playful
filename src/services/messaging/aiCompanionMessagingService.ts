
import { supabase } from "@/integrations/supabase/client";
import { AICompanionMessage } from '@/types/ai-companion';
import { v4 as uuidv4 } from 'uuid';

/**
 * Service for handling AI companion messaging and voice functionality
 */
export class AICompanionMessagingService {
  /**
   * Send a message to an AI companion
   * @param userId User ID sending the message
   * @param companionId Companion ID receiving the message
   * @param content Message content
   * @returns The created message object
   */
  async sendMessage(userId: string, companionId: string, content: string): Promise<AICompanionMessage> {
    // Create a message object
    const messageId = uuidv4();
    const timestamp = new Date().toISOString();
    
    const message: AICompanionMessage = {
      id: messageId,
      user_id: userId,
      companion_id: companionId,
      content,
      is_from_user: true,
      created_at: timestamp
    };
    
    // In a real implementation, this would save to the database
    // For now we just return the message object
    return message;
  }
  
  /**
   * Get a voice response from an AI companion
   * @param message Message to convert to speech
   * @param voiceType Voice type to use
   * @returns URL of audio file
   */
  async getVoiceResponse(message: string, voiceType?: string): Promise<string | null> {
    try {
      // Call the Supabase Edge Function for text-to-speech
      const { data, error } = await supabase.functions.invoke('elevenlabs-tts', {
        body: {
          text: message,
          voiceId: this.mapVoiceTypeToId(voiceType)
        }
      });
      
      if (error) {
        console.error('Error calling ElevenLabs TTS:', error);
        return null;
      }
      
      if (!data || !data.audio) {
        console.error('No audio data returned from ElevenLabs TTS');
        return null;
      }
      
      // In a production app, you might want to save this to storage
      // For now we'll just return the base64 audio
      return data.audio;
    } catch (error) {
      console.error("Error getting voice response:", error);
      return null;
    }
  }
  
  /**
   * Map voice type to ElevenLabs voice ID
   * @param voiceType Voice type
   * @returns ElevenLabs voice ID
   */
  private mapVoiceTypeToId(voiceType?: string): string | undefined {
    if (!voiceType) return undefined;
    
    // Map voice types to ElevenLabs voice IDs
    const voiceMap: Record<string, string> = {
      'sultry': '21m00Tcm4TlvDq8ikWAM', // Rachel
      'deep': 'pNInz6obpgDQGcFmaJgB', // Adam
      'soft': 'EXAVITQu4vr4xnSDxMaL', // Sarah
      'sophisticated': 'jBpfuIE2acCO8z3wKNLl', // Thomas
      'bubbly': 'piTKgcLEGmPE4e6mEKli', // Nicole
      'breathy': 'MF3mGyEYCl7XYWbV9V6O', // Elli
      'cheerful': 'IKne3meq5aSn9XLyUdCD', // Charlie
      'serious': 'g9GH2KyGDXGhhJK9UnLV', // Matthew
      'authoritative': 'iP95p4xoKVk53GoZ742B', // Eric
      'friendly': '29vD33N1CtxCmqQRPOHJ', // Daniel
      'neutral': 'd3zjMOOxd2H5SYMhOVVp', // Dorothy
    };
    
    return voiceMap[voiceType.toLowerCase()] || '21m00Tcm4TlvDq8ikWAM'; // Default to Rachel if not found
  }
}

export const aiCompanionMessagingService = new AICompanionMessagingService();
export default aiCompanionMessagingService;
