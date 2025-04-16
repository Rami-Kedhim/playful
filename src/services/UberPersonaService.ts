import { generateRandomProfile } from "@/data/mock/profileGenerator";
import { Escort } from "@/types/escort";

export const uberPersonaService = {
  generateRandomPersona: async (): Promise<Escort> => {
    const profile = generateRandomProfile();
    return profile;
  },
  getPersonaById: async (id: string): Promise<Escort | null> => {
    // Mock implementation
    const profile = generateRandomProfile();
    profile.id = id;
    return profile;
  }
};

export const generatePersonaProfile = async (
  name: string,
  desc: string,
  type: 'manual' | 'scraped' | 'ai_enhanced',
  location?: string
): Promise<Partial<Escort>> => {
  try {
    const profileImageUrl = `https://picsum.photos/seed/${name}/800/1200`;
    const avatar_url = `https://picsum.photos/seed/${name}/150/150`;
    
    return {
      name,
      bio: desc,
      location: location || 'Virtual',
      imageUrl: profileImageUrl,
      avatar_url,
      profileImage: profileImageUrl,
      profileType: type === "ai_enhanced" ? "ai" : type,
      isAI: type === "ai_enhanced",
    };
  } catch (error) {
    console.error("Error generating persona profile:", error);
    return { name: "Error generating profile" };
  }
};

export const updatePersonaProfile = async (
  id: string,
  updates: Partial<Escort>
): Promise<Escort> => {
  try {
    // Mock implementation
    const profile = generateRandomProfile();
    profile.id = id;
    
    return {
      ...profile,
      ...updates
    };
  } catch (error) {
    console.error("Error updating persona profile:", error);
    return generateRandomProfile();
  }
};
