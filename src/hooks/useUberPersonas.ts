
import { useState, useEffect, useCallback } from 'react';
import { UberPersona, UberPersonaFeatures, UberPersonaPricing } from '@/types/persona';

export const useUberPersonas = () => {
  const [personas, setPersonas] = useState<UberPersona[]>([
    {
      id: "persona1",
      name: "Aria",
      description: "Charming and sophisticated companion for upscale experiences",
      avatarUrl: "/placeholders/escort-1.jpg",
      bannerUrl: "/placeholders/escort-banner-1.jpg",
      rating: 4.9,
      reviewCount: 124,
      isVerified: true,
      isOnline: true,
      lastActive: new Date(Date.now() - 15 * 60 * 1000),
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
        unlockingPrice: 4.99,
        boostingActive: true,
        meetingPrice: 300
      },
      tags: ["model", "dining", "travel", "luxury", "elite"],
      location: "Miami, FL",
      category: "elite",
      popularity: 95,
      relationships: ["persona4", "persona7"],
      stats: {
        views: 12500,
        likes: 4300,
        followers: 2100
      }
    },
    {
      id: "persona2",
      name: "Luna",
      description: "Artistic soul with a passion for deep connections",
      avatarUrl: "/placeholders/escort-2.jpg",
      bannerUrl: "/placeholders/escort-banner-2.jpg",
      rating: 4.7,
      reviewCount: 86,
      isVerified: true,
      isOnline: false,
      lastActive: new Date(Date.now() - 3 * 60 * 60 * 1000),
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
        unlockingPrice: 3.99,
        boostingActive: false,
        meetingPrice: 0
      },
      tags: ["artistic", "philosophical", "virtual", "romantic"],
      location: "Los Angeles, CA",
      category: "creative",
      popularity: 82,
      relationships: [],
      stats: {
        views: 8400,
        likes: 3100,
        followers: 1750
      }
    },
    {
      id: "persona3",
      name: "Jasmine",
      description: "Adventurous spirit offering unforgettable experiences",
      avatarUrl: "/placeholders/escort-3.jpg",
      bannerUrl: "/placeholders/escort-banner-3.jpg",
      rating: 4.8,
      reviewCount: 103,
      isVerified: true,
      isOnline: true,
      lastActive: new Date(Date.now() - 5 * 60 * 1000),
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
        hasVirtualMeets: true
      },
      pricing: {
        acceptsLucoin: true,
        acceptsTips: true,
        subscriptionPrice: 24.99,
        unlockingPrice: 5.99,
        boostingActive: true,
        meetingPrice: 250
      },
      tags: ["adventure", "travel", "athletic", "outdoors", "spontaneous"],
      location: "Denver, CO",
      category: "adventurous",
      popularity: 90,
      relationships: ["persona5"],
      stats: {
        views: 10200,
        likes: 3800,
        followers: 1950
      }
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<UberPersona | null>(null);

  const getPersonaById = useCallback((id: string) => {
    return personas.find(persona => persona.id === id) || null;
  }, [personas]);

  const selectPersona = useCallback((id: string) => {
    const persona = getPersonaById(id);
    setSelectedPersona(persona);
    return persona;
  }, [getPersonaById]);

  const addPersona = useCallback((persona: Omit<UberPersona, 'id'>) => {
    const newPersona: UberPersona = {
      ...persona,
      id: `persona${Date.now()}`,
    };
    
    setPersonas(prev => [...prev, newPersona]);
    return newPersona;
  }, []);

  const updatePersona = useCallback((id: string, updates: Partial<UberPersona>) => {
    setPersonas(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    
    if (selectedPersona?.id === id) {
      setSelectedPersona(prev => prev ? { ...prev, ...updates } : null);
    }
  }, [selectedPersona]);

  const deletePersona = useCallback((id: string) => {
    setPersonas(prev => prev.filter(p => p.id !== id));
    
    if (selectedPersona?.id === id) {
      setSelectedPersona(null);
    }
  }, [selectedPersona]);

  const getPersonasByCategory = useCallback((category: string) => {
    return personas.filter(p => p.category === category);
  }, [personas]);

  const getPopularPersonas = useCallback((limit = 10) => {
    return [...personas]
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
      .slice(0, limit);
  }, [personas]);

  const getRecommendedPersonas = useCallback((forPersonaId: string, limit = 3) => {
    const persona = getPersonaById(forPersonaId);
    if (!persona) return [];
    
    // Simple recommendation logic based on tags and categories
    return personas
      .filter(p => p.id !== forPersonaId)
      .sort((a, b) => {
        const aSimilarity = (a.tags || []).filter(tag => persona.tags?.includes(tag)).length + 
                          (a.category === persona.category ? 3 : 0);
        const bSimilarity = (b.tags || []).filter(tag => persona.tags?.includes(tag)).length + 
                          (b.category === persona.category ? 3 : 0);
        return bSimilarity - aSimilarity;
      })
      .slice(0, limit);
  }, [personas, getPersonaById]);

  return {
    personas,
    loading,
    selectedPersona,
    getPersonaById,
    selectPersona,
    addPersona,
    updatePersona,
    deletePersona,
    getPersonasByCategory,
    getPopularPersonas,
    getRecommendedPersonas
  };
};

export default useUberPersonas;
