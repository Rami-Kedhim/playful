
import { useState, useEffect } from 'react';
import type { UberPersona } from '@/types/uberPersona';

export const useUberPersona = (personaId?: string) => {
  const [persona, setPersona] = useState<UberPersona | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!personaId) return;

    const fetchPersona = async () => {
      setLoading(true);
      try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Generate mock data with proper types
        const mockPersona: UberPersona = {
          id: personaId,
          type: 'escort',
          name: `Persona ${personaId.slice(0, 5)}`,
          displayName: `Persona ${personaId.slice(0, 5)}`,
          username: `persona_${personaId.slice(0, 5)}`,
          bio: 'This is a test persona.',
          description: 'A longer description of the persona.',
          isActive: true,
          isOnline: true,
          isVerified: true,
          rating: 4.5,
          profileImageUrl: `https://picsum.photos/id/${parseInt(personaId.slice(0, 5), 16) % 100}/200/300`,
          avatarUrl: `https://picsum.photos/id/${parseInt(personaId.slice(0, 5), 16) % 100}/200/300`,
          galleryImages: [
            `https://picsum.photos/id/${(parseInt(personaId.slice(0, 5), 16) + 1) % 100}/200/300`,
            `https://picsum.photos/id/${(parseInt(personaId.slice(0, 5), 16) + 2) % 100}/200/300`,
            `https://picsum.photos/id/${(parseInt(personaId.slice(0, 5), 16) + 3) % 100}/200/300`,
          ],
          systemMetadata: {
            source: 'manual', // Now defined in type
            tagsGeneratedByAI: false,
            hilbertSpaceVector: [],
            statusFlags: {
              isVerified: true, 
              isActive: true,
              isFreemium: false,
              isSubscriber: true
            }
          },
          age: 25,
          location: 'New York, USA', 
          languages: ['English', 'Spanish'],
          traits: ['Friendly', 'Outgoing', 'Creative'],
          stats: {
            rating: 4.5, // Now defined in type
            reviewCount: 120,
            responseTime: 30,
            views: 12000,
            bookings: 45
          },
          availability: {
            nextAvailable: new Date('2023-10-15T14:00:00Z'), // Fixed to use Date object instead of string
            schedule: {
              monday: { available: true },
              tuesday: { available: true },
              wednesday: { available: true },
              thursday: { available: true },
              friday: { available: true },
              saturday: { available: false },
              sunday: { available: false }
            }
          },
          // Add the necessary roleFlags and capabilities properties
          roleFlags: {
            isEscort: true,
            isCreator: false,
            isLivecam: false,
            isAI: false,
            isVerified: true,
            isFeatured: false
          },
          capabilities: {
            hasPhotos: true,
            hasVideos: false,
            hasStories: false,
            hasChat: true,
            hasBooking: true,
            hasLiveStream: false,
            hasExclusiveContent: false,
            hasContent: true,
            hasRealMeets: true,
            hasVirtualMeets: false
          }
        };
        
        setPersona(mockPersona);
        setError(null);
      } catch (err: any) {
        console.error('Failed to fetch persona:', err);
        setError(err.message || 'Failed to fetch persona');
        setPersona(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPersona();
  }, [personaId]);

  return {
    persona,
    loading,
    error
  };
};

export default useUberPersona;
