
import { useState, useCallback } from 'react';
import { generateAIProfile } from '@/services/generateAIProfile';
import { AIProfile, ProcessingStatus, ProcessingStatusDetails } from '@/types/ai-profile';

interface GenerateModelOptions {
  name: string;
  personality: { type: string; traits?: string[] }; // personality is object type now
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
      message: { type: options.personality.type, traits: options.personality.traits || [] }, // this should be object here, not string
      completedCount: 0,
      totalCount: 5
    });

    try {
      // Simulate steps with progress
      await simulateStep('Creating personality profile', 1, 5);
      await simulateStep('Generating appearance preferences', 2, 5);
      await simulateStep('Training voice patterns', 3, 5);
      await simulateStep('Building interaction patterns', 4, 5);
      await simulateStep('Finalizing model', 5, 5);

      // We must provide full AIProfileGeneratorOptions as expected by generateAIProfile
      const aiProfile = await generateAIProfile({
        name: options.name,
        personality: options.personality,
        gender: "female", // example default
        age: 25,
        bio: "",
        avatarUrl: "",
        location: "",
        interests: [],
        isVerified: false,
        createdAt: new Date().toISOString(),
        category: "AI Companion",
        rating: 0,
        reviewCount: 0,
        price: 0,
        isPremium: false,
        availabilityStatus: "available",
      });

      // Use normalized property keys consistent with AIProfile
      const enhancedProfile: AIProfile = {
        ...aiProfile,
        displayName: options.name,
        description: aiProfile.description || `AI companion with ${options.personality.type} personality.`,
        personality: options.personality, // keep as object
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

    // Simulate processing delay
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

