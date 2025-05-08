import { lucieAI } from '@/core/Lucie';
import { 
  GenerateContentResult, 
  ModerateContentParams, 
  ModerateContentResult, 
  SentimentAnalysisResult 
} from '@/types/core-systems';

/**
 * Adapter for the Lucie AI system to orchestrate calls and handle responses
 */
export class LucieOrchestratorAdapter {
  /**
   * Generate content with predefined error handling
   */
  async generateContent(prompt: string, options: Record<string, any> = {}): Promise<string> {
    try {
      // Generate content using the Lucie system
      const result: GenerateContentResult = await lucieAI.generateContent(prompt, options);
      
      // Extract the content string from the result
      return result.content;
    } catch (error: any) {
      console.error('Error generating content with Lucie:', error);
      return `Sorry, I couldn't process that request. ${error.message || ''}`;
    }
  }
  
  /**
   * Check if content passes moderation
   */
  async isSafeContent(content: string, contentType: 'text' | 'image' | 'video' = 'text'): Promise<boolean> {
    try {
      const params: ModerateContentParams = {
        content,
        contentType,
        context: {}
      };
      
      const result: ModerateContentResult = await lucieAI.moderateContent(params);
      return result.safe;
    } catch (error) {
      console.error('Error checking content safety:', error);
      return false; // Default to unsafe if error occurs
    }
  }
  
  /**
   * Get detailed moderation results
   */
  async getContentModerationDetails(content: string, contentType: 'text' | 'image' | 'video' = 'text'): Promise<ModerateContentResult> {
    try {
      const params: ModerateContentParams = {
        content,
        contentType,
        context: {}
      };
      
      const result = await lucieAI.moderateContent(params);
      
      // Create a structured response with proper property access
      return {
        safe: result.safe,
        score: result.score,
        issues: result.issues || [],
        blockedCategories: result.blockedCategories || []
      };
    } catch (error) {
      console.error('Error in content moderation:', error);
      return {
        safe: false,
        score: 1.0,
        issues: ['Error processing moderation request'],
        blockedCategories: []
      };
    }
  }
  
  /**
   * Analyze sentiment of text
   */
  async analyzeSentiment(text: string): Promise<SentimentAnalysisResult> {
    try {
      return await lucieAI.analyzeSentiment(text);
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      return {
        score: 0,
        sentiment: 'neutral',
        confidence: 0
      };
    }
  }
}

// Export singleton instance
export const lucieOrchestrator = new LucieOrchestratorAdapter();
export default lucieOrchestrator;

// Make sure we export lucieAI if needed
export { lucieAI };
