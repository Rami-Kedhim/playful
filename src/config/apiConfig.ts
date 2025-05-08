
/**
 * API Configuration for UberCore Ecosystem
 * Prioritizes free/freemium services with generous usage tiers
 */
export const apiConfig = {
  maps: {
    provider: 'leaflet', // Using Leaflet with OpenStreetMap as base
    apiKey: '', // No API key needed for basic OpenStreetMap
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  },
  geolocation: {
    provider: 'ipapi',
    url: 'https://ipapi.co/json/',
    freeLimit: '1000 requests/day'
  },
  imageGeneration: {
    provider: 'huggingface',
    url: 'https://api-inference.huggingface.co',
    freeLimit: 'Limited free tier available'
  },
  textToSpeech: {
    provider: 'elevenlabs',
    url: 'https://api.elevenlabs.io/v1',
    freeLimit: '10,000 characters free monthly'
  },
  contentModeration: {
    provider: 'openai',
    url: 'https://api.openai.com/v1/moderations',
    freeLimit: 'Free for all OpenAI users'
  },
  translation: {
    provider: 'libretranslate',
    url: 'https://libretranslate.com',
    freeLimit: 'Self-hostable, or limited free API'
  }
}

export default apiConfig;
