
import { useState, useCallback } from 'react';

export interface HermesSettings {
  toneFilter: 'warm' | 'neutral' | 'cool';
  emotionalResponseEnabled: boolean;
  dynamicPersonalization: boolean;
  behavioralPrimingMode: 'subtle' | 'moderate' | 'aggressive';
  conversationTracking: boolean;
}

export const useHermesMode = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [settings, setSettings] = useState<HermesSettings>({
    toneFilter: 'warm',
    emotionalResponseEnabled: true,
    dynamicPersonalization: true,
    behavioralPrimingMode: 'subtle',
    conversationTracking: true
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
  
  const getCurrentMode = useCallback(() => {
    return isEnabled ? 'active' : 'disabled';
  }, [isEnabled]);
  
  const getToneFilter = useCallback(() => {
    return settings.toneFilter;
  }, [settings.toneFilter]);
  
  const shouldUseEmotionalResponses = useCallback(() => {
    return isEnabled && settings.emotionalResponseEnabled;
  }, [isEnabled, settings.emotionalResponseEnabled]);
  
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
