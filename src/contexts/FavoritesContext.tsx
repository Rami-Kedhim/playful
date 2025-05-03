
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Escort } from '@/types/Escort';

interface FavoritesContextProps {
  favorites: {
    escorts: Escort[];
    creators: any[];
    livecams: any[];
  };
  addFavorite: (type: 'escorts' | 'creators' | 'livecams', item: any) => void;
  removeFavorite: (type: 'escorts' | 'creators' | 'livecams', id: string) => void;
  clearFavorites: (type?: 'escorts' | 'creators' | 'livecams') => void;
  isFavorite: (type: 'escorts' | 'creators' | 'livecams', id: string) => boolean;
  toggleFavorite: (type: 'escorts' | 'creators' | 'livecams', id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<{
    escorts: Escort[];
    creators: any[];
    livecams: any[];
  }>({
    escorts: [],
    creators: [],
    livecams: [],
  });

  // Load favorites from localStorage when component mounts
  useEffect(() => {
    const storedFavorites = localStorage.getItem('uberEscorts_favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('uberEscorts_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (type: 'escorts' | 'creators' | 'livecams', item: any) => {
    setFavorites(prev => {
      // Check if item already exists in favorites
      if (prev[type].some(fav => fav.id === item.id)) {
        return prev; // Don't add if already a favorite
      }
      
      return {
        ...prev,
        [type]: [...prev[type], item]
      };
    });
  };

  const removeFavorite = (type: 'escorts' | 'creators' | 'livecams', id: string) => {
    setFavorites(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item.id !== id)
    }));
  };

  const clearFavorites = (type?: 'escorts' | 'creators' | 'livecams') => {
    if (type) {
      setFavorites(prev => ({
        ...prev,
        [type]: []
      }));
    } else {
      setFavorites({
        escorts: [],
        creators: [],
        livecams: []
      });
    }
  };

  const isFavorite = (type: 'escorts' | 'creators' | 'livecams', id: string) => {
    return favorites[type].some(item => item.id === id);
  };
  
  const toggleFavorite = (type: 'escorts' | 'creators' | 'livecams', id: string) => {
    if (isFavorite(type, id)) {
      removeFavorite(type, id);
    } else {
      // Find the item in some data source and add it
      // For now, we'll just add an object with the ID
      addFavorite(type, { id });
    }
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addFavorite,
      removeFavorite,
      clearFavorites,
      isFavorite,
      toggleFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};
