
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Escort } from '@/types/escort';

interface FavoritesState {
  escorts: Escort[];
  creators: any[];
  livecams: any[];
}

export interface FavoritesContextProps {
  favorites: FavoritesState;
  isFavorite: (type: 'escorts' | 'creators' | 'livecams', id: string) => boolean;
  toggleFavorite: (type: 'escorts' | 'creators' | 'livecams', id: string) => void;
  removeFavorite: (type: 'escorts' | 'creators' | 'livecams', id: string) => void;
  addFavorite: (type: 'escorts' | 'creators' | 'livecams', item: any) => void;
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
  const [favorites, setFavorites] = useState<FavoritesState>({
    escorts: [],
    creators: [],
    livecams: []
  });

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error('Failed to parse favorites from localStorage:', e);
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (type: 'escorts' | 'creators' | 'livecams', id: string) => {
    return favorites[type].some(item => item.id === id);
  };

  const addFavorite = (type: 'escorts' | 'creators' | 'livecams', item: any) => {
    if (!isFavorite(type, item.id)) {
      setFavorites(prev => ({
        ...prev,
        [type]: [...prev[type], item]
      }));
    }
  };

  const removeFavorite = (type: 'escorts' | 'creators' | 'livecams', id: string) => {
    setFavorites(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item.id !== id)
    }));
  };

  const toggleFavorite = (type: 'escorts' | 'creators' | 'livecams', id: string) => {
    if (isFavorite(type, id)) {
      removeFavorite(type, id);
    } else {
      // For toggle, we need the item object, not just the ID
      // This is a simplified approach; in a real app, you might fetch the item details
      const dummyItem = { id };
      addFavorite(type, dummyItem);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        removeFavorite,
        addFavorite
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
