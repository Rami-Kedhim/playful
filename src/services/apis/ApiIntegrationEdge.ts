
import { supabase } from "@/integrations/supabase/client";
import { neuralHub } from '../neural/HermesOxumNeuralHub';

/**
 * API Integration Service
 * Uses Supabase Edge Functions for secure API calls
 */
export class ApiIntegrationEdgeService {
  private apis: Record<string, ApiProviderConfig> = {
    huggingface: {
      name: 'Hugging Face',
      available: false,
      baseUrl: 'https://api-inference.huggingface.co/models',
      recommendedModels: {
        textGeneration: 'gpt2',
        imageGeneration: 'stabilityai/stable-diffusion-xl-base-1.0',
        textToImage: 'runwayml/stable-diffusion-v1-5'
      }
    },
    elevenlabs: {
      name: 'ElevenLabs',
      available: false,
      baseUrl: 'https://api.elevenlabs.io/v1',
      voiceOptions: [
        { id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel' },
        { id: 'AZnzlk1XvdvUeBnXmlld', name: 'Domi' },
        { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Bella' },
        { id: 'ErXwobaYiN019PkySvjV', name: 'Antoni' }
      ]
    },
    openai: {
      name: 'OpenAI',
      available: false,
      baseUrl: 'https://api.openai.com/v1',
      recommendedModels: {
        chat: 'gpt-4o-mini',
        moderation: 'text-moderation-latest'
      }
    },
    geolocation: {
      name: 'IP Geolocation',
      available: false,
      baseUrl: 'https://ipgeolocation.abstractapi.com/v1',
      freeLimit: '20,000 requests/month'
    },
    moderation: {
      name: 'Content Moderation',
      available: false,
      baseUrl: 'https://api.openai.com/v1/moderations',
      categories: [
        'hate', 'hate/threatening', 'harassment', 'self-harm', 'sexual',
        'sexual/minors', 'violence', 'violence/graphic'
      ]
    },
    translation: {
      name: 'LibreTranslate',
      available: true, // Always available as it doesn't require an API key
      baseUrl: 'https://libretranslate.com',
      supportedLanguages: [
        'en', 'ar', 'zh', 'fr', 'de', 'hi', 'id', 'ga', 'it', 'ja', 'ko', 'pl', 
        'pt', 'ru', 'es', 'tr', 'vi'
      ]
    }
  };

  constructor() {
    // Register with the neural hub
    Object.keys(this.apis).forEach(apiName => {
      neuralHub.registerModule(`api_${apiName}`, {
        name: apiName,
        config: this.apis[apiName],
        handleRequest: async (request: any) => {
          return await this.executeApiRequest(apiName, request.endpoint || '', request.data || {});
        }
      });
    });
    
    // Initialize API status
    this.checkApiStatus();
  }
  
  /**
   * Check status of all APIs
   */
  public async checkApiStatus(): Promise<void> {
    try {
      // Call edge function to get API status
      const { data, error } = await supabase.functions.invoke('external-api', {
        body: { 
          provider: 'status', 
          action: 'check' 
        }
      });
      
      if (error) {
        console.error('Error checking API status:', error);
        return;
      }
      
      if (data && data.status) {
        // Update local availability status
        Object.keys(data.status).forEach(provider => {
          if (this.apis[provider]) {
            this.apis[provider].available = data.status[provider];
          }
        });
      }
    } catch (error) {
      console.error('Error checking API status:', error);
    }
  }

  /**
   * Execute an API request via Supabase Edge Function
   */
  public async executeApiRequest(
    provider: string, 
    endpoint: string, 
    data: any, 
    options: any = {}
  ): Promise<any> {
    try {
      const { data: responseData, error } = await supabase.functions.invoke('external-api', {
        body: {
          provider,
          endpoint,
          data,
          options
        }
      });
      
      if (error) {
        console.error(`API error (${provider}):`, error);
        throw new Error(error.message || `Error calling ${provider} API`);
      }
      
      return responseData;
    } catch (error) {
      console.error(`API request error (${provider}):`, error);
      throw error;
    }
  }
  
  /**
   * Check if an API provider is available
   */
  public isApiAvailable(provider: string): boolean {
    return this.apis[provider]?.available || false;
  }
  
  /**
   * Get configuration for an API provider
   */
  public getApiConfig(provider: string): any {
    return this.apis[provider] || null;
  }
  
  /**
   * Set API configuration
   */
  public setApiConfig(provider: string, config: Partial<ApiProviderConfig>): void {
    if (this.apis[provider]) {
      this.apis[provider] = { ...this.apis[provider], ...config };
    }
  }
  
  /**
   * Set API availability
   */
  public setApiAvailability(provider: string, available: boolean): void {
    if (this.apis[provider]) {
      this.apis[provider].available = available;
    }
  }
  
  /**
   * Get all API providers and their status
   */
  public getAllApiProviders(): Record<string, ApiProviderConfig> {
    return { ...this.apis };
  }
}

/**
 * API Provider Configuration
 */
interface ApiProviderConfig {
  name: string;
  available: boolean;
  baseUrl: string;
  [key: string]: any;
}

// Export singleton instance
export const apiIntegrationEdge = new ApiIntegrationEdgeService();
