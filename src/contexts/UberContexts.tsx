
import React, { ReactNode } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import { UberEcosystemProvider } from '@/contexts/UberEcosystemContext';
import { WalletProvider } from '@/contexts/WalletContext';
import { ThemeProvider } from '@/components/ui/theme-provider';

interface UberContextsProviderProps {
  children: ReactNode;
}

const UberContextsProvider: React.FC<UberContextsProviderProps> = ({ children }) => {
  // Wrap all application contexts here in the correct order
  // Order is important for dependent contexts
  return (
    <ThemeProvider defaultTheme="dark" forcedTheme="dark">
      <UberEcosystemProvider>
        <AuthProvider>
          <WalletProvider>
            <FavoritesProvider>
              {children}
            </FavoritesProvider>
          </WalletProvider>
        </AuthProvider>
      </UberEcosystemProvider>
    </ThemeProvider>
  );
};

export default UberContextsProvider;
