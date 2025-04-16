
import { DatabaseGender, UserProfile } from "@/types/auth";

/**
 * Normalizes gender values from various formats to the standard DatabaseGender enum
 */
export const normalizeGender = (gender: string | null | undefined): DatabaseGender => {
  if (!gender) return DatabaseGender.OTHER;
  
  const normalizedGender = gender.toUpperCase();
  
  if (normalizedGender === 'MALE') return DatabaseGender.MALE;
  if (normalizedGender === 'FEMALE') return DatabaseGender.FEMALE;
  
  return DatabaseGender.OTHER;
};

/**
 * Format display name for a user profile
 */
export const getDisplayName = (profile: UserProfile | null): string => {
  if (!profile) return 'User';
  
  if (profile.full_name) return profile.full_name;
  if (profile.username) return profile.username;
  
  return 'User';
};

/**
 * Calculate profile completeness percentage
 */
export const calculateProfileCompleteness = (profile: UserProfile): number => {
  if (!profile) return 0;
  
  const requiredFields = [
    'full_name',
    'avatar_url',
    'bio',
    'location',
    'gender',
  ];
  
  const optionalFields = [
    'interests',
    'commute_route',
    'sexual_orientation'
  ];
  
  let score = 0;
  let possibleScore = requiredFields.length + optionalFields.length;
  
  // Required fields count more
  requiredFields.forEach(field => {
    if (profile[field as keyof UserProfile]) score += 1;
  });
  
  // Optional fields
  optionalFields.forEach(field => {
    if (profile[field as keyof UserProfile]) score += 0.5;
  });
  
  return Math.min(100, Math.round((score / possibleScore) * 100));
};
