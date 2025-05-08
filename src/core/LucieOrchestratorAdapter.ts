
import { lucieAI } from '@/core/Lucie';
import { 
  GenerateContentResult, 
  ModerateContentParams, 
  ModerateContentResult, 
  SentimentAnalysisResult,
  SentimentAnalysisParams,
  GenerateContentParams
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
      // Create params object for lucieAI
      const params: GenerateContentParams = {
        prompt,
        options
      };
      
      // Use generateContent from lucieAI
      const result: GenerateContentResult = await lucieAI.generateContent(params);
      
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
        type: contentType
      };
      
      const result: ModerateContentResult = await lucieAI.moderateContent(params);
      return result.isSafe || result.safe || false; // Check both properties
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
        type: contentType,
      };
      
      const result = await lucieAI.moderateContent(params);
      
      return result;
    } catch (error) {
      console.error('Error in content moderation:', error);
      return {
        isSafe: false,
        safe: false,
        score: 1.0,
        issues: ['Error processing moderation request'],
        blockedCategories: [],
        category: 'error',
        action: 'block'
      };
    }
  }
  
  /**
   * Analyze sentiment of text
   */
  async analyzeSentiment(text: string): Promise<SentimentAnalysisResult> {
    try {
      return await lucieAI.analyzeSentiment({ text });
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

// Export lucieAI for backward compatibility
export { lucieAI };
