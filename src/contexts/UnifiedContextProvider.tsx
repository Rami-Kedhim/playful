
import React, { ReactNode } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import { WalletProvider } from '@/contexts/WalletContext';
import { BoostProvider } from '@/contexts/BoostContext';
// We'll use the theme provider from the App component rather than including it here

interface UnifiedContextProviderProps {
  children: ReactNode;
}

/**
 * UnifiedContextProvider wraps all context providers in the application
 * to provide a cleaner and more maintainable provider tree
 */
export const UnifiedContextProvider: React.FC<UnifiedContextProviderProps> = ({ 
  children 
}) => {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <WalletProvider>
          <BoostProvider>
            {children}
          </BoostProvider>
        </WalletProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
};

export default UnifiedContextProvider;
