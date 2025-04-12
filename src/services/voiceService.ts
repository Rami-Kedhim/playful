
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

/**
 * VoiceService provides safe and reliable text-to-speech functionality
 * with advanced caching, error handling and security features
 */
class VoiceService {
  private audio: HTMLAudioElement | null = null;
  private isSpeakingState: boolean = false;
  private audioCache: Map<string, string> = new Map();
  private maxCacheSize: number = 20;
  private audioContext: AudioContext | null = null;
  private securityCheckPassed: boolean = false;
  private lastErrorTime: number = 0;
  private errorCount: number = 0;
  private maxErrorsPerMinute: number = 5;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audio = new Audio();
      
      this.audio.onended = () => {
        this.isSpeakingState = false;
      };
      
      this.audio.onerror = (e) => {
        console.error("Audio playback error", e);
        this.isSpeakingState = false;
        this.handleError("playback");
      };

      // Perform security check
      this.performSecurityCheck();
    }
  }

  /**
   * Performs security checks to ensure the environment is safe for voice playback
   */
  private async performSecurityCheck(): Promise<boolean> {
    try {
      // Check if audio is supported
      if (!this.audio) {
        console.warn("Audio not supported in this environment");
        return false;
      }

      // Check if AudioContext is supported
      if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContextClass();
      } else {
        console.warn("AudioContext not supported in this environment");
      }

      // Check if audio can be played
      const canPlayAudio = this.audio.canPlayType('audio/mpeg');
      if (!canPlayAudio) {
        console.warn("Environment cannot play required audio format");
        return false;
      }

      // All checks passed
      this.securityCheckPassed = true;
      return true;
    } catch (error) {
      console.error("Security check failed:", error);
      this.securityCheckPassed = false;
      return false;
    }
  }

  /**
   * Track and handle errors to prevent abuse
   */
  private handleError(type: string): void {
    const now = Date.now();
    
    // Reset error count if it's been more than a minute
    if (now - this.lastErrorTime > 60000) {
      this.errorCount = 0;
    }
    
    this.errorCount++;
    this.lastErrorTime = now;
    
    if (this.errorCount > this.maxErrorsPerMinute) {
      console.error("Too many errors occurred. Speech service temporarily disabled.");
      setTimeout(() => {
        this.errorCount = 0;
      }, 60000);
    }
  }
  
  /**
   * Convert text to speech and play the resulting audio
   */
  public async speak(text: string, options: SpeechOptions = {}): Promise<boolean> {
    if (!this.audio) return false;
    
    // Safety checks
    if (!this.securityCheckPassed) {
      await this.performSecurityCheck();
      if (!this.securityCheckPassed) {
        console.error("Security check failed. Speech not available.");
        return false;
      }
    }
    
    // Rate limit check
    if (this.errorCount > this.maxErrorsPerMinute) {
      console.error("Service temporarily unavailable due to error rate limit");
      return false;
    }
    
    try {
      // Input validation
      if (!text || typeof text !== 'string' || text.length > 5000) {
        console.error("Invalid text input");
        return false;
      }
      
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
          this.handleError("api");
          return false;
        }
        
        if (!data || !data.audio) {
          console.error('No audio data returned from ElevenLabs TTS');
          this.handleError("data");
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
          this.handleError("play");
          
          // Clean up the object URL to prevent memory leaks
          URL.revokeObjectURL(audioUrl);
        });
      }
      
      return true;
    } catch (error) {
      console.error("Speech synthesis error:", error);
      this.handleError("synthesis");
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
  
  /**
   * Safely disposes of audio resources
   */
  public dispose(): void {
    try {
      this.stop();
      
      // Clear audio element references
      if (this.audio) {
        this.audio.onended = null;
        this.audio.onerror = null;
        this.audio.src = '';
        this.audio = null;
      }
      
      // Close audio context if it exists
      if (this.audioContext && this.audioContext.state !== 'closed') {
        this.audioContext.close().catch(err => {
          console.error("Error closing AudioContext:", err);
        });
      }
      
      // Clear cache
      this.audioCache.clear();
    } catch (error) {
      console.error("Error disposing voice service:", error);
    }
  }
}

// Create a singleton instance
export const voiceService = new VoiceService();
