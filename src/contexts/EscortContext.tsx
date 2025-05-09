
import React, { createContext, useContext, useState } from 'react';
import { Escort } from '@/types/Escort';

interface EscortContextType {
  escorts: Escort[];
  featuredEscorts: Escort[];
  loading: boolean;
  error: string | null;
  getEscortById: (id: string) => Escort | undefined;
  toggleFavorite: (id: string) => void;
}

const EscortContext = createContext<EscortContextType | undefined>(undefined);

export const useEscorts = () => {
  const context = useContext(EscortContext);
  if (!context) {
    throw new Error('useEscorts must be used within an EscortProvider');
  }
  return context;
};

export const EscortProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Example escort data
  const [escorts, setEscorts] = useState<Escort[]>([
    {
      id: '1',
      name: 'Jessica',
      age: 24,
      gender: 'female', // Add required gender field
      location: 'New York',
      reviewCount: 48,
      verified: true,
      tags: ['GFE', 'Massage', 'Dinner Date'],
      price: 350,
      imageUrl: '/images/escorts/escort1.jpg',
      availableNow: true,
      bio: 'Sophisticated and elegant companion for your every desire.',
      services: ['Massage', 'Dinner Date', 'GFE'],
      images: ['/images/escorts/escort1.jpg', '/images/escorts/escort1-2.jpg'],
      isVerified: true,
      featured: false,
      contactInfo: {
        phone: '+1-555-123-4567',
        email: 'jessica@example.com'
      }
    },
    {
      id: '2',
      name: 'Emma',
      age: 26,
      gender: 'female', // Add required gender field
      location: 'Los Angeles',
      reviewCount: 32,
      verified: true,
      tags: ['Travel Companion', 'GFE', 'Massage'],
      price: 400,
      imageUrl: '/images/escorts/escort2.jpg',
      availableNow: false,
      bio: 'Professional model and elite companion for discerning gentlemen.',
      services: ['Travel Companion', 'GFE', 'Massage'],
      images: ['/images/escorts/escort2.jpg', '/images/escorts/escort2-2.jpg'],
      isVerified: true,
      featured: true,
      contactInfo: {
        phone: '+1-555-987-6543',
        email: 'emma@example.com'
      }
    }
  ]);

  const getEscortById = (id: string) => {
    return escorts.find(escort => escort.id === id);
  };

  const toggleFavorite = (id: string) => {
    setEscorts(prev => prev.map(escort => {
      if (escort.id === id) {
        return { ...escort, isFavorited: !escort.isFavorited };
      }
      return escort;
    }));
  };

  const featuredEscorts = escorts.filter(escort => escort.featured);

  const value = {
    escorts,
    featuredEscorts,
    loading,
    error,
    getEscortById,
    toggleFavorite
  };

  return (
    <EscortContext.Provider value={value}>
      {children}
    </EscortContext.Provider>
  );
};

export default EscortContext;
