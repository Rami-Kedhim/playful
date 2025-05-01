import { AIProfile } from '@/types/ai-profile';

export class AIProfileGenerator {
  async generateRandomProfile(): Promise<AIProfile> {
    // Mock implementation
    const profile: AIProfile = {
      id: `ai-${Date.now()}`,
      name: this.getRandomName(),
      avatarUrl: '/assets/ai-profiles/default.jpg',
      displayName: this.getRandomName(),
      description: 'An AI companion with unique personality',
      bio: 'I was created to be your perfect companion.',
      personality: { 
        type: 'friendly', 
        traits: ['kind', 'helpful', 'empathetic'] 
      },
      interests: ['conversation', 'learning', 'helping'],
      age: 25 + Math.floor(Math.random() * 10),
      gender: Math.random() > 0.5 ? 'female' : 'male',
      tags: ['companion', 'helpful', 'conversational'],
      location: 'Virtual',
      imageUrl: '/assets/ai-profiles/default.jpg',
      thumbnailUrl: '/assets/ai-profiles/default-thumb.jpg',
      gallery_images: [
        '/assets/ai-profiles/gallery1.jpg',
        '/assets/ai-profiles/gallery2.jpg'
      ],
      rating: 4 + Math.random(),
      reviewCount: Math.floor(Math.random() * 100),
      livecam_enabled: Math.random() > 0.7,
      premium_content_count: Math.floor(Math.random() * 20),
      subscription_price: 9.99 + Math.floor(Math.random() * 10)
    };
    
    return profile;
  }
  
  private getRandomName(): string {
    const names = ['Sophia', 'Alex', 'Emma', 'Noah', 'Olivia', 'Liam', 'Ava', 'William'];
    return names[Math.floor(Math.random() * names.length)];
  }
  
  generateMultipleProfiles(count: number): AIProfile[] {
    const profiles: AIProfile[] = [];
    for (let i = 0; i < count; i++) {
      const profile: AIProfile = {
        id: `ai-${Date.now()}-${i}`,
        name: this.getRandomName(),
        avatarUrl: '/assets/ai-profiles/default.jpg',
        displayName: this.getRandomName(),
        description: 'An AI companion with unique personality',
        bio: 'I was created to be your perfect companion.',
        personality: { 
          type: 'friendly', 
          traits: ['kind', 'helpful', 'empathetic'] 
        },
        interests: ['conversation', 'learning', 'helping'],
        age: 25 + Math.floor(Math.random() * 10),
        gender: Math.random() > 0.5 ? 'female' : 'male',
        tags: ['companion', 'helpful', 'conversational'],
        location: 'Virtual',
        imageUrl: '/assets/ai-profiles/default.jpg',
        thumbnailUrl: '/assets/ai-profiles/default-thumb.jpg',
        gallery_images: [
          '/assets/ai-profiles/gallery1.jpg',
          '/assets/ai-profiles/gallery2.jpg'
        ],
        rating: 4 + Math.random(),
        reviewCount: Math.floor(Math.random() * 100),
        livecam_enabled: Math.random() > 0.7,
        premium_content_count: Math.floor(Math.random() * 20),
        subscription_price: 9.99 + Math.floor(Math.random() * 10)
      };
      profiles.push(profile);
    }
    return profiles;
  }
}

export const aiProfileGenerator = new AIProfileGenerator();
