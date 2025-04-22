import { AIProfile } from '@/types/ai-profile';

// The Hermes+Oxum system combines cultural context (Hermes) with linguistic diversity (Oxum)
// to rapidly generate large volumes of specialized AI models

interface GenerationOptions {
  count: number;
  regions?: string[];
  languages?: string[];
  personalityTypes?: Array<'flirty' | 'shy' | 'dominant' | 'playful' | 'professional'>;
  minAge?: number;
  maxAge?: number;
  interests?: string[];
  includeVerified?: boolean;
}

// Regional data for cultural context
const REGIONAL_DATA = {
  "North America": {
    locations: ["New York", "Miami", "Los Angeles", "Chicago", "Toronto", "Vancouver", "Mexico City"],
    languages: ["en", "es", "fr"],
    commonInterests: ["Hiking", "Movies", "Fine Dining", "Shopping", "Travel"]
  },
  "Europe": {
    locations: ["London", "Paris", "Berlin", "Madrid", "Rome", "Amsterdam", "Vienna"],
    languages: ["en", "fr", "de", "es", "it"],
    commonInterests: ["Art", "History", "Fashion", "Wine Tasting", "Coffee"]
  },
  "Asia": {
    locations: ["Tokyo", "Seoul", "Bangkok", "Singapore", "Hong Kong", "Shanghai", "Mumbai"],
    languages: ["en", "ja", "ko", "zh", "th"],
    commonInterests: ["Anime", "K-Pop", "Technology", "Photography", "Street Food"]
  },
  "Latin America": {
    locations: ["Rio de Janeiro", "Buenos Aires", "Bogotá", "Lima", "Santiago", "Havana"],
    languages: ["es", "pt", "en"],
    commonInterests: ["Dancing", "Music", "Beach", "Football", "Cooking"]
  },
  "Middle East": {
    locations: ["Dubai", "Istanbul", "Tel Aviv", "Cairo", "Doha"],
    languages: ["en", "ar", "tr"],
    commonInterests: ["Luxury Shopping", "Desert Adventures", "Business", "Cultural Events"]
  },
  "Australia/Oceania": {
    locations: ["Sydney", "Melbourne", "Auckland", "Brisbane", "Perth"],
    languages: ["en"],
    commonInterests: ["Surfing", "Beach Life", "Outdoor Activities", "Wildlife"]
  }
};

export const LANGUAGE_CODES = {
  "en": "English",
  "es": "Spanish",
  "fr": "French",
  "de": "German",
  "it": "Italian",
  "pt": "Portuguese",
  "ja": "Japanese",
  "ko": "Korean",
  "zh": "Chinese",
  "ar": "Arabic",
  "th": "Thai",
  "tr": "Turkish",
  "ru": "Russian",
  "nl": "Dutch"
};

// Generate AI profiles with regional context
export async function generateRegionalAIProfiles(region: string, count: number): Promise<AIProfile[]> {
  const regionData = REGIONAL_DATA[region as keyof typeof REGIONAL_DATA] || REGIONAL_DATA["North America"];
  
  const options: GenerationOptions = {
    count,
    regions: regionData.locations,
    languages: regionData.languages,
    interests: regionData.commonInterests
  };
  
  return generateBulkAIProfiles(options);
}

