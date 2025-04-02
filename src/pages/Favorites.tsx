
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import EscortCard from "@/components/cards/EscortCard";
import { escorts } from "@/data/escortData";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { favorites } = useFavorites();
  const favoriteEscorts = escorts.filter(escort => favorites.includes(escort.id));

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <Heart size={24} className="mr-2 text-red-500" fill="currentColor" />
          My Favorites
        </h1>

        {favoriteEscorts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteEscorts.map(escort => (
              <EscortCard key={escort.id} {...escort} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 flex flex-col items-center">
            <Heart size={64} className="text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No favorites yet</h2>
            <p className="text-gray-400 mb-6">
              Start adding escorts to your favorites by clicking the heart icon on profiles
            </p>
            <Button asChild>
              <Link to="/escorts">Browse Escorts</Link>
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Favorites;
