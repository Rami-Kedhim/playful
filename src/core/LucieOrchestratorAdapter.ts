
import { 
  GenerateContentParams,
  GenerateContentResult,
  ModerateContentParams,
  ModerateContentResult,
  SentimentAnalysisParams,
  SentimentAnalysisResult
} from '@/types/core-systems';
import { lucieAI } from './Lucie';

/**
 * Adapter for Lucie AI system with middleware functionality
 */
export class LucieOrchestratorAdapter {
  /**
   * Process user input and generate content through Lucie AI
   */
  async generateContent(params: GenerateContentParams): Promise<GenerateContentResult> {
    try {
      // Log the request (in a real system, this might go to analytics)
      console.log(`Content generation request: ${params.prompt.substring(0, 20)}...`);
      
      // Execute generation via Lucie
      const result = await lucieAI.generateContent(params);
      
      // Post-process result if needed (e.g., add metadata)
      return {
        ...result,
        metadata: {
          ...result.metadata,
          processed: new Date().toISOString()
        }
      };
    } catch (error) {
      console.error('Content generation error:', error);
      return {
        content: 'Sorry, I encountered an error while generating content.',
        rating: 'G'
      };
    }
  }
  
  /**
   * Run content moderation
   */
  async moderateContent(content: string, options?: any): Promise<ModerateContentResult> {
    try {
      // Format params to match LucieAI interface
      const params: ModerateContentParams = {
        content,
        context: options?.context,
        strictness: options?.strictness || 1.0
      };
      
      // Get moderation result
      const result = await lucieAI.moderateContent(content, options);
      
      // Enhance result with category
      return {
        ...result,
        category: result.category || 'general'
      };
    } catch (error) {
      console.error('Content moderation error:', error);
      return {
        isApproved: false,
        score: 1.0,
        reason: 'Moderation system error'
      };
    }
  }
  
  /**
   * Analyze text sentiment
   */
  async analyzeSentiment(text: string): Promise<SentimentAnalysisResult> {
    try {
      // Format params to match LucieAI interface
      const params: SentimentAnalysisParams = {
        text
      };
      
      // Analyze sentiment
      return await lucieAI.analyzeSentiment(text);
    } catch (error) {
      console.error('Sentiment analysis error:', error);
      return {
        sentiment: 'neutral',
        score: 0,
        confidence: 0
      };
    }
  }
}

export const lucieOrchestrator = new LucieOrchestratorAdapter();
