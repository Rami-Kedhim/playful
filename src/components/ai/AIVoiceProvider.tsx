
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AIVoiceContextType {
  speak: (text: string) => void;
  stopSpeaking: () => void;
  isPlaying: boolean;
  isMuted: boolean;
  toggleMute: () => void;
}

const AIVoiceContext = createContext<AIVoiceContextType | undefined>(undefined);

export const AIVoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(() => {
    // Initialize from localStorage if available
    const saved = localStorage.getItem('ai_voice_muted');
    return saved ? saved === 'true' : false;
  });
  const [currentUtterance, setCurrentUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  // Save mute preference to localStorage
  useEffect(() => {
    localStorage.setItem('ai_voice_muted', isMuted.toString());
  }, [isMuted]);

  // Cleanup utterance on unmount
  useEffect(() => {
    return () => {
      if (currentUtterance) {
        window.speechSynthesis?.cancel();
      }
    };
  }, [currentUtterance]);

  const speak = (text: string) => {
    if (!window.speechSynthesis || isMuted) return;
    
    // Cancel any ongoing speech
    stopSpeaking();
    
    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set preferred voice (can be customized further)
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => voice.name.includes('Female') || voice.name.includes('Google'));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    // Set properties
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 0.8;
    
    // Set event handlers
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    
    // Save reference and start speaking
    setCurrentUtterance(utterance);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentUtterance(null);
    }
  };

  const toggleMute = () => {
    if (isPlaying) {
      stopSpeaking();
    }
    setIsMuted(!isMuted);
  };

  return (
    <AIVoiceContext.Provider
      value={{
        speak,
        stopSpeaking,
        isPlaying,
        isMuted,
        toggleMute
      }}
    >
      {children}
    </AIVoiceContext.Provider>
  );
};

export const useAIVoice = (): AIVoiceContextType => {
  const context = useContext(AIVoiceContext);
  if (context === undefined) {
    throw new Error('useAIVoice must be used within an AIVoiceProvider');
  }
  return context;
};
