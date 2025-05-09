
import React, { ReactNode } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import { WalletProvider } from '@/contexts/WalletContext';
import { BoostProvider } from '@/contexts/BoostContext';
import { ThemeProvider } from '@/components/theme-provider';

interface UnifiedContextProviderProps {
  children: ReactNode;
  storageKey?: string;
}

/**
 * UnifiedContextProvider wraps all context providers in the application
 * to provide a cleaner and more maintainable provider tree
 */
export const UnifiedContextProvider: React.FC<UnifiedContextProviderProps> = ({ 
  children,
  storageKey = "vite-ui-theme"
}) => {
  return (
    <ThemeProvider defaultTheme="dark" forcedTheme="dark" enableSystem={false} storageKey={storageKey}>
      <AuthProvider>
        <FavoritesProvider>
          <WalletProvider>
            <BoostProvider>
              {children}
            </BoostProvider>
          </WalletProvider>
        </FavoritesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default UnifiedContextProvider;
