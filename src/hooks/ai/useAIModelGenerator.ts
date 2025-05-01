
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  AIModelGenerationParams,
  AIModelGenerationResult,
  ProcessingStatus
} from '@/types/ai-profile';

export const useAIModelGenerator = () => {
  const [generationResults, setGenerationResults] = useState<AIModelGenerationResult[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentResult, setCurrentResult] = useState<AIModelGenerationResult | null>(null);
  const { toast } = useToast();

  const startGeneration = useCallback(async (params: AIModelGenerationParams) => {
    setIsGenerating(true);
    
    try {
      // Create initial result with IDLE status
      const newResult: AIModelGenerationResult = {
        id: `gen-${Date.now()}`,
        name: params.name || 'Generated Profile',
        status: ProcessingStatus.IDLE,
        createdAt: new Date().toISOString(),
        progress: 0
      };
      
      setCurrentResult(newResult);
      setGenerationResults(prev => [...prev, newResult]);
      
      // Update to processing
      const updatedResult = {
        ...newResult,
        status: ProcessingStatus.PROCESSING
      };
      
      setCurrentResult(updatedResult);
      setGenerationResults(prev => 
        prev.map(r => r.id === newResult.id ? updatedResult : r)
      );
      
      // Simulate progressive updates
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 5) + 5;
        
        if (progress >= 100) {
          clearInterval(interval);
          progress = 100;
          
          // Complete generation
          const finalResult: AIModelGenerationResult = {
            ...updatedResult,
            status: ProcessingStatus.COMPLETED,
            progress: 100,
            completedAt: new Date().toISOString(),
            avatarUrl: 'https://picsum.photos/400/400', // Placeholder
            profileData: {
              name: params.name || 'AI Persona',
              type: params.type || 'companion',
              traits: params.traits || ['friendly', 'caring', 'intelligent'],
              personality: params.personality || ['outgoing', 'empathetic'],
              description: params.description || 'Your AI companion'
            }
          };
          
          setCurrentResult(finalResult);
          setGenerationResults(prev => 
            prev.map(r => r.id === newResult.id ? finalResult : r)
          );
          
          toast({
            title: "AI Profile Generated",
            description: `${finalResult.name} has been successfully created!`
          });
        } else {
          // Update progress
          const progressUpdate = {
            ...updatedResult,
            progress
          };
          
          setCurrentResult(progressUpdate);
          setGenerationResults(prev => 
            prev.map(r => r.id === newResult.id ? progressUpdate : r)
          );
        }
      }, 800);
      
      return newResult.id;
    } catch (error) {
      console.error('AI generation error:', error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating the AI profile.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, [toast]);

  return {
    generationResults,
    currentResult,
    isGenerating,
    startGeneration
  };
};

export default useAIModelGenerator;
