
import { AIProfile } from '@/types/ai-profile';

// Number of AI profiles to generate by default
const DEFAULT_PROFILE_COUNT = 20;

// Cache for AI profiles to avoid generating new ones on every call
let cachedProfiles: AIProfile[] | null = null;

// Mock function to generate profiles
const generateMockProfiles = (count: number): AIProfile[] => {
  return Array(count).fill(null).map((_, i) => ({
    id: `ai-${Date.now()}-${i}`,
    name: `AI Profile ${i + 1}`,
    avatarUrl: `https://i.pravatar.cc/300?u=ai-${Date.now()}-${i}`,
    description: "An AI profile generated for testing purposes",
    traits: ["friendly", "intelligent", "creative"],
    languages: ["English", "Spanish"],
    gender: Math.random() > 0.5 ? "female" : "male",
    age: Math.floor(Math.random() * 20) + 25,
  }));
};

/**
 * Gets a list of AI profiles
 * @param count Optional number of profiles to return
 * @returns Array of AI profiles
 */
export const getAIProfiles = async (count: number = DEFAULT_PROFILE_COUNT): Promise<AIProfile[]> => {
  if (!cachedProfiles) {
    cachedProfiles = generateMockProfiles(DEFAULT_PROFILE_COUNT);
  }
  
  // If requesting more than we have cached, generate more
  if (count > cachedProfiles.length) {
    const additionalProfiles = generateMockProfiles(count - cachedProfiles.length);
    cachedProfiles = [...cachedProfiles, ...additionalProfiles];
  }
  
  // Return the requested number of profiles
  return cachedProfiles.slice(0, count);
};

/**
 * Gets a specific AI profile by ID
 * @param id The ID of the profile to retrieve
 * @returns The AI profile or null if not found
 */
export const getAIProfileById = async (id: string): Promise<AIProfile | null> => {
  // Ensure we have some cached profiles
  if (!cachedProfiles) {
    cachedProfiles = generateMockProfiles(DEFAULT_PROFILE_COUNT);
  }
  
  // Look for the profile with the given ID
  const profile = cachedProfiles.find(p => p.id === id);
  
  // If not found, generate a new profile with the ID
  if (!profile) {
    const newProfile: AIProfile = {
      id,
      name: `AI Profile ${id.substring(0, 4)}`,
      avatarUrl: `https://i.pravatar.cc/300?u=${id}`,
      description: "A newly generated AI profile",
      traits: ["adaptive", "helpful", "personalized"],
      languages: ["English"],
      gender: "non-binary",
      age: 30,
    };
    
    cachedProfiles.push(newProfile);
    return newProfile;
  }
  
  return profile;
};

/**
 * Creates a new AI profile with the given parameters
 * @param profileData Partial AI profile data
 * @returns The created AI profile
 */
export const createAIProfile = async (profileData: Partial<AIProfile>): Promise<AIProfile> => {
  // Create a new profile with required fields
  const newProfile: AIProfile = {
    id: profileData.id || `ai-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    name: profileData.name || `New AI Profile`,
    avatarUrl: profileData.avatarUrl || `https://i.pravatar.cc/300?u=${Date.now()}`,
    ...profileData,
  };
  
  // Add to cache
  if (cachedProfiles) {
    cachedProfiles.push(newProfile);
  } else {
    cachedProfiles = [newProfile];
  }
  
  return newProfile;
};

export default {
  getAIProfiles,
  getAIProfileById,
  createAIProfile
};
