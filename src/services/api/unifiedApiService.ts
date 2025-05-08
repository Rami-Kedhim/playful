
import recommendedApis from './recommended-apis';

/**
 * UnifiedApiService - Centralized service for integrating with affordable external APIs
 * Uses the recommended free/freemium APIs from our catalog
 */
export class UnifiedApiService {
  private static instance: UnifiedApiService;
  private apiKeys: Record<string, string> = {};
  
  private constructor() {
    this.loadApiKeys();
  }
  
  public static getInstance(): UnifiedApiService {
    if (!UnifiedApiService.instance) {
      UnifiedApiService.instance = new UnifiedApiService();
    }
    return UnifiedApiService.instance;
  }
  
  private loadApiKeys(): void {
    // In a real app, these would be loaded from secure storage
    // For now, we'll check localStorage as a fallback for development
    try {
      const storedKeys = localStorage.getItem('ubx_api_keys');
      if (storedKeys) {
        this.apiKeys = JSON.parse(storedKeys);
      }
    } catch (error) {
      console.error('Failed to load API keys:', error);
    }
  }
  
  public setApiKey(service: string, key: string): void {
    this.apiKeys[service] = key;
    // Store in localStorage for development purposes only
    // In production, this should use a secure mechanism
    try {
      localStorage.setItem('ubx_api_keys', JSON.stringify(this.apiKeys));
    } catch (error) {
      console.error('Failed to save API key:', error);
    }
  }
  
  /**
   * Generate an image using a free/affordable image generation API
   */
  public async generateImage(prompt: string): Promise<string> {
    const key = this.apiKeys['huggingface'] || process.env.HUGGING_FACE_API_KEY;
    
    if (!key) {
      throw new Error('No API key configured for image generation');
    }
    
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${key}`
          },
          body: JSON.stringify({ inputs: prompt }),
        }
      );
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }
      
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Image generation failed:', error);
      throw error;
    }
  }
  
  /**
   * Convert text to speech using ElevenLabs API
   */
  public async textToSpeech(
    text: string, 
    voiceId: string = "EXAVITQu4vr4xnSDxMaL"
  ): Promise<string> {
    const key = this.apiKeys['elevenlabs'] || process.env.ELEVEN_LABS_API_KEY;
    
    if (!key) {
      throw new Error('No API key configured for text-to-speech');
    }
    
    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": key
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_monolingual_v1",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        })
      });
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }
      
      const audioBlob = await response.blob();
      return URL.createObjectURL(audioBlob);
    } catch (error) {
      console.error('Text-to-speech generation failed:', error);
      throw error;
    }
  }
  
  /**
   * Moderate content using OpenAI's free moderation API
   */
  public async moderateContent(text: string): Promise<{safe: boolean, issues?: string[]}> {
    const key = this.apiKeys['openai'] || process.env.OPENAI_API_KEY;
    
    if (!key) {
      throw new Error('No API key configured for content moderation');
    }
    
    try {
      const response = await fetch("https://api.openai.com/v1/moderations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${key}`
        },
        body: JSON.stringify({ input: text })
      });
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      // Extract flagged categories if any
      const flagged = result.results[0].flagged;
      const categories = result.results[0].categories;
      
      const issues = flagged ? 
        Object.keys(categories).filter(cat => categories[cat]) : 
        [];
        
      return {
        safe: !flagged,
        issues: issues.length > 0 ? issues : undefined
      };
    } catch (error) {
      console.error('Content moderation failed:', error);
      throw error;
    }
  }
  
  /**
   * Get geolocation information from an IP address
   */
  public async getLocationFromIP(ipAddress: string): Promise<any> {
    const key = this.apiKeys['abstractapi'] || process.env.ABSTRACT_API_KEY;
    
    if (!key) {
      throw new Error('No API key configured for geolocation');
    }
    
    try {
      const response = await fetch(
        `https://ipgeolocation.abstractapi.com/v1/?api_key=${key}&ip_address=${ipAddress}`
      );
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Geolocation lookup failed:', error);
      throw error;
    }
  }
  
  /**
   * Translate text using LibreTranslate API
   */
  public async translateText(
    text: string,
    sourceLang: string = "auto",
    targetLang: string = "en"
  ): Promise<string> {
    try {
      // LibreTranslate doesn't require an API key for self-hosted instances
      const response = await fetch("https://libretranslate.com/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          q: text,
          source: sourceLang,
          target: targetLang
        })
      });
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      return result.translatedText;
    } catch (error) {
      console.error('Translation failed:', error);
      throw error;
    }
  }
}

export const unifiedApiService = UnifiedApiService.getInstance();
export default unifiedApiService;
