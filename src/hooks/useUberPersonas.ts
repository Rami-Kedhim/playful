
import { useState, useEffect } from 'react';
import { UberPersona } from '@/types/uberPersona';

const mockPersonas: UberPersona[] = [
  {
    id: '1',
    username: 'sophia_dreams',
    displayName: 'Sophia Dreams',
    avatarUrl: '/images/persona/1.jpg',
    profileBanner: '/images/banners/1.jpg',
    bio: 'Your virtual dream companion',
    location: 'Virtual World',
    age: 24,
    rating: 4.9,
    isOnline: true,
    roleFlags: {
      isUser: true,
      isEscort: false,
      isCreator: true,
      isVerified: true,
      isFeatured: true,
      isAI: true,
    },
    verified: true,
    verificationLevel: 'premium',
    capabilities: {
      canPostContent: true,
      canMessage: true,
      canStream: true,
      canFavorite: true,
      canBoost: true,
      canVerify: false,
      hasContent: true,
      hasLiveStream: true,
      hasVirtualMeets: true,
      hasRealMeets: false,
    },
    monetization: {
      enabled: true,
      methods: ['subscription', 'message', 'content'],
      rates: {
        message: 5,
      },
      subscription: {
        price: 9.99,
        interval: 'monthly',
        features: ['Unlimited chat', 'Custom scenarios', 'Priority responses'],
      },
      acceptsLucoin: true,
      pricePerMessage: 5,
      subscriptionPrice: 9.99,
      videoChatPrice: 20,
      meetingPrice: 0,
    },
    contentCount: {
      photos: 120,
      videos: 15,
      streams: 4,
    },
    system: {
      createdAt: '2023-01-15T12:00:00Z',
      updatedAt: '2023-05-10T09:30:00Z',
      lastActiveAt: new Date().toISOString(),
      totalViews: 45600,
      totalLikes: 12300,
      totalBookmarks: 2800,
      rank: 8,
      score: 94.5,
      isAI: true,
    },
    tags: ['virtual companion', 'AI girlfriend', 'roleplay', 'storytelling'],
  },
  // More personas would go here
];

export function useUberPersonas() {
  const [personas, setPersonas] = useState<UberPersona[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        setLoading(true);
        
        // In a real app, this would be an API call
        // For now, simulate delay and return mock data
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setPersonas(mockPersonas);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to load personas');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPersonas();
  }, []);

  return { personas, loading, error };
}

export default useUberPersonas;
