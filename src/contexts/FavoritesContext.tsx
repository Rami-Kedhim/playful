
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Escort } from '@/types/escort';
import { ContentItem } from '@/types/content';

// Define item types for use in the favorites system
export type FavoriteItemType = 'escorts' | 'creators' | 'livecams' | 'content';

// Base interface for all favoritable items
export interface FavoriteItem {
  id: string;
  [key: string]: any;
}

// Favorites state structure
export interface FavoritesState {
  escorts: Escort[];
  creators: any[];
  livecams: any[];
  content: ContentItem[];
}

// Context interface
interface FavoritesContextType {
  favorites: FavoritesState;
  addFavorite: (type: FavoriteItemType, item: FavoriteItem) => void;
  removeFavorite: (type: FavoriteItemType, itemId: string) => void;
  isFavorite: (type: FavoriteItemType, itemId: string) => boolean;
  clearFavorites: (type: FavoriteItemType) => void;
}

// Create context
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Provider component
export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoritesState>({
    escorts: [],
    creators: [],
    livecams: [],
    content: []
  });

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error parsing saved favorites:', error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Add an item to favorites
  const addFavorite = (type: FavoriteItemType, item: FavoriteItem) => {
    if (!item || !item.id) return;

    setFavorites(prev => {
      // Check if the item already exists
      if (prev[type].some(favItem => favItem.id === item.id)) {
        return prev;
      }

      // Add the new item
      return {
        ...prev,
        [type]: [...prev[type], item]
      };
    });
  };

  // Remove an item from favorites
  const removeFavorite = (type: FavoriteItemType, itemId: string) => {
    setFavorites(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item.id !== itemId)
    }));
  };

  // Check if an item is in favorites
  const isFavorite = (type: FavoriteItemType, itemId: string): boolean => {
    return favorites[type].some(item => item.id === itemId);
  };

  // Clear all favorites of a specific type
  const clearFavorites = (type: FavoriteItemType) => {
    setFavorites(prev => ({
      ...prev,
      [type]: []
    }));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook for using the favorites context
export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  
  return context;
};
