
import { useState } from 'react';
import { ProcessingStatus, ProcessingStatusData } from '@/types/ai-profile';

interface AIModelGeneratorOptions {
  onComplete?: (model: any) => void;
  onError?: (error: Error) => void;
}

export const useAIModelGenerator = (options?: AIModelGeneratorOptions) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState('');
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatusData>({
    status: ProcessingStatus.IDLE,
    completedCount: 0,
    totalCount: 0
  });
  const [error, setError] = useState<Error | null>(null);
  const [generatedModel, setGeneratedModel] = useState<any | null>(null);

  // Define stages of generation
  const stages = [
    'Initializing',
    'Generating personality',
    'Creating background story',
    'Designing appearance',
    'Building voice model',
    'Finalizing model'
  ];

  const generateModel = async (params: any) => {
    setIsGenerating(true);
    setProgress(0);
    setCurrentStage(stages[0]);
    setError(null);
    setGeneratedModel(null);
    setProcessingStatus({
      status: ProcessingStatus.PROCESSING,
      completedCount: 0,
      totalCount: stages.length,
      message: 'Starting model generation'
    });

    try {
      // Simulate the generation process through each stage
      for (let i = 0; i < stages.length; i++) {
        const stage = stages[i];
        setCurrentStage(stage);
        
        // Update progress
        const stageProgress = (i / stages.length) * 100;
        setProgress(stageProgress);
        
        // Update processing status
        setProcessingStatus(prevState => ({
          ...prevState,
          status: ProcessingStatus.PROCESSING,
          completedCount: i,
          totalCount: stages.length,
          message: `Processing stage: ${stage}`
        }));

        // Simulate processing time for this stage
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      // Once completed all stages, build the completed model
      const model = {
        id: `model-${Date.now()}`,
        name: params.name || 'AI Companion',
        personality: params.personality || 'friendly',
        created_at: new Date().toISOString(),
        status: 'active',
        ...params
      };

      setGeneratedModel(model);
      setProgress(100);
      setProcessingStatus(prevState => ({
        ...prevState,
        status: ProcessingStatus.COMPLETED,
        completedCount: stages.length,
        totalCount: stages.length,
        message: 'Model generation completed successfully'
      }));

      if (options?.onComplete) {
        options.onComplete(model);
      }

      return model;
    } catch (err: any) {
      const error = err instanceof Error ? err : new Error(err?.message || 'Unknown error');
      setError(error);
      setProcessingStatus(prevState => ({
        ...prevState,
        status: ProcessingStatus.FAILED,
        completedCount: 0,
        totalCount: stages.length,
        message: `Error: ${error.message}`
      }));

      if (options?.onError) {
        options.onError(error);
      }

      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  const cancelGeneration = () => {
    if (isGenerating) {
      setProcessingStatus(prevState => ({
        ...prevState,
        status: ProcessingStatus.CANCELLED,
        completedCount: 0,
        totalCount: stages.length,
        message: 'Model generation cancelled by user'
      }));
      setIsGenerating(false);
    }
  };

  return {
    isGenerating,
    progress,
    currentStage,
    processingStatus,
    error,
    generatedModel,
    generateModel,
    cancelGeneration,
    stages
  };
};

export default useAIModelGenerator;
