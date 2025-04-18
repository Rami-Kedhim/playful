
import { useState, useCallback, useEffect } from 'react';
import { UberPersona } from '@/types/uberPersona';

// Mock data for initial development
const mockPersonas: UberPersona[] = [
  {
    id: "p1",
    username: "sophia_rose",
    displayName: "Sophia Rose",
    image: "https://example.com/sophia.jpg",
    imageUrl: "https://example.com/sophia.jpg",
    avatarUrl: "https://example.com/sophia-avatar.jpg",
    location: "New York",
    language: "English",
    bio: "Elite companion available for dinner dates and travel",
    age: 27,
    ethnicity: "Caucasian",
    tags: ["Elite", "GFE", "Travel Companion"],
    createdAt: new Date(),
    updatedAt: new Date(),
    rating: 4.9,
    price: 300,
    isOnline: true,
    roleFlags: {
      isEscort: true,
      isCreator: false,
      isLivecam: false,
      isAI: false,
      isVerified: true,
      isFeatured: true
    },
    capabilities: {
      hasPhotos: true,
      hasVideos: true,
      hasStories: true,
      hasChat: true,
      hasBooking: true,
      hasLiveStream: false,
      hasExclusiveContent: true,
      hasRealMeets: true,
      hasVirtualMeets: false
    },
    monetization: {
      acceptsLucoin: true,
      acceptsTips: true,
      subscriptionPrice: 29.99,
      unlockingPrice: 300,
      boostingActive: true
    },
    contentCount: {
      photos: 45,
      videos: 7
    }
  },
  {
    id: "p2",
    username: "emma_black",
    displayName: "Emma Black",
    image: "https://example.com/emma.jpg",
    imageUrl: "https://example.com/emma.jpg",
    avatarUrl: "https://example.com/emma-avatar.jpg",
    location: "Los Angeles",
    language: "English",
    bio: "Content creator specializing in lifestyle and fashion",
    age: 24,
    ethnicity: "Mixed",
    tags: ["Fashion", "Lifestyle", "Vlogger"],
    createdAt: new Date(),
    updatedAt: new Date(),
    rating: 4.8,
    roleFlags: {
      isEscort: false,
      isCreator: true,
      isLivecam: false,
      isAI: false,
      isVerified: true,
      isFeatured: false
    },
    capabilities: {
      hasPhotos: true,
      hasVideos: true,
      hasStories: true,
      hasChat: true,
      hasBooking: false,
      hasLiveStream: true,
      hasExclusiveContent: true,
      hasContent: true
    },
    monetization: {
      acceptsLucoin: true,
      acceptsTips: true,
      subscriptionPrice: 9.99
    },
    contentCount: {
      photos: 45,
      videos: 12,
      streams: 3
    }
  },
  {
    id: "p3",
    username: "luna_star",
    displayName: "Luna Star",
    image: "https://example.com/luna.jpg",
    imageUrl: "https://example.com/luna.jpg",
    avatarUrl: "https://example.com/luna-avatar.jpg",
    location: "Miami",
    language: "Spanish",
    bio: "Live performer offering interactive shows",
    age: 26,
    ethnicity: "Hispanic",
    tags: ["Live Shows", "Interactive", "Adult"],
    createdAt: new Date(),
    updatedAt: new Date(),
    rating: 4.7,
    price: 150,
    isOnline: true,
    roleFlags: {
      isEscort: false,
      isCreator: true,
      isLivecam: true,
      isAI: false,
      isVerified: true,
      isFeatured: false
    },
    capabilities: {
      hasPhotos: true,
      hasVideos: true,
      hasStories: true,
      hasChat: true,
      hasBooking: false,
      hasLiveStream: true,
      hasExclusiveContent: true
    },
    monetization: {
      acceptsLucoin: true,
      acceptsTips: true,
      subscriptionPrice: 12.99
    },
    contentCount: {
      photos: 120,
      videos: 35,
      streams: 25
    }
  }
];

export const useUberPersonas = () => {
  const [personas, setPersonas] = useState<UberPersona[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Load personas from API or mock data
  const loadPersonas = useCallback(async (useCache = true) => {
    // Skip if we already have data and useCache is true
    if (useCache && personas.length > 0) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // For now, we'll just use the mock data with a delay to simulate network
      await new Promise(resolve => setTimeout(resolve, 800));
      setPersonas(mockPersonas);
    } catch (err: any) {
      console.error("Failed to load personas", err);
      setError(err.message || 'Failed to load personas');
    } finally {
      setIsLoading(false);
    }
  }, [personas.length]);
  
  // Get a specific persona by ID
  const getPersonaById = useCallback((id: string): UberPersona | undefined => {
    return personas.find(persona => persona.id === id);
  }, [personas]);
  
  // Initialize data on first load
  useEffect(() => {
    loadPersonas();
  }, [loadPersonas]);
  
  return {
    personas,
    isLoading,
    error,
    loadPersonas,
    getPersonaById
  };
};

export default useUberPersonas;
