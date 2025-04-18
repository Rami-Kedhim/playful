
import React, { createContext, useState, useEffect, useContext } from 'react';
import { LivecamsNeuralService } from '@/services/neural/modules/LivecamsNeuralService';

// Mock livecam data for initial development
const mockLivecams = [
  {
    id: '1',
    title: 'Morning Yoga',
    performerId: '101',
    performerName: 'Elena',
    performerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    viewerCount: 128,
    isLive: true,
    tags: ['yoga', 'fitness', 'wellness'],
    isPremium: false
  },
  {
    id: '2',
    title: 'DJ Session - Electronic Vibes',
    performerId: '102',
    performerName: 'Mike',
    performerAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    viewerCount: 356,
    isLive: true,
    tags: ['music', 'dj', 'electronic'],
    isPremium: true
  },
  {
    id: '3',
    title: 'Cooking Class - Italian Pasta',
    performerId: '103',
    performerName: 'Sophia',
    performerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    viewerCount: 219,
    isLive: true,
    tags: ['cooking', 'food', 'italian'],
    isPremium: false
  }
];

export interface Livecam {
  id: string;
  title: string;
  performerId: string;
  performerName: string;
  performerAvatar: string;
  thumbnailUrl: string;
  viewerCount: number;
  isLive: boolean;
  tags: string[];
  isPremium: boolean;
}

interface LivecamContextProps {
  livecams: Livecam[];
  loading: boolean;
  error: string | null;
}

export const LivecamContext = createContext<LivecamContextProps>({
  livecams: [],
  loading: false,
  error: null
});

export const useLivecamContext = () => useContext(LivecamContext);

interface LivecamProviderProps {
  children: React.ReactNode;
}

const LivecamProvider: React.FC<LivecamProviderProps> = ({ children }) => {
  const [livecams, setLivecams] = useState<Livecam[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize the livecams
  useEffect(() => {
    const loadLivecams = async () => {
      try {
        // In a real app, this would fetch from an API
        setLivecams(mockLivecams);
        setLoading(false);
      } catch (err) {
        setError('Failed to load livecams');
        setLoading(false);
      }
    };

    loadLivecams();
  }, []);

  return (
    <LivecamContext.Provider value={{ livecams, loading, error }}>
      {children}
    </LivecamContext.Provider>
  );
};

export default LivecamProvider;
