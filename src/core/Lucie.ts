
// Enhanced Lucie AI orchestrator for AI flow, token gating, moderation, and logging

import { uberWallet } from './UberWallet';
import AIPersonalityService from '@/services/ai/aiPersonalityService';

interface RouteContext {
  userId: string;
  walletId?: string;
  actionType?: string;
  contentPurpose?: string;
  personalityType?: string;
  characterId?: string;
  [key: string]: any;
}

interface AiResponse {
  responseText: string;
  tokensUsed: number;
  moderationPassed: boolean;
  flaggedContent?: string;
  logId?: string;
  emotion?: string;
  suggestedActions?: string[];
  links?: { text: string; url: string }[];
  visualElements?: {
    type: 'image' | 'chart' | 'map';
    data: any;
  }[];
}

/**
 * Lucie AI orchestrator enhanced with emotion and token gating
 */
export class Lucie {
  private forbiddenKeywords = ['hack', 'exploit', 'attack', 'malware', 'virus'];
  private emotionMap = new Map<string, string[]>([
    ['happy', ['exciting', 'good news', 'congratulations', 'happy', 'excited']],
    ['concerned', ['sorry', 'unfortunately', 'issue', 'problem', 'worried', 'concern']],
    ['thinking', ['analyzing', 'considering', 'let me think', 'interesting', 'hmm']],
    ['confused', ['not sure', 'unclear', 'complex', 'difficult to say']],
    ['friendly', ['hello', 'hi', 'welcome', 'thank you', 'appreciate']]
  ]);

