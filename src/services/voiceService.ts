
// Basic voice service for future voice integration

interface VoiceOptions {
  voice?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
}

class VoiceService {
  private synth: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];
  
  constructor() {
    this.synth = window.speechSynthesis;
    this.loadVoices();
    
    // Some browsers need a callback to get voices
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = this.loadVoices.bind(this);
    }
  }
  
  private loadVoices() {
    this.voices = this.synth.getVoices();
  }
  
  getAvailableVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }
  
  speak(text: string, options: VoiceOptions = {}): void {
    if (!this.synth) return;
    
    // Cancel any ongoing speech
    this.synth.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Apply options
    if (options.voice && this.voices.length > 0) {
      const voiceObj = this.voices.find(v => v.name === options.voice);
      if (voiceObj) utterance.voice = voiceObj;
    }
    
    if (options.rate !== undefined) utterance.rate = options.rate;
    if (options.pitch !== undefined) utterance.pitch = options.pitch;
    if (options.volume !== undefined) utterance.volume = options.volume;
    
    this.synth.speak(utterance);
  }
  
  stop(): void {
    if (!this.synth) return;
    this.synth.cancel();
  }
  
  isPaused(): boolean {
    return this.synth?.paused || false;
  }
  
  isSpeaking(): boolean {
    return this.synth?.speaking || false;
  }
}

// Create singleton instance
export const voiceService = new VoiceService();

export default voiceService;
