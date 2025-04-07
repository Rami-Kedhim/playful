
import { useState, useCallback } from 'react';

export interface HermesSettings {
  responseMode: 'emotional' | 'protective' | 'neutral' | 'premium';
  toneFilter: 'authentic' | 'restrained' | 'generic' | 'enhanced';
  responseSpeed: number; // milliseconds of delay
}

export const useHermesMode = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [settings, setSettings] = useState<HermesSettings>({
    responseMode: 'emotional',
    toneFilter: 'authentic',
    responseSpeed: 0
  });
  
  const toggleMode = useCallback(() => {
    setIsEnabled(prev => !prev);
  }, []);
  
  const updateSettings = useCallback((newSettings: Partial<HermesSettings>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings
    }));
  }, []);
  
  // Additional functions for compatibility with existing code
  const getCurrentMode = useCallback(() => {
    return settings.responseMode;
  }, [settings.responseMode]);
  
  const getToneFilter = useCallback(() => {
    return settings.toneFilter;
  }, [settings.toneFilter]);
  
  const shouldUseEmotionalResponses = useCallback(() => {
    return settings.responseMode === 'emotional' || settings.responseMode === 'premium';
  }, [settings.responseMode]);
  
  return {
    isEnabled,
    settings,
    toggleMode,
    updateSettings,
    getCurrentMode,
    getToneFilter,
    shouldUseEmotionalResponses
  };
};

export default useHermesMode;
