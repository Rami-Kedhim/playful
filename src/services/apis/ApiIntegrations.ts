
import { neuralHub } from '../neural/HermesOxumNeuralHub';

/**
 * API Integration Service
 * Provides a unified interface to interact with external APIs
 */
export class ApiIntegrationService {
  private apis: Record<string, ApiProvider> = {};

  constructor() {
    // Register the API providers
    this.registerApiProvider('huggingface', new HuggingFaceProvider());
    this.registerApiProvider('elevenlabs', new ElevenLabsProvider());
    this.registerApiProvider('openai', new OpenAIProvider());
    this.registerApiProvider('geolocation', new GeolocationProvider());
    this.registerApiProvider('moderation', new ModerationProvider());
    this.registerApiProvider('translation', new TranslationProvider());
  }

  /**
   * Register a new API provider
   */
  public registerApiProvider(name: string, provider: ApiProvider): void {
    this.apis[name] = provider;
    
    // Also register with the neural hub
    neuralHub.registerModule(`api_${name}`, provider);
  }

  /**
   * Get an API provider by name
   */
  public getApiProvider(name: string): ApiProvider | null {
    return this.apis[name] || null;
  }

  /**
   * Execute an API request
   */
  public async executeApiRequest(
    providerName: string, 
    endpoint: string, 
    data: any, 
    options: any = {}
  ): Promise<any> {
    const provider = this.getApiProvider(providerName);
    
    if (!provider) {
      throw new Error(`API provider '${providerName}' not found`);
    }
    
    return await provider.execute(endpoint, data, options);
  }
  
  /**
   * Check if an API provider is available
   */
  public isApiAvailable(providerName: string): boolean {
    const provider = this.getApiProvider(providerName);
    return provider ? provider.isAvailable() : false;
  }
  
  /**
   * Get configuration for an API provider
   */
  public getApiConfig(providerName: string): any {
    const provider = this.getApiProvider(providerName);
    return provider ? provider.getConfig() : null;
  }
}

/**
 * Interface for API providers
 */
interface ApiProvider {
  execute(endpoint: string, data: any, options?: any): Promise<any>;
  isAvailable(): boolean;
  getConfig(): any;
}

/**
 * HuggingFace API Provider
 */
class HuggingFaceProvider implements ApiProvider {
  private apiKey: string | null = null;
  private baseUrl = 'https://api-inference.huggingface.co/models';
  
  constructor() {
    // Try to get API key from environment
    this.apiKey = ''; // Would be from environment in production
  }
  
