
import React, { createContext, useContext, ReactNode } from 'react';

interface SettingsContextType {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: boolean;
  updateSettings: (settings: Partial<Settings>) => void;
}

interface Settings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const settingsValue: SettingsContextType = {
    theme: 'system',
    language: 'en',
    notifications: true,
    updateSettings: (settings) => {
      console.log('Updating settings', settings);
    }
  };

  return (
    <SettingsContext.Provider value={settingsValue}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
