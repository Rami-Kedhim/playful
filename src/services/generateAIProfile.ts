
import { AIProfile } from '@/types/ai-profile';

export const generateAIProfile = async (options: { [key: string]: any } = {}): Promise<AIProfile> => {
  // Simulate API call with a delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Generate a random profile
  return {
    id: `ai-${Math.random().toString(36).substring(2, 10)}`,
    name: options.name || `AI Model ${Math.floor(Math.random() * 100)}`,
    description: options.description || 'An AI-generated companion profile',
    imageUrl: options.imageUrl || 'https://via.placeholder.com/150',
    avatarUrl: options.avatarUrl || 'https://via.placeholder.com/150',
    avatar_url: options.avatar_url || 'https://via.placeholder.com/150',
    age: options.age || Math.floor(Math.random() * 15) + 21,
    country: options.country || 'United States',
    location: options.country || 'United States',
    language: options.language || 'English',
    personality: options.personality || 'Friendly and engaging',
    interests: options.interests || ['conversation', 'helping users'],
    tags: options.tags || ['ai', 'companion'],
    category: options.category || 'Assistant',
    type: options.type || 'companion',
    bio: options.bio || 'I love meeting new people and having interesting conversations.',
    lucoin_chat_price: options.lucoin_chat_price || Math.floor(Math.random() * 10) + 5,
    lucoin_image_price: options.lucoin_image_price || Math.floor(Math.random() * 20) + 10,
    subscription_price: options.subscription_price || Math.floor(Math.random() * 50) + 20,
    premium_content_count: options.premium_content_count || Math.floor(Math.random() * 30),
    gallery_images: options.gallery_images || [
      'https://via.placeholder.com/400?text=AI+Gallery+1',
      'https://via.placeholder.com/400?text=AI+Gallery+2',
      'https://via.placeholder.com/400?text=AI+Gallery+3',
    ],
    livecam_enabled: options.livecam_enabled !== undefined ? options.livecam_enabled : Math.random() > 0.5,
    profileStats: options.profileStats || {
      photos: Math.floor(Math.random() * 50) + 10,
      videos: Math.floor(Math.random() * 20) + 5,
      messages: Math.floor(Math.random() * 1000) + 100
    },
    createdAt: new Date(),
    updatedAt: new Date()
  };
};
