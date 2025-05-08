
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { Escort } from '@/types/escort';

export interface FavoritesState {
  escorts: Escort[];
}

interface FavoritesContextType {
  favorites: FavoritesState;
  addFavorite: (escort: Escort) => void;
  removeFavorite: (id: string) => void;
  clearFavorites: () => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoritesState>({
    escorts: []
  });

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        const parsed = JSON.parse(savedFavorites);
        setFavorites(parsed);
      } catch (error) {
        console.error('Error parsing saved favorites:', error);
        // Initialize with empty arrays if parsing fails
        setFavorites({ escorts: [] });
      }
    }
  }, []);

  // Save favorites to localStorage when updated
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (escort: Escort) => {
    setFavorites(prev => {
      // Check if escort is already in favorites
      if (prev.escorts.some(item => item.id === escort.id)) {
        return prev;
      }
      
      toast({
        title: "Added to favorites",
        description: `${escort.name} has been added to your favorites.`
      });
      
      return {
        ...prev,
        escorts: [...prev.escorts, escort]
      };
    });
  };

  const removeFavorite = (id: string) => {
    setFavorites(prev => {
      const escort = prev.escorts.find(e => e.id === id);
      
      if (escort) {
        toast({
          title: "Removed from favorites",
          description: `${escort.name} has been removed from your favorites.`
        });
      }
      
      return {
        ...prev,
        escorts: prev.escorts.filter(escort => escort.id !== id)
      };
    });
  };

  const clearFavorites = () => {
    setFavorites({ escorts: [] });
    toast({
      title: "Favorites cleared",
      description: "All favorites have been removed."
    });
  };

  const isFavorite = (id: string) => {
    return favorites.escorts.some(escort => escort.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      addFavorite, 
      removeFavorite, 
      clearFavorites, 
      isFavorite 
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