// Main Hermes+Oxum generation function
export async function generateBulkAIProfiles(options: GenerationOptions): Promise<AIProfile[]> {
  const {
    count,
    regions = [],
    languages = ["en"],
    personalityTypes = ["flirty", "shy", "dominant", "playful", "professional"],
    minAge = 21,
    maxAge = 35,
    interests = [],
    includeVerified = true
  } = options;
  
  // Generate base profiles
  const baseProfiles = Array.from({ length: count }, () => generateAIProfile());
  
  // Apply Hermes+Oxum enhancements
  const enhancedProfiles = baseProfiles.map(profile => {
    // Regional customization if regions specified
    if (regions.length > 0) {
      profile.location = regions[Math.floor(Math.random() * regions.length)];
    }
    
    // Age customization
    profile.age = Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge;
    
    // Personality customization
    if (personalityTypes.length > 0) {
      const personalityType = personalityTypes[Math.floor(Math.random() * personalityTypes.length)];
      
      if (profile.personality) {
        profile.personality.type = personalityType;
      }
    }
    
    // Add specific interests if provided
    if (interests.length > 0) {
      // Mix some provided interests with existing ones
      const numInterestsToAdd = Math.floor(Math.random() * 3) + 1;
      const selectedInterests = [];
      
      for (let i = 0; i < numInterestsToAdd; i++) {
        const randomInterest = interests[Math.floor(Math.random() * interests.length)];
        selectedInterests.push(randomInterest);
      }
      
      profile.interests = [...new Set([...profile.interests, ...selectedInterests])];
    }
    
    // Add monetization features
    profile.ubx_chat_price = Math.floor(Math.random() * 10) + 5;
    profile.ubx_image_price = Math.floor(Math.random() * 20) + 10;
    
    // Add premium content counts
    profile.premium_content_count = {
      photos: Math.floor(Math.random() * 20) + 5,
      videos: Math.floor(Math.random() * 10) + 2,
      messages: Math.floor(Math.random() * 15) + 3
    };
    
    // Set subscription price
    profile.subscription_price = Math.floor(Math.random() * 50) + 25;
    
    // Set livecam features
    profile.livecam_enabled = Math.random() > 0.3;
    
    // Set boost status for some profiles
    if (Math.random() > 0.7) {
      const boostExpiry = new Date();
      boostExpiry.setHours(boostExpiry.getHours() + Math.floor(Math.random() * 72) + 1);
      
      profile.boost_status = {
        is_boosted: true,
        boost_level: Math.floor(Math.random() * 5) + 1,
        boost_expires_at: boostExpiry.toISOString()
      };
    }
    
    // Add verification for some profiles
    if (includeVerified && Math.random() > 0.4) {
      profile.verification_status = "verified";
    }
    
    return profile;
  });
  
  return enhancedProfiles;
}

// Generate profiles with language-specific traits (Oxum system)
export async function generateLanguageSpecificProfiles(
  language: string, 
  count: number
): Promise<AIProfile[]> {
  // Language-specific traits and cultural elements
  const languageTraits: Record<string, any> = {
    "en": {
      responseStyle: "friendly, casual English",
      commonInterests: ["Movies", "Travel", "Dining Out", "Hiking", "Music"]
    },
    "es": {
      responseStyle: "warm, passionate Spanish",
      commonInterests: ["Dancing", "Family", "Food", "Football", "Beach"]
    },
    "fr": {
      responseStyle: "sophisticated, elegant French",
      commonInterests: ["Wine", "Art", "Fashion", "Philosophy", "Cinema"]
    },
    "de": {
      responseStyle: "precise, thoughtful German",
      commonInterests: ["Travel", "Fitness", "Cars", "Music", "Hiking"]
    },
    "zh": {
      responseStyle: "respectful, thoughtful Chinese",
      commonInterests: ["Food", "Family", "Business", "Movies", "Technology"]
    },
    "ja": {
      responseStyle: "polite, considerate Japanese",
      commonInterests: ["Anime", "Technology", "Fashion", "Travel", "Food"]
    }
  };
  
  // Use default English traits if language not found
  const traits = languageTraits[language] || languageTraits["en"];
  
  const options: GenerationOptions = {
    count,
    interests: traits.commonInterests
  };
  
  const profiles = await generateBulkAIProfiles(options);
  
  // Add language-specific properties
  return profiles.map(profile => {
    if (profile.personality) {
      profile.personality.responseStyle = traits.responseStyle;
    }
    
    return profile;
  });
}

// Central function to generate profiles with the Hermes+Oxum system
export async function generateProfilesWithHermesOxum(
  options: {
    totalCount: number;
    regions: string[];
    languages: string[];
    personalityDistribution?: Record<string, number>;
  }
): Promise<AIProfile[]> {
  const { totalCount, regions, languages, personalityDistribution = {} } = options;
  
  // Calculate counts per region and language
  const regionCount = Math.floor(totalCount / regions.length);
  const languageCount = Math.floor(totalCount / languages.length);
  
  const profiles: AIProfile[] = [];
  
  // Generate regional profiles
  for (const region of regions) {
    const regionProfiles = await generateRegionalAIProfiles(region, regionCount);
    profiles.push(...regionProfiles);
  }
  
  // Generate language-specific profiles
  for (const language of languages) {
    const langProfiles = await generateLanguageSpecificProfiles(language, languageCount);
    profiles.push(...langProfiles);
  }
  
  // Add personality distribution if specified
  if (Object.keys(personalityDistribution).length > 0) {
    profiles.forEach(profile => {
      // Apply personality based on distribution
      const rand = Math.random();
      let cumulativeProbability = 0;
      
      for (const [personality, probability] of Object.entries(personalityDistribution)) {
        cumulativeProbability += probability;
        
        if (rand <= cumulativeProbability && profile.personality) {
          profile.personality.type = personality as any;
          break;
        }
      }
    });
  }
  
  // Return only the requested number of profiles
  return profiles.slice(0, totalCount);
}
