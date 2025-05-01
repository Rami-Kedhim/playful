
import { AIProfile, AIModelGenerationParams } from '@/types/ai-profile';

export const generateAIProfile = async (params: AIModelGenerationParams): Promise<AIProfile> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Ensure we have a valid personality format
  const personality = params.personality || ['friendly', 'helpful', 'curious'];
  let formattedPersonality;
  
  if (typeof personality === 'object' && !Array.isArray(personality)) {
    // Make sure traits is required when type is provided
    formattedPersonality = {
      type: personality.type,
      traits: personality.traits || ['default']
    };
  } else {
    formattedPersonality = personality;
  }
  
  // Generate a profile based on the params
  const profile: AIProfile = {
    id: `ai-${Date.now()}`,
    name: params.name || 'AI Companion',
    avatarUrl: '/assets/default-ai-avatar.jpg',
    imageUrl: '/assets/default-ai-avatar.jpg',
    displayName: params.name || 'AI Companion',
    description: params.description || 'A friendly AI companion',
    bio: 'I\'m an AI companion designed to engage in meaningful conversations.',
    personality: formattedPersonality,
    traits: params.traits || ['friendly', 'helpful', 'curious'],
    interests: params.interests || ['conversation', 'learning', 'creativity'],
    tags: params.traits || ['companion', 'friendly', 'conversational'],
    type: params.type || 'companion',
    isPremium: false,
    gender: params.gender || 'neutral',
    age: params.age || 25,
    location: 'Virtual',
    isVerified: false,
    livecam_enabled: false,
    gallery_images: [],
    premium_content_count: 0,
    subscription_price: 0
  };
  
  return profile;
};

export default generateAIProfile;
