
import React, { createContext, useContext, ReactNode } from 'react';

// Use consistent casing for imports
import { authService } from '@/services/authService';
import { userService } from '@/services/userService';

interface UberPersonaContextType {
  persona: any | null;
  isLoading: boolean;
  error: string | null;
  loadPersona: (id: string) => Promise<void>;
  updatePersona: (data: any) => Promise<boolean>;
}

const UberPersonaContext = createContext<UberPersonaContextType | undefined>(undefined);

export function UberPersonaProvider({ children }: { children: ReactNode }) {
  const personaValue: UberPersonaContextType = {
    persona: null,
    isLoading: false,
    error: null,
    loadPersona: async (id) => {
      console.log(`Loading persona ${id}`);
    },
    updatePersona: async (data) => {
      console.log('Updating persona', data);
      return true;
    }
  };

  return (
    <UberPersonaContext.Provider value={personaValue}>
      {children}
    </UberPersonaContext.Provider>
  );
}

export function useUberPersona() {
  const context = useContext(UberPersonaContext);
  if (context === undefined) {
    throw new Error('useUberPersona must be used within a UberPersonaProvider');
  }
  return context;
}
