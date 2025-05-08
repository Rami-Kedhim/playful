
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Livecam, LivecamModel } from '@/types/livecams';

interface LivecamContextType {
  livecams: Livecam[];
  featuredLivecams: Livecam[];
  popularLivecams: Livecam[];
  loading: boolean;
  error: string | null;
  refreshLivecams: () => void;
}

const LivecamContext = createContext<LivecamContextType | undefined>(undefined);

export const useLivecamContext = () => {
  const context = useContext(LivecamContext);
  if (context === undefined) {
    throw new Error('useLivecamContext must be used within a LivecamProvider');
  }
  return context;
};

interface LivecamProviderProps {
  children: ReactNode;
}

export const LivecamProvider: React.FC<LivecamProviderProps> = ({ children }) => {
  const [livecams, setLivecams] = useState<Livecam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchLivecams = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock data with properly typed Livecam objects
      const mockLivecams: Livecam[] = [
        {
          id: '1',
          name: 'Sophia',
          username: 'sophialive',
          displayName: 'Sophia Live',
          imageUrl: 'https://example.com/sophia.jpg',
          thumbnailUrl: 'https://example.com/sophia-thumb.jpg',
          isLive: true,
          isStreaming: true,
          viewerCount: 425,
          tags: ['dance', 'fitness'],
          rating: 4.9,
          price: 55,
          category: 'Dance',
          language: 'English',
          country: 'US',
          description: 'Join my livestream for dance and fitness routines!'
        },
        {
          id: '2',
          name: 'Emma',
          username: 'emmagaming',
          displayName: 'Emma Gaming',
          imageUrl: 'https://example.com/emma.jpg',
          thumbnailUrl: 'https://example.com/emma-thumb.jpg',
          isLive: true,
          isStreaming: true,
          viewerCount: 318,
          tags: ['gaming', 'rpg'],
          rating: 4.7,
          price: 45,
          category: 'Gaming',
          language: 'English',
          country: 'CA',
          description: 'RPG gaming streams every evening'
        },
        {
          id: '3',
          name: 'Mia',
          username: 'miamusic',
          displayName: 'Mia Music',
          imageUrl: 'https://example.com/mia.jpg',
          thumbnailUrl: 'https://example.com/mia-thumb.jpg',
          isLive: false,
          isStreaming: false,
          viewerCount: 0,
          tags: ['music', 'piano'],
          rating: 4.8,
          price: 50,
          category: 'Music',
          language: 'English',
          country: 'UK',
          description: 'Piano performances and music theory'
        }
      ];
      
      setLivecams(mockLivecams);
      setError(null);
    } catch (err) {
      console.error('Error fetching livecams:', err);
      setError('Failed to load livecams');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchLivecams();
  }, []);
  
  // Filter featured and popular livecams
  const featuredLivecams = livecams.filter(livecam => livecam.rating !== undefined && livecam.rating > 4.7);
  const popularLivecams = [...livecams].sort((a, b) => b.viewerCount - a.viewerCount).slice(0, 5);
  
  return (
    <LivecamContext.Provider
      value={{
        livecams,
        featuredLivecams,
        popularLivecams,
        loading,
        error,
        refreshLivecams: fetchLivecams
      }}
    >
      {children}
    </LivecamContext.Provider>
  );
};
