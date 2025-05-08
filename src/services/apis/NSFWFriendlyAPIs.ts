
/**
 * Collection of NSFW-friendly API services
 * These APIs have good free tiers and are generally permissive with content
 */

export const NSFWFriendlyAPIs = {
  imageGeneration: [
    {
      name: "Stable Diffusion API",
      url: "https://stablediffusionapi.com/",
      freeTier: "5 images per day",
      paidTier: "Starting at $10/month",
      notes: "Allows NSFW content with proper age verification"
    },
    {
      name: "NightCafe Creator API",
      url: "https://creator.nightcafe.studio/",
      freeTier: "5 credits daily",
      paidTier: "Starting at $5.99/month",
      notes: "Supports adult content with proper settings"
    },
    {
      name: "Hugging Face Inference API",
      url: "https://huggingface.co/docs/api-inference/",
      freeTier: "Limited rate",
      paidTier: "Pay per usage",
      notes: "Access to models like Stable Diffusion XL that can generate adult content"
    }
  ],
  videoGeneration: [
    {
      name: "Runway ML Gen-2",
      url: "https://runwayml.com/",
      freeTier: "Limited free tier",
      paidTier: "Starting at $12/month",
      notes: "Can generate suggestive content with some limitations"
    },
    {
      name: "Synthesia",
      url: "https://www.synthesia.io/",
      freeTier: "Trial available",
      paidTier: "Starting at $30/month",
      notes: "AI avatar videos - allows suggestive but not explicit content"
    }
  ],
  textGeneration: [
    {
      name: "NovelAI",
      url: "https://novelai.net/",
      freeTier: "None",
      paidTier: "Starting at $10/month",
      notes: "Specifically designed for creative fiction including adult content"
    },
    {
      name: "Perplexity API",
      url: "https://www.perplexity.ai/",
      freeTier: "Limited free access",
      paidTier: "Pro plans available",
      notes: "Can handle mature questions with proper content filtering"
    }
  ],
  contentModeration: [
    {
      name: "Friendly Captcha",
      url: "https://friendlycaptcha.com/",
      freeTier: "1,000 verifications per month",
      paidTier: "Starting at €9/month",
      notes: "Privacy-focused captcha to prevent spam"
    },
    {
      name: "SightEngine",
      url: "https://sightengine.com/",
      freeTier: "2,000 API calls per month",
      paidTier: "Starting at $29/month",
      notes: "Content moderation API that can identify but not block NSFW content"
    }
  ],
  ageVerification: [
    {
      name: "AgeChecked",
      url: "https://www.agechecked.com/",
      freeTier: "None",
      paidTier: "Custom pricing",
      notes: "Professional age verification service for adult sites"
    },
    {
      name: "Yoti",
      url: "https://www.yoti.com/",
      freeTier: "Limited",
      paidTier: "Custom pricing",
      notes: "Digital identity verification including age verification"
    }
  ],
  geolocation: [
    {
      name: "IP-API",
      url: "https://ip-api.com/",
      freeTier: "45 requests per minute",
      paidTier: "$15/month for commercial use",
      notes: "IP geolocation for compliance with regional restrictions"
    }
  ],
  payment: [
    {
      name: "CoinPayments",
      url: "https://www.coinpayments.net/",
      freeTier: "Basic features",
      paidTier: "0.5% transaction fee",
      notes: "Cryptocurrency payment gateway with good privacy"
    },
    {
      name: "CCBill",
      url: "https://ccbill.com/",
      freeTier: "None",
      paidTier: "Setup fee + transaction fees",
      notes: "Payment processor specifically for adult industries"
    }
  ],
  storage: [
    {
      name: "Bunny.net",
      url: "https://bunny.net/",
      freeTier: "Limited bandwidth",
      paidTier: "Pay as you go",
      notes: "Adult-friendly CDN and storage service"
    }
  ]
};

export default NSFWFriendlyAPIs;
