
/**
 * Recommended Free/Freemium APIs for the UberCore Ecosystem
 * 
 * This file catalogs APIs that can be integrated into the application
 * to enhance functionality without significant costs.
 */

export const recommendedApis = {
  imageGeneration: [
    {
      name: "Hugging Face Inference API",
      endpoint: "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
      documentation: "https://huggingface.co/docs/api-inference/",
      freeUsage: "Limited free tier available",
      implementation: `
// Example implementation using Hugging Face for image generation
const generateImage = async (prompt: string): Promise<string> => {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": \`Bearer \${HF_API_KEY}\`
      },
      body: JSON.stringify({ inputs: prompt }),
    }
  );
  
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};`
    },
    {
      name: "Replicate",
      endpoint: "https://api.replicate.com/v1/predictions",
      documentation: "https://replicate.com/docs",
      freeUsage: "Pay-per-use, very affordable",
      implementation: `
// Example implementation using Replicate for image generation
const generateImage = async (prompt: string): Promise<string> => {
  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": \`Token \${REPLICATE_API_KEY}\`
    },
    body: JSON.stringify({
      version: "stable-diffusion-xl-1024-v1-0",
      input: { prompt }
    })
  });
  
  const prediction = await response.json();
  return prediction.output;
};`
    }
  ],
  
  textToSpeech: [
    {
      name: "ElevenLabs",
      endpoint: "https://api.elevenlabs.io/v1/text-to-speech/{voice_id}",
      documentation: "https://docs.elevenlabs.io/api-reference",
      freeUsage: "10,000 characters free monthly",
      implementation: `
// Example implementation using ElevenLabs for text-to-speech
const generateSpeech = async (text: string, voiceId: string = "EXAVITQu4vr4xnSDxMaL"): Promise<string> => {
  const response = await fetch(\`https://api.elevenlabs.io/v1/text-to-speech/\${voiceId}\`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": ELEVEN_LABS_API_KEY
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

  const audioBlob = await response.blob();
  return URL.createObjectURL(audioBlob);
};`
    }
  ],
  
  contentModeration: [
    {
      name: "OpenAI Moderation API",
      endpoint: "https://api.openai.com/v1/moderations",
      documentation: "https://platform.openai.com/docs/guides/moderation",
      freeUsage: "Free for all OpenAI users",
      implementation: `
// Example implementation using OpenAI Moderation API
const moderateContent = async (text: string): Promise<boolean> => {
  const response = await fetch("https://api.openai.com/v1/moderations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": \`Bearer \${OPENAI_API_KEY}\`
    },
    body: JSON.stringify({ input: text })
  });
  
  const result = await response.json();
  return !result.results[0].flagged;
};`
    }
  ],
  
  geolocation: [
    {
      name: "IP Geolocation API",
      endpoint: "https://ipgeolocation.abstractapi.com/v1/",
      documentation: "https://www.abstractapi.com/api/ip-geolocation-api",
      freeUsage: "20,000 requests per month free",
      implementation: `
// Example implementation using IP Geolocation API
const getLocationFromIP = async (ipAddress: string): Promise<any> => {
  const response = await fetch(
    \`https://ipgeolocation.abstractapi.com/v1/?api_key=\${ABSTRACT_API_KEY}&ip_address=\${ipAddress}\`
  );
  
  return await response.json();
};`
    }
  ],
  
  languageTranslation: [
    {
      name: "LibreTranslate",
      endpoint: "https://libretranslate.com/translate",
      documentation: "https://libretranslate.com/docs",
      freeUsage: "Self-hostable, or limited free API",
      implementation: `
// Example implementation using LibreTranslate API
const translateText = async (
  text: string, 
  sourceLang: string = "auto", 
  targetLang: string = "en"
): Promise<string> => {
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
  
  const result = await response.json();
  return result.translatedText;
};`
    }
  ]
};

export default recommendedApis;
