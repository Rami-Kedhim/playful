
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { LucieProvider } from '@/contexts/LucieContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import { ServiceTypeProvider } from '@/contexts/ServiceTypeContext';
import { WalletProvider } from '@/contexts/WalletContext';

// Pages
import HomePage from '@/pages/HomePage';
import EscortsPage from '@/pages/EscortsPage';
import EscortDetailPage from '@/pages/EscortDetailPage';
import CreatorsPage from '@/pages/CreatorsPage';
import CreatorDetailPage from '@/pages/CreatorDetailPage';
import LivecamsPage from '@/pages/LivecamsPage';
import LivecamDetailPage from '@/pages/LivecamDetailPage';
import ProfilePage from '@/pages/ProfilePage';
import VerificationPage from '@/pages/VerificationPage';
import WalletPage from '@/pages/WalletPage';
import FavoritesPage from '@/pages/FavoritesPage';
import SettingsPage from '@/pages/SettingsPage';
import NotFoundPage from '@/pages/NotFoundPage';

// Layouts
import Layout from '@/layouts/Layout';
import LucieHermesIntegration from '@/components/home/LucieHermesIntegration';

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark">
      <LucieProvider>
        <FavoritesProvider>
          <ServiceTypeProvider>
            <WalletProvider>
              <Router>
                <Routes>
                  {/* Home */}
                  <Route path="/" element={<HomePage />} />
                  
                  {/* Escorts */}
                  <Route path="/escorts" element={<EscortsPage />} />
                  <Route path="/escorts/:id" element={<EscortDetailPage />} />
                  
                  {/* Creators */}
                  <Route path="/creators" element={<CreatorsPage />} />
                  <Route path="/creators/:id" element={<CreatorDetailPage />} />
                  
                  {/* Live Cams */}
                  <Route path="/livecams" element={<LivecamsPage />} />
                  <Route path="/livecams/:id" element={<LivecamDetailPage />} />
                  
                  {/* User Pages */}
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/verification" element={<VerificationPage />} />
                  <Route path="/wallet" element={<WalletPage />} />
                  <Route path="/favorites" element={<FavoritesPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  
                  {/* Not Found */}
                  <Route path="/404" element={<NotFoundPage />} />
                  <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
                
                {/* Global Components */}
                <LucieHermesIntegration forceVisible={false} />
                <Toaster />
              </Router>
            </WalletProvider>
          </ServiceTypeProvider>
        </FavoritesProvider>
      </LucieProvider>
    </ThemeProvider>
  );
};

export default App;
