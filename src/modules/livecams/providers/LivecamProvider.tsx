
import React, { createContext, useContext, useState, useEffect } from 'react';
import { LivecamsNeuralService, livecamsNeuralService } from '@/services/neural';

// Define the Livecam type
export interface Livecam {
  id: string;
  performerId: string;
  performerName: string;
  streamTitle: string;
  thumbnailUrl: string;
  isLive: boolean;
  viewerCount: number;
  tags: string[];
  startTime: string;
  category: string;
  price: number;
  isPremium: boolean;
}

// Create the context
interface LivecamContextProps {
  livecams: Livecam[];
  loading: boolean;
  error: string | null;
}

export const LivecamContext = createContext<LivecamContextProps | null>(null);

// Mock data for development
const MOCK_LIVECAMS: Livecam[] = [
  {
    id: 'live-1',
    performerId: 'performer-1',
    performerName: 'Jessica',
    streamTitle: 'Tuesday Vibes',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    isLive: true,
    viewerCount: 245,
    tags: ['dance', 'music'],
    startTime: new Date().toISOString(),
    category: 'entertainment',
    price: 0,
    isPremium: false
  },
  {
    id: 'live-2',
    performerId: 'performer-2',
    performerName: 'Amanda',
    streamTitle: 'Private Show',
    thumbnailUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04',
    isLive: true,
    viewerCount: 89,
    tags: ['private', 'exclusive'],
    startTime: new Date().toISOString(),
    category: 'premium',
    price: 20,
    isPremium: true
  }
];

// Provider component
interface LivecamProviderProps {
  children: React.ReactNode;
}

const LivecamProvider: React.FC<LivecamProviderProps> = ({ children }) => {
  const [livecams, setLivecams] = useState<Livecam[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Initialize and fetch livecams
  useEffect(() => {
    const fetchLivecams = async () => {
      try {
        setLoading(true);
        
        // In a real app, this would be an API call
        // For now, we'll use our mock data
        setLivecams(MOCK_LIVECAMS);
        
        // Initialize neural service if needed
        livecamsNeuralService.configure({ enabled: true });
        
        setError(null);
      } catch (err) {
        console.error('Failed to fetch livecams:', err);
        setError('Failed to load livestreams. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchLivecams();
  }, []);
  
  // Context value
  const value = {
    livecams,
    loading,
    error
  };
  
  return (
    <LivecamContext.Provider value={value}>
      {children}
    </LivecamContext.Provider>
  );
};

// Custom hook
export const useLivecamContext = () => {
  const context = useContext(LivecamContext);
  if (!context) {
    throw new Error('useLivecamContext must be used within a LivecamProvider');
  }
  return context;
};

export default LivecamProvider;
