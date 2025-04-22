
import { useState, useCallback } from 'react';
import { generateAIProfile } from '@/services/generateAIProfile';
import { AIProfile, ProcessingStatus } from '@/types/ai-profile';

interface GenerationOptions {
  count?: number;
  personalityTypes?: string[];
  ageRange?: {
    min: number;
    max: number;
  };
  regions?: string[];
}

export const useAIModelGenerator = () => {
  const [generatedModels, setGeneratedModels] = useState<AIProfile[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus | null>(null);

  // Generate AI models based on parameters
  const generateModels = useCallback(async (options: GenerationOptions) => {
    setIsGenerating(true);
    try {
      const count = options.count || 5;
      const newModels: AIProfile[] = [];
      
      for (let i = 0; i < count; i++) {
        // Create generation options from parameters
        const generationOptions: Record<string, any> = {
          age: options.ageRange ? 
            Math.floor(Math.random() * (options.ageRange.max - options.ageRange.min + 1)) + options.ageRange.min : 
            Math.floor(Math.random() * 15) + 21,
        };
        
        // Add personality if specified
        if (options.personalityTypes && options.personalityTypes.length > 0 && options.personalityTypes[0] !== 'mixed') {
          generationOptions.personality = options.personalityTypes[Math.floor(Math.random() * options.personalityTypes.length)];
        }
        
        // Add region if specified
        if (options.regions && options.regions.length > 0 && options.regions[0] !== 'global') {
          const region = options.regions[Math.floor(Math.random() * options.regions.length)];
          // Map region code to actual country names
          const regionCountryMap: Record<string, string[]> = {
            north_america: ['United States', 'Canada', 'Mexico'],
            europe: ['United Kingdom', 'France', 'Germany', 'Spain', 'Italy', 'Netherlands'],
            asia: ['Japan', 'South Korea', 'China', 'Thailand', 'Singapore'],
            latin_america: ['Brazil', 'Colombia', 'Argentina', 'Chile', 'Peru']
          };
          
          const countries = regionCountryMap[region] || ['United States'];
          generationOptions.country = countries[Math.floor(Math.random() * countries.length)];
        }
        
        const newProfile = await generateAIProfile(generationOptions);
        newModels.push(newProfile);
      }
      
      setGeneratedModels(newModels);
      return newModels;
    } catch (error) {
      console.error("Error generating AI models:", error);
      throw error;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  // Process models through Hermes + Oxum enhancements
  const processModelsWithHermesOxum = useCallback(async () => {
    if (generatedModels.length === 0) {
      return;
    }
    
    setIsProcessing(true);
    setProcessingStatus({
      completedCount: 0,
      totalCount: generatedModels.length,
      status: 'processing',
      message: 'Starting neural processing...'
    });
    
    try {
      // Process each model with simulated delay
      for (let i = 0; i < generatedModels.length; i++) {
        // Simulate neural processing time
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Update status
        setProcessingStatus({
          completedCount: i + 1,
          totalCount: generatedModels.length,
          status: i + 1 < generatedModels.length ? 'processing' : 'completed',
          message: `Processing model ${i+1} of ${generatedModels.length}...`
        });
      }
      
      // Set final status
      setProcessingStatus({
        completedCount: generatedModels.length,
        totalCount: generatedModels.length,
        status: 'completed',
        message: `All ${generatedModels.length} models processed successfully`
      });
      
      return generatedModels;
    } catch (error) {
      console.error("Error processing AI models:", error);
      setProcessingStatus({
        completedCount: 0,
        totalCount: generatedModels.length,
        status: 'error',
        message: 'Error processing models'
      });
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, [generatedModels]);

  return {
    generatedModels,
    isGenerating,
    isProcessing,
    processingStatus,
    generateModels,
    processModelsWithHermesOxum
  };
};
