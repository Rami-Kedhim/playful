
import { useState, useCallback } from 'react';
import { generateAIProfile } from '@/services/generateAIProfile';
import { AIProfile, ProcessingStatus, ProcessingStatusDetails } from '@/types/ai-profile';

interface GenerateModelOptions {
  name: string;
  personality: { type: string; traits?: string[] }; // personality should be object type
  appearance?: string;
  voice?: string;
}

interface UseAIModelGeneratorProps {
  onSuccess?: (model: AIProfile) => void;
}

export const useAIModelGenerator = (props?: UseAIModelGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState('');
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatusDetails>({
    status: ProcessingStatus.IDLE,
    progress: 0,
    message: 'Ready to generate',
    completedCount: 0,
    totalCount: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [generatedModel, setGeneratedModel] = useState<AIProfile | null>(null);

  const generateModel = useCallback(async (options: GenerateModelOptions) => {
    setIsGenerating(true);
    setError(null);
    setGeneratedModel(null);
    setProgress(0);
    setCurrentStage('Initializing AI model generation');
    setProcessingStatus({
      status: ProcessingStatus.PENDING,
      progress: 0,
      message: { type: options.personality.type, traits: options.personality.traits || [] }, // fix type to object
      completedCount: 0,
      totalCount: 5
    });

    try {
      // Step 1: Initialize personality profile
      await simulateStep('Creating personality profile', 1, 5);

      // Step 2: Generate appearance preferences
      await simulateStep('Generating appearance preferences', 2, 5);

      // Step 3: Training voice patterns
      await simulateStep('Training voice patterns', 3, 5);

      // Step 4: Building conversation history
      await simulateStep('Building interaction patterns', 4, 5);

      // Step 5: Finalizing model
      await simulateStep('Finalizing model', 5, 5);

      // Generate the AI profile
      const aiProfile = await generateAIProfile({
        name: options.name,
        personality: options.personality,
      });

      // Add display name for consistency with the type
      const enhancedProfile: AIProfile = {
        ...aiProfile,
        displayName: options.name,
        description: aiProfile.description || `AI companion with ${options.personality.type} personality.`,
        personality: options.personality, // make sure personality is object not string
      };

      setGeneratedModel(enhancedProfile);
      setProcessingStatus({
        status: ProcessingStatus.COMPLETED,
        progress: 100,
        message: 'Model generation completed successfully!',
        completedCount: 5,
        totalCount: 5
      });

      if (props?.onSuccess) {
        props.onSuccess(enhancedProfile);
      }

      return enhancedProfile;
    } catch (err: any) {
      console.error('Error generating AI model:', err);
      setError(err.message || 'An error occurred during model generation.');
      setProcessingStatus({
        status: ProcessingStatus.FAILED,
        progress: 0,
        message: err.message || 'Model generation failed.',
        completedCount: 0,
        totalCount: 5
      });
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, [props]);

  const cancelGeneration = useCallback(() => {
    setIsGenerating(false);
    setProcessingStatus({
      status: ProcessingStatus.FAILED,
      progress: 0,
      message: 'Model generation was cancelled.',
      completedCount: 0,
      totalCount: 5
    });
  }, []);

  const simulateStep = async (stage: string, current: number, total: number) => {
    setCurrentStage(stage);
    setProcessingStatus({
      status: ProcessingStatus.PROCESSING,
      progress: Math.floor(((current - 1) / total) * 100),
      message: `Processing: ${stage}`,
      completedCount: current - 1,
      totalCount: total
    });

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 800));

    const newProgress = Math.floor((current / total) * 100);
    setProgress(newProgress);
    setProcessingStatus({
      status: ProcessingStatus.PROCESSING,
      progress: newProgress,
      message: `Completed: ${stage}`,
      completedCount: current,
      totalCount: total
    });
  };

  return {
    isGenerating,
    progress,
    currentStage,
    processingStatus,
    error,
    generatedModel,
    generateModel,
    cancelGeneration
  };
};

export default useAIModelGenerator;

