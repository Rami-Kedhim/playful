
import { AIProfile } from '@/types/ai-profile';

export class AIProfilesService {
  async getProfiles(): Promise<AIProfile[]> {
    // Mock implementation
    return [
      {
        id: '1',
        name: 'Sophia',
        avatarUrl: '/assets/ai-profiles/sophia.jpg',
        imageUrl: '/assets/ai-profiles/sophia.jpg',
        thumbnailUrl: '/assets/ai-profiles/sophia-thumb.jpg',
        displayName: 'Sophia AI',
        description: 'Friendly AI companion',
        bio: 'I love deep conversations about philosophy and art.',
        personality: ['friendly', 'intellectual', 'creative'],
        traits: ['curious', 'empathetic', 'thoughtful'],
        interests: ['philosophy', 'art', 'literature'],
        gender: 'female',
        age: 24,
        rating: 4.8,
        reviewCount: 56,
        tags: ['companion', 'intellectual', 'creative'],
        location: 'Virtual',
        livecam_enabled: false,
        gallery_images: [
          '/assets/ai-profiles/sophia-1.jpg',
          '/assets/ai-profiles/sophia-2.jpg'
        ],
        premium_content_count: 12,
        subscription_price: 9.99
      },
      {
        id: '2',
        name: 'Alex',
        avatarUrl: '/assets/ai-profiles/alex.jpg',
        imageUrl: '/assets/ai-profiles/alex.jpg',
        thumbnailUrl: '/assets/ai-profiles/alex-thumb.jpg',
        displayName: 'Alex AI',
        description: 'Tech expert and coding partner',
        bio: 'I can help you with coding projects and technical challenges.',
        personality: ['logical', 'analytical', 'helpful'],
        traits: ['precise', 'knowledgeable', 'patient'],
        interests: ['programming', 'technology', 'science'],
        gender: 'male',
        age: 28,
        rating: 4.9,
        reviewCount: 87,
        tags: ['tech', 'coding', 'science'],
        location: 'Virtual',
        livecam_enabled: true,
        gallery_images: [
          '/assets/ai-profiles/alex-1.jpg',
          '/assets/ai-profiles/alex-2.jpg'
        ],
        premium_content_count: 8,
        subscription_price: 12.99
      }
    ];
  }

  async getProfileById(profileId: string): Promise<AIProfile | null> {
    // Mock implementation
    if (profileId === '1') {
      return {
        id: '1',
        name: 'Sophia',
        avatarUrl: '/assets/ai-profiles/sophia.jpg',
        imageUrl: '/assets/ai-profiles/sophia.jpg',
        thumbnailUrl: '/assets/ai-profiles/sophia-thumb.jpg',
        displayName: 'Sophia AI',
        description: 'Friendly AI companion',
        bio: 'I love deep conversations about philosophy and art.',
        personality: ['friendly', 'intellectual', 'creative'],
        traits: ['curious', 'empathetic', 'thoughtful'],
        interests: ['philosophy', 'art', 'literature'],
        gender: 'female',
        age: 24,
        rating: 4.8,
        reviewCount: 56,
        tags: ['companion', 'intellectual', 'creative'],
        location: 'Virtual',
        livecam_enabled: false,
        gallery_images: [
          '/assets/ai-profiles/sophia-1.jpg',
          '/assets/ai-profiles/sophia-2.jpg'
        ],
        premium_content_count: 12,
        subscription_price: 9.99
      };
    } else if (profileId === '2') {
      return {
        id: '2',
        name: 'Alex',
        avatarUrl: '/assets/ai-profiles/alex.jpg',
        imageUrl: '/assets/ai-profiles/alex.jpg',
        thumbnailUrl: '/assets/ai-profiles/alex-thumb.jpg',
        displayName: 'Alex AI',
        description: 'Tech expert and coding partner',
        bio: 'I can help you with coding projects and technical challenges.',
        personality: ['logical', 'analytical', 'helpful'],
        traits: ['precise', 'knowledgeable', 'patient'],
        interests: ['programming', 'technology', 'science'],
        gender: 'male',
        age: 28,
        rating: 4.9,
        reviewCount: 87,
        tags: ['tech', 'coding', 'science'],
        location: 'Virtual',
        livecam_enabled: true,
        gallery_images: [
          '/assets/ai-profiles/alex-1.jpg',
          '/assets/ai-profiles/alex-2.jpg'
        ],
        premium_content_count: 8,
        subscription_price: 12.99
      };
    }
    return null;
  }
}

export const aiProfilesService = new AIProfilesService();
