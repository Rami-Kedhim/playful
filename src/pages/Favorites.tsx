
import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { useFavorites } from "@/contexts/FavoritesContext";
import EscortCard from "@/components/cards/EscortCard";
import { Escort } from "@/types/escort";
import { getEscortById } from "@/data/escortData";
import { escorts } from "@/data/escortData";

const Favorites = () => {
  const { favorites } = useFavorites();
  const [favoriteEscorts, setFavoriteEscorts] = useState<Escort[]>([]);

  useEffect(() => {
    // Get the actual escort objects from the IDs in favorites
    const escortObjects = favorites
      .map(id => getEscortById(id, escorts))
      .filter((escort): escort is Escort => escort !== undefined);
    
    setFavoriteEscorts(escortObjects);
  }, [favorites]);

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Favorites</h1>
        <p className="text-gray-400 mt-2">
          View and manage your favorite escorts.
        </p>
      </div>

      {favoriteEscorts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteEscorts.map(escort => (
            <EscortCard 
              key={escort.id}
              id={escort.id}
              name={escort.name}
              location={escort.location}
              age={escort.age}
              rating={escort.rating}
              reviews={escort.reviews}
              tags={escort.tags || []}
              imageUrl={escort.imageUrl || escort.avatar_url || ""}
              price={escort.price || 0}
              verified={escort.verified || false}
              gender={escort.gender}
              sexualOrientation={escort.sexualOrientation}
              availableNow={escort.availableNow}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-2">No favorites yet</h2>
          <p className="text-gray-400 mb-4">
            You haven't added any escorts to your favorites list.
          </p>
        </div>
      )}
    </MainLayout>
  );
};

// Helper function to get escort by ID
const getEscortById = (id: string, escorts: Escort[]): Escort | undefined => {
  return escorts.find(escort => escort.id === id);
};

export default Favorites;
