
import { AIModelPreference, AIProvider } from '@/types/ai';

interface Message {
  role: string;
  content: string;
}

class NSFWAIProviderService {
  private providers: Map<string, AIProvider>;

  constructor() {
    this.providers = new Map();
    // Initialize with some mock providers
    this.providers.set('openai', {
      name: 'OpenAI',
      models: ['gpt-4', 'gpt-3.5-turbo'],
      capabilities: {
        streaming: true,
        functionCalling: true,
        vision: true,
        audio: false
      }
    });
    
    this.providers.set('anthropic', {
      name: 'Anthropic',
      models: ['claude-2', 'claude-instant'],
      capabilities: {
        streaming: true,
        functionCalling: false,
        vision: false,
        audio: false
      }
    });
  }

  getProviderFromPreference(preference: AIModelPreference): AIProvider {
    // Determine which provider this model belongs to
    const providerName = preference.provider || this.detectProviderFromModel(preference.model);
    return this.providers.get(providerName) || {
      name: 'Unknown Provider',
      models: [],
      capabilities: {
        streaming: false,
        functionCalling: false,
        vision: false,
        audio: false
      }
    };
  }

  prepareMessageForProvider(
    messages: Message[], 
    provider: AIProvider, 
    systemPrompt?: string
  ): Record<string, any> {
    // Format the messages according to the provider's API
    const formattedMessages = [...messages];
    
    // Add system prompt if provided
    if (systemPrompt) {
      formattedMessages.unshift({
        role: 'system',
        content: systemPrompt
      });
    }
    
    return {
      messages: formattedMessages,
      provider: provider.name
    };
  }

  private detectProviderFromModel(model: string): string {
    if (model.startsWith('gpt')) return 'openai';
    if (model.startsWith('claude')) return 'anthropic';
    return 'unknown';
  }
}

export const nsfwAIProviderService = new NSFWAIProviderService();
