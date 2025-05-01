
import { AIProfile } from '@/types/schema';

export interface AIProfileGeneratorOptions {
  location?: string;
  gender?: string;
  ageRange?: [number, number];
  traits?: string[];
  services?: string[];
  bodyType?: string;
  ethnicity?: string;
  limit?: number;
  withGallery?: boolean;
  withReviews?: boolean;
}

class AIProfileGenerator {
  async generateProfile(options: AIProfileGeneratorOptions = {}): Promise<AIProfile> {
    // Mock implementation
    const id = `ai-${Math.random().toString(36).substr(2, 9)}`;
    const gender = options.gender || (Math.random() > 0.5 ? 'female' : 'male');
    const age = options.ageRange ? 
      Math.floor(Math.random() * (options.ageRange[1] - options.ageRange[0]) + options.ageRange[0]) : 
      Math.floor(Math.random() * 15) + 22;
      
    const firstNames = gender === 'female' ? 
      ['Sophia', 'Emma', 'Olivia', 'Ava', 'Mia'] : 
      ['Liam', 'Noah', 'Oliver', 'Elijah', 'William'];
      
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'];
    
    const name = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
    
    return {
      id,
      name,
      displayName: name,
      description: 'AI-generated profile description',
      avatar: `https://i.pravatar.cc/300?u=${id}`,
      age,
      gender,
      location: options.location || 'New York',
      tags: ['ai-generated', 'premium'],
      services: options.services || ['companion', 'dinner-date'],
      languages: ['English'],
      height: `${Math.floor(Math.random() * 30) + 155} cm`,
      weight: `${Math.floor(Math.random() * 30) + 50} kg`,
      bodyType: options.bodyType || 'athletic',
      ethnicity: options.ethnicity || 'caucasian',
      hairColor: 'brown',
      eyeColor: 'blue',
      personalityTraits: ['friendly', 'outgoing', 'intelligent'],
      interests: ['travel', 'food', 'music', 'art'],
      availability: {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        hours: ['9:00 - 17:00']
      },
      rates: {
        hourly: Math.floor(Math.random() * 200) + 300,
        overnight: Math.floor(Math.random() * 500) + 1000,
        weekend: Math.floor(Math.random() * 1000) + 2000
      },
      verificationStatus: 'verified',
      reviews: options.withReviews ? [
        {
          id: `review-${Math.random().toString(36).substr(2, 9)}`,
          author: 'Anonymous',
          date: new Date().toISOString(),
          rating: Math.floor(Math.random() * 2) + 4,
          text: 'Excellent companion, would recommend!'
        }
      ] : [],
      gallery: options.withGallery ? [
        `https://i.pravatar.cc/300?u=${id}-1`,
        `https://i.pravatar.cc/300?u=${id}-2`,
        `https://i.pravatar.cc/300?u=${id}-3`
      ] : []
    };
  }
  
  async generateMultipleProfiles(count: number, options: AIProfileGeneratorOptions = {}): Promise<AIProfile[]> {
    const profiles: AIProfile[] = [];
    
    for (let i = 0; i < count; i++) {
      const profile = await this.generateProfile(options);
      profiles.push(profile);
    }
    
    return profiles;
  }
}

export const aiProfileGenerator = new AIProfileGenerator();