  public async execute(model: string, data: any, options: any = {}): Promise<any> {
    try {
      if (!this.apiKey) {
        return { success: false, error: 'API key not configured' };
      }
      
      const response = await fetch(`${this.baseUrl}/${model}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HuggingFace API error: ${response.statusText}`);
      }
      
      // Handle different response types
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else if (contentType && contentType.includes('image')) {
        const blob = await response.blob();
        return URL.createObjectURL(blob);
      } else {
        return await response.text();
      }
    } catch (error) {
      console.error('HuggingFace API error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
  
  public isAvailable(): boolean {
    return !!this.apiKey;
  }
  
  public getConfig(): any {
    return {
      available: this.isAvailable(),
      baseUrl: this.baseUrl,
      recommendedModels: {
        textGeneration: 'gpt2',
        imageGeneration: 'stabilityai/stable-diffusion-xl-base-1.0',
        textToImage: 'runwayml/stable-diffusion-v1-5'
      }
    };
  }
}

/**
 * ElevenLabs API Provider
 */
class ElevenLabsProvider implements ApiProvider {
  private apiKey: string | null = null;
  private baseUrl = 'https://api.elevenlabs.io/v1';
  
  constructor() {
    // Try to get API key from environment
    this.apiKey = ''; // Would be from environment in production
  }
  
  public async execute(endpoint: string, data: any, options: any = {}): Promise<any> {
    try {
      if (!this.apiKey) {
        return { success: false, error: 'API key not configured' };
      }
      
      const url = endpoint.startsWith('http') ? endpoint : `${this.baseUrl}/${endpoint}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'xi-api-key': this.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.statusText}`);
      }
      
      // Handle audio blob response for text-to-speech
      if (endpoint.includes('text-to-speech')) {
        const audioBlob = await response.blob();
        return URL.createObjectURL(audioBlob);
      } else {
        return await response.json();
      }
    } catch (error) {
      console.error('ElevenLabs API error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
  
  public isAvailable(): boolean {
    return !!this.apiKey;
  }
  
  public getConfig(): any {
    return {
      available: this.isAvailable(),
      baseUrl: this.baseUrl,
      voiceOptions: [
        { id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel' },
        { id: 'AZnzlk1XvdvUeBnXmlld', name: 'Domi' },
        { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Bella' },
        { id: 'ErXwobaYiN019PkySvjV', name: 'Antoni' }
      ]
    };
  }
}

/**
 * OpenAI API Provider
 */
class OpenAIProvider implements ApiProvider {
  private apiKey: string | null = null;
  private baseUrl = 'https://api.openai.com/v1';
  
  constructor() {
    // Try to get API key from environment
    this.apiKey = ''; // Would be from environment in production
  }
  
  public async execute(endpoint: string, data: any, options: any = {}): Promise<any> {
    try {
      if (!this.apiKey) {
        return { success: false, error: 'API key not configured' };
      }
      
      const url = endpoint.startsWith('http') ? endpoint : `${this.baseUrl}/${endpoint}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('OpenAI API error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
  
  public isAvailable(): boolean {
    return !!this.apiKey;
  }
  
  public getConfig(): any {
    return {
      available: this.isAvailable(),
      baseUrl: this.baseUrl,
      recommendedModels: {
        chat: 'gpt-4o-mini',
        moderation: 'text-moderation-latest'
      }
    };
  }
}

/**
 * Geolocation API Provider (Abstract API)
 */
class GeolocationProvider implements ApiProvider {
  private apiKey: string | null = null;
  private baseUrl = 'https://ipgeolocation.abstractapi.com/v1';
  
  constructor() {
    // Try to get API key from environment
    this.apiKey = ''; // Would be from environment in production
  }
  
  public async execute(endpoint: string, data: { ipAddress?: string }, options: any = {}): Promise<any> {
    try {
      if (!this.apiKey) {
        return { success: false, error: 'API key not configured' };
      }
      
      const ipAddress = data.ipAddress || '';
      const url = `${this.baseUrl}/?api_key=${this.apiKey}&ip_address=${ipAddress}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Geolocation API error: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Geolocation API error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
  
  public isAvailable(): boolean {
    return !!this.apiKey;
  }
  
  public getConfig(): any {
    return {
      available: this.isAvailable(),
      baseUrl: this.baseUrl,
      freeLimit: '20,000 requests/month'
    };
  }
}

/**
 * Content Moderation API Provider (using OpenAI's moderation API)
 */
class ModerationProvider implements ApiProvider {
  private apiKey: string | null = null;
  private baseUrl = 'https://api.openai.com/v1/moderations';
  
  constructor() {
    // Try to get API key from environment - uses the same key as OpenAI
    this.apiKey = ''; // Would be from environment in production
  }
  
  public async execute(_endpoint: string, data: { input: string | string[] }, options: any = {}): Promise<any> {
    try {
      if (!this.apiKey) {
        return { success: false, error: 'API key not configured' };
      }
      
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`Moderation API error: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Moderation API error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
  
  public isAvailable(): boolean {
    return !!this.apiKey;
  }
  
  public getConfig(): any {
    return {
      available: this.isAvailable(),
      baseUrl: this.baseUrl,
      categories: [
        'hate', 'hate/threatening', 'harassment', 'self-harm', 'sexual',
        'sexual/minors', 'violence', 'violence/graphic'
      ]
    };
  }
}

/**
 * Translation API Provider (LibreTranslate)
 */
class TranslationProvider implements ApiProvider {
  private apiKey: string | null = null;
  private baseUrl = 'https://libretranslate.com';
  
  constructor() {
    // LibreTranslate can be used without an API key with limitations
    this.apiKey = ''; // Optional API key
  }
  
  public async execute(_endpoint: string, data: { 
    q: string;
    source?: string;
    target: string;
  }, options: any = {}): Promise<any> {
    try {
      const requestData = {
        q: data.q,
        source: data.source || 'auto',
        target: data.target
      };
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      
      if (this.apiKey) {
        headers['Authorization'] = `Bearer ${this.apiKey}`;
      }
      
      const response = await fetch(`${this.baseUrl}/translate`, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestData),
      });
      
      if (!response.ok) {
        throw new Error(`Translation API error: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Translation API error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
  
  public isAvailable(): boolean {
    return true; // Can be used without API key
  }
  
  public getConfig(): any {
    return {
      available: true,
      baseUrl: this.baseUrl,
      supportedLanguages: [
        'en', 'ar', 'zh', 'fr', 'de', 'hi', 'id', 'ga', 'it', 'ja', 'ko', 'pl', 
        'pt', 'ru', 'es', 'tr', 'vi'
      ]
    };
  }
}

// Export singleton instance
export const apiIntegration = new ApiIntegrationService();
