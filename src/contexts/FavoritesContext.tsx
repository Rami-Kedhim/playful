
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { Escort } from '@/types/escort';

// Define the different content types that can be favorited
type FavoriteContentType = 'escorts' | 'creators' | 'livecams';

export interface FavoritesState {
  escorts: Escort[];
  creators: any[]; // Using any for now, should be replaced with proper Creator type
  livecams: any[]; // Using any for now, should be replaced with proper Livecam type
}

interface FavoritesContextType {
  favorites: FavoritesState;
  addFavorite: (type: FavoriteContentType, item: any) => void;
  removeFavorite: (type: FavoriteContentType, id: string) => void;
  clearFavorites: (type?: FavoriteContentType) => void;
  isFavorite: (type: FavoriteContentType, id: string) => boolean;
  toggleFavorite: (type: FavoriteContentType, id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
        const parsed = JSON.parse(savedFavorites);
        setFavorites(parsed);
      } catch (error) {
        console.error('Error parsing saved favorites:', error);
        // Initialize with empty arrays if parsing fails
        setFavorites({ escorts: [], creators: [], livecams: [] });
      }
    }
  }, []);

  // Save favorites to localStorage when updated
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (type: FavoriteContentType, item: any) => {
    setFavorites(prev => {
      // Check if item is already in favorites
      if (prev[type].some(favItem => favItem.id === item.id)) {
        return prev;
      }
      
      toast({
        title: "Added to favorites",
        description: `${item.name || 'Item'} has been added to your ${type} favorites.`
      });
      
      return {
        ...prev,
        [type]: [...prev[type], item]
      };
    });
  };

  const removeFavorite = (type: FavoriteContentType, id: string) => {
    setFavorites(prev => {
      const item = prev[type].find(item => item.id === id);
      
      if (item) {
        toast({
          title: "Removed from favorites",
          description: `${item.name || 'Item'} has been removed from your favorites.`
        });
      }
      
      return {
        ...prev,
        [type]: prev[type].filter(item => item.id !== id)
      };
    });
  };

  const clearFavorites = (type?: FavoriteContentType) => {
    if (type) {
      setFavorites(prev => ({
        ...prev,
        [type]: []
      }));
      toast({
        title: `${type} favorites cleared`,
        description: `All ${type} favorites have been removed.`
      });
    } else {
      setFavorites({ escorts: [], creators: [], livecams: [] });
      toast({
        title: "All favorites cleared",
        description: "All favorites have been removed."
      });
    }
  };

  const isFavorite = (type: FavoriteContentType, id: string) => {
    return favorites[type].some(item => item.id === id);
  };
  
  const toggleFavorite = (type: FavoriteContentType, id: string) => {
    if (isFavorite(type, id)) {
      removeFavorite(type, id);
    } else {
      // Find the item from the appropriate source and add it
      // This is a simplified approach - in a real implementation you would
      // likely fetch the item data if not already available
      const itemToAdd = favorites[type].find(item => item.id === id);
      if (itemToAdd) {
        addFavorite(type, itemToAdd);
      } else {
        console.warn(`Item with id ${id} not found in ${type} data source`);
      }
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

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
