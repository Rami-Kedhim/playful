
import React, { createContext, useContext, ReactNode } from 'react';

interface LucieContextType {
  isActive: boolean;
  isSpeaking: boolean;
  lastMessage: string | null;
  sendMessage: (message: string) => Promise<void>;
  toggleActive: () => void;
}

const LucieContext = createContext<LucieContextType | undefined>(undefined);

export function LucieProvider({ children }: { children: ReactNode }) {
  const lucieValue: LucieContextType = {
    isActive: false,
    isSpeaking: false,
    lastMessage: null,
    sendMessage: async (message) => {
      console.log(`Sending message to Lucie: ${message}`);
    },
    toggleActive: () => {
      console.log('Toggling Lucie active state');
    }
  };

  return (
    <LucieContext.Provider value={lucieValue}>
      {children}
    </LucieContext.Provider>
  );
}

export function useLucie() {
  const context = useContext(LucieContext);
  if (context === undefined) {
    throw new Error('useLucie must be used within a LucieProvider');
  }
  return context;
}
