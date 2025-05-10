
import { LucieAI } from './Lucie';

class LucieOrchestrator {
  private lucieAI: LucieAI;
  
  constructor() {
    this.lucieAI = new LucieAI();
  }
  
  async isSafeContent(content: string): Promise<{ safe: boolean; reason?: string }> {
    try {
      const isSafe = await this.lucieAI.verifyContentSafety(content);
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
      const result = await this.lucieAI.generateContent(params);
      return result.content;
    } catch (error) {
      console.error("Error generating response:", error);
      return "Sorry, I couldn't generate a response at this time.";
    }
  }
}

export const lucieOrchestrator = new LucieOrchestrator();
export default lucieOrchestrator;
