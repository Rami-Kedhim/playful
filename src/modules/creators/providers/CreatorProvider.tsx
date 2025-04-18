
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CreatorsNeuralService, creatorsNeuralService } from '@/services/neural';

// Define the Creator type
export interface Creator {
  id: string;
  name: string;
  username: string;
  bio: string;
  location: string;
  imageUrl: string;
  coverImage?: string;
  rating: number;
  price: number;
  contentCount: {
    photos: number;
    videos: number;
    stories?: number;
  };
  tags: string[];
  isLive?: boolean;
  isPremium?: boolean;
  isAI?: boolean;
  subscriberCount: number;
  type?: string;
}

// Create the context
interface CreatorContextProps {
  creators: Creator[];
  loading: boolean;
  error: string | null;
  getCreatorById: (id: string) => Creator | undefined;
}

export const CreatorContext = createContext<CreatorContextProps | null>(null);

// Mock data for development
const MOCK_CREATORS: Creator[] = [
  {
    id: 'creator-1',
    name: 'Sophia Lee',
    username: 'sophia_creates',
    bio: 'Lifestyle and travel content creator sharing adventures from around the world.',
    location: 'Los Angeles, CA',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    rating: 4.8,
    price: 12.99,
    contentCount: {
      photos: 342,
      videos: 48
    },
    tags: ['travel', 'lifestyle', 'photography'],
    isPremium: true,
    subscriberCount: 24500,
    type: 'lifestyle'
  },
  {
    id: 'creator-2',
    name: 'Tyler James',
    username: 'tylerj',
    bio: 'Fitness expert sharing workout tips and nutrition advice.',
    location: 'Miami, FL',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    rating: 4.6,
    price: 9.99,
    contentCount: {
      photos: 156,
      videos: 78
    },
    tags: ['fitness', 'nutrition', 'health'],
    subscriberCount: 18700,
    type: 'fitness'
  }
];

// Provider component
interface CreatorProviderProps {
  children: React.ReactNode;
}

const CreatorProvider: React.FC<CreatorProviderProps> = ({ children }) => {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Initialize and fetch creators
  useEffect(() => {
    const fetchCreators = async () => {
      try {
        setLoading(true);
        
        // In a real app, this would be an API call
        // For now, we'll use our mock data
        setCreators(MOCK_CREATORS);
        
        // Initialize neural service if needed
        creatorsNeuralService.configure({ enabled: true });
        
        setError(null);
      } catch (err) {
        console.error('Failed to fetch creators:', err);
        setError('Failed to load creators. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCreators();
  }, []);
  
  // Helper function to get a creator by ID
  const getCreatorById = (id: string): Creator | undefined => {
    return creators.find(creator => creator.id === id);
  };
  
  // Context value
  const value = {
    creators,
    loading,
    error,
    getCreatorById
  };
  
  return (
    <CreatorContext.Provider value={value}>
      {children}
    </CreatorContext.Provider>
  );
};

// Custom hook
export const useCreatorContext = () => {
  const context = useContext(CreatorContext);
  if (!context) {
    throw new Error('useCreatorContext must be used within a CreatorProvider');
  }
  return context;
};

export default CreatorProvider;
