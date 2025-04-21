
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
}

interface AiResponse {
  responseText: string;
  tokensUsed: number;
  moderationPassed: boolean;
  flaggedContent?: string;
  logId?: string;
}

/**
 * Lucie AI orchestrator enhanced with emotion and token gating
 */
export class Lucie {
  private forbiddenKeywords = ['hack', 'exploit', 'attack', 'malware', 'virus'];

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

    // 8. Optionally create voice/audio output (stub)
    // const audioBlob = await this.callElevenLabsTTS(aiResponseText);

    // 9. Return AI response with tokens used and moderation status
    return {
      responseText: aiResponseText,
      tokensUsed,
      moderationPassed,
      logId,
    };
  }
}

export const lucieOrchestrator = new Lucie();

export default lucieOrchestrator;
