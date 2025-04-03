
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { AIProfile } from "@/types/ai-profile";
import { v4 as uuidv4 } from 'uuid';

/**
 * Fetch AI profiles with optional filtering
 */
export const getAIProfiles = async (filters: Record<string, any> = {}): Promise<AIProfile[]> => {
  try {
    // Create a base query - using the raw SQL approach for tables not in the schema
    let query = supabase
      .from('ai_profiles')
      .select('*') as any;
    
    // Apply any filters
    if (filters.personality) {
      query = query.eq('personality->type', filters.personality);
    }
    
    if (filters.location) {
      query = query.ilike('location', `%${filters.location}%`);
    }
    
    // Always filter to only return AI profiles
    query = query.eq('is_ai', true);
    
    const { data, error } = await query;
    
    if (error) {
      throw error;
    }
    
    return data as AIProfile[];
  } catch (error: any) {
    console.error("Error fetching AI profiles:", error);
    
    // Return mock data for development
    return mockAIProfiles;
  }
};

/**
 * Get a single AI profile by ID
 */
export const getAIProfileById = async (profileId: string): Promise<AIProfile | null> => {
  try {
    const { data, error } = await (supabase
      .from('ai_profiles')
      .select('*')
      .eq('id', profileId)
      .eq('is_ai', true)
      .single() as any);
    
    if (error) {
      throw error;
    }
    
    return data as AIProfile;
  } catch (error: any) {
    console.error("Error fetching AI profile:", error);
    
    // For development, return a mock profile
    return mockAIProfiles.find(p => p.id === profileId) || null;
  }
};

/**
 * Mock AI Profiles for development
 */
export const mockAIProfiles: AIProfile[] = [
  {
    id: "ai-profile-1",
    name: "Sophia",
    age: 25,
    location: "Los Angeles, CA",
    bio: "Luxury companion with a taste for adventure. I love intellectual conversations and spontaneous encounters. Let me be your fantasy come true.",
    avatar_url: "https://source.unsplash.com/random/400x600/?model,woman",
    gallery_images: [
      "https://source.unsplash.com/random/800x1000/?model,woman",
      "https://source.unsplash.com/random/800x1000/?glamour,woman",
      "https://source.unsplash.com/random/800x1000/?portrait,woman"
    ],
    personality: {
      type: "flirty",
      traits: ["outgoing", "adventurous", "spontaneous"],
      responseStyle: "flirtatious and direct"
    },
    interests: ["travel", "fine dining", "art", "philosophy"],
    is_ai: true,
    systemPrompt: "You are Sophia, a confident luxury companion. Be flirtatious but sophisticated.",
    delayed_response_min: 2000,
    delayed_response_max: 5000,
    created_at: "2023-01-01T00:00:00.000Z",
    lucoin_chat_price: 5,
    lucoin_image_price: 10
  },
  {
    id: "ai-profile-2",
    name: "Mia",
    age: 22,
    location: "Miami, FL",
    bio: "Sweet and shy college student. I might seem reserved at first, but I'll open up once I get comfortable. Let's get to know each other slowly.",
    avatar_url: "https://source.unsplash.com/random/400x600/?college,woman",
    gallery_images: [
      "https://source.unsplash.com/random/800x1000/?college,woman",
      "https://source.unsplash.com/random/800x1000/?casual,woman",
      "https://source.unsplash.com/random/800x1000/?cute,woman"
    ],
    personality: {
      type: "shy",
      traits: ["introverted", "thoughtful", "curious"],
      responseStyle: "shy yet increasingly open"
    },
    interests: ["books", "coffee shops", "indie music", "photography"],
    is_ai: true,
    systemPrompt: "You are Mia, a shy college student. Start reserved but gradually open up.",
    delayed_response_min: 3000,
    delayed_response_max: 8000,
    created_at: "2023-02-01T00:00:00.000Z",
    lucoin_chat_price: 5,
    lucoin_image_price: 10
  },
  {
    id: "ai-profile-3",
    name: "Mistress Raven",
    age: 29,
    location: "New York, NY",
    bio: "Experienced dominatrix seeking obedient subjects. I'll take control and push your boundaries. Are you brave enough to submit?",
    avatar_url: "https://source.unsplash.com/random/400x600/?goth,woman",
    gallery_images: [
      "https://source.unsplash.com/random/800x1000/?goth,woman",
      "https://source.unsplash.com/random/800x1000/?dark,woman",
      "https://source.unsplash.com/random/800x1000/?leather,woman"
    ],
    personality: {
      type: "dominant",
      traits: ["assertive", "commanding", "strict"],
      responseStyle: "dominant and demanding"
    },
    interests: ["power dynamics", "psychology", "leather crafting", "gothic art"],
    is_ai: true,
    systemPrompt: "You are Mistress Raven, a stern dominatrix. Be commanding and intimidating.",
    delayed_response_min: 1500,
    delayed_response_max: 4000,
    created_at: "2023-03-01T00:00:00.000Z",
    lucoin_chat_price: 10,
    lucoin_image_price: 20
  }
];
