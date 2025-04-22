
import { useState, useCallback } from 'react';
import { generateAIProfile } from '@/services/generateAIProfile';
import { AIProfile, ProcessingStatus, AIGenerationOptions } from '@/types/ai-profile';
import { hermesOrusOxum } from '@/core/HermesOrusOxum';

export interface UseAIModelGeneratorReturn {
  generateModels: (options: AIGenerationOptions) => Promise<AIProfile[]>;
  processModelsWithHermesOxum: (models: AIProfile[]) => Promise<AIProfile[]>;
  generatedModels: AIProfile[];
  processingStatus: ProcessingStatus;
  isGenerating: boolean;
  isProcessing: boolean;
}

export const useAIModelGenerator = (): UseAIModelGeneratorReturn => {
  const [generatedModels, setGeneratedModels] = useState<AIProfile[]>([]);
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus>({
    completedCount: 0,
    totalCount: 0,
    status: 'idle',
    message: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * Generate AI models with the specified options
   */
  const generateModels = useCallback(async (options: AIGenerationOptions): Promise<AIProfile[]> => {
    setIsGenerating(true);
    setProcessingStatus({
      completedCount: 0,
      totalCount: options.count || 1,
      status: 'processing',
      message: 'Generating AI models...'
    });

    try {
      const count = options.count || 1;
      const newModels: AIProfile[] = [];

      for (let i = 0; i < count; i++) {
        const personalityType = options.personalityTypes 
          ? options.personalityTypes[Math.floor(Math.random() * options.personalityTypes.length)] 
          : undefined;
        
        // Generate random age within the specified range
        const age = options.ageRange 
          ? Math.floor(Math.random() * (options.ageRange.max - options.ageRange.min + 1)) + options.ageRange.min
          : undefined;
        
        // Generate random region
        const region = options.regions
          ? options.regions[Math.floor(Math.random() * options.regions.length)]
          : undefined;

        const model = await generateAIProfile({
          personality: personalityType,
          age,
          country: region,
          language: 'English' // Default language
        });

        newModels.push(model);
        
        setProcessingStatus(prev => ({
          ...prev,
          completedCount: prev.completedCount + 1,
          message: `Generated ${prev.completedCount + 1} of ${prev.totalCount} models`
        }));
      }

      setGeneratedModels(newModels);
      setProcessingStatus({
        completedCount: count,
        totalCount: count,
        status: 'completed',
        message: `Successfully generated ${count} AI models`
      });
      
      return newModels;
    } catch (error) {
      setProcessingStatus(prev => ({
        ...prev,
        status: 'error',
        message: `Error generating models: ${error}`
      }));
      console.error("Error generating AI models:", error);
      return [];
    } finally {
      setIsGenerating(false);
    }
  }, []);

  /**
   * Process generated models with HermesOrusOxum system
   */
  const processModelsWithHermesOxum = useCallback(async (models: AIProfile[]): Promise<AIProfile[]> => {
    setIsProcessing(true);
    setProcessingStatus({
      completedCount: 0,
      totalCount: models.length,
      status: 'processing',
      message: 'Processing models with Hermes-Orus-Oxum system...'
    });

    try {
      const processedModels = [...models];

      for (let i = 0; i < processedModels.length; i++) {
        const model = processedModels[i];

        // Get optimal time window for this profile type
        const optimalWindow = hermesOrusOxum.getOptimalTimeWindow();

        // Calculate current hour for time impact
        const currentHour = new Date().getHours();
        
        // Calculate time impact based on optimal window
        const timeImpact = hermesOrusOxum.calculateTimeImpact(currentHour, optimalWindow);

        // Record profile view to boost its visibility in the system
        hermesOrusOxum.recordProfileView(model.id);

        // Calculate visibility score for this model
        const visibilityScore = hermesOrusOxum.calculateVisibilityScore(
          75, // initial visibility
          Math.random() * 24, // time elapsed hours (random for demo)
          Math.random() * 100, // system load (random for demo)
          Math.random() * 100  // activity intensity (random for demo)
        );

        // Log this signal transformation event
        hermesOrusOxum.logSignalTransform(
          'ai_model_processing',
          {
            modelId: model.id,
            timeImpact,
            visibilityScore,
            timestamp: new Date().toISOString()
          }
        );

        // Update processing status
        setProcessingStatus(prev => ({
          ...prev,
          completedCount: i + 1,
          message: `Processed ${i + 1} of ${models.length} models`
        }));
      }

      setProcessingStatus({
        completedCount: models.length,
        totalCount: models.length,
        status: 'completed',
        message: `Successfully processed ${models.length} models with Hermes-Orus-Oxum`
      });

      return processedModels;
    } catch (error) {
      setProcessingStatus(prev => ({
        ...prev,
        status: 'error',
        message: `Error processing models: ${error}`
      }));
      console.error("Error processing models with Hermes-Orus-Oxum:", error);
      return models; // Return original models on error
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return {
    generateModels,
    processModelsWithHermesOxum,
    generatedModels,
    processingStatus,
    isGenerating,
    isProcessing
  };
};

export default useAIModelGenerator;
