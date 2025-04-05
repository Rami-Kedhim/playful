
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNotifications } from "./NotificationsContext";

type FavoritesContextType = {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  clearFavorites: () => void;
};

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  isFavorite: () => false,
  toggleFavorite: () => {},
  clearFavorites: () => {},
});

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const { showSuccess, showError } = useNotifications();
  
  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem("oxum_favorites");
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Error loading favorites from localStorage:", error);
    }
  }, []);

  // Save favorites to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem("oxum_favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving favorites to localStorage:", error);
    }
  }, [favorites]);

  const isFavorite = (id: string) => {
    return favorites.includes(id);
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      if (prev.includes(id)) {
        if (showSuccess) showSuccess("Removed from Favorites", "Profile removed from your favorites list");
        return prev.filter(favId => favId !== id);
      } else {
        if (showSuccess) showSuccess("Added to Favorites", "Profile added to your favorites list");
        return [...prev, id];
      }
    });
  };

  const clearFavorites = () => {
    if (window.confirm("Are you sure you want to clear all favorites?")) {
      setFavorites([]);
      if (showSuccess) showSuccess("Favorites Cleared", "All favorites have been removed");
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
