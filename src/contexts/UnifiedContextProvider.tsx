
import React, { ReactNode } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import { WalletProvider } from '@/contexts/WalletContext';
import { BoostProvider } from '@/contexts/BoostContext';
import { ThemeProvider } from '@/components/ui/theme-provider';

interface UnifiedContextProviderProps {
  children: ReactNode;
  defaultTheme?: string;
}

/**
 * UnifiedContextProvider wraps all context providers in the application
 * to provide a cleaner and more maintainable provider tree
 */
export const UnifiedContextProvider: React.FC<UnifiedContextProviderProps> = ({ 
  children, 
  defaultTheme = 'dark' 
}) => {
  return (
    <ThemeProvider defaultTheme={defaultTheme}>
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
