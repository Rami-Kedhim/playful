
import { useState, useCallback } from 'react';
import { generateAIProfile } from '@/services/generateAIProfile';
import { AIProfile } from '@/types/ai-profile';

interface UseAIModelGeneratorReturn {
  profile: AIProfile | null;
  loading: boolean;
  error: string | null;
  generate: (options?: { [key: string]: any }) => Promise<void>;
  // Add missing properties for AIModelGenerationDashboard
  generateModels: (count?: number) => Promise<void>;
  processModelsWithHermesOxum: () => Promise<void>;
  generatedModels: AIProfile[];
  processingStatus: string;
  isGenerating: boolean;
  isProcessing: boolean;
}

// Add a type guard for checking language property
const hasLanguage = (profile: any): profile is { language: string } => {
  return profile && typeof profile.language === 'string';
};

export const useAIModelGenerator = (): UseAIModelGeneratorReturn => {
  const [profile, setProfile] = useState<AIProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Add new state properties for additional functionality
  const [generatedModels, setGeneratedModels] = useState<AIProfile[]>([]);
  const [processingStatus, setProcessingStatus] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  
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
  
  // Add new functions for batch generation and processing
  const generateModels = useCallback(async (count: number = 5) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const newModels: AIProfile[] = [];
      
      for (let i = 0; i < count; i++) {
        const model = await generateAIProfile({
          name: `AI Companion ${i + 1}`,
          category: ['Companion', 'Assistant', 'Friend', 'Guide'][Math.floor(Math.random() * 4)]
        });
        
        newModels.push(model);
        setGeneratedModels(prev => [...prev, model]);
      }
      
    } catch (err: any) {
      setError(err.message || 'Failed to generate AI models');
    } finally {
      setIsGenerating(false);
    }
  }, []);
  
  const processModelsWithHermesOxum = useCallback(async () => {
    if (generatedModels.length === 0) {
      setError('No models to process');
      return;
    }
    
    setIsProcessing(true);
    setProcessingStatus('Starting Hermes-Oxum analysis...');
    
    try {
      // Simulate processing steps with delays
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProcessingStatus('Performing personality assessment...');
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProcessingStatus('Analyzing compatibility patterns...');
      
      await new Promise(resolve => setTimeout(resolve, 1200));
      setProcessingStatus('Finalizing AI model enrichment...');
      
      await new Promise(resolve => setTimeout(resolve, 800));
      setProcessingStatus('Processing complete!');
      
    } catch (err: any) {
      setError(err.message || 'Failed to process models');
      setProcessingStatus('Processing failed');
    } finally {
      setIsProcessing(false);
    }
  }, [generatedModels]);
  
  return {
    profile,
    loading,
    error,
    generate,
    // Add new properties
    generateModels,
    processModelsWithHermesOxum,
    generatedModels,
    processingStatus,
    isGenerating,
    isProcessing
  };
};
