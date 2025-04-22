
import { supabase } from "@/integrations/supabase/client";
import { AIProfile } from "@/types/ai-profile";

/**
 * Get all AI profiles
 */
export const getAIProfiles = async (): Promise<AIProfile[]> => {
  try {
    // Using any to bypass type issues
    const { data, error } = await supabase
      .from('ai_profiles' as any)
      .select('*') as any;

    if (error) {
      console.error("Error fetching AI profiles:", error);
      return mockAIProfiles;
    }

    return data as AIProfile[];
  } catch (error) {
    console.error("Error in getAIProfiles:", error);
    return mockAIProfiles;
  }
};

/**
 * Get a specific AI profile by ID
 */
export const getAIProfileById = async (profileId: string): Promise<AIProfile | null> => {
  try {
    // Using any to bypass type issues
    const { data, error } = await supabase
      .from('ai_profiles' as any)
      .select('*')
      .eq('id', profileId)
      .single() as any;

    if (error) {
      console.error("Error fetching AI profile by ID:", error);
      return mockAIProfiles.find(p => p.id === profileId) || null;
    }

    return data as AIProfile;
  } catch (error) {
    console.error("Error in getAIProfileById:", error);
    return mockAIProfiles.find(p => p.id === profileId) || null;
  }
};

/**
 * Mock AI Profiles for development or fallback
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
      traits: ["outgoing", "adventurous", "spontaneous"]
    },
    interests: ["travel", "fine dining", "art", "philosophy"],
    ubx_chat_price: 5,
    ubx_image_price: 10,
    created_at: "2023-01-01T00:00:00.000Z",
    is_verified: true,
    category: "AI Companion",
    rating: 4.5,
    review_count: 100,
    price: 0,
    is_premium: false,
    availability_status: "available",
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
      traits: ["introverted", "thoughtful", "curious"]
    },
    interests: ["books", "coffee shops", "indie music", "photography"],
    ubx_chat_price: 5,
    ubx_image_price: 10,
    created_at: "2023-02-01T00:00:00.000Z",
    is_verified: false,
    category: "AI Companion",
    rating: 4,
    review_count: 50,
    price: 0,
    is_premium: false,
    availability_status: "available",
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
      traits: ["assertive", "commanding", "strict"]
    },
    interests: ["power dynamics", "psychology", "leather crafting", "gothic art"],
    ubx_chat_price: 10,
    ubx_image_price: 20,
    created_at: "2023-03-01T00:00:00.000Z",
    is_verified: true,
    category: "AI Companion",
    rating: 5,
    review_count: 75,
    price: 0,
    is_premium: false,
    availability_status: "available",
  }
];
