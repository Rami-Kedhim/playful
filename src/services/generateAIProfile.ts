
// Remove price property from AIProfile object literal

import { AIProfile } from '@/types/ai-profile';

export interface AIProfileGeneratorOptions {
  name: string;
  gender: string;
  age: number;
  bio: string;
  personality: { type: string; traits?: string[] };
  avatarUrl: string;
  location: string;
  interests: string[];
  isVerified: boolean;
  createdAt: string;
  rating: number;
  reviewCount: number;
  price: number; // This can remain as parameter, but not used in AIProfile object.
  isPremium: boolean;
  availabilityStatus: string;
}

export const generateAIProfile = async (
  options: AIProfileGeneratorOptions
): Promise<AIProfile> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const aiProfile: AIProfile = {
    id: `ai-profile-${Date.now()}`,
    name: options.name,
    age: options.age,
    bio: options.bio,
    personality: options.personality,
    avatar_url: options.avatarUrl,
    location: options.location,
    interests: options.interests,
    isVerified: options.isVerified,
    created_at: options.createdAt,
    rating: options.rating,
    reviewCount: options.reviewCount,
    isPremium: options.isPremium,
    availability_status: options.availabilityStatus,
  };

  return aiProfile;
};
