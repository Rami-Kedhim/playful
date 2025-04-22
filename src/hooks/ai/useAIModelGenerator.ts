import { useState, useCallback } from 'react';
import { generateAIProfile } from '@/services/generateAIProfile';
import { AIProfile } from '@/types';

interface UseAIModelGeneratorReturn {
  profile: AIProfile | null;
  loading: boolean;
  error: string | null;
  generate: (options?: { [key: string]: any }) => Promise<void>;
}

// Add a type guard for checking language property
const hasLanguage = (profile: any): profile is { language: string } => {
  return profile && typeof profile.language === 'string';
};

export const useAIModelGenerator = (): UseAIModelGeneratorReturn => {
  const [profile, setProfile] = useState<AIProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const generate = useCallback(async (options: { [key: string]: any } = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const newProfile = await generateAIProfile(options);
      
      // Basic example of feature engineering based on profile data
      const ageFeature = newProfile.age ? `Age: ${newProfile.age}` : 'Age not specified';
      const countryFeature = newProfile.country ? `From ${newProfile.country}` : 'Location not specified';
      
      // Use the type guard before accessing language property
      const languageFeature = hasLanguage(newProfile) ? 
        `Speaks ${newProfile.language} fluently` : 
        'Multilingual communication';
      
      const description = [ageFeature, countryFeature, languageFeature].join('; ');
      
      // Update the profile with the generated description
      const enhancedProfile: AIProfile = {
        ...newProfile,
        description
      };
      
      setProfile(enhancedProfile);
    } catch (err: any) {
      setError(err.message || 'Failed to generate AI profile');
    } finally {
      setLoading(false);
    }
  }, []);
  
  return {
    profile,
    loading,
    error,
    generate
  };
};
