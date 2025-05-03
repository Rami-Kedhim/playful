
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface FavoritesContextType {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  clearFavorites: () => void;
  removeFavorite: (id: string) => void;
  loading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Load favorites from local storage for non-authenticated users
    // In a real app with authentication, would fetch from the database
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error('Error parsing favorites from localStorage:', e);
        setFavorites([]);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // Save to localStorage whenever favorites change
    if (!loading) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites, loading]);

  const isFavorite = (id: string): boolean => {
    return favorites.includes(id);
  };

  const toggleFavorite = (id: string): void => {
    if (isFavorite(id)) {
      removeFavorite(id);
    } else {
      setFavorites([...favorites, id]);
      toast({
        title: "Added to favorites",
        description: "The escort has been added to your favorites",
      });
    }
  };
  
  const removeFavorite = (id: string): void => {
    setFavorites(favorites.filter(fav => fav !== id));
    toast({
      title: "Removed from favorites",
      description: "The escort has been removed from your favorites",
    });
  };
  
  const clearFavorites = (): void => {
    setFavorites([]);
    toast({
      title: "Favorites cleared",
      description: "All items have been removed from your favorites",
    });
  };

  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      isFavorite, 
      toggleFavorite, 
      clearFavorites,
      removeFavorite,
      loading 
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
