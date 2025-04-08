import { brainHub } from '@/services/neural/HermesOxumBrainHub';
import { AIModelPreference } from '@/hooks/ai-lucie/useBrainHubAIContext';

export interface NSFWAIProvider {
  id: string;
  name: string;
  apiEndpoint: string;
  modelId: string;
  maxTokens: number;
  temperature: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  nsfwAllowed: boolean;
  supportsImages: boolean;
  supportedCapabilities: string[];
  cost: number;
}

// Registry of AI providers
const aiProviders: NSFWAIProvider[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    apiEndpoint: 'https://api.openai.com/v1/chat/completions',
    modelId: 'gpt-4o',
    maxTokens: 2000,
    temperature: 0.7,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
    nsfwAllowed: false,
    supportsImages: true,
    supportedCapabilities: ['text', 'images', 'chat', 'function-calling'],
    cost: 0.01
  },
  {
    id: 'nomi',
    name: 'Nomi.AI',
    apiEndpoint: 'https://api.nomi.ai/chat',
    modelId: 'nomi-unleashed',
    maxTokens: 4000,
    temperature: 0.9,
    nsfwAllowed: true,
    supportsImages: true,
    supportedCapabilities: ['text', 'chat', 'nsfw', 'roleplay'],
    cost: 0.005
  },
  {
    id: 'koboldai',
    name: 'KoboldAI',
    apiEndpoint: 'https://api.kobold.ai/v1/generate',
    modelId: 'pygmalion-13b',
    maxTokens: 2048,
    temperature: 0.8,
    topP: 0.9,
    nsfwAllowed: true,
    supportsImages: false,
    supportedCapabilities: ['text', 'chat', 'nsfw', 'roleplay', 'storytelling'],
    cost: 0.0025
  },
  {
    id: 'openrouter',
    name: 'OpenRouter',
    apiEndpoint: 'https://openrouter.ai/api/v1/chat/completions',
    modelId: 'mythomax',
    maxTokens: 4096,
    temperature: 0.8,
    nsfwAllowed: true,
    supportsImages: false,
    supportedCapabilities: ['text', 'chat', 'nsfw', 'storytelling'],
    cost: 0.003
  }
];

export class NSFWAIProviderService {
  private static instance: NSFWAIProviderService;

  private constructor() {
    console.log('NSFWAIProviderService initialized');
  }

  public static getInstance(): NSFWAIProviderService {
    if (!NSFWAIProviderService.instance) {
      NSFWAIProviderService.instance = new NSFWAIProviderService();
    }
    return NSFWAIProviderService.instance;
  }

  /**
   * Get all available AI providers
   */
  public getProviders(): NSFWAIProvider[] {
    return aiProviders;
  }

  /**
   * Get a specific provider by ID
   */
  public getProviderById(id: string): NSFWAIProvider | undefined {
    return aiProviders.find(provider => provider.id === id);
  }

  /**
   * Get appropriate provider based on content requirements
   */
  public getProviderForContent(requiresNSFW: boolean): NSFWAIProvider {
    // Process through Brain Hub to apply regional and other filters
    const brainHubConfig = brainHub.getConfig();
    
    // If geo-legal filtering is enabled, ensure compliance
    if (brainHubConfig.geoLegalFilteringEnabled) {
      // Force compliance by using only safe providers
      if (requiresNSFW) {
        console.log('NSFW content requested but geo-legal filtering is enabled, using safe provider');
      }
      return this.getProviderById('openai') || aiProviders[0];
    }
    
    // Otherwise, select based on NSFW requirement
    if (requiresNSFW) {
      // Find first provider that allows NSFW
      const nsfwProvider = aiProviders.find(p => p.nsfwAllowed);
      return nsfwProvider || aiProviders[0];
    }
    
    // Default to OpenAI for non-NSFW content
    return this.getProviderById('openai') || aiProviders[0];
  }

  /**
   * Get provider based on model preference from Brain Hub AI Context
   */
  public getProviderFromPreference(preference: AIModelPreference): NSFWAIProvider {
    const provider = this.getProviderById(preference.provider);
    
    if (provider) {
      // Create a customized instance of the provider
      return {
        ...provider,
        modelId: preference.model,
        temperature: preference.temperature,
        maxTokens: preference.maxTokens
      };
    }
    
    // Fallback to default
    return aiProviders[0];
  }

  /**
   * Prepare a message for processing by the specified provider
   */
  public prepareMessageForProvider(
    messages: Array<{role: string; content: string}>,
    provider: NSFWAIProvider,
    systemPrompt?: string
  ) {
    // Add system prompt if provided
    const finalMessages = [...messages];
    
    if (systemPrompt && !messages.find(m => m.role === 'system')) {
      finalMessages.unshift({
        role: 'system',
        content: systemPrompt
      });
    }
    
    // Format based on provider requirements
    switch(provider.id) {
      case 'openai':
      case 'openrouter':
        // Already in the correct format
        return {
          messages: finalMessages,
          model: provider.modelId,
          max_tokens: provider.maxTokens,
          temperature: provider.temperature,
          top_p: provider.topP || 1
        };
      
      case 'nomi':
        // Format for Nomi API
        return {
          messages: finalMessages,
          model: provider.modelId,
          temperature: provider.temperature,
          max_tokens: provider.maxTokens,
          nsfw_allowed: provider.nsfwAllowed
        };
        
      case 'koboldai':
        // Format for KoboldAI API
        const prompt = finalMessages
          .map(m => `${m.role === 'system' ? 'System: ' : m.role === 'user' ? 'User: ' : 'Assistant: '}${m.content}`)
          .join('\n');
          
        return {
          prompt,
          max_length: provider.maxTokens,
          temperature: provider.temperature,
          top_p: provider.topP || 0.9
        };
        
      default:
        return {
          messages: finalMessages,
          model: provider.modelId,
          max_tokens: provider.maxTokens,
          temperature: provider.temperature
        };
    }
  }
}

export const nsfwAIProviderService = NSFWAIProviderService.getInstance();
export default nsfwAIProviderService;
