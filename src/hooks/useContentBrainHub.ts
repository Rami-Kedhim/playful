
import { useCallback } from 'react';
import { ContentBrainHubService, ContentOptimizationParams, ContentAnalysisResult } from '@/services/content/ContentBrainHubService';
import { useToast } from '@/hooks/use-toast';

export interface UseContentBrainHubProps {
  optimizeContent: (params: ContentOptimizationParams) => Promise<string>;
  analyzeContent: (content: string, contentType: string) => Promise<ContentAnalysisResult>;
  calculateRenewalValue: (engagement: any, contentType: string, history: any) => Promise<number>;
  predictRenewalTime: (contentId: string, contentType: string, engagement: number) => Promise<Date>;
  recordInteraction: (contentId: string, interactionType: string, metadata?: any) => Promise<boolean>;
  processContent: (content: any[]) => Promise<any[]>;
  getIntelligentRenewalCost: (status: string, contentType: string) => number;
}

export const useContentBrainHub = (): UseContentBrainHubProps => {
  const { toast } = useToast();

  // Optimize content using the brain hub
  const optimizeContent = useCallback(async (params: ContentOptimizationParams): Promise<string> => {
    try {
      const result = await ContentBrainHubService.optimizeContent(params);
      return result;
    } catch (error) {
      console.error('Error optimizing content:', error);
      toast({
        title: 'Optimization failed',
        description: 'Failed to optimize content. Please try again.',
        variant: 'destructive'
      });
      return params.content; // Return original content on error
    }
  }, [toast]);

  // Analyze content and provide feedback
  const analyzeContent = useCallback(async (content: string, contentType: string): Promise<ContentAnalysisResult> => {
    try {
      const result = await ContentBrainHubService.analyzeContent(content, contentType);
      return result;
    } catch (error) {
      console.error('Error analyzing content:', error);
      toast({
        title: 'Analysis failed',
        description: 'Failed to analyze content. Please try again.',
        variant: 'destructive'
      });
      return {
        score: 0,
        strengths: [],
        weaknesses: ['Analysis failed due to a system error'],
        suggestions: ['Try again later']
      };
    }
  }, [toast]);

  // Calculate renewal value based on engagement metrics
  const calculateRenewalValue = useCallback(async (engagement: any, contentType: string, history: any): Promise<number> => {
    try {
      const value = await ContentBrainHubService.calculateRenewalValue(engagement, contentType, history);
      return value;
    } catch (error) {
      console.error('Error calculating renewal value:', error);
      return 0;
    }
  }, []);

  // Predict optimal renewal time for content
  const predictRenewalTime = useCallback(async (contentId: string, contentType: string, engagement: number): Promise<Date> => {
    try {
      const date = await ContentBrainHubService.predictRenewalTime(contentId, contentType, engagement);
      return date;
    } catch (error) {
      console.error('Error predicting renewal time:', error);
      // Default to 7 days from now
      const defaultTime = new Date();
      defaultTime.setDate(defaultTime.getDate() + 7);
      return defaultTime;
    }
  }, []);

  // Record content interaction for better recommendations
  const recordInteraction = useCallback(async (contentId: string, interactionType: string, metadata?: any): Promise<boolean> => {
    try {
      const success = await ContentBrainHubService.recordContentInteraction(
        contentId,
        'system',
        interactionType,
        metadata || {}
      );
      return success;
    } catch (error) {
      console.error('Error recording interaction:', error);
      return false;
    }
  }, []);

  // Process content through Brain Hub for enhanced metadata
  const processContent = useCallback(async (content: any[]): Promise<any[]> => {
    try {
      return await ContentBrainHubService.processContent(content);
    } catch (error) {
      console.error('Error processing content:', error);
      return content;
    }
  }, []);

  // Get intelligent renewal cost based on content status and type
  const getIntelligentRenewalCost = useCallback((status: string, contentType: string): number => {
    // Base costs for different types of content
    const baseCosts = {
      image: 5,
      video: 10,
      text: 3,
      audio: 7
    };
    
    // Apply status-based adjustments
    const statusMultipliers = {
      expired: 1.5,  // Higher cost to renew expired content
      expiring: 1.2, // Slightly higher for soon-to-expire
      active: 1.0    // Normal price for active content
    };
    
    // Default values if not found
    const basePrice = baseCosts[contentType as keyof typeof baseCosts] || 5;
    const multiplier = statusMultipliers[status as keyof typeof statusMultipliers] || 1.0;
    
    // Calculate and round to nearest whole number
    return Math.round(basePrice * multiplier);
  }, []);

  return {
    optimizeContent,
    analyzeContent,
    calculateRenewalValue,
    predictRenewalTime,
    recordInteraction,
    processContent,
    getIntelligentRenewalCost
  };
};