  private async callOpenRouter(prompt: string): Promise<{ data: string; tokens: number }> {
    console.debug(`[Lucie] Calling OpenRouter with prompt: ${prompt}`);
    // TODO: Replace with real API call to OpenRouter
    // Simulate async response
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ data: `OpenRouter response for: ${prompt}`, tokens: prompt.length });
      }, 500);
    });
  }

  private async callElevenLabsTTS(text: string, voiceId?: string): Promise<Blob | null> {
    console.debug(`[Lucie] Calling ElevenLabs TTS for text: ${text.substring(0, 30)}...`);
    // TODO: Implement ElevenLabs TTS call
    return null;
  }

  private async callReplicateModel(prompt: string, model: string): Promise<string> {
    console.debug(`[Lucie] Calling Replicate with model ${model} and prompt: ${prompt}`);
    // TODO: Implement Replicate model call
    return `Replicate response for model ${model}`;
  }

  public applyBoundaryFilters(input: string, filters?: Record<string, any>): boolean {
    const forbidden = filters?.forbiddenKeywords || this.forbiddenKeywords;
    const lowerInput = input.toLowerCase();

    for (const word of forbidden) {
      if (lowerInput.includes(word)) {
        console.warn(`[Lucie] Input blocked due to forbidden keyword: ${word}`);
        return false;
      }
    }
    return true;
  }

  public gradientEthicalMap(input: string): number {
    return this.applyBoundaryFilters(input) ? 1 : 0;
  }

  private detectEmotion(text: string): string {
    const lowerText = text.toLowerCase();
    
    for (const [emotion, keywords] of this.emotionMap.entries()) {
      for (const keyword of keywords) {
        if (lowerText.includes(keyword)) {
          return emotion;
        }
      }
    }
    
    return 'neutral';
  }

  private async composePromptWithEmotionAndPersonality(originalPrompt: string, personalityType?: string, characterId?: string): Promise<string> {
    let prompt = originalPrompt;

    let emotionalStateDescription = '';
    if (characterId) {
      try {
        const emotionalState = await AIPersonalityService.getEmotionalState(characterId);
        emotionalStateDescription = `The character is currently feeling ${emotionalState.dominantEmotion} with intensity level ${emotionalState.intensityLevel}.`;
        prompt = `${emotionalStateDescription}\n${prompt}`;
        console.debug(`[Lucie] Composed prompt with emotional state: ${emotionalStateDescription}`);
      } catch (err) {
        console.warn(`[Lucie] Failed to get emotional state for character ${characterId}`, err);
      }
    }
    if (personalityType) {
      prompt = `Respond with a ${personalityType} personality tone.\n${prompt}`;
    }
    return prompt;
  }

  public async routePrompt(prompt: string, context: RouteContext): Promise<AiResponse> {
    console.info(`[Lucie] Routing prompt for user ${context.userId} with wallet ${context.walletId || 'N/A'}`);

    // 1. Apply boundary filters
    if (!this.applyBoundaryFilters(prompt)) {
      console.warn(`[Lucie] Prompt blocked by boundary filters`);
      return {
        responseText: "Your input contains prohibited content and cannot be processed.",
        tokensUsed: 0,
        moderationPassed: false,
        flaggedContent: "contains forbidden keywords",
        emotion: "concerned"
      };
    }

    // 2. Moderate prompt - stub (always pass)
    const moderationPassed = true;

    if (!moderationPassed) {
      console.warn(`[Lucie] Prompt failed moderation`);
      return {
        responseText: "Your prompt was flagged during moderation and rejected.",
        tokensUsed: 0,
        moderationPassed: false,
        emotion: "concerned"
      };
    }

    // 3. Compose prompt with emotional and personality influence
    const composedPrompt = await this.composePromptWithEmotionAndPersonality(prompt, context.personalityType, context.characterId);

    // 4. Estimate tokens (length / 4)
    const estimatedTokens = Math.ceil(composedPrompt.length / 4);

    // 5. Deduct UBX tokens if wallet and action provided
    const walletId = context.walletId;
    if (walletId && estimatedTokens > 0) {
      const costPerToken = 1;
      const totalCost = estimatedTokens * costPerToken;
      console.debug(`[Lucie] Attempting to debit ${totalCost} UBX tokens from wallet ${walletId}`);

      const debitSuccess = uberWallet.debit(walletId, totalCost, `AI prompt token deduction for action ${context.actionType || 'general'}`);

      if (!debitSuccess) {
        console.warn(`[Lucie] Insufficient UBX balance for wallet ${walletId}`);
        return {
          responseText: "Insufficient UBX balance to process your request. Please top-up your wallet.",
          tokensUsed: 0,
          moderationPassed: true,
          emotion: "concerned"
        };
      }
      console.debug(`[Lucie] Debited ${totalCost} UBX from wallet ${walletId} for AI tokens`);
    }

    // 6. Call AI backend (OpenRouter preferred, fallback to Replicate)
    let aiResponseText = '';
    let tokensUsed = estimatedTokens;

    try {
      const openRouterResponse = await this.callOpenRouter(composedPrompt);
      aiResponseText = openRouterResponse.data;
      tokensUsed = openRouterResponse.tokens;
    } catch (err) {
      console.error(`[Lucie] OpenRouter call failed, falling back to Replicate`, err);
      aiResponseText = await this.callReplicateModel(composedPrompt, 'default-model');
      tokensUsed = composedPrompt.length;
    }

    // 7. Log interaction
    const logId = crypto.randomUUID();
    const timestamp = new Date().toISOString();
    console.info(`[Lucie] Logged AI prompt response ${logId} at ${timestamp} for wallet ${walletId || 'N/A'}, purpose: ${context.contentPurpose || 'general'}`);

    // 8. Detect emotion from response
    const emotion = this.detectEmotion(aiResponseText);

    // 9. Generate suggested actions based on content
    const suggestedActions = this.generateSuggestedActions(prompt, aiResponseText);

    // 10. Generate relevant links if applicable
    const links = this.generateLinks(prompt, aiResponseText);
    
    // 11. Generate visual elements if needed
    const visualElements = this.generateVisualElements(prompt, aiResponseText);

    // 12. Return enhanced AI response
    return {
      responseText: aiResponseText,
      tokensUsed,
      moderationPassed,
      logId,
      emotion,
      suggestedActions,
      links,
      visualElements
    };
  }

  private generateSuggestedActions(prompt: string, response: string): string[] {
    const lowerPrompt = prompt.toLowerCase();
    
    // Default suggestions
    const defaultSuggestions = ["Find escorts near me", "Browse creators", "Check wallet balance"];
    
    // Context-aware suggestions
    if (lowerPrompt.includes('escort') || lowerPrompt.includes('book')) {
      return ["View popular escorts", "Filter by service", "Show verified only"];
    }
    
    if (lowerPrompt.includes('creator') || lowerPrompt.includes('content')) {
      return ["Browse top creators", "See latest posts", "Subscribe"];
    }
    
    if (lowerPrompt.includes('wallet') || lowerPrompt.includes('pay') || lowerPrompt.includes('money')) {
      return ["Check balance", "Add funds", "View transaction history"];
    }
    
    return defaultSuggestions;
  }
  
  private generateLinks(prompt: string, response: string): { text: string; url: string }[] | undefined {
    const lowerPrompt = prompt.toLowerCase();
    
    // Only generate links for relevant queries
    if (lowerPrompt.includes('help') || lowerPrompt.includes('support')) {
      return [
        { text: "Support Center", url: "/support" },
        { text: "FAQ", url: "/faq" }
      ];
    }
    
    if (lowerPrompt.includes('terms') || lowerPrompt.includes('privacy')) {
      return [
        { text: "Terms of Service", url: "/terms" },
        { text: "Privacy Policy", url: "/privacy" }
      ];
    }
    
    // Don't add links if not relevant
    return undefined;
  }
  
  private generateVisualElements(prompt: string, response: string): { type: 'image' | 'chart' | 'map'; data: any }[] | undefined {
    const lowerPrompt = prompt.toLowerCase();
    
    // Examples of when to generate visual elements
    if (lowerPrompt.includes('map') || lowerPrompt.includes('location') || lowerPrompt.includes('near me')) {
      return [
        { 
          type: 'map', 
          data: { 
            latitude: 40.7128, 
            longitude: -74.0060,
            zoom: 12
          } 
        }
      ];
    }
    
    if (lowerPrompt.includes('statistics') || lowerPrompt.includes('chart') || lowerPrompt.includes('data')) {
      return [
        { 
          type: 'chart', 
          data: {
            type: 'bar',
            labels: ['Jan', 'Feb', 'Mar', 'Apr'],
            values: [12, 19, 8, 15]
          } 
        }
      ];
    }
    
    // Don't add visual elements if not relevant
    return undefined;
  }
}

export const lucieOrchestrator = new Lucie();

export default lucieOrchestrator;
