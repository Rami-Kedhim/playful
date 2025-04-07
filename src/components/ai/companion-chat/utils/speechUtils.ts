
/**
 * Speech synthesis utility functions for AI companions
 */

export const initSpeechSynthesis = () => {
  // Check if speech synthesis is available
  if ('speechSynthesis' in window) {
    // Initialize voices if needed
    return true;
  }
  
  console.warn("Speech synthesis not supported in this browser");
  return false;
};

export const speakText = (text: string, voiceType?: string): void => {
  if (!('speechSynthesis' in window)) {
    console.warn("Speech synthesis not supported in this browser");
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Get available voices
  const voices = window.speechSynthesis.getVoices();
  
  // Select voice based on voiceType
  if (voices.length > 0) {
    if (voiceType === "feminine") {
      // Find a feminine voice (usually has 'female' in the name or is higher pitched)
      const femaleVoice = voices.find(v => 
        v.name.toLowerCase().includes("female") || 
        v.name.toLowerCase().includes("girl") ||
        v.name.toLowerCase().includes("woman")
      );
      
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
    } else if (voiceType === "masculine") {
      // Find a masculine voice
      const maleVoice = voices.find(v => 
        v.name.toLowerCase().includes("male") || 
        v.name.toLowerCase().includes("boy") ||
        v.name.toLowerCase().includes("man")
      );
      
      if (maleVoice) {
        utterance.voice = maleVoice;
      }
    }
  }
  
  // Adjust parameters
  utterance.rate = 1.0;  // Normal speed
  utterance.pitch = 1.0; // Normal pitch
  utterance.volume = 1.0; // Full volume
  
  // Speak
  window.speechSynthesis.speak(utterance);
};

export const stopSpeaking = (): void => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};
