
import { useState, useEffect } from 'react';
import { UberPersona } from '@/types/uberPersona';

export const useUberPersona = (id?: string) => {
  const [persona, setPersona] = useState<UberPersona | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchPersona = async () => {
      try {
        setLoading(true);
        // Mock data for demo purposes
        const mockPersona: UberPersona = {
          id: id,
          name: `Persona ${id}`,
          type: 'escort',
          avatarUrl: 'https://example.com/avatar.jpg',
          location: 'New York, US',
          isVerified: true,
          isActive: true,
          tags: ['VIP', 'Premium'],
          services: ['Companion', 'Event Escort'],
          rating: 4.8,
          reviewCount: 52,
          isPremium: true,
          systemMetadata: {
            boostScore: 85,
            lastActive: new Date(),
            createdAt: new Date(),
            profileViews: 1240,
            lastSynced: new Date(),
            source: 'API', // This is now valid because we added it to the type
            tagsGeneratedByAI: false
          },
          roleFlags: {
            isEscort: true,
            isCreator: false,
            isLivecam: false,
            isAI: false,
            isVerified: true
          },
          stats: {
            views: 2450,
            likes: 380,
            bookings: 24,
            completion: 98,
            responseRate: 95,
            responseTime: 15,
            rating: 4.8 // This is now valid because we added it to the type
          },
          bio: 'Professional escort with 5+ years of experience...',
          availability: [
            {
              start: new Date(),
              end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            }
          ],
          monetization: {
            hourlyRate: 300,
            minRate: 250,
            maxRate: 500,
            acceptsUbx: true,
            meetingPrice: 300 // This is now valid because we added it to the type
          }
        };
        
        setPersona(mockPersona);
        setError(null);
      } catch (err: any) {
        console.error('Failed to fetch persona:', err);
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPersona();
  }, [id]);

  return { persona, loading, error };
};
