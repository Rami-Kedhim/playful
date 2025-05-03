
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Heart, Trash2 } from "lucide-react";
import { featuredEscorts } from "@/components/home/MockData";
import { useNotifications } from "@/contexts/NotificationsContext";

const Favorites = () => {
  const [activeTab, setActiveTab] = useState("escorts");
  const { favorites, clearFavorites, removeFavorite } = useFavorites();
  const { showWarning } = useNotifications();
  
  const escortFavorites = featuredEscorts.filter(escort => 
    favorites.escorts.some(fav => fav.id === escort.id)
  );
  
  const handleClearFavorites = () => {
    clearFavorites(activeTab as 'escorts' | 'creators' | 'livecams');
    showWarning("Favorites Cleared", "All items have been removed from your favorites");
  };
  
  return (
    <AppLayout>
      <div className="container px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold flex items-center">
            <Heart className="mr-2 text-primary h-6 w-6" />
            My Favorites
          </h1>
          
          {(activeTab === 'escorts' ? favorites.escorts.length > 0 : 
           activeTab === 'creators' ? favorites.creators.length > 0 :
           favorites.livecams.length > 0) && (
            <Button 
              variant="destructive" 
              size="sm"
              onClick={handleClearFavorites}
            >
              <Trash2 className="h-4 w-4 mr-2" /> 
              Clear All
            </Button>
          )}
        </div>
        
        <Tabs 
          defaultValue="escorts" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="escorts">Escorts</TabsTrigger>
            <TabsTrigger value="creators">Creators</TabsTrigger>
            <TabsTrigger value="livecams">Livecams</TabsTrigger>
          </TabsList>
          
          <TabsContent value="escorts">
            {escortFavorites.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {escortFavorites.map(escort => (
                  <Card key={escort.id} className="p-4">
                    <div className="flex flex-col">
                      <img 
                        src={escort.imageUrl} 
                        alt={escort.name} 
                        className="w-full h-64 object-cover rounded-md mb-3"
                      />
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-medium">{escort.name}</h3>
                          <p className="text-sm text-muted-foreground">{escort.location}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeFavorite('escorts', escort.id)}
                        >
                          <Heart className="h-5 w-5 fill-primary text-primary" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Heart className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <h3 className="text-2xl font-medium mb-2">No Favorites Yet</h3>
                <p className="text-muted-foreground mb-6">
                  You haven't added any escorts to your favorites
                </p>
                <Button>Browse Escorts</Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="creators">
            <div className="text-center py-16">
              <Heart className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <h3 className="text-2xl font-medium mb-2">No Creator Favorites</h3>
              <p className="text-muted-foreground mb-6">
                You haven't added any creators to your favorites
              </p>
              <Button>Browse Creators</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="livecams">
            <div className="text-center py-16">
              <Heart className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <h3 className="text-2xl font-medium mb-2">No Livecam Favorites</h3>
              <p className="text-muted-foreground mb-6">
                You haven't added any livecams to your favorites
              </p>
              <Button>Browse Livecams</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Favorites;
