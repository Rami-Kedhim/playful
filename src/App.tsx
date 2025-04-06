
import React from 'react';
import AppRoutes from './Routes';
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <LanguageProvider>
        <AppRoutes />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
