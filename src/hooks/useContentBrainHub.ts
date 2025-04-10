
import { useState, useEffect } from 'react';
import contentBrainHub from '@/services/content/ContentBrainHubService';

/**
 * Custom hook for using the Brain Hub content integration
 */
export const useContentBrainHub = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingError, setProcessingError] = useState<string | null>(null);
  
  /**
   * Process content through Brain Hub
   */
  const processContent = async <T extends {id: string, status: string, createdAt: Date}>(
    content: T[]
  ): Promise<T[]> => {
    try {
      setIsProcessing(true);
      setProcessingError(null);
      
      const processedContent = contentBrainHub.processContentItems(content);
      return processedContent;
    } catch (error: any) {
      const errorMessage = error?.message || 'Error processing content through Brain Hub';
      setProcessingError(errorMessage);
      return content;
    } finally {
      setIsProcessing(false);
    }
  };
  
  /**
   * Get intelligent renewal cost
   */
  const getIntelligentRenewalCost = (status: string, type: string): number => {
    return contentBrainHub.calculateOptimalRenewalCost(status, type);
  };
  
  /**
   * Record content interaction
   */
  const recordInteraction = (
    contentId: string,
    interactionType: 'view' | 'renew' | 'like' | 'share',
    userId?: string
  ): void => {
    contentBrainHub.recordContentInteraction(contentId, interactionType, userId);
  };
  
  return {
    processContent,
    getIntelligentRenewalCost,
    recordInteraction,
    isProcessing,
    processingError
  };
};
