
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface AIVoiceContextType {
  isPlaying: boolean;
  isMuted: boolean;
  toggleMute: () => void;
  speak: (text: string, voiceId?: string) => Promise<void>;
  stopSpeaking: () => void;
}

const AIVoiceContext = createContext<AIVoiceContextType>({
  isPlaying: false,
  isMuted: false,
  toggleMute: () => {},
  speak: async () => {},
  stopSpeaking: () => {},
});

export const useAIVoice = () => useContext(AIVoiceContext);

interface AIVoiceProviderProps {
  children: React.ReactNode;
}

export const AIVoiceProvider: React.FC<AIVoiceProviderProps> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // Create audio element once on component mount
    audioRef.current = new Audio();
    
    // Clean up on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  const toggleMute = () => {
    setIsMuted(prev => !prev);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };
  
  const speak = async (text: string, voiceId?: string) => {
    if (isMuted || !text || !audioRef.current) return;
    
    try {
      // In a real implementation, this would call a TTS service like ElevenLabs
      // For now, we're using the browser's built-in speech synthesis
      stopSpeaking();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      // If browser supports speech synthesis
      if ('speechSynthesis' in window) {
        setIsPlaying(true);
        window.speechSynthesis.speak(utterance);
        
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);
      } else {
        console.warn('Speech synthesis not supported in this browser');
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
    }
  };
  
  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };
  
  return (
    <AIVoiceContext.Provider value={{
      isPlaying,
      isMuted,
      toggleMute,
      speak,
      stopSpeaking,
    }}>
      {children}
    </AIVoiceContext.Provider>
  );
};
