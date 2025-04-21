
/**
 * Speech synthesis service for Lucie Assistant
 */

// Available voices for Lucie assistant
export type LucieVoiceType = 'feminine' | 'masculine' | 'neutral';

// Configuration options for speech
export interface SpeechOptions {
  voiceType?: LucieVoiceType;
  pitch?: number; // 0 to 2
  rate?: number; // 0.1 to 10
  volume?: number; // 0 to 1
}

// Initialize speech synthesis and check if it's supported
export const initSpeechSynthesis = (): boolean => {
  if ('speechSynthesis' in window) {
    return true;
  }
  
  console.warn("Speech synthesis not supported in this browser");
  return false;
};

// Get available voices that match the specified language or all voices
export const getAvailableVoices = (language?: string): SpeechSynthesisVoice[] => {
  if (!('speechSynthesis' in window)) {
    return [];
  }

  const voices = window.speechSynthesis.getVoices();
  
  if (language) {
    return voices.filter(voice => voice.lang.includes(language));
  }
  
  return voices;
};

// Find the best matching voice for the given type
export const findVoice = (voiceType: LucieVoiceType): SpeechSynthesisVoice | null => {
  const voices = window.speechSynthesis.getVoices();
  
  if (voices.length === 0) {
    return null;
  }
  
  // Try to find a matching voice based on type
  let voice: SpeechSynthesisVoice | null = null;
  
  switch (voiceType) {
    case 'feminine':
      voice = voices.find(v => 
        v.name.toLowerCase().includes('female') || 
        v.name.toLowerCase().includes('girl') ||
        v.name.toLowerCase().includes('woman')
      ) || null;
      break;
    case 'masculine':
      voice = voices.find(v => 
        v.name.toLowerCase().includes('male') || 
        v.name.toLowerCase().includes('boy') ||
        v.name.toLowerCase().includes('man')
      ) || null;
      break;
    case 'neutral':
      // Try to find a neutral voice
      voice = voices.find(v => 
        !v.name.toLowerCase().includes('female') &&
        !v.name.toLowerCase().includes('male') &&
        !v.name.toLowerCase().includes('girl') &&
        !v.name.toLowerCase().includes('boy') &&
        !v.name.toLowerCase().includes('woman') &&
        !v.name.toLowerCase().includes('man')
      ) || null;
      break;
  }
  
  // If we couldn't find a matching voice, just use the first one
  if (!voice && voices.length > 0) {
    voice = voices[0];
  }
  
  return voice;
};

// Speak text using the specified options
export const speakMessage = (text: string, options: SpeechOptions = {}): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      console.warn("Speech synthesis not supported in this browser");
      resolve(false);
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Find the appropriate voice
    if (options.voiceType) {
      const voice = findVoice(options.voiceType);
      if (voice) {
        utterance.voice = voice;
      }
    }
    
    // Set other speech parameters
    if (options.pitch !== undefined) {
      utterance.pitch = options.pitch;
    }
    
    if (options.rate !== undefined) {
      utterance.rate = options.rate;
    }
    
    if (options.volume !== undefined) {
      utterance.volume = options.volume;
    }
    
    // Handle completion
    utterance.onend = () => {
      resolve(true);
    };
    
    utterance.onerror = () => {
      resolve(false);
    };
    
    // Speak
    window.speechSynthesis.speak(utterance);
  });
};

// Stop any ongoing speech
export const stopSpeaking = (): void => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

// Check if speech synthesis is currently speaking
export const isSpeaking = (): boolean => {
  if ('speechSynthesis' in window) {
    return window.speechSynthesis.speaking;
  }
  return false;
};
