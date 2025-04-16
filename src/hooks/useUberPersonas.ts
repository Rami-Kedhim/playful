
import { useState, useCallback, useEffect } from 'react';
import { UberPersona } from '@/types/uberPersona';
import escortService from '@/services/escortService';

export const useUberPersonas = () => {
  const [personas, setPersonas] = useState<UberPersona[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const convertToUberPersona = (profile: any): UberPersona => {
    return {
      id: profile.id || '',
      username: profile.username || `user_${profile.id?.slice(0, 5)}`,
      displayName: profile.name || profile.displayName || '',
      avatarUrl: profile.imageUrl || profile.avatar || profile.avatar_url || profile.profileImage || '/placeholder-avatar.jpg',
      language: profile.language || 'en',
      location: profile.location || 'Unknown',
      isOnline: profile.availableNow || false,
      lastActive: profile.lastActive ? new Date(profile.lastActive) : undefined,
      bio: profile.bio || profile.about || profile.description || '',
      rating: profile.rating || undefined,
      popularity: profile.popularity || undefined,
      gender: profile.gender || undefined,
      age: profile.age || undefined,
      roleFlags: {
        isEscort: profile.profileType === 'escort' || !!profile.isEscort,
        isCreator: profile.profileType === 'creator' || !!profile.isCreator,
        isLivecam: profile.profileType === 'livecam' || !!profile.isLivecam,
        isVerified: !!profile.verified || !!profile.is_verified,
        isFeatured: !!profile.featured || !!profile.is_featured,
        isAI: !!profile.isAI
      },
      tags: profile.tags || [],
      price: profile.price || undefined,
      capabilities: {
        hasContent: !!profile.providesVirtualContent || !!profile.contentStats?.photos,
        hasLiveStream: !!profile.contentStats?.live,
        hasVirtualMeets: !!profile.providesVirtualContent,
        hasRealMeets: !!profile.providesInPersonServices
      },
      monetization: {
        acceptsLucoin: true,
        pricePerMessage: 1,
        subscriptionPrice: profile.subscriptionPrice || 9.99,
        videoChatPrice: 50,
        meetingPrice: profile.price || profile.rates?.hourly || 150
      }
    };
  };
  
  const loadPersonas = useCallback(async (useCache = true) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Get data from escort service
      const allProfiles = await escortService.getAllProfiles();
      
      // Convert each profile to UberPersona format
      const convertedPersonas = allProfiles.map(convertToUberPersona);
      
      setPersonas(convertedPersonas);
    } catch (error: any) {
      setError(error.message || 'Failed to load personas');
      console.error('Error loading personas:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    loadPersonas();
  }, [loadPersonas]);
  
  const getEscorts = useCallback(() => {
    return personas.filter(persona => persona.roleFlags?.isEscort);
  }, [personas]);
  
  const getCreators = useCallback(() => {
    return personas.filter(persona => persona.roleFlags?.isCreator);
  }, [personas]);
  
  const getLivecams = useCallback(() => {
    return personas.filter(persona => persona.roleFlags?.isLivecam);
  }, [personas]);
  
  const getPersonaById = useCallback((id: string) => {
    return personas.find(persona => persona.id === id);
  }, [personas]);
  
  return {
    personas,
    isLoading,
    error,
    loadPersonas,
    getEscorts,
    getCreators,
    getLivecams,
    getPersonaById
  };
};
