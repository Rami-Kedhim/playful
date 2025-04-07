
import { supabase } from "@/integrations/supabase/client";

interface VoiceSettings {
  stability?: number;
  similarity_boost?: number;
  style?: number;
  use_speaker_boost?: boolean;
}

interface SpeechOptions {
  voice?: string;
  model?: string;
  pitch?: number;
  rate?: number;
  voiceSettings?: VoiceSettings;
}

class VoiceService {
  private audio: HTMLAudioElement | null = null;
  private isSpeakingState: boolean = false;
  private audioCache: Map<string, string> = new Map();
  private maxCacheSize: number = 20;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audio = new Audio();
      
      this.audio.onended = () => {
        this.isSpeakingState = false;
      };
      
      this.audio.onerror = () => {
        console.error("Audio playback error");
        this.isSpeakingState = false;
      };
    }
  }
  
  public async speak(text: string, options: SpeechOptions = {}): Promise<boolean> {
    if (!this.audio) return false;
    
    try {
      // Stop any current speech
      this.stop();
      
      // Generate a cache key based on the text and voice options
      const cacheKey = this.generateCacheKey(text, options);
      
      // Check if we have this audio cached
      let base64Audio = this.audioCache.get(cacheKey);
      
      if (!base64Audio) {
        // Map voice type to ElevenLabs voice ID if needed
        const voiceId = this.mapVoiceTypeToId(options.voice);
        
        // Call the Supabase Edge Function for text-to-speech
        const { data, error } = await supabase.functions.invoke('elevenlabs-tts', {
          body: {
            text: text,
            voiceId: voiceId,
            modelId: options.model,
            voiceSettings: options.voiceSettings
          }
        });
        
        if (error) {
          console.error('Error calling ElevenLabs TTS:', error);
          return false;
        }
        
        if (!data || !data.audio) {
          console.error('No audio data returned from ElevenLabs TTS');
          return false;
        }
        
        base64Audio = data.audio;
        
        // Add to cache
        this.addToCache(cacheKey, base64Audio);
      }
      
      // Convert base64 to Blob
      const audioBlob = this.base64ToBlob(base64Audio, 'audio/mpeg');
      
      // Create object URL from Blob
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Set the audio source and play
      this.audio.src = audioUrl;
      this.audio.playbackRate = options.rate || 1.0;
      
      // Play the audio
      const playPromise = this.audio.play();
      this.isSpeakingState = true;
      
      // Handle the play promise
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Audio play failed:", error);
          this.isSpeakingState = false;
        });
      }
      
      return true;
    } catch (error) {
      console.error("Speech synthesis error:", error);
      return false;
    }
  }
  
  public stop(): void {
    if (this.audio && !this.audio.paused) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isSpeakingState = false;
    }
  }
  
  public isSpeaking(): boolean {
    return this.isSpeakingState;
  }
  
  private generateCacheKey(text: string, options: SpeechOptions): string {
    return `${text}-${options.voice || 'default'}-${options.rate || 1.0}`;
  }
  
  private addToCache(key: string, value: string): void {
    // If cache is full, remove the oldest item
    if (this.audioCache.size >= this.maxCacheSize) {
      const oldestKey = this.audioCache.keys().next().value;
      this.audioCache.delete(oldestKey);
    }
    
    this.audioCache.set(key, value);
  }
  
  private base64ToBlob(base64: string, mimeType: string): Blob {
    const byteCharacters = atob(base64);
    const byteArrays = [];
    
    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);
      
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    
    return new Blob(byteArrays, { type: mimeType });
  }
  
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
      // Add more mappings as needed
    };
    
    return voiceMap[voiceType.toLowerCase()] || '21m00Tcm4TlvDq8ikWAM'; // Default to Rachel if not found
  }
}

// Create a singleton instance
export const voiceService = new VoiceService();
