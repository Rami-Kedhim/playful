
import { useState, useEffect, useCallback } from 'react';
import { UberPersona } from '@/types/UberPersona';

// Sample data
const samplePersonas: UberPersona[] = [
  {
    id: 'escort-1',
    displayName: 'Sofia',
    avatarUrl: '/images/personas/sofia.jpg',
    type: 'escort',
    isOnline: true,
    rating: 4.7,
    location: 'Amsterdam',
    country: 'Netherlands',
    tags: ['verified', 'premium', 'available']
  },
  {
    id: 'creator-1',
    displayName: 'Mia',
    avatarUrl: '/images/personas/mia.jpg',
    type: 'creator',
    isPremium: true,
    rating: 4.9,
    location: 'Los Angeles',
    country: 'USA',
    tags: ['verified', 'premium', 'content']
  },
  {
    id: 'livecam-1',
    displayName: 'Elena',
    avatarUrl: '/images/personas/elena.jpg',
    type: 'livecam',
    isOnline: true,
    rating: 4.8,
    location: 'Kyiv',
    country: 'Ukraine',
    tags: ['verified', 'hd', 'live']
  },
  {
    id: 'ai-1',
    displayName: 'Lucy AI',
    avatarUrl: '/images/personas/lucy.jpg',
    type: 'ai',
    isPremium: true,
    rating: 5.0,
    location: 'Virtual',
    country: 'Digital',
    tags: ['ai', 'companion', '24/7']
  }
];

export const useUberPersona = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [escortPersonas, setEscortPersonas] = useState<UberPersona[]>([]);
  const [creatorPersonas, setCreatorPersonas] = useState<UberPersona[]>([]);
  const [livecamPersonas, setLivecamPersonas] = useState<UberPersona[]>([]);
  const [aiPersonas, setAIPersonas] = useState<UberPersona[]>([]);
  
  const fetchPersonas = useCallback(async () => {
    setLoading(true);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Filter by type
      setEscortPersonas(samplePersonas.filter(p => p.type === 'escort'));
      setCreatorPersonas(samplePersonas.filter(p => p.type === 'creator'));
      setLivecamPersonas(samplePersonas.filter(p => p.type === 'livecam'));
      setAIPersonas(samplePersonas.filter(p => p.type === 'ai'));
      
      setError(null);
    } catch (err) {
      console.error('Error fetching personas:', err);
      setError('Failed to load personas.');
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchPersonas();
  }, [fetchPersonas]);
  
  return {
    loading,
    error,
    escortPersonas,
    creatorPersonas,
    livecamPersonas,
    aiPersonas,
    refetch: fetchPersonas
  };
};

export default useUberPersona;
