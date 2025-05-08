
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Escort } from '@/types/Escort'; // Using uppercase E to match actual file name

interface FavoritesData {
  escorts: Escort[];
  creators: Escort[];
  livecams: Escort[];
}

interface FavoritesContextType {
  favorites: FavoritesData;
  addFavorite: (escort: Escort) => void;
  removeFavorite: (escortId: string) => void;
  isFavorite: (escortId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoritesData>({
    escorts: [],
    creators: [],
    livecams: []
  });

  const addFavorite = (escort: Escort) => {
    setFavorites(prevFavorites => {
      // Determine which category to add to based on escort properties
      // This is a simple example, adjust according to your actual data model
      let category: keyof FavoritesData = 'escorts';
      
      if (escort.profileType === 'creator') {
        category = 'creators';
      } else if (escort.profileType === 'livecam') {
        category = 'livecams';
      }
      
      // Check if already in favorites
      if (prevFavorites[category].some(fav => fav.id === escort.id)) {
        return prevFavorites;
      }
      
      // Add to appropriate category
      return {
        ...prevFavorites,
        [category]: [...prevFavorites[category], escort]
      };
    });
  };

  const removeFavorite = (escortId: string) => {
    setFavorites(prevFavorites => ({
      escorts: prevFavorites.escorts.filter(escort => escort.id !== escortId),
      creators: prevFavorites.creators.filter(escort => escort.id !== escortId),
      livecams: prevFavorites.livecams.filter(escort => escort.id !== escortId)
    }));
  };

  const isFavorite = (escortId: string) => {
    return favorites.escorts.some(escort => escort.id === escortId) ||
           favorites.creators.some(escort => escort.id === escortId) ||
           favorites.livecams.some(escort => escort.id === escortId);
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
