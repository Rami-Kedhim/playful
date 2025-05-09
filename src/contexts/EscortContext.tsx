
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { Escort } from '@/types/Escort';

interface EscortContextType {
  escorts: Escort[];
  featuredEscorts: Escort[];
  loading: boolean;
  error: string | null;
  getEscortById: (id: string) => Escort | undefined;
  searchEscorts: (query: string) => Escort[];
  filterEscorts: (filters: Record<string, any>) => Escort[];
}

const EscortContext = createContext<EscortContextType | undefined>(undefined);

export const useEscorts = () => {
  const context = useContext(EscortContext);
  
  if (!context) {
    throw new Error('useEscorts must be used within an EscortProvider');
  }
  
  return context;
};

export const EscortProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [escorts, setEscorts] = useState<Escort[]>([]);
  const [featuredEscorts, setFeaturedEscorts] = useState<Escort[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchEscorts = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockEscort1: Escort = {
          id: 'escort-1',
          name: 'Emma Johnson',
          age: 28,
          gender: 'female',
          location: 'New York',
          reviewCount: 24,
          verified: true,
          tags: ['VIP', 'Elite'],
          price: 300,
          imageUrl: 'https://example.com/escort1.jpg',
          availableNow: true,
          bio: 'Professional model offering companionship services.',
          services: ['Dinner Date', 'Events', 'Travel Companion'],
          images: ['https://example.com/escort1-1.jpg', 'https://example.com/escort1-2.jpg'],
          isVerified: true,
          featured: false,
          contactInfo: {
            phone: '+1234567890',
            email: 'emma@example.com',
          }
        };
        
        const mockEscort2: Escort = {
          id: 'escort-2',
          name: 'Sophia Martinez',
          age: 26,
          gender: 'female',
          location: 'Miami',
          reviewCount: 18,
          verified: true,
          tags: ['Premium', 'Elite'],
          price: 350,
          imageUrl: 'https://example.com/escort2.jpg',
          availableNow: false,
          bio: 'Luxury companion for discerning gentlemen.',
          services: ['Dinner Date', 'Events', 'Weekend Getaway'],
          images: ['https://example.com/escort2-1.jpg', 'https://example.com/escort2-2.jpg'],
          isVerified: true,
          featured: true,
          contactInfo: {
            phone: '+1987654321',
            email: 'sophia@example.com',
          }
        };
        
        setEscorts([mockEscort1, mockEscort2]);
        setFeaturedEscorts([mockEscort2]);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch escorts');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEscorts();
  }, []);
  
  const getEscortById = (id: string) => {
    return escorts.find(escort => escort.id === id);
  };
  
  const searchEscorts = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    return escorts.filter(escort => 
      escort.name.toLowerCase().includes(lowerCaseQuery) ||
      escort.location?.toLowerCase().includes(lowerCaseQuery) ||
      escort.services?.some(s => s.toLowerCase().includes(lowerCaseQuery))
    );
  };
  
  const filterEscorts = (filters: Record<string, any>) => {
    return escorts.filter(escort => {
      for (const [key, value] of Object.entries(filters)) {
        if (Array.isArray(value)) {
          if (value.length > 0 && !value.includes(escort[key as keyof Escort])) {
            return false;
          }
        } else if (value !== undefined && escort[key as keyof Escort] !== value) {
          return false;
        }
      }
      return true;
    });
  };
  
  return (
    <EscortContext.Provider
      value={{
        escorts,
        featuredEscorts,
        loading,
        error,
        getEscortById,
        searchEscorts,
        filterEscorts
      }}
    >
      {children}
    </EscortContext.Provider>
  );
};
