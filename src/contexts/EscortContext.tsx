
// Fix import to use unified Escort type and remove incompatible properties (rating not defined in Escort type in context)

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Escort } from '@/types/Escort';

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
      // Fix mock escorts to include required gender field
      const mockEscorts: Escort[] = [
        {
          id: "1",
          name: "Emma",
          age: 28,
          gender: "female", // Add missing gender field
          location: "New York",
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
          gender: "female", // Add missing gender field
          location: "Los Angeles",
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
