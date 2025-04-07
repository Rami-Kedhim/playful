
/**
 * A service for handling speech synthesis (text-to-speech)
 */

interface VoiceSettings {
  voice?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
}

class VoiceService {
  private synth: SpeechSynthesis | null = null;
  private speaking: boolean = false;
  private utterance: SpeechSynthesisUtterance | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private initialized: boolean = false;
  private initPromise: Promise<void> | null = null;

  constructor() {
    this.initPromise = this.initialize();
  }
  
  private async initialize(): Promise<void> {
    try {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        this.synth = window.speechSynthesis;
        
        // Load available voices
        await this.loadVoices();
        
        this.initialized = true;
        console.log(`VoiceService initialized with ${this.voices.length} voices`);
      } else {
        console.warn('Speech synthesis is not available in this browser');
      }
    } catch (error) {
      console.error('Error initializing VoiceService:', error);
    }
  }
  
  private async loadVoices(): Promise<void> {
    if (!this.synth) return;
    
    // Some browsers load voices asynchronously
    if (this.synth.getVoices().length > 0) {
      this.voices = this.synth.getVoices();
      console.log(`Loaded ${this.voices.length} voices`);
    } else {
      // Wait for voices to be loaded
      return new Promise((resolve) => {
        if (this.synth && 'onvoiceschanged' in this.synth) {
          this.synth.onvoiceschanged = () => {
            if (this.synth) {
              this.voices = this.synth.getVoices();
              console.log(`Loaded ${this.voices.length} voices (async)`);
              resolve();
            }
          };
        } else {
          // If the event is not supported, resolve anyway
          resolve();
        }
      });
    }
  }

  /**
   * Speaks the provided text with the given settings
   */
  async speak(text: string, settings: VoiceSettings = {}): Promise<void> {
    // Ensure service is initialized
    if (!this.initialized && this.initPromise) {
      await this.initPromise;
    }
    
    if (!this.synth) {
      console.error('Speech synthesis is not available');
      throw new Error('Speech synthesis not available');
    }

    try {
      // Cancel any ongoing speech
      this.stop();

      // Create a new utterance
      this.utterance = new SpeechSynthesisUtterance(text);
      
      // Set default settings
      this.utterance.rate = settings.rate || 1.0;
      this.utterance.pitch = settings.pitch || 1.0;
      this.utterance.volume = settings.volume || 1.0;
      
      // Select voice based on settings
      if (settings.voice && this.voices.length > 0) {      
        // Try to match requested voice type
        const selectedVoice = this.getVoiceByType(settings.voice);
        
        // Use the selected voice or fall back to the default
        if (selectedVoice) {
          console.log(`Using voice: ${selectedVoice.name} for type: ${settings.voice}`);
          this.utterance.voice = selectedVoice;
        }
      }
      
      // Add event listeners
      this.utterance.onstart = () => {
        this.speaking = true;
        console.log('Started speaking');
      };
      
      this.utterance.onend = () => {
        this.speaking = false;
        this.utterance = null;
        console.log('Finished speaking');
      };
      
      this.utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        this.speaking = false;
        this.utterance = null;
      };
      
      // Start speaking
      this.synth.speak(this.utterance);
    } catch (error) {
      console.error('Error in VoiceService.speak:', error);
      this.speaking = false;
      this.utterance = null;
      throw error;
    }
  }
  
  /**
   * Gets a voice that matches the requested type
   */
  private getVoiceByType(voiceType: string): SpeechSynthesisVoice | null {
    // Ensure voices are loaded
    if (this.voices.length === 0 && this.synth) {
      this.voices = this.synth.getVoices();
    }
    
    // If still no voices, return null
    if (this.voices.length === 0) {
      console.warn('No voices available');
      return null;
    }
    
    let selectedVoice = null;
    const voiceTypeLower = voiceType.toLowerCase();
    
    // Match based on voice type
    switch (voiceTypeLower) {
      case 'male':
      case 'deep':
        selectedVoice = this.voices.find(voice => 
          voice.name.toLowerCase().includes('male') ||
          voice.name.toLowerCase().includes('guy') ||
          voice.name.toLowerCase().includes('david') ||
          voice.name.toLowerCase().includes('thomas') ||
          voice.name.toLowerCase().includes('paul')
        );
        break;
        
      case 'female':
      case 'soft':
        selectedVoice = this.voices.find(voice => 
          voice.name.toLowerCase().includes('female') ||
          voice.name.toLowerCase().includes('woman') ||
          voice.name.toLowerCase().includes('girl') ||
          voice.name.toLowerCase().includes('samantha') ||
          voice.name.toLowerCase().includes('karen')
        );
        break;
        
      case 'sultry':
      case 'breathy':
        selectedVoice = this.voices.find(voice => 
          voice.name.toLowerCase().includes('samantha') ||
          voice.name.toLowerCase().includes('karen') ||
          voice.name.toLowerCase().includes('victoria')
        );
        break;
        
      case 'sophisticated':
      case 'british':
        selectedVoice = this.voices.find(voice => 
          voice.name.toLowerCase().includes('british') ||
          voice.name.toLowerCase().includes('uk') ||
          voice.name.toLowerCase().includes('queen')
        );
        break;
        
      case 'bubbly':
      case 'cheerful':
        selectedVoice = this.voices.find(voice => 
          voice.name.toLowerCase().includes('samantha') ||
          voice.name.toLowerCase().includes('tessa')
        );
        break;
        
      case 'authoritative':
        selectedVoice = this.voices.find(voice => 
          voice.name.toLowerCase().includes('daniel') ||
          voice.name.toLowerCase().includes('george') ||
          voice.name.toLowerCase().includes('alex')
        );
        break;
    }
    
    // If no matching voice found, fallback to a default
    if (!selectedVoice) {
      // Try to find a voice in the user's language
      const userLang = navigator.language || 'en-US';
      selectedVoice = this.voices.find(voice => voice.lang === userLang);
      
      // If still no match, use the first available voice
      if (!selectedVoice && this.voices.length > 0) {
        selectedVoice = this.voices[0];
      }
    }
    
    return selectedVoice;
  }
  
  /**
   * Stops any ongoing speech
   */
  stop(): void {
    if (this.synth && (this.speaking || this.synth.speaking)) {
      this.synth.cancel();
      this.speaking = false;
      this.utterance = null;
    }
  }
  
  /**
   * Checks if speech is currently in progress
   */
  isSpeaking(): boolean {
    return this.speaking || (this.synth ? this.synth.speaking : false);
  }
  
  /**
   * Gets all available voices
   */
  getVoices(): SpeechSynthesisVoice[] {
    return this.voices.length > 0 ? this.voices : (this.synth ? this.synth.getVoices() : []);
  }
  
  /**
   * Checks if speech synthesis is supported
   */
  isSupported(): boolean {
    return this.initialized && !!this.synth;
  }
}

// Create a singleton instance
export const voiceService = new VoiceService();
