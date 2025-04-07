
import { useState, useEffect } from 'react';

export interface HermesSettings {
  autoMode: boolean;
  sensitivity: number;
  features: string[];
}

export const useHermesMode = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [settings, setSettings] = useState<HermesSettings>({
    autoMode: true,
    sensitivity: 50,
    features: ['insights', 'recommendations']
  });
  
  // Load settings from localStorage
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('hermesSettings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
      
      const enabled = localStorage.getItem('hermesEnabled') === 'true';
      setIsEnabled(enabled);
    } catch (error) {
      console.error('Failed to load Hermes settings:', error);
    }
  }, []);
  
  // Save settings when they change
  useEffect(() => {
    try {
      localStorage.setItem('hermesSettings', JSON.stringify(settings));
      localStorage.setItem('hermesEnabled', isEnabled.toString());
    } catch (error) {
      console.error('Failed to save Hermes settings:', error);
    }
  }, [settings, isEnabled]);
  
  const toggleMode = () => {
    setIsEnabled(prev => !prev);
  };
  
  const updateSettings = (newSettings: Partial<HermesSettings>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings
    }));
  };
  
  return {
    isEnabled,
    settings,
    toggleMode,
    updateSettings
  };
};

export default useHermesMode;
