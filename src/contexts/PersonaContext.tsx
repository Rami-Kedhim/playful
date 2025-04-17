
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUberPersonas } from '@/hooks/useUberPersonas';
import { UberPersona } from '@/types/uberPersona';
import { Loader2 } from 'lucide-react';

interface PersonaContextType {
  personas: UberPersona[];
  escortPersonas: UberPersona[];
  creatorPersonas: UberPersona[];
  livecamPersonas: UberPersona[];
  isLoading: boolean;
  error: string | null;
  refreshPersonas: (useCache?: boolean) => Promise<void>;
  getPersonaById: (id: string) => UberPersona | undefined;
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export const PersonaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const {
    personas,
    isLoading,
    error,
    loadPersonas,
    getEscorts: getEscortPersonas,
    getCreators,
    getLivecams,
    getPersonaById
  } = useUberPersonas();

  useEffect(() => {
    loadPersonas();
  }, [loadPersonas]);

  const refreshPersonas = async (useCache = false) => {
    await loadPersonas(useCache);
  };

  const value = {
    personas,
    escortPersonas: getEscortPersonas(),
    creatorPersonas: getCreators(),
    livecamPersonas: getLivecams(),
    isLoading,
    error,
    refreshPersonas,
    getPersonaById
  };

  if (isLoading && personas.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading profiles...</p>
        </div>
      </div>
    );
  }

  return <PersonaContext.Provider value={value}>{children}</PersonaContext.Provider>;
};

export const usePersonaContext = () => {
  const context = useContext(PersonaContext);
  if (context === undefined) {
    throw new Error('usePersonaContext must be used within a PersonaProvider');
  }
  return context;
};
