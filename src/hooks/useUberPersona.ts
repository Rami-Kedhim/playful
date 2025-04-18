
import { useContext } from 'react';
import { useUberPersonaContext } from '@/contexts/UberPersonaContext';
import { UberPersona } from '@/types/UberPersona';

/**
 * Custom hook to access UberPersona data and operations
 */
export const useUberPersona = () => {
  const context = useUberPersonaContext();
  
  if (!context) {
    throw new Error('useUberPersona must be used within a UberPersonaProvider');
  }
  
  return context;
};

export default useUberPersona;
