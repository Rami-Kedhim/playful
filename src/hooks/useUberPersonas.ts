
import { useState, useCallback, useEffect } from 'react';
import { UberPersona, UberPersonaFeatures, UberPersonaPricing } from '@/types/persona';

export const useUberPersonas = () => {
  const [personas, setPersonas] = useState<UberPersona[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock data for personas
  const fetchPersonas = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Mock data
      const mockPersonas: UberPersona[] = [
        {
          id: "persona1",
          name: "Sophia",
          description: "Friendly and outgoing persona",
          avatarUrl: "https://via.placeholder.com/150",
          bannerUrl: "https://via.placeholder.com/1200x300",
          rating: 4.8,
          reviewCount: 120,
          isVerified: true,
          isOnline: true,
          lastActive: new Date(),
          features: {
            hasPhotos: true,
            hasVideos: true,
            hasStories: true,
            hasChat: true,
            hasBooking: true,
            hasLiveStream: false,
            hasExclusiveContent: true,
            hasContent: true,
            hasRealMeets: true,
            hasVirtualMeets: false
          },
          pricing: {
            acceptsLucoin: true,
            acceptsTips: true,
            subscriptionPrice: 19.99,
            unlockingPrice: 5.99,
            boostingActive: true,
            meetingPrice: 150
          },
          tags: ["friendly", "outgoing", "energetic"],
          location: "New York, NY",
          category: "companion",
          popularity: 85,
          stats: {
            views: 15000,
            likes: 2800,
            followers: 1200
          }
        },
        {
          id: "persona2",
          name: "Alex",
          description: "Creative and artistic virtual companion",
          avatarUrl: "https://via.placeholder.com/150",
          rating: 4.6,
          isVerified: true,
          isOnline: false,
          lastActive: new Date(Date.now() - 3600000), // 1 hour ago
          features: {
            hasPhotos: true,
            hasVideos: true,
            hasStories: true,
            hasChat: true,
            hasBooking: false,
            hasLiveStream: true,
            hasExclusiveContent: true,
            hasContent: true,
            hasRealMeets: false,
            hasVirtualMeets: true
          },
          pricing: {
            acceptsLucoin: true,
            acceptsTips: true,
            subscriptionPrice: 14.99,
            unlockingPrice: 4.99,
            boostingActive: false,
            meetingPrice: 75
          },
          tags: ["creative", "artistic", "intellectual"],
          location: "Virtual",
          category: "artist",
          popularity: 72
        },
        {
          id: "persona3",
          name: "Jasmine",
          description: "Sophisticated and elegant companion",
          avatarUrl: "https://via.placeholder.com/150",
          bannerUrl: "https://via.placeholder.com/1200x300",
          rating: 4.9,
          reviewCount: 200,
          isVerified: true,
          isOnline: true,
          features: {
            hasPhotos: true,
            hasVideos: true,
            hasStories: true,
            hasChat: true,
            hasBooking: false,
            hasLiveStream: true,
            hasExclusiveContent: true,
            hasContent: true,
            hasRealMeets: true,
            hasVirtualMeets: false
          },
          pricing: {
            acceptsLucoin: true,
            acceptsTips: true,
            subscriptionPrice: 24.99,
            unlockingPrice: 7.99,
            boostingActive: true,
            meetingPrice: 200
          },
          tags: ["elegant", "sophisticated", "cultured"],
          location: "Miami, FL",
          popularity: 92
        }
      ];

      setPersonas(mockPersonas);
    } catch (err) {
      console.error('Error fetching personas:', err);
      setError('Failed to load personas');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPersonas();
  }, [fetchPersonas]);

  return {
    personas,
    loading,
    error,
    refreshPersonas: fetchPersonas
  };
};
