
import { LivecamModel } from '@/types/livecams';

class LivecamsService {
  private mockLivecams: LivecamModel[] = [
    {
      id: '1',
      name: 'Sophia',
      username: 'sophia_live',
      displayName: 'Sophia Live',
      imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&h=2000',
      thumbnailUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&h=2000',
      isLive: true,
      isStreaming: true,
      viewerCount: 245,
      tags: ['dance', 'music', 'chat'],
      rating: 4.8,
      price: 5,
      category: 'Entertainment',
      categories: ['Dance', 'Music'],
      language: 'English',
      country: 'USA',
      description: 'Join my interactive dance session!'
    },
    {
      id: '2',
      name: 'Emma',
      username: 'emma_streams',
      displayName: 'Emma\'s World',
      imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1000&h=1200',
      thumbnailUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1000&h=1200',
      isLive: false,
      viewerCount: 0,
      tags: ['gaming', 'talk', 'lifestyle'],
      rating: 4.6,
      category: 'Gaming',
      categories: ['Gaming', 'Talk Show'],
      language: 'English',
      country: 'Canada'
    },
    {
      id: '3',
      name: 'Luna',
      username: 'luna_asmr',
      displayName: 'Luna ASMR',
      imageUrl: 'https://images.unsplash.com/photo-1564485377539-4af72d1f6a2f?q=80&w=1000&h=1200',
      thumbnailUrl: 'https://images.unsplash.com/photo-1564485377539-4af72d1f6a2f?q=80&w=1000&h=1200',
      isLive: true,
      isStreaming: true,
      viewerCount: 178,
      tags: ['asmr', 'relaxation', 'sleep'],
      rating: 4.9,
      price: 8,
      category: 'ASMR',
      categories: ['ASMR', 'Relaxation'],
      language: 'Spanish',
      country: 'Spain',
      description: 'The best ASMR triggers for your relaxation'
    }
  ];

  async getLivecams(): Promise<LivecamModel[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    return this.mockLivecams;
  }

  async getLivecamById(id: string): Promise<LivecamModel | null> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const livecam = this.mockLivecams.find(lc => lc.id === id);
    return livecam || null;
  }

  async getFeaturedLivecams(): Promise<LivecamModel[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Return only live cams with highest viewer counts
    return this.mockLivecams
      .filter(lc => lc.isLive)
      .sort((a, b) => b.viewerCount - a.viewerCount)
      .slice(0, 4);
  }

  async searchLivecams(query: string): Promise<LivecamModel[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const lowercaseQuery = query.toLowerCase();
    return this.mockLivecams.filter(lc =>
      lc.name.toLowerCase().includes(lowercaseQuery) ||
      lc.username.toLowerCase().includes(lowercaseQuery) ||
      lc.category?.toLowerCase().includes(lowercaseQuery) ||
      lc.categories?.some(cat => cat.toLowerCase().includes(lowercaseQuery)) ||
      lc.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  async getLivecamByUsername(username: string): Promise<LivecamModel | null> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const livecam = this.mockLivecams.find(lc => lc.username === username);
    return livecam || null;
  }
  
  // Method to generate random livecam data for testing
  generateMockLivecam(): LivecamModel {
    const id = Math.random().toString(36).substring(2, 10);
    const name = ['Sophia', 'Emma', 'Luna', 'Mia', 'Olivia'][Math.floor(Math.random() * 5)];
    const username = `${name.toLowerCase()}_${Math.floor(Math.random() * 1000)}`;
    const displayName = `${name}'s Channel`;
    
    return {
      id,
      name,
      username,
      displayName,
      imageUrl: `https://source.unsplash.com/random/300x400?woman&${id}`,
      thumbnailUrl: `https://source.unsplash.com/random/300x400?woman&${id}`,
      isLive: Math.random() > 0.5,
      isStreaming: Math.random() > 0.5,
      viewerCount: Math.floor(Math.random() * 500),
      tags: ['chat', 'dance', 'music', 'gaming', 'asmr'].sort(() => 0.5 - Math.random()).slice(0, 3),
      rating: 4 + Math.random(),
      price: Math.floor(Math.random() * 10) + 1,
      category: ['Entertainment', 'Gaming', 'ASMR', 'Fitness', 'Music'][Math.floor(Math.random() * 5)],
      categories: ['Entertainment', 'Gaming', 'ASMR'].sort(() => 0.5 - Math.random()).slice(0, 2),
      language: ['English', 'Spanish', 'French'][Math.floor(Math.random() * 3)],
      country: ['USA', 'Canada', 'Spain', 'France'][Math.floor(Math.random() * 4)],
      description: 'Join my amazing livestream!'
    };
  }
}

export const livecamsService = new LivecamsService();
export default livecamsService;
