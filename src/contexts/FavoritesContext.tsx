
import React, { createContext, useContext, useState } from 'react';
// Fix case sensitivity issue with import
import { Escort } from '@/types/escort';

interface FavoritesContextType {
  favorites: {
    escorts: Escort[];
    creators: Escort[];
    livecams: Escort[];
  };
  addFavorite: (escort: Escort) => void;
  removeFavorite: (escortId: string) => void;
  isFavorite: (escortId: string) => boolean;
}

const defaultContext: FavoritesContextType = {
  favorites: {
    escorts: [],
    creators: [],
    livecams: [],
  },
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
};

const FavoritesContext = createContext<FavoritesContextType>(defaultContext);

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<{
    escorts: Escort[];
    creators: Escort[];
    livecams: Escort[];
  }>({
    escorts: [],
    creators: [],
    livecams: [],
  });

  const addFavorite = (escort: Escort) => {
    // Determine which category to add to based on escort type
    // For now, simply add to escorts category
    setFavorites(prev => ({
      ...prev,
      escorts: [...prev.escorts, escort],
    }));
  };

  const removeFavorite = (escortId: string) => {
    setFavorites(prev => ({
      ...prev,
      escorts: prev.escorts.filter(e => e.id !== escortId),
      creators: prev.creators.filter(e => e.id !== escortId),
      livecams: prev.livecams.filter(e => e.id !== escortId),
    }));
  };

  const isFavorite = (escortId: string) => {
    return (
      favorites.escorts.some(e => e.id === escortId) ||
      favorites.creators.some(e => e.id === escortId) ||
      favorites.livecams.some(e => e.id === escortId)
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
