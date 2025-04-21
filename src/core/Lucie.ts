
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
  // Forbidden keywords for boundary filtering
  private forbiddenKeywords = ['hack', 'exploit', 'attack', 'malware', 'virus'];

  // External API stubs, replace with real implementations
  private async callOpenRouter(prompt: string): Promise<{ data: string; tokens: number }> {
    // Placeholder call to OpenRouter
    console.debug(`[Lucie] Calling OpenRouter with prompt: ${prompt}`);
    return { data: `OpenRouter response for: ${prompt}`, tokens: prompt.length };
  }

  private async callElevenLabsTTS(text: string, voiceId?: string): Promise<Blob | null> {
    // Placeholder for ElevenLabs TTS call
    console.debug(`[Lucie] Calling ElevenLabs TTS for text: ${text.substring(0, 30)}...`);
    return null;
  }

  private async callReplicateModel(prompt: string, model: string): Promise<string> {
    // Placeholder for Replicate AI model call
    console.debug(`[Lucie] Calling Replicate with model ${model} and prompt: ${prompt}`);
    return `Replicate response for model ${model}`;
  }

  // Apply boundary filters for content or user input
  public applyBoundaryFilters(input: string, filters?: Record<string, any>): boolean {
    const forbidden = filters?.forbiddenKeywords || this.forbiddenKeywords;
    const lowerInput = input.toLowerCase();

    for (const word of forbidden) {
      if (lowerInput.includes(word)) {
        console.warn(`[Lucie] Input blocked due to forbidden keyword: ${word}`);
        return false; // Block content
      }
    }
    return true; // Content allowed
  }

  // Gradient ethical map for content evaluation: 1 fully ethical, 0 blocked
  public gradientEthicalMap(input: string): number {
    const allowed = this.applyBoundaryFilters(input);
    return allowed ? 1 : 0;
  }

  /**
   * Compose prompt with emotional and personality tone influence
   */
  private async composePromptWithEmotionAndPersonality(originalPrompt: string, personalityType?: string, characterId?: string): Promise<string> {
    let prompt = originalPrompt;

    // Retrieve emotional state from AI Personality Service if characterId provided
    let emotionalStateDescription = '';
    if (characterId) {
      try {
        const emotionalState = await AIPersonalityService.getEmotionalState(characterId);
        // Compose an emotional state summary to influence prompt tone
        emotionalStateDescription = `The character is currently feeling ${emotionalState.dominantEmotion} with intensity level ${emotionalState.intensityLevel}.`;
        prompt = `${emotionalStateDescription}\n${prompt}`;
        console.debug(`[Lucie] Composed prompt with emotional state: ${emotionalStateDescription}`);
      } catch (err) {
        console.warn("[Lucie] Failed to get emotional state for character", characterId, err);
      }
    }

    // Add personality type tone influence if available
    if (personalityType) {
      prompt = `Respond with a ${personalityType} personality tone.\n${prompt}`;
    }

    return prompt;
  }

  /**
   * Route prompt to AI providers, manage token deductions and logging
   * Implements the sovereign orchestration: token gating, moderation, and logging
   */
  public async routePrompt(
    prompt: string,
    context: RouteContext
  ): Promise<AiResponse> {
    console.info(`[Lucie] Routing prompt for user ${context.userId} with wallet ${context.walletId || 'N/A'}`);

    // 1. Apply boundary filters using the master list plus any extra filters
    const isAllowed = this.applyBoundaryFilters(prompt);
    if (!isAllowed) {
      console.warn(`[Lucie] Prompt blocked by boundary filters`);
      return {
        responseText: "Your input contains prohibited content and cannot be processed.",
        tokensUsed: 0,
        moderationPassed: false,
        flaggedContent: 'contains forbidden keywords',
      };
    }

    // 2. Moderate the prompt realtime (stub, replace with real moderation logic)
    // This would check profanity, source, user restrictions, etc.
    const moderationPassed = true; // Assume true for now

    if (!moderationPassed) {
      console.warn(`[Lucie] Prompt failed moderation`);
      return {
        responseText: "Your prompt was flagged during moderation and rejected.",
        tokensUsed: 0,
        moderationPassed: false,
      };
    }

    // 3. Compose prompt with emotional and personality influences
    const composedPrompt = await this.composePromptWithEmotionAndPersonality(prompt, context.personalityType, context.characterId);

    // 4. Calculate estimated tokens to be deducted (naive length)
    const estimatedTokens = Math.ceil(composedPrompt.length / 4); // Rough token estimate

    // 5. Deduct UBX from user wallet for the action if actionType and walletId specified
    const walletId = context.walletId;
    if (walletId && estimatedTokens > 0) {
      const costPerToken = 1; // For demo: 1 UBX per token
      const totalCost = estimatedTokens * costPerToken;

      console.debug(`[Lucie] Attempting to debit ${totalCost} UBX tokens from wallet ${walletId}`);

      // Attempt debit
      const debitSuccess = uberWallet.debit(walletId, totalCost, `AI prompt token deduction for action ${context.actionType || 'general'}`);

      if (!debitSuccess) {
        console.warn(`[Lucie] Insufficient UBX balance for wallet ${walletId} to cover ${totalCost} UBX tokens`);
        return {
          responseText: "Insufficient UBX balance to process your request. Please top-up your wallet.",
          tokensUsed: 0,
          moderationPassed: true,
        };
      }
      console.debug(`[Lucie] Debited ${totalCost} UBX from wallet ${walletId} for AI tokens`);
    }

    // 6. Route to AI backend (prefer OpenRouter, fallback to Replicate)
    let aiResponseText = '';
    let tokensUsed = estimatedTokens;
    try {
      const aiRouterResponse = await this.callOpenRouter(composedPrompt);
      aiResponseText = aiRouterResponse.data;
      tokensUsed = aiRouterResponse.tokens;
    } catch (err) {
      console.error('[Lucie] OpenRouter call failed, falling back to Replicate', err);
      aiResponseText = await this.callReplicateModel(composedPrompt, 'default-model');
      tokensUsed = composedPrompt.length; // fallback, rough tokens
    }

    // 7. Log this interaction with timestamp, wallet ID and purpose
    const logId = crypto.randomUUID();
    const timestamp = new Date().toISOString();
    console.info(`[Lucie] Logged AI prompt response ${logId} at ${timestamp} for wallet ${walletId || 'N/A'}, purpose: ${context.contentPurpose || 'general'}`);

    // 8. Optionally create voice/audio output (stub)
    // const audioBlob = await this.callElevenLabsTTS(aiResponseText);

    // 9. Return the AI response with tokens used and moderation status
    return {
      responseText: aiResponseText,
      tokensUsed,
      moderationPassed,
      logId,
    };
  }
}

export const lucie = new Lucie();

