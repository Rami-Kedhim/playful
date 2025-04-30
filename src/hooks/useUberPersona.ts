
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
        
        // Generate mock data
        const mockPersona: UberPersona = {
          id: personaId,
          type: 'escort',
          name: `Persona ${personaId.slice(0, 5)}`,
          displayName: `Persona ${personaId.slice(0, 5)}`,
          username: `persona_${personaId.slice(0, 5)}`,
          bio: 'This is a test persona.',
          description: 'A longer description of the persona.',
          isActive: true,
          isVerified: true,
          verified: true,
          rating: 4.5,
          profileImageUrl: `https://picsum.photos/id/${parseInt(personaId.slice(0, 5), 16) % 100}/200/300`,
          galleryImages: [
            `https://picsum.photos/id/${(parseInt(personaId.slice(0, 5), 16) + 1) % 100}/200/300`,
            `https://picsum.photos/id/${(parseInt(personaId.slice(0, 5), 16) + 2) % 100}/200/300`,
            `https://picsum.photos/id/${(parseInt(personaId.slice(0, 5), 16) + 3) % 100}/200/300`,
          ],
          createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          updatedAt: new Date(),
          status: 'active',
          dataSource: 'ai_generated',
          systemMetadata: {
            statusFlags: {
              isVerified: true, 
              isActive: true,
              isFreemium: false,
              isSubscriber: true
            },
          },
          age: 25,
          gender: 'female',
          location: {
            city: 'New York',
            country: 'USA'
          },
          languages: ['English', 'Spanish'],
          traits: ['Friendly', 'Outgoing', 'Creative'],
          stats: {
            followers: 1200,
            likes: 3500,
            views: 12000
          },
          availability: {
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: false,
            sunday: false
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
