
import { useState, useCallback, useEffect } from 'react';
import { UberPersona } from '@/types/uberPersona';
import { Escort } from '@/types/escort';
import { ContentCreator } from '@/types/creator';

// Mock data for initial development
const mockPersonas: UberPersona[] = [
  {
    id: "p1",
    name: "Sophia Rose",
    image: "https://example.com/sophia.jpg",
    imageUrl: "https://example.com/sophia.jpg",
    avatarUrl: "https://example.com/sophia-avatar.jpg",
    profileType: "escort",
    description: "Elite companion available for dinner dates and travel",
    rating: 4.9,
    price: 300,
    location: "New York",
    tags: ["Elite", "GFE", "Travel Companion"],
    isVerified: true,
    isActive: true,
    isOnline: true,
    personaFlags: {
      isEscort: true,
      isVerified: true,
    },
    capabilities: {
      hasChat: true,
      hasBooking: true,
      hasPhotos: true,
      hasVideos: true,
    }
  },
  {
    id: "p2",
    name: "Emma Black",
    image: "https://example.com/emma.jpg",
    imageUrl: "https://example.com/emma.jpg",
    avatarUrl: "https://example.com/emma-avatar.jpg",
    profileType: "creator",
    description: "Content creator specializing in lifestyle and fashion",
    rating: 4.8,
    location: "Los Angeles",
    tags: ["Fashion", "Lifestyle", "Vlogger"],
    isVerified: true,
    isActive: true,
    personaFlags: {
      isCreator: true,
      isVerified: true,
    },
    capabilities: {
      hasChat: true,
      hasContent: true,
      hasSubscription: true,
    },
    contentCount: {
      photos: 45,
      videos: 12,
      streams: 3
    }
  },
  {
    id: "p3",
    name: "Luna Star",
    image: "https://example.com/luna.jpg",
    imageUrl: "https://example.com/luna.jpg",
    avatarUrl: "https://example.com/luna-avatar.jpg",
    profileType: "livecam",
    description: "Live performer offering interactive shows",
    rating: 4.7,
    price: 150,
    location: "Miami",
    isVerified: true,
    isOnline: true,
    personaFlags: {
      isCreator: true,
      isVerified: true,
    },
    capabilities: {
      hasChat: true,
      hasLivestream: true,
      hasContent: true,
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
