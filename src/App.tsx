
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { BoostProvider } from './contexts/BoostContext';
import HomePage from "./pages/HomePage";
import Wallet from "./pages/Wallet";
import UpdatedWallet from "./pages/UpdatedWallet";
import PulseBoost from "./pages/PulseBoost";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <ThemeProvider>
            <AuthProvider>
              <BoostProvider>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/wallet" element={<Wallet />} />
                  <Route path="/updated-wallet" element={<UpdatedWallet />} />
                  <Route path="/pulse-boost" element={<PulseBoost />} />
                </Routes>
                <Toaster />
              </BoostProvider>
            </AuthProvider>
          </ThemeProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
