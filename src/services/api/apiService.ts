
import { toast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

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
   * Generate an AI image using Hugging Face API via Supabase Edge Function
   */
  static async generateImage(prompt: string, options: {
    modelId?: string;
    width?: number;
    height?: number;
  } = {}): Promise<string | null> {
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
   * Get location data from a free geolocation API
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
      return null;
    }
  }
  
  /**
   * Get exchange rates for currency conversion
   */
  static async getExchangeRates(baseCurrency = 'USD'): Promise<any> {
    try {
      // Using ExchangeRate-API's free tier (limited requests)
      return await this.request(`https://open.er-api.com/v6/latest/${baseCurrency}`);
    } catch (error) {
      console.error('Exchange rate lookup failed:', error);
      return null;
    }
  }
  
  /**
   * Moderate content using free content moderation API
   */
  static async moderateContent(text: string): Promise<{
    isSafe: boolean;
    categories: Record<string, number>;
  }> {
    try {
      // Call our edge function which will use OpenAI's moderation API
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
