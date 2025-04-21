import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Escort } from '@/types/escort';

interface EscortContextProps {
  escorts: Escort[];
  loading: boolean;
  error: string | null;
  getEscortById: (id: string) => Escort | null;
  refreshEscorts: () => Promise<void>;
}

const EscortContext = createContext<EscortContextProps>({
  escorts: [],
  loading: false,
  error: null,
  getEscortById: () => null,
  refreshEscorts: async () => {}
});

export const useEscortContext = () => useContext(EscortContext);

export const EscortProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [escorts, setEscorts] = useState<Escort[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getEscortById = (id: string): Escort | null => {
    return escorts.find(escort => escort.id === id) || null;
  };

  const refreshEscorts = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const mockEscorts: Escort[] = [
        {
          id: "1",
          name: "Emma",
          age: 28,
          location: "New York",
          rating: 4.9,
          reviewCount: 120,
          verified: true,
          tags: ["massage", "dinner", "events"],
          price: 250,
          imageUrl: "https://example.com/emma.jpg",
          availableNow: true,
          bio: "Professional companion for your special events",
          services: ["Dinner Date", "Event Companion"],
          images: ["/assets/escorts/profile1.jpg"],
          isVerified: true,
          featured: false,
          contactInfo: {
            email: "emma@example.com",
            phone: "+1234567890",
            website: "https://example.com/emma"
          }
        },
        {
          id: "2",
          name: "Sophia",
          age: 26,
          location: "Los Angeles",
          rating: 4.8,
          reviewCount: 95,
          verified: true,
          tags: ["companionship", "travel", "dinner"],
          price: 300,
          imageUrl: "https://example.com/sophia.jpg",
          availableNow: false,
          bio: "Elegant companion for all occasions",
          services: ["Dinner Date", "Travel Companion"],
          images: ["/assets/escorts/profile2.jpg"],
          isVerified: true,
          featured: true,
          contactInfo: {
            email: "sophia@example.com",
            phone: "+1234567891",
            website: "https://example.com/sophia"
          }
        }
      ];
      
      setEscorts(mockEscorts);
    } catch (err) {
      console.error("Failed to fetch escorts:", err);
      setError("Failed to load escorts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    refreshEscorts();
  }, []);

  return (
    <EscortContext.Provider value={{ 
      escorts, 
      loading, 
      error,
      getEscortById,
      refreshEscorts
    }}>
      {children}
    </EscortContext.Provider>
  );
};
