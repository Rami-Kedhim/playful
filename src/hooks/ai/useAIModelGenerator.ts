
import { useState, useCallback } from 'react';
import { generateAIProfile } from '@/services/generateAIProfile';
import { AIProfile, AIGenerationOptions, ProcessingStatus } from '@/types/ai-profile';

interface UseAIModelGeneratorReturn {
  profile: AIProfile | null;
  loading: boolean;
  error: string | null;
  generate: (options?: { [key: string]: any }) => Promise<void>;
  generateModels: (countOrOptions?: number | AIGenerationOptions) => Promise<AIProfile[]>;
  processModelsWithHermesOxum: () => Promise<ProcessingStatus>;
  generatedModels: AIProfile[];
  processingStatus: ProcessingStatus;
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
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus>({
    completedCount: 0,
    totalCount: 0,
    status: 'idle',
  });
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
  
  // Add new function for batch generation
  const generateModels = useCallback(async (countOrOptions: number | AIGenerationOptions = 5): Promise<AIProfile[]> => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const newModels: AIProfile[] = [];
      const count = typeof countOrOptions === 'number' ? 
        countOrOptions : 
        countOrOptions.count || 5;
      
      const options = typeof countOrOptions === 'number' ? {} : countOrOptions;
      
      for (let i = 0; i < count; i++) {
        const model = await generateAIProfile({
          name: `AI Companion ${i + 1}`,
          category: ['Companion', 'Assistant', 'Friend', 'Guide'][Math.floor(Math.random() * 4)],
          ...(options.personalityTypes && { personality: options.personalityTypes[Math.floor(Math.random() * options.personalityTypes.length)] }),
          ...(options.ageRange && { age: Math.floor(Math.random() * (options.ageRange.max - options.ageRange.min)) + options.ageRange.min }),
          ...(options.regions && { country: options.regions[Math.floor(Math.random() * options.regions.length)] })
        });
        
        newModels.push(model);
      }
      
      setGeneratedModels(prevModels => [...prevModels, ...newModels]);
      return newModels;
      
    } catch (err: any) {
      setError(err.message || 'Failed to generate AI models');
      return [];
    } finally {
      setIsGenerating(false);
    }
  }, []);
  
  // Add function for processing with Hermes-Oxum
  const processModelsWithHermesOxum = useCallback(async (): Promise<ProcessingStatus> => {
    if (generatedModels.length === 0) {
      setError('No models to process');
      return {
        completedCount: 0,
        totalCount: 0,
        status: 'error',
        message: 'No models to process'
      };
    }
    
    setIsProcessing(true);
    setProcessingStatus({
      completedCount: 0,
      totalCount: generatedModels.length,
      status: 'processing',
      message: 'Starting Hermes-Oxum analysis...'
    });
    
    try {
      // Simulate processing steps with delays and status updates
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProcessingStatus({
        completedCount: Math.floor(generatedModels.length * 0.25),
        totalCount: generatedModels.length,
        status: 'processing',
        message: 'Performing personality assessment...'
      });
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProcessingStatus({
        completedCount: Math.floor(generatedModels.length * 0.5),
        totalCount: generatedModels.length,
        status: 'processing',
        message: 'Analyzing compatibility patterns...'
      });
      
      await new Promise(resolve => setTimeout(resolve, 1200));
      setProcessingStatus({
        completedCount: Math.floor(generatedModels.length * 0.75),
        totalCount: generatedModels.length,
        status: 'processing',
        message: 'Finalizing AI model enrichment...'
      });
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const finalStatus = {
        completedCount: generatedModels.length,
        totalCount: generatedModels.length,
        status: 'completed' as const,
        message: 'Processing complete!'
      };
      
      setProcessingStatus(finalStatus);
      return finalStatus;
      
    } catch (err: any) {
      const errorStatus = {
        completedCount: 0,
        totalCount: generatedModels.length,
        status: 'error' as const,
        message: err.message || 'Failed to process models'
      };
      
      setError(err.message || 'Failed to process models');
      setProcessingStatus(errorStatus);
      return errorStatus;
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
