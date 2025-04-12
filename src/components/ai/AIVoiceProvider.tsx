
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useElevenLabsVoice } from '@/components/ai/companion-chat/utils/elevenlabsVoiceService';

interface AIVoiceContextProps {
  speak: (text: string, voiceId?: string) => Promise<boolean>;
  stop: () => void;
  isSpeaking: boolean;
  isEnabled: boolean;
  toggleVoice: () => void;
  selectedVoice: string;
  setSelectedVoice: (voiceId: string) => void;
  availableVoices: VoiceOption[];
}

interface VoiceOption {
  id: string;
  name: string;
}

const defaultVoices: VoiceOption[] = [
  { id: "9BWtsMINqrJLrRacOk9x", name: "Aria" },
  { id: "CwhRBWXzGAHq8TQ4Fs17", name: "Roger" },
  { id: "EXAVITQu4vr4xnSDxMaL", name: "Sarah" },
  { id: "FGY2WhTYpPnrIDTdsKH5", name: "Laura" },
  { id: "IKne3meq5aSn9XLyUdCD", name: "Charlie" },
  { id: "JBFqnCBsd6RMkjVDRZzb", name: "George" },
];

const AIVoiceContext = createContext<AIVoiceContextProps | undefined>(undefined);

export const AIVoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { speak: elevenLabsSpeak, stop, isSpeaking } = useElevenLabsVoice();
  const [isEnabled, setIsEnabled] = useState(() => {
    const saved = localStorage.getItem('ai-voice-enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [selectedVoice, setSelectedVoice] = useState(() => {
    const saved = localStorage.getItem('ai-voice-selected');
    return saved || "9BWtsMINqrJLrRacOk9x"; // Default to Aria
  });
  const [availableVoices] = useState<VoiceOption[]>(defaultVoices);

  useEffect(() => {
    localStorage.setItem('ai-voice-enabled', JSON.stringify(isEnabled));
  }, [isEnabled]);

  useEffect(() => {
    localStorage.setItem('ai-voice-selected', selectedVoice);
  }, [selectedVoice]);

  const toggleVoice = () => {
    if (isSpeaking) {
      stop();
    }
    setIsEnabled(prev => !prev);
  };

  const speak = async (text: string, voiceId?: string): Promise<boolean> => {
    if (!isEnabled) return false;
    return await elevenLabsSpeak(text, voiceId || selectedVoice);
  };

  return (
    <AIVoiceContext.Provider value={{
      speak,
      stop,
      isSpeaking,
      isEnabled,
      toggleVoice,
      selectedVoice,
      setSelectedVoice,
      availableVoices,
    }}>
      {children}
    </AIVoiceContext.Provider>
  );
};

export const useAIVoice = () => {
  const context = useContext(AIVoiceContext);
  if (context === undefined) {
    throw new Error('useAIVoice must be used within an AIVoiceProvider');
  }
  return context;
};
