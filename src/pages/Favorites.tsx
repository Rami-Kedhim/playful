
import { useState, useMemo } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { useFavorites } from "@/contexts/FavoritesContext";
import EscortCard from "@/components/cards/EscortCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CreatorCard from "@/components/cards/CreatorCard";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { escortProfiles } from "@/data/escortProfiles";
import { Separator } from "@/components/ui/separator";

const Favorites = () => {
  const { favorites } = useFavorites();
  const [activeTab, setActiveTab] = useState<string>("escorts");
  const navigate = useNavigate();

  // Filter escorts that are in favorites
  const favoriteEscorts = useMemo(() => {
    return escortProfiles.filter(escort => favorites.includes(escort.id));
  }, [favorites]);
  
  // For creators, we'll handle this when we have actual creator data
  const favoriteCreators = useMemo(() => {
    // This would filter from actual creator data when available
    return [];
  }, [favorites]);
  
  const handleClearFavorites = () => {
    // Will be implemented when we add the clear favorites functionality
  };

  return (
    <AppLayout>
      <div className="container px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Your Favorites</h1>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </div>
        
        <Tabs 
          defaultValue="escorts" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="mb-6">
            <TabsTrigger value="escorts" className="flex gap-2">
              <span>Escorts</span>
              {favoriteEscorts.length > 0 && (
                <span className="bg-primary/20 text-primary rounded-full px-2 py-0.5 text-xs">
                  {favoriteEscorts.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="creators" className="flex gap-2">
              <span>Creators</span>
              {favoriteCreators.length > 0 && (
                <span className="bg-primary/20 text-primary rounded-full px-2 py-0.5 text-xs">
                  {favoriteCreators.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="livecams">
              <span>Livecams</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="escorts">
            {favoriteEscorts.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-muted-foreground">
                    {favoriteEscorts.length} favorite{favoriteEscorts.length !== 1 ? 's' : ''}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {favoriteEscorts.map(escort => (
                    <EscortCard 
                      key={escort.id}
                      id={escort.id}
                      name={escort.name}
                      location={escort.location}
                      age={escort.age}
                      rating={escort.rating}
                      reviews={escort.reviews}
                      tags={escort.tags}
                      imageUrl={escort.imageUrl || escort.avatar_url || ''}
                      price={escort.price || 0}
                      verified={escort.verified || false}
                      gender={escort.gender}
                      sexualOrientation={escort.sexualOrientation}
                      availableNow={escort.availableNow}
                      lastActive={escort.lastSeen}
                      responseRate={escort.responseRate}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <Heart className="mx-auto h-16 w-16 stroke-1 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No Favorites Yet</h3>
                <p className="mt-2 text-muted-foreground">
                  You haven't added any escorts to your favorites.
                </p>
                <Button 
                  onClick={() => navigate('/escorts')}
                  variant="outline" 
                  className="mt-6"
                >
                  Browse Escorts
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="creators">
            {favoriteCreators.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Creator cards would go here when we have actual data */}
                <p>Your favorite creators will appear here</p>
              </div>
            ) : (
              <div className="text-center py-16">
                <Heart className="mx-auto h-16 w-16 stroke-1 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No Favorites Yet</h3>
                <p className="mt-2 text-muted-foreground">
                  You haven't added any creators to your favorites.
                </p>
                <Button 
                  onClick={() => navigate('/creators')}
                  variant="outline" 
                  className="mt-6"
                >
                  Browse Creators
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="livecams">
            <div className="text-center py-16">
              <Heart className="mx-auto h-16 w-16 stroke-1 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No Favorites Yet</h3>
              <p className="mt-2 text-muted-foreground">
                You haven't added any livecams to your favorites.
              </p>
              <Button 
                onClick={() => navigate('/livecams')}
                variant="outline" 
                className="mt-6"
              >
                Browse Livecams
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        {(favoriteEscorts.length > 0 || favoriteCreators.length > 0) && (
          <>
            <Separator className="my-8" />
            <div className="flex justify-end">
              <Button 
                variant="ghost" 
                className="text-destructive hover:text-destructive"
                onClick={handleClearFavorites}
              >
                Clear all favorites
              </Button>
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default Favorites;
