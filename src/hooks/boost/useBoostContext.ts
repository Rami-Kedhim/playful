
import { useContext } from 'react';
import { BoostContext, BoostContextType } from '@/contexts/BoostContext';

/**
 * Hook to access the boost context
 */
export const useBoostContext = (): BoostContextType => {
  const context = useContext(BoostContext);
  
  if (context === undefined) {
    throw new Error('useBoostContext must be used within a BoostProvider');
  }
  
  return context;
};

export default useBoostContext;
