
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
  // Removed category as it does not exist in AIProfile
  rating: number;
  reviewCount: number;
  price: number;
  isPremium: boolean;
  availabilityStatus: string;
}

export const generateAIProfile = async (
  options: AIProfileGeneratorOptions
): Promise<AIProfile> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock AI profile data
  const aiProfile: AIProfile = {
    id: `ai-profile-${Date.now()}`,
    name: options.name,
    // gender is not part of AIProfile, remove it
    age: options.age,
    bio: options.bio,
    personality: options.personality,
    avatar_url: options.avatarUrl,
    location: options.location,
    interests: options.interests,
    isVerified: options.isVerified,
    created_at: options.createdAt,
    rating: options.rating,
    review_count: options.reviewCount,
    price: options.price,
    is_premium: options.isPremium,
    availability_status: options.availabilityStatus,
  };

  return aiProfile;
};
