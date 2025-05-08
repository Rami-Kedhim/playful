
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Escort } from '@/types/escort';

interface FavoritesContextType {
  favorites: Escort[];
  addFavorite: (escort: Escort) => void;
  removeFavorite: (escortId: string) => void;
  isFavorite: (escortId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Escort[]>([]);

  const addFavorite = (escort: Escort) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.some(fav => fav.id === escort.id)) {
        return prevFavorites;
      }
      return [...prevFavorites, escort];
    });
  };

  const removeFavorite = (escortId: string) => {
    setFavorites(prevFavorites => 
      prevFavorites.filter(escort => escort.id !== escortId)
    );
  };

  const isFavorite = (escortId: string) => {
    return favorites.some(escort => escort.id === escortId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
