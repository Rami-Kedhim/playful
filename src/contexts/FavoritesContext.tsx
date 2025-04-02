
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Escort } from "@/data/escortData";

interface FavoritesContextType {
  favorites: string[];
  addFavorite: (escortId: string) => void;
  removeFavorite: (escortId: string) => void;
  toggleFavorite: (escortId: string) => void;
  isFavorite: (escortId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (escortId: string) => {
    setFavorites((prev) => [...prev, escortId]);
  };

  const removeFavorite = (escortId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== escortId));
  };

  const toggleFavorite = (escortId: string) => {
    if (isFavorite(escortId)) {
      removeFavorite(escortId);
    } else {
      addFavorite(escortId);
    }
  };

  const isFavorite = (escortId: string) => {
    return favorites.includes(escortId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
