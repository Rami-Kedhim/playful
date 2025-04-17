
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
      // Placeholder for actual API call
      // In a real app, we would fetch from an API endpoint
      const mockEscorts: Escort[] = [
        {
          id: "1",
          name: "Emma",
          age: 28,
          location: "New York",
          gender: "female",
          rating: 4.9,
          reviewCount: 120,
          verified: true,
          tags: ["massage", "dinner", "events"],
          price: 250,
          imageUrl: "https://example.com/emma.jpg",
          availableNow: true
        },
        {
          id: "2",
          name: "Sophia",
          age: 26,
          location: "Los Angeles",
          gender: "female",
          rating: 4.8,
          reviewCount: 95,
          verified: true,
          tags: ["companionship", "travel", "dinner"],
          price: 300,
          imageUrl: "https://example.com/sophia.jpg",
          availableNow: false
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

  // Initialize data on first load
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
