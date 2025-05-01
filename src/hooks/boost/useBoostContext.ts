
import { useContext } from 'react';
import { BoostContext } from '@/contexts/BoostContext';
import { BoostContextType } from '@/types/boost';

export const useBoostContext = () => {
  const context = useContext(BoostContext);
  
  if (!context) {
    throw new Error('useBoostContext must be used within a BoostProvider');
  }
  
  return context as BoostContextType;
};

export default useBoostContext;
