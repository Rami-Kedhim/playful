
import { useState } from "react";
import { AIProfile } from "@/types/ai-profile";
import { AIModelGeneratorService } from "@/services/ai/aiModelGeneratorService";
import { toast } from "@/hooks/use-toast";
import { AIAnalyticsService } from "@/services/ai/aiAnalyticsService"; // Import analytics service

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

interface OptimizationMetrics {
  conversionRate: number;
  engagementScore: number;
  recommendedChanges: string[];
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
  const [optimizationMetrics, setOptimizationMetrics] = useState<OptimizationMetrics | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateModels = async (config: GenerationConfig): Promise<AIProfile[]> => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const models = await AIModelGeneratorService.generateModels(config);
      setGeneratedModels(models);
      
      // Track generation event with analytics
      models.forEach(model => {
        AIAnalyticsService.trackEvent(
          model.id,
          'ai_model_generated',
          { 
            personality: model.personality.type,
            region: model.region,
            language: model.language
          }
        );
      });
      
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
            
            // Get optimization metrics after processing
            fetchOptimizationMetrics();
            
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
      const result = await AIModelGeneratorService.generateContent(profileId, contentTypes);
      
      // Track content generation analytics
      if (result.success) {
        AIAnalyticsService.trackEvent(
          profileId, 
          'content_generated',
          { 
            contentTypes,
            count: result.generatedContent.length 
          }
        );
      }
      
      return result;
    } catch (err: any) {
      toast({
        title: "Content Generation Failed",
        description: err.message || "An error occurred while generating content",
        variant: "destructive",
      });
      return { success: false, generatedContent: [] };
    }
  };
  
  // Method to fetch optimization metrics for AI models
  const fetchOptimizationMetrics = async () => {
    try {
      const metrics = await AIModelGeneratorService.getOptimizationMetrics();
      setOptimizationMetrics(metrics);
    } catch (err: any) {
      console.error("Failed to fetch optimization metrics:", err);
    }
  };

  return {
    generateModels,
    processModelsWithHermesOxum,
    generateContentForModel,
    fetchOptimizationMetrics,
    generatedModels,
    processingStatus,
    optimizationMetrics,
    isGenerating,
    isProcessing,
    error
  };
}
