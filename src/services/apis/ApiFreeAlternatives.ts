
/**
 * API Free Alternatives Registry
 * Lists free and freemium API services for various functionalities
 */

export const apiFreeAlternatives = {
  mapping: [
    {
      name: "Leaflet with OpenStreetMap",
      documentation: "https://leafletjs.com/",
      type: "Maps",
      pricingModel: "Free",
      usage: "Unlimited with attribution",
      implementation: "Use Leaflet.js with OpenStreetMap tiles"
    },
    {
      name: "OpenStreetMap Nominatim",
      documentation: "https://nominatim.org/",
      type: "Geocoding",
      pricingModel: "Free",
      usage: "1 request per second",
      implementation: "Direct API calls with proper attribution"
    },
    {
      name: "OSRM",
      documentation: "http://project-osrm.org/",
      type: "Routing",
      pricingModel: "Free",
      usage: "Limited for public API, unlimited if self-hosted",
      implementation: "Direct API calls or self-host the service"
    }
  ],
  
  imageGeneration: [
    {
      name: "Hugging Face Inference API",
      documentation: "https://huggingface.co/docs/api-inference/",
      type: "Image Generation",
      pricingModel: "Freemium",
      usage: "Limited free tier",
      implementation: "API calls via Edge Functions"
    },
    {
      name: "Replicate",
      documentation: "https://replicate.com/docs",
      type: "Image Generation",
      pricingModel: "Pay-per-use",
      usage: "Very affordable pricing",
      implementation: "API calls via Edge Functions"
    }
  ],
  
  textToSpeech: [
    {
      name: "ElevenLabs",
      documentation: "https://docs.elevenlabs.io/api-reference",
      type: "Text to Speech",
      pricingModel: "Freemium",
      usage: "10,000 characters free monthly",
      implementation: "API calls via Edge Functions"
    }
  ],
  
  translation: [
    {
      name: "LibreTranslate",
      documentation: "https://libretranslate.com/docs",
      type: "Translation",
      pricingModel: "Free",
      usage: "Self-hostable or limited free API",
      implementation: "Direct API calls or self-host"
    }
  ],
  
  moderationAndSafety: [
    {
      name: "OpenAI Moderation API",
      documentation: "https://platform.openai.com/docs/guides/moderation",
      type: "Content Moderation",
      pricingModel: "Free",
      usage: "Free for all OpenAI users",
      implementation: "API calls via Edge Functions"
    }
  ],
  
  geolocation: [
    {
      name: "IP-API",
      documentation: "https://ip-api.com/docs",
      type: "Geolocation",
      pricingModel: "Freemium",
      usage: "45 requests per minute free",
      implementation: "Direct API calls for non-commercial use"
    },
    {
      name: "ipapi.co",
      documentation: "https://ipapi.co/api/",
      type: "Geolocation",
      pricingModel: "Freemium",
      usage: "1,000 requests per day free",
      implementation: "Direct API calls"
    }
  ],
  
  fileStorage: [
    {
      name: "Supabase Storage",
      documentation: "https://supabase.com/docs/guides/storage",
      type: "File Storage",
      pricingModel: "Freemium",
      usage: "1GB storage free",
      implementation: "Use Supabase client"
    }
  ]
};

export default apiFreeAlternatives;
