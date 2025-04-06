import React, { createContext, useState, useContext, useEffect } from "react";
import { Escort } from "@/types/escort";
import { useToast } from "@/hooks/use-toast";

export interface FavoritesContextType {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  count: number;
  favoritesCount: number;
  favoriteEscorts: Escort[];
  clearFavorites: () => void;
  clearAllFavorites: () => void;
}

const defaultContext: FavoritesContextType = {
  favorites: [],
  isFavorite: () => false,
  toggleFavorite: () => {},
  removeFavorite: () => {},
  count: 0,
  favoritesCount: 0,
  favoriteEscorts: [],
  clearFavorites: () => {},
  clearAllFavorites: () => {}
};

const FavoritesContext = createContext<FavoritesContextType>(defaultContext);

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode; escorts?: Escort[] }> = ({
  children,
  escorts = [],
}) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const { toast } = useToast();
  
  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Error parsing favorites from localStorage:", error);
      }
    }
  }, []);

  // Save to localStorage when favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (id: string) => favorites.includes(id);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      if (prev.includes(id)) {
        return prev.filter(favId => favId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(favId => favId !== id));
    toast({
      title: "Removed from favorites",
      description: "Item has been removed from your favorites.",
    });
  };

  const clearFavorites = () => {
    setFavorites([]);
    toast({
      title: "Favorites cleared",
      description: "All items have been removed from your favorites.",
    });
  };

  const clearAllFavorites = clearFavorites;

  const favoriteEscorts = escorts.filter(escort => favorites.includes(escort.id));

  const value = {
    favorites,
    isFavorite,
    toggleFavorite,
    removeFavorite,
    count: favorites.length,
    favoritesCount: favorites.length,
    favoriteEscorts,
    clearFavorites,
    clearAllFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
