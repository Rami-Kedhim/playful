
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import HomePage from '@/pages/HomePage';
import GeneratePage from '@/pages/GeneratePage';
import EnhancedAIPage from '@/pages/EnhancedAIPage';
import MediaGenerationPage from '@/pages/MediaGenerationPage';
import NSFWImageGeneratorPage from '@/pages/NSFWImageGeneratorPage';
import LucieTalkPage from '@/pages/lucie/LucieTalkPage';
import { initializeSystem, shutdownSystem } from '@/core/engine';

function App() {
  // Initialize the Uber Escorts core system on app start
  useEffect(() => {
    const init = async () => {
      await initializeSystem();
    };

    init();

    // Clean up when the app is closed
    return () => {
      shutdownSystem();
    };
  }, []);

  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/generate" element={<GeneratePage />} />
          <Route path="/enhanced-ai" element={<EnhancedAIPage />} />
          <Route path="/media-generation" element={<MediaGenerationPage />} />
          <Route path="/nsfw-image-generator" element={<NSFWImageGeneratorPage />} />
          <Route path="/lucie-talk" element={<LucieTalkPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
