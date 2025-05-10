
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Escort } from '@/types/Escort';

interface EscortContextType {
  escorts: Escort[];
  loading: boolean;
  error: string | null;
  setEscorts: React.Dispatch<React.SetStateAction<Escort[]>>;
}

const EscortContext = createContext<EscortContextType>({
  escorts: [],
  loading: false,
  error: null,
  setEscorts: () => {},
});

export const useEscortContext = () => useContext(EscortContext);

interface EscortProviderProps {
  children: React.ReactNode;
  initialEscorts?: Escort[];
}

export const EscortProvider: React.FC<EscortProviderProps> = ({
  children,
  initialEscorts = [],
}) => {
  const [escorts, setEscorts] = useState<Escort[]>(initialEscorts);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialEscorts.length > 0) {
      setEscorts(initialEscorts);
      return;
    }

    const loadEscorts = async () => {
      setLoading(true);
      try {
        // For now, just use a timeout to simulate loading
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulate escort data
        const demoEscorts: Escort[] = Array(12).fill(null).map((_, index) => ({
          id: `escort-${index + 1}`,
          name: `Escort ${index + 1}`,
          age: 20 + Math.floor(Math.random() * 15),
          gender: index % 3 === 0 ? 'male' : 'female',
          location: ['New York', 'Los Angeles', 'Miami', 'Chicago', 'Las Vegas'][index % 5],
          price: 100 + Math.floor(Math.random() * 400),
          rating: Math.floor(Math.random() * 5) + 1,
          reviewCount: Math.floor(Math.random() * 100),
          imageUrl: `https://source.unsplash.com/random/300x400?portrait&sig=${index}`,
          tags: ['Professional', 'Friendly', 'Verified'],
          isVerified: Math.random() > 0.3,
          providesInPersonServices: Math.random() > 0.2,
          providesVirtualContent: Math.random() > 0.4,
          availableNow: Math.random() > 0.5,
          isAvailable: Math.random() > 0.5
        }));
        
        setEscorts(demoEscorts);
      } catch (err) {
        console.error('Failed to load escorts:', err);
        setError('Failed to load escorts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadEscorts();
  }, [initialEscorts]);

  return (
    <EscortContext.Provider value={{ escorts, loading, error, setEscorts }}>
      {children}
    </EscortContext.Provider>
  );
};
