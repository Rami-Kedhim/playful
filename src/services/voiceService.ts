
type VoiceSettings = {
  voice?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
};

class VoiceService {
  private synth: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];
  private speaking = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    this.synth = window.speechSynthesis;
    this.loadVoices();
    
    // Some browsers need this event to load voices
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = this.loadVoices.bind(this);
    }
  }

  private loadVoices() {
    this.voices = this.synth.getVoices();
  }

  speak(text: string, settings: VoiceSettings = {}): void {
    // Stop any current speech
    this.stop();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Apply settings
    if (settings.voice) {
      // Try to find a matching voice by name or subset
      const requestedVoice = settings.voice.toLowerCase();
      const voice = this.voices.find(v => 
        v.name.toLowerCase().includes(requestedVoice) || 
        requestedVoice.includes(v.name.toLowerCase())
      );
      
      if (voice) {
        utterance.voice = voice;
      }
    }
    
    utterance.rate = settings.rate ?? 1;
    utterance.pitch = settings.pitch ?? 1;
    utterance.volume = settings.volume ?? 1;
    
    // Set up event handlers
    utterance.onend = () => {
      this.speaking = false;
      this.currentUtterance = null;
    };
    
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      this.speaking = false;
      this.currentUtterance = null;
    };
    
    // Start speaking
    this.currentUtterance = utterance;
    this.speaking = true;
    this.synth.speak(utterance);
  }

  stop(): void {
    if (this.speaking) {
      this.synth.cancel();
      this.speaking = false;
      this.currentUtterance = null;
    }
  }

  isSpeaking(): boolean {
    return this.speaking;
  }

  getAvailableVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }
}

export const voiceService = new VoiceService();
