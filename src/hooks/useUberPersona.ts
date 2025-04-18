
import { useState, useEffect } from 'react';
import { Escort } from '@/types/escort';
import { UberPersona } from '@/types/uberPersona';
import { mapEscortToUberPersona } from '@/utils/profileMapping';

export const useUberPersona = (escortId: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [persona, setPersona] = useState<UberPersona | null>(null);
  const [escort, setEscort] = useState<Escort | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch escort data and convert to UberPersona
  useEffect(() => {
    const fetchEscort = async () => {
      if (!escortId) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Mock a fetch for demo purposes
        const response = await fetchEscortById(escortId);
        
        if (response) {
          setEscort(response);
          // Map to UberPersona
          const uberPersona = mapEscortToUberPersona(response);
          setPersona(uberPersona);
        } else {
          setError('Escort not found');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load escort data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEscort();
  }, [escortId]);

  // Mock fetch function
  const fetchEscortById = async (id: string): Promise<Escort> => {
    // This would be a real API call in production
    return new Promise(resolve => {
      setTimeout(() => {
        const mockEscort: Escort = {
          id,
          name: 'Sample Escort',
          age: 24,
          gender: 'female',
          location: 'New York',
          rating: 4.9,
          price: 250,
          verified: true,
          tags: ['Elite', 'VIP'],
          languages: ['English', 'French'],
          bio: "Professional companion for your special events",
          images: ["/assets/escorts/profile1.jpg"],
          services: ["Dinner Date", "Event Companion"],
          isVerified: true,
          featured: false,
          contactInfo: {
            email: "sample@example.com",
            phone: "+1234567890",
            website: "https://example.com/sample"
          }
        };
        resolve(mockEscort);
      }, 500);
    });
  };

  return { persona, escort, isLoading, error };
};

export default useUberPersona;
