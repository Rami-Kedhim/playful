
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
  async generateContent(params: GenerateContentParams): Promise<string> {
    try {
      // Log the request (in a real system, this might go to analytics)
      console.log(`Content generation request: ${typeof params === 'string' ? 
        params.substring(0, 20) : params.prompt.substring(0, 20)}...`);
      
      // Handle string input for backward compatibility
      const formattedParams = typeof params === 'string' ? { prompt: params } : params;
      
      // Execute generation via Lucie
      const result = await lucieAI.generateContent(formattedParams);
      
      // Return the content string for simpler usage
      return result.content;
    } catch (error) {
      console.error('Content generation error:', error);
      return 'Sorry, I encountered an error while generating content.';
    }
  }
  
  /**
   * Check if content is safe to process
   */
  async isSafeContent(content: string, options?: any): Promise<boolean> {
    try {
      // Get moderation result
      const result = await this.moderateContent(content, options);
      
      // Content is safe if it's approved
      return result.isApproved;
    } catch (error) {
      console.error('Content safety check error:', error);
      return false; // Default to unsafe if there's an error
    }
  }
  
  /**
   * Run content moderation
   */
  async moderateContent(content: string, options?: any): Promise<ModerateContentResult> {
    try {
      // Get moderation result
      const result = await lucieAI.moderateContent(content, options);
      
      return result;
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
