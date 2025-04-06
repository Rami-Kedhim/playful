
import React, { createContext, useContext, useState, useEffect } from 'react';

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
  removeFavorite: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
  clearFavorites: () => {},
  removeFavorite: () => {},
});

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('uberEscortsFavorites');
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (e) {
        console.error('Error parsing favorites from localStorage:', e);
        localStorage.removeItem('uberEscortsFavorites');
      }
    }
  }, []);
  
  // Save favorites to localStorage when changed
  useEffect(() => {
    localStorage.setItem('uberEscortsFavorites', JSON.stringify(favorites));
  }, [favorites]);
  
  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  
  const isFavorite = (id: string) => {
    return favorites.includes(id);
  };
  
  const clearFavorites = () => {
    setFavorites([]);
  };
  
  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(item => item !== id));
  };
  
  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      toggleFavorite, 
      isFavorite, 
      clearFavorites,
      removeFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};
