
import { AIProfile } from '@/types/ai-profile';
import { aiProfileGenerator } from '../aiProfileGenerator';

// Number of AI profiles to generate by default
const DEFAULT_PROFILE_COUNT = 20;

// Cache for AI profiles to avoid generating new ones on every call
let cachedProfiles: AIProfile[] | null = null;

/**
 * Gets a list of AI profiles
 * @param count Optional number of profiles to return
 * @returns Array of AI profiles
 */
export const getAIProfiles = async (count: number = DEFAULT_PROFILE_COUNT): Promise<AIProfile[]> => {
  if (!cachedProfiles) {
    const profiles = await aiProfileGenerator.generateMultipleProfiles(DEFAULT_PROFILE_COUNT);
    cachedProfiles = profiles;
  }
  
  // If requesting more than we have cached, generate more
  if (count > cachedProfiles.length) {
    const additionalProfiles = await aiProfileGenerator.generateMultipleProfiles(count - cachedProfiles.length);
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
    const profiles = await aiProfileGenerator.generateMultipleProfiles(DEFAULT_PROFILE_COUNT);
    cachedProfiles = profiles;
  }
  
  // Look for the profile with the given ID
  const profile = cachedProfiles.find(p => p.id === id);
  
  // If not found, generate a new profile with the ID
  if (!profile) {
    // Use the aiProfileGenerator instance directly
    const newProfile = await aiProfileGenerator.generateProfile();
    newProfile.id = id;
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
  // Use the aiProfileGenerator instance directly
  const baseProfile = await aiProfileGenerator.generateProfile();
  
  // Merge the provided data with the base profile
  const newProfile: AIProfile = {
    ...baseProfile,
    ...profileData,
    // Ensure id is unique if not provided
    id: profileData.id || `ai-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
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
