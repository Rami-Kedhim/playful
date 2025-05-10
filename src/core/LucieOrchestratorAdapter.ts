
import { LucieAISystem, GenerateContentParams, GenerateContentResult, ModerateContentResult } from '@/types/core-systems';

/**
 * Adapter that orchestrates calls to LucieAI system
 */
export class LucieOrchestratorAdapter {
  private lucieAI: LucieAISystem;

  constructor(lucieAI: LucieAISystem) {
    this.lucieAI = lucieAI;
  }

  /**
   * Check if content is safe
   */
  public async isSafeContent(content: string): Promise<boolean> {
    try {
      // Safety check for empty or just whitespace content
      if (!content || content.trim() === '') {
        return true;
      }

      const truncatedContent = content.length > 1000 ? content.substring(0, 1000) + '...' : content;
      
      const result = await this.lucieAI.moderateContent({
        content: truncatedContent,
        strictness: 'medium'
      });

      // If no flags are triggered, content is safe
      return !result.flagged;
    } catch (error) {
      console.error('Error checking content safety:', error);
      // Default to safe in case of error to prevent blocking legitimate content
      return true;
    }
  }

  /**
   * Generate content with LucieAI
   */
  public async generateContent(params: GenerateContentParams): Promise<GenerateContentResult> {
    return await this.lucieAI.generateContent(params);
  }

  /**
   * Moderate content through LucieAI
   */
  public async moderateContent(content: string, strictness: 'low' | 'medium' | 'high' = 'medium'): Promise<ModerateContentResult> {
    try {
      const result = await this.lucieAI.moderateContent({
        content,
        strictness
      });
      
      return result;
    } catch (error) {
      console.error('Error moderating content:', error);
      return {
        flagged: true,
        reason: 'Error during content moderation'
      };
    }
  }

  /**
   * Analyze sentiment of text
   */
  public async analyzeSentiment(text: string): Promise<string> {
    try {
      const result = await this.lucieAI.analyzeSentiment({
        text
      });
      
      return result.sentiment;
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      return 'neutral';
    }
  }
}

export const lucieOrchestrator = new LucieOrchestratorAdapter(null as any); // This will be initialized properly in the index file
