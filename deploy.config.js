
module.exports = {
  // Application name
  app: 'uberescorts',
  
  // Environment configurations
  environments: {
    production: {
      url: 'https://uberescorts.com',
      cloudProvider: 'aws',
      region: 'us-east-1',
      scaling: {
        min: 2,
        max: 10,
        desired: 3
      }
    },
    staging: {
      url: 'https://staging.uberescorts.com',
      cloudProvider: 'aws',
      region: 'us-east-1',
      scaling: {
        min: 1,
        max: 3,
        desired: 1
      }
    }
  },
  
  // API Providers configuration for production
  apis: {
    maps: {
      provider: 'leaflet',  // Free OpenStreetMap
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    },
    imageGeneration: {
      provider: 'huggingface',  // Freemium API with free tier
      models: {
        safe: 'black-forest-labs/FLUX.1-schnell',
        nsfw: 'stablediffusionapi/realistic-vision-v5'
      }
    },
    contentModeration: {
      provider: 'openai',  // Free for OpenAI users
      endpoint: 'moderations'
    },
    textToSpeech: {
      provider: 'elevenlabs',  // Freemium with 10k chars/month
      voices: {
        female: 'EXAVITQu4vr4xnSDxMaL', // Bella
        male: 'ErXwobaYiN019PkySvjV'     // Antoni
      }
    },
    translation: {
      provider: 'libretranslate',  // Free and open source
      supportedLanguages: ['en', 'es', 'fr', 'de', 'it']
    }
  },
  
  // Deployment settings
  deployment: {
    buildCommand: 'npm run build',
    outputDir: 'dist',
    cache: {
      headers: [
        {
          pattern: '**/*.{js,css,png,jpg,jpeg,gif,webp,svg,woff,woff2,ttf,eot}',
          headers: {
            'Cache-Control': 'public,max-age=31536000,immutable'
          }
        }
      ]
    }
  },
  
  // CDN configuration for assets
  cdn: {
    enabled: true,
    domain: 'assets.uberescorts.com'
  }
};
