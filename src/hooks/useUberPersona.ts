
// Fix the import to use the correct export name
import { useContext } from 'react';
import { UberPersonaContext } from '@/contexts/UberPersonaContext';

export const useUberPersona = () => {
  const context = useContext(UberPersonaContext);
  if (!context) {
    throw new Error('useUberPersona must be used within a UberPersonaProvider');
  }
  return context;
};

export default useUberPersona;
