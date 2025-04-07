
/**
 * Utilities for handling text-to-speech functionality
 */

// Track the current speech synthesis utterance
let currentUtterance: SpeechSynthesisUtterance | null = null;

/**
 * Check if speech synthesis is currently speaking
 */
export const isSpeaking = (): boolean => {
  return window.speechSynthesis.speaking;
};

/**
 * Stop any ongoing speech
 */
export const stopSpeaking = (): void => {
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }
  currentUtterance = null;
};

/**
 * Speak a message using the browser's speech synthesis API
 * 
 * @param text The text to speak
 * @param voiceType Optional voice type to use (can be 'male', 'female', or a specific voice name)
 * @returns Promise that resolves to true if speech started successfully
 */
export const speakMessage = async (text: string, voiceType?: string): Promise<boolean> => {
  return new Promise((resolve) => {
    // Stop any existing speech
    stopSpeaking();
    
    // Create a new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    currentUtterance = utterance;
    
    // Set voice based on voiceType
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      if (voiceType === 'male') {
        // Find a male voice
        const maleVoice = voices.find(voice => 
          voice.name.toLowerCase().includes('male') || 
          (!voice.name.toLowerCase().includes('female') && voice.name.includes('en-US'))
        );
        if (maleVoice) utterance.voice = maleVoice;
      } else if (voiceType === 'female') {
        // Find a female voice
        const femaleVoice = voices.find(voice => 
          voice.name.toLowerCase().includes('female') || 
          voice.name.toLowerCase().includes('samantha')
        );
        if (femaleVoice) utterance.voice = femaleVoice;
      } else if (voiceType) {
        // Try to find a specific voice by name
        const specificVoice = voices.find(voice => 
          voice.name.toLowerCase().includes(voiceType.toLowerCase())
        );
        if (specificVoice) utterance.voice = specificVoice;
      }
    }
    
    // Set rate and pitch for more natural speaking
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    // Handle events
    utterance.onend = () => {
      currentUtterance = null;
      resolve(true);
    };
    
    utterance.onerror = () => {
      currentUtterance = null;
      resolve(false);
    };
    
    // Start speaking
    window.speechSynthesis.speak(utterance);
    
    // If speaking doesn't start within 500ms, resolve with false
    setTimeout(() => {
      if (!window.speechSynthesis.speaking && currentUtterance === utterance) {
        currentUtterance = null;
        resolve(false);
      }
    }, 500);
  });
};

/**
 * Initialize the speech synthesis API (call this early to load voices)
 */
export const initSpeechSynthesis = (): void => {
  // This triggers voice loading in some browsers
  window.speechSynthesis.getVoices();
  
  // In Chrome, voices might load asynchronously
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }
};
