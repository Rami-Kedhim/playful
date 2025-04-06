
import { useState } from "react";
import { AIProfile } from "@/types/ai-profile";
import { AIModelGeneratorService } from "@/services/ai/aiModelGeneratorService";
import { toast } from "@/hooks/use-toast";

interface GenerationConfig {
  count: number;
  languages?: string[];
  regions?: string[];
  personalityTypes?: ('flirty' | 'shy' | 'dominant' | 'playful' | 'professional')[];
  ageRange?: {
    min: number;
    max: number;
  };
  targetDemographic?: string;
}

export function useAIModelGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedModels, setGeneratedModels] = useState<AIProfile[]>([]);
  const [processingStatus, setProcessingStatus] = useState({
    inProgress: false,
    completedCount: 0,
    totalCount: 0,
    estimatedCompletionTime: 0,
  });
  const [error, setError] = useState<string | null>(null);

  const generateModels = async (config: GenerationConfig): Promise<AIProfile[]> => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const models = await AIModelGeneratorService.generateModels(config);
      setGeneratedModels(models);
      
      toast({
        title: "Models Generated",
        description: `${models.length} AI models have been generated successfully.`,
      });
      
      return models;
    } catch (err: any) {
      setError(err.message || "Failed to generate AI models");
      
      toast({
        title: "Generation Failed",
        description: err.message || "An error occurred while generating AI models",
        variant: "destructive",
      });
      
      return [];
    } finally {
      setIsGenerating(false);
    }
  };

  const processModelsWithHermesOxum = async (models: AIProfile[]): Promise<boolean> => {
    setIsProcessing(true);
    setError(null);
    setProcessingStatus({
      inProgress: true,
      completedCount: 0,
      totalCount: models.length,
      estimatedCompletionTime: 0,
    });
    
    try {
      const result = await AIModelGeneratorService.submitToHermesOxum(models);
      
      setProcessingStatus({
        inProgress: true,
        completedCount: 0,
        totalCount: models.length,
        estimatedCompletionTime: result.estimatedCompletionTime,
      });
      
      // Simulate progress updates in a real application
      // This would be done with websockets or polling in a real app
      const interval = setInterval(() => {
        setProcessingStatus(prev => {
          const newCompletedCount = Math.min(
            prev.totalCount, 
            prev.completedCount + Math.floor(Math.random() * 3) + 1
          );
          
          const isComplete = newCompletedCount >= prev.totalCount;
          
          if (isComplete) {
            clearInterval(interval);
            setIsProcessing(false);
            
            toast({
              title: "Processing Complete",
              description: `${prev.totalCount} AI models have been processed and deployed.`,
            });
          }
          
          return {
            ...prev,
            inProgress: !isComplete,
            completedCount: newCompletedCount,
          };
        });
      }, 2000);
      
      return true;
    } catch (err: any) {
      setError(err.message || "Failed to process AI models");
      setProcessingStatus(prev => ({ ...prev, inProgress: false }));
      
      toast({
        title: "Processing Failed",
        description: err.message || "An error occurred while processing AI models",
        variant: "destructive",
      });
      
      return false;
    }
  };

  const generateContentForModel = async (profileId: string, contentTypes: ('photo' | 'video' | 'message')[]) => {
    try {
      return await AIModelGeneratorService.generateContent(profileId, contentTypes);
    } catch (err: any) {
      toast({
        title: "Content Generation Failed",
        description: err.message || "An error occurred while generating content",
        variant: "destructive",
      });
      return { success: false, generatedContent: [] };
    }
  };

  return {
    generateModels,
    processModelsWithHermesOxum,
    generateContentForModel,
    generatedModels,
    processingStatus,
    isGenerating,
    isProcessing,
    error
  };
}
