
import { useState, useEffect } from 'react';
import { UberPersona } from '@/types/uberPersona';

// Mock data generator for UberPersona
const generateMockPersona = (id: string): UberPersona => {
  return {
    id,
    name: `Persona ${id.substring(0, 5)}`,
    displayName: `Display Name ${id.substring(0, 5)}`,
    description: 'A detailed description of this persona',
    avatarUrl: `https://picsum.photos/seed/${id}/200`,
    isOnline: Math.random() > 0.5,
    isVerified: Math.random() > 0.3,
    isPremium: Math.random() > 0.7,
    isFeatured: Math.random() > 0.8,
    location: 'New York, USA',
    rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
    tags: ['friendly', 'creative', 'energetic'],
    bio: 'This is a brief bio about me and what I do.',
    languages: ['English', 'Spanish'],
    traits: ['creative', 'analytical', 'social'],
    stats: {
      popularity: Math.round(Math.random() * 100),
      intelligence: Math.round(Math.random() * 100),
      charm: Math.round(Math.random() * 100),
      energy: Math.round(Math.random() * 100),
      views: Math.round(Math.random() * 1000),
      likes: Math.round(Math.random() * 500),
      responseRate: Math.round(Math.random() * 100),
      responseTime: `${Math.round(Math.random() * 60)} minutes`
    },
    monetization: {
      hourlyRate: 50 + Math.round(Math.random() * 150),
      packages: [
        {
          name: 'Basic',
          price: 50,
          duration: '1 hour',
          description: 'Basic package with standard features'
        },
        {
          name: 'Premium',
          price: 100,
          duration: '2 hours',
          description: 'Premium package with all features'
        }
      ],
      acceptsUbx: true,
      acceptsFiat: true
    },
    roleFlags: 1,
    isActive: true
  };
};

export const useUberPersona = (personaId?: string) => {
  const [persona, setPersona] = useState<UberPersona | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchPersona = async () => {
      if (!personaId) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        
        // In a real app, you would fetch from an API
        // For now, generate mock data
        setTimeout(() => {
          const mockPersona = generateMockPersona(personaId);
          
          // Add flags
          mockPersona.metadata = {
            flags: {
              isEscort: true,
              isCreator: false,
              isLivecam: false,
              isAI: false,
              isVerified: true
            }
          };
          
          setPersona(mockPersona);
          setLoading(false);
        }, 500);
        
      } catch (err) {
        console.error('Error fetching persona:', err);
        setError('Failed to load persona');
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
