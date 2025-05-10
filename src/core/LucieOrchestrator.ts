
import { LucieAI, lucieAI } from './Lucie';

class LucieOrchestrator {
  private lucieInstance: LucieAI;
  
  constructor() {
    this.lucieInstance = lucieAI;
  }
  
  async isSafeContent(content: string): Promise<{ safe: boolean; reason?: string }> {
    try {
      const isSafe = await this.lucieInstance.verifyContentSafety(content);
      return {
        safe: isSafe,
        reason: isSafe ? undefined : 'Content violates safety guidelines'
      };
    } catch (error) {
      console.error("Error checking content safety:", error);
      return { 
        safe: false,
        reason: 'Error checking content safety'
      };
    }
  }
  
  async generateOptimizedResponse(prompt: string, options: any = {}): Promise<string> {
    const params = {
      prompt,
      options: {
        temperature: options.temperature || 0.7,
        maxTokens: options.maxTokens || 500
      }
    };
    
    try {
      const result = await this.lucieInstance.generateContent(params);
      return result.content;
    } catch (error) {
      console.error("Error generating response:", error);
      return "Sorry, I couldn't generate a response at this time.";
    }
  }
}

export const lucieOrchestrator = new LucieOrchestrator();
export default lucieOrchestrator;
