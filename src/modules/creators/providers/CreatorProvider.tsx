
import React, { createContext, useState, useEffect, useContext } from 'react';
import { CreatorsNeuralService } from '@/services/neural/modules/CreatorsNeuralService';

// Mock data for initial development
const mockCreators = [
  {
    id: '1',
    name: 'Jane Smith',
    username: 'janesmith',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    bio: 'Content creator and photographer',
    category: 'photography',
    rating: 4.8,
    isVerified: true
  },
  {
    id: '2',
    name: 'Mark Johnson',
    username: 'markj',
    avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    bio: 'Fitness expert and nutrition coach',
    category: 'fitness',
    rating: 4.9,
    isVerified: true
  },
  {
    id: '3',
    name: 'Sarah Williams',
    username: 'sarahw',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    bio: 'Fashion designer and style consultant',
    category: 'fashion',
    rating: 4.7,
    isVerified: false
  }
];

export interface Creator {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  bio: string;
  rating?: number;
  isVerified: boolean;
  category?: string;
}

interface CreatorContextProps {
  creators: Creator[];
  loading: boolean;
  error: string | null;
  getCreatorById?: (id: string) => Creator | undefined;
}

export const CreatorContext = createContext<CreatorContextProps>({
  creators: [],
  loading: false,
  error: null
});

export const useCreatorContext = () => useContext(CreatorContext);

interface CreatorProviderProps {
  children: React.ReactNode;
}

const CreatorProvider: React.FC<CreatorProviderProps> = ({ children }) => {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize with mock data for development
  useEffect(() => {
    const loadCreators = async () => {
      try {
        setCreators(mockCreators);
        setLoading(false);
      } catch (err) {
        setError('Failed to load creators');
        setLoading(false);
      }
    };

    loadCreators();
  }, []);

  const getCreatorById = (id: string) => {
    return creators.find(creator => creator.id === id);
  };

  return (
    <CreatorContext.Provider value={{ creators, loading, error, getCreatorById }}>
      {children}
    </CreatorContext.Provider>
  );
};

export default CreatorProvider;
