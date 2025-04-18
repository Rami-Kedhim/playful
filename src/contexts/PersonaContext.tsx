
import React, { createContext, useContext, useState, useEffect } from 'react';

interface PersonaContextType {
  persona: {
    isEscort?: boolean;
    isContentCreator?: boolean;
    isCreator?: boolean; // Add the missing property
    isPremium?: boolean;
    isVerified?: boolean;
    isFeatured?: boolean;
    isAI?: boolean;
  };
  togglePersonaType: (type: string) => void;
}

// Create the context with a default state
const PersonaContext = createContext<PersonaContextType>({
  persona: {
    isEscort: false,
    isContentCreator: false,
    isCreator: false, // Add default value
    isPremium: false,
    isVerified: false,
    isFeatured: false,
    isAI: false
  },
  togglePersonaType: () => {}
});

// Create a provider component
export const PersonaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [persona, setPersona] = useState({
    isEscort: false,
    isContentCreator: false,
    isCreator: false,
    isPremium: false,
    isVerified: false,
    isFeatured: false,
    isAI: false
  });
  
  const togglePersonaType = (type: string) => {
    setPersona(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };
  
  return (
    <PersonaContext.Provider value={{ persona, togglePersonaType }}>
      {children}
    </PersonaContext.Provider>
  );
};

// Create a custom hook to use the context
export const usePersona = () => useContext(PersonaContext);

export default PersonaContext;
