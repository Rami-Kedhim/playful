
import { supabase } from './client';

/**
 * Interface for the ElevenLabs TTS response
 */
interface ElevenLabsTTSResponse {
  audio: string;
  audioFormat?: string;
  metadata?: {
    requestId?: string;
    timestamp?: string;
    processingTime?: number;
  };
}

/**
 * Interface for the ElevenLabs TTS request
 */
interface ElevenLabsTTSRequest {
  text: string;
  voiceId?: string;
  modelId?: string;
  voiceSettings?: {
    stability?: number;
    similarity_boost?: number;
    style?: number;
    use_speaker_boost?: boolean;
  };
}

/**
 * Call the Supabase Edge Function for ElevenLabs TTS
 * 
 * @param params - The TTS request parameters
 * @returns Promise resolving to the TTS response
 */
export const generateSpeech = async (params: ElevenLabsTTSRequest): Promise<ElevenLabsTTSResponse> => {
  try {
    const { data, error } = await supabase.functions.invoke('elevenlabs-tts', {
      body: params
    });
    
    if (error) {
      console.error('Error calling ElevenLabs TTS:', error);
      throw new Error(error.message || 'Failed to generate speech');
    }
    
    if (!data || !data.audio) {
      throw new Error('No audio data returned from ElevenLabs TTS');
    }
    
    return data as ElevenLabsTTSResponse;
  } catch (error) {
    console.error('Error in generateSpeech:', error);
    throw error;
  }
};
