
import { toast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { apiConfig } from '@/config/apiConfig';

// Common HTTP headers for API requests
const defaultHeaders = {
  'Content-Type': 'application/json'
};

// API Service module to handle all external API calls
export class ApiService {
  private static async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    try {
      const response = await fetch(url, {
        headers: {
          ...defaultHeaders,
          ...options.headers
        },
        ...options
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }
  
  /**
   * Generate an AI image using free-tier or edge function
   * Using Hugging Face's free tier or Replicate's affordable options
   */
  static async generateImage(prompt: string, options: {
    modelId?: string;
    width?: number;
    height?: number;
  } = {}): Promise<string | null> {
    try {
      // First try using Supabase Edge Function (preferred method for security)
      try {
        const { data, error } = await supabase.functions.invoke('generate-media', {
          body: {
            type: 'image',
            prompt,
            user_id: 'anonymous',
            options: {
              width: options.width || 512,
              height: options.height || 512,
            },
            modelId: options.modelId || 'black-forest-labs/FLUX.1-schnell'
          }
        });
        
        if (error) throw new Error(error.message);
        return data?.url || data;
      } catch (supabaseError) {
        console.log('Failed to use edge function, falling back to direct API', supabaseError);
        
        // Fallback to direct HuggingFace API (if we have a token in localStorage for development)
        const hfToken = localStorage.getItem('hf_api_token');
        if (hfToken) {
          const response = await fetch(
            `${apiConfig.imageGeneration.url}/models/stabilityai/stable-diffusion-xl-base-1.0`,
            {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${hfToken}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ inputs: prompt })
            }
          );
          
          if (!response.ok) throw new Error('Image generation failed');
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        }
        
        throw new Error('No image generation method available');
      }
    } catch (error) {
      console.error('Image generation failed:', error);
      toast({
        title: "Image Generation Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      return null;
    }
  }
  
  /**
   * Get location data from a free geolocation API (ipapi.co)
   */
  static async getLocationData(ipAddress?: string): Promise<any> {
    try {
      // Using ipapi.co which offers 1000 requests/day for free
      const url = ipAddress 
        ? `https://ipapi.co/${ipAddress}/json/` 
        : 'https://ipapi.co/json/';
        
      return await this.request(url);
    } catch (error) {
      console.error('Location lookup failed:', error);
      
      // Fallback to backup free service
      try {
        const backupUrl = 'https://freeipapi.com/api/json';
        return await this.request(backupUrl);
      } catch (backupError) {
        console.error('Backup location lookup failed:', backupError);
        return null;
      }
    }
  }
  
  /**
   * Get exchange rates for currency conversion
   * Using ExchangeRate-API's free tier
   */
  static async getExchangeRates(baseCurrency = 'USD'): Promise<any> {
    try {
      // Using ExchangeRate-API's free tier (limited requests)
      return await this.request(`https://open.er-api.com/v6/latest/${baseCurrency}`);
    } catch (error) {
      console.error('Exchange rate lookup failed:', error);
      
      // Fallback to backup free service
      try {
        const backupUrl = `https://api.exchangerate.host/latest?base=${baseCurrency}`;
        return await this.request(backupUrl);
      } catch (backupError) {
        console.error('Backup exchange rate lookup failed:', backupError);
        return null;
      }
    }
  }
  
  /**
   * Moderate content using OpenAI's free moderation API
   */
  static async moderateContent(text: string): Promise<{
    isSafe: boolean;
    categories: Record<string, number>;
  }> {
    try {
      // Call our edge function which will use OpenAI's moderation API (free)
      const { data, error } = await supabase.functions.invoke('moderate-content', {
        body: { text }
      });
      
      if (error) throw new Error(error.message);
      
      return data;
    } catch (error) {
      console.error('Content moderation failed:', error);
      return {
        isSafe: false,
        categories: {}
      };
    }
  }
  
  /**
   * Text to speech using ElevenLabs free tier
   * 10,000 characters per month free
   */
  static async textToSpeech(text: string, voice: string = 'default'): Promise<string | null> {
    try {
      // Use edge function for security
      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: { text, voice }
      });
      
      if (error) throw new Error(error.message);
      return data?.audioUrl || null;
    } catch (error) {
      console.error('Text to speech failed:', error);
      return null;
    }
  }
  
  /**
   * Free translation service using LibreTranslate
   */
  static async translateText(
    text: string, 
    sourceLang: string = 'auto', 
    targetLang: string = 'en'
  ): Promise<string | null> {
    try {
      const response = await fetch("https://libretranslate.de/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          q: text,
          source: sourceLang,
          target: targetLang,
          format: "text"
        })
      });
      
      if (!response.ok) throw new Error('Translation failed');
      
      const result = await response.json();
      return result.translatedText || null;
    } catch (error) {
      console.error('Translation failed:', error);
      return null;
    }
  }
  
  /**
   * Get profile information from user ID using internal database
   */
  static async getProfile(userId: string): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Profile lookup failed:', error);
      return null;
    }
  }
}

export default ApiService;
