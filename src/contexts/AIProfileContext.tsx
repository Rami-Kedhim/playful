
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@supabase/auth-helpers-react';
import { supabase } from '@/integrations/supabase/client';

interface AIProfileContextType {
  isAIProfile: boolean;
  isAIProfileLoading: boolean;
  setAIProfile: (isAI: boolean) => Promise<void>;
  aiGenerationSettings: any;
  updateAISettings: (settings: any) => Promise<void>;
}

const AIProfileContext = createContext<AIProfileContextType>({
  isAIProfile: false,
  isAIProfileLoading: true,
  setAIProfile: async () => {},
  aiGenerationSettings: {},
  updateAISettings: async () => {},
});

export const useAIProfile = () => useContext(AIProfileContext);

interface AIProfileProviderProps {
  children: React.ReactNode;
  user: User | null;
}

export const AIProfileProvider: React.FC<AIProfileProviderProps> = ({ 
  children,
  user 
}) => {
  const [isAIProfile, setIsAIProfile] = useState(false);
  const [isAIProfileLoading, setIsAIProfileLoading] = useState(true);
  const [aiGenerationSettings, setAIGenerationSettings] = useState({});

  // Load AI profile settings on mount and when user changes
  useEffect(() => {
    if (user?.id) {
      loadAIProfileSettings(user.id);
    } else {
      setIsAIProfile(false);
      setIsAIProfileLoading(false);
    }
  }, [user?.id]);

  // Load AI profile settings from supabase
  const loadAIProfileSettings = async (userId: string) => {
    setIsAIProfileLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('is_ai_profile, ai_settings')
        .eq('id', userId)
        .single();

      if (error) throw error;
      
      setIsAIProfile(data.is_ai_profile || false);
      setAIGenerationSettings(data.ai_settings || {});
    } catch (error) {
      console.error('Error loading AI profile settings:', error);
    } finally {
      setIsAIProfileLoading(false);
    }
  };

  // Update AI profile status
  const setAIProfile = async (isAI: boolean) => {
    if (!user?.id) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_ai_profile: isAI })
        .eq('id', user.id);
      
      if (error) throw error;
      
      setIsAIProfile(isAI);
    } catch (error) {
      console.error('Error updating AI profile status:', error);
      throw error;
    }
  };

  // Update AI generation settings
  const updateAISettings = async (settings: any) => {
    if (!user?.id) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ ai_settings: settings })
        .eq('id', user.id);
      
      if (error) throw error;
      
      setAIGenerationSettings(settings);
    } catch (error) {
      console.error('Error updating AI generation settings:', error);
      throw error;
    }
  };

  return (
    <AIProfileContext.Provider 
      value={{ 
        isAIProfile, 
        isAIProfileLoading, 
        setAIProfile,
        aiGenerationSettings,
        updateAISettings
      }}
    >
      {children}
    </AIProfileContext.Provider>
  );
};
