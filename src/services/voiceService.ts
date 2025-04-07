
/**
 * A service for handling speech synthesis (text-to-speech)
 */

interface VoiceSettings {
  voice?: string;
  rate?: number;
  pitch?: number;
}

class VoiceService {
  private synth: SpeechSynthesis;
  private speaking: boolean = false;
  private utterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    this.synth = window.speechSynthesis;
  }

  /**
   * Speaks the provided text with the given settings
   */
  speak(text: string, settings: VoiceSettings = {}): void {
    // Cancel any ongoing speech
    this.stop();

    // Create a new utterance
    this.utterance = new SpeechSynthesisUtterance(text);
    
    // Set default settings
    this.utterance.rate = settings.rate || 1.0;
    this.utterance.pitch = settings.pitch || 1.0;
    
    // Select voice based on settings
    if (settings.voice && this.synth.getVoices().length > 0) {
      const voices = this.synth.getVoices();
      
      // Try to match requested voice type
      let selectedVoice = null;
      
      if (settings.voice === 'male') {
        selectedVoice = voices.find(voice => 
          voice.name.toLowerCase().includes('male') ||
          voice.name.toLowerCase().includes('guy') ||
          voice.name.toLowerCase().includes('david')
        );
      } else if (settings.voice === 'female') {
        selectedVoice = voices.find(voice => 
          voice.name.toLowerCase().includes('female') ||
          voice.name.toLowerCase().includes('woman') ||
          voice.name.toLowerCase().includes('girl') ||
          voice.name.toLowerCase().includes('samantha')
        );
      }
      
      // Use the selected voice or fall back to the first available
      if (selectedVoice) {
        this.utterance.voice = selectedVoice;
      }
    }
    
    // Add event listeners
    this.utterance.onstart = () => {
      this.speaking = true;
    };
    
    this.utterance.onend = () => {
      this.speaking = false;
      this.utterance = null;
    };
    
    this.utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      this.speaking = false;
      this.utterance = null;
    };
    
    // Start speaking
    this.synth.speak(this.utterance);
  }
  
  /**
   * Stops any ongoing speech
   */
  stop(): void {
    if (this.speaking || this.synth.speaking) {
      this.synth.cancel();
      this.speaking = false;
      this.utterance = null;
    }
  }
  
  /**
   * Checks if speech is currently in progress
   */
  isSpeaking(): boolean {
    return this.speaking || this.synth.speaking;
  }
  
  /**
   * Gets all available voices
   */
  getVoices(): SpeechSynthesisVoice[] {
    return this.synth.getVoices();
  }
}

// Create a singleton instance
export const voiceService = new VoiceService();
