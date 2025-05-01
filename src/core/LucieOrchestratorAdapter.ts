
import { lucie } from './Lucie';

/**
 * Adapter class to maintain compatibility with code that expects lucieOrchestrator
 * This maps calls to the new lucie instance structure
 */
export class LucieOrchestratorAdapter {
  async routePrompt(
    prompt: string, 
    userContext: { userId: string; [key: string]: any },
    conversationHistory?: Array<{ role: string, content: string }>
  ) {
    console.log("[LucieAdapter] Routing prompt through adapter:", prompt);
    
    try {
      const response = await lucie.generateContent({
        prompt,
        type: 'text',
        nsfw: false,
        userId: userContext.userId,
        strength: 0.7,
      });
      
      return {
        responseText: response.text || 'I could not generate a response.',
        tokensUsed: prompt.length,
        moderationPassed: true,
        flaggedContent: null,
        logId: `log_${Date.now()}_${userContext.userId}`,
        suggestedActions: [
          "Find escorts near me",
          "Browse creators",
          "Check wallet balance"
        ]
      };
    } catch (error) {
      console.error("Error routing prompt through adapter:", error);
      throw error;
    }
  }
  
  async orchestrateResponse(sessionId: string, userInput: string, userContext: any, conversationHistory: any) {
    return this.routePrompt(userInput, userContext, conversationHistory);
  }
  
  async logUsage(sessionId: string, tokensUsed: number) {
    console.log(`[Lucie] Logging usage for session ${sessionId} with tokens: ${tokensUsed}`);
  }
  
  async moderateContent(text: string) {
    const result = await lucie.moderateContent(text);
    return { passed: result.isSafe, flaggedTerms: result.blockedCategories };
  }
}

// Export singleton instance for backward compatibility
export const lucieOrchestrator = new LucieOrchestratorAdapter();
export default lucieOrchestrator;
