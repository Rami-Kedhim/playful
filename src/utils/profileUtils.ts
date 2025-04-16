
import { DatabaseGender, UserProfile } from '@/types/auth';

// Generate avatar URL from initials for use when no image is provided
export const getInitialsAvatar = (name: string): string => {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
    
  // Use a placeholder service that generates an image with the initials
  const backgroundColor = stringToColor(name);
  return `https://ui-avatars.com/api/?name=${initials}&background=${backgroundColor.replace('#', '')}&color=ffffff`;
};

// Convert string to color for consistent avatar background colors
const stringToColor = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  
  return color;
};

// Maps string gender values to DatabaseGender enum
export const mapStringToGender = (gender?: string): DatabaseGender => {
  if (!gender) return DatabaseGender.OTHER;
  
  switch (gender.toLowerCase()) {
    case 'male':
      return DatabaseGender.MALE;
    case 'female':
      return DatabaseGender.FEMALE;
    default:
      return DatabaseGender.OTHER;
  }
};

// Upload avatar to storage (mock implementation)
export const uploadAvatar = async (file: File): Promise<string> => {
  // In a real implementation, this would upload to a storage service
  // For now, we'll return a fake URL
  return URL.createObjectURL(file);
};

// Validate gender string against allowed values
export const validateGender = (gender: string): boolean => {
  return ['male', 'female', 'other', 'non-binary', 'trans'].includes(gender.toLowerCase());
};

// Format profile data for display
export const formatProfileData = (profile: UserProfile) => {
  return {
    ...profile,
    displayName: profile.full_name || profile.username || 'Anonymous',
    memberSince: profile.created_at 
      ? new Date(profile.created_at).toLocaleDateString() 
      : 'Unknown',
    verified: profile.is_verified || false
  };
};
