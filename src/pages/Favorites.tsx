
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import EscortCard from "@/components/escorts/EscortCard";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Card } from "@/components/ui/card";
import { Heart, XCircle } from "lucide-react";

const FavoritesPage = () => {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();
  const [activeTab, setActiveTab] = useState("escorts");
  
  const hasEscorts = favorites.escorts && favorites.escorts.length > 0;
  const hasCreators = favorites.creators && favorites.creators.length > 0;
  const hasLivecams = favorites.livecams && favorites.livecams.length > 0;
  
  const handleClearCategory = (category: 'escorts' | 'creators' | 'livecams') => {
    clearFavorites(category);
  };
  
  const handleRemoveItem = (category: 'escorts' | 'creators' | 'livecams', id: string) => {
    removeFavorite(category, id);
  };
  
  return (
    <Layout title="Favorites" description="Manage your favorite escorts, creators, and live cams">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-6">
          <TabsList>
            <TabsTrigger value="escorts">Escorts</TabsTrigger>
            <TabsTrigger value="creators">Creators</TabsTrigger>
            <TabsTrigger value="livecams">Live Cams</TabsTrigger>
          </TabsList>
          
          {activeTab === "escorts" && hasEscorts && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleClearCategory('escorts')}
            >
              Clear Escorts
            </Button>
          )}
          
          {activeTab === "creators" && hasCreators && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleClearCategory('creators')}
            >
              Clear Creators
            </Button>
          )}
          
          {activeTab === "livecams" && hasLivecams && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleClearCategory('livecams')}
            >
              Clear Live Cams
            </Button>
          )}
        </div>
        
        <TabsContent value="escorts">
          {!hasEscorts ? (
            <FavoritesEmptyState type="escorts" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favorites.escorts.map(escort => (
                <div key={escort.id} className="relative">
                  <button 
                    onClick={() => handleRemoveItem('escorts', escort.id)}
                    className="absolute top-2 right-2 z-10 bg-white rounded-full shadow-md p-1 hover:bg-red-50 transition-colors"
                  >
                    <XCircle className="h-5 w-5 text-red-500" />
                  </button>
                  <EscortCard escort={escort} />
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="creators">
          {!hasCreators ? (
            <FavoritesEmptyState type="creators" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favorites.creators.map(creator => (
                <div key={creator.id} className="relative">
                  <button 
                    onClick={() => handleRemoveItem('creators', creator.id)}
                    className="absolute top-2 right-2 z-10 bg-white rounded-full shadow-md p-1 hover:bg-red-50 transition-colors"
                  >
                    <XCircle className="h-5 w-5 text-red-500" />
                  </button>
                  {/* Creator card component would go here */}
                  <Card className="p-4">{creator.id}</Card>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="livecams">
          {!hasLivecams ? (
            <FavoritesEmptyState type="livecams" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favorites.livecams.map(livecam => (
                <div key={livecam.id} className="relative">
                  <button 
                    onClick={() => handleRemoveItem('livecams', livecam.id)}
                    className="absolute top-2 right-2 z-10 bg-white rounded-full shadow-md p-1 hover:bg-red-50 transition-colors"
                  >
                    <XCircle className="h-5 w-5 text-red-500" />
                  </button>
                  {/* Livecam card component would go here */}
                  <Card className="p-4">{livecam.id}</Card>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

interface FavoritesEmptyStateProps {
  type: 'escorts' | 'creators' | 'livecams';
}

const FavoritesEmptyState = ({ type }: FavoritesEmptyStateProps) => {
  const getTypeDisplay = () => {
    switch (type) {
      case 'escorts': return 'escorts';
      case 'creators': return 'content creators';
      case 'livecams': return 'live cam models';
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Heart className="h-16 w-16 stroke-1 text-muted-foreground mb-6" />
      <h3 className="text-xl font-medium mb-2">No favorites yet</h3>
      <p className="text-muted-foreground mb-6">
        You haven't added any {getTypeDisplay()} to your favorites yet.
      </p>
      <Button asChild>
        <a href={`/${type}`}>Browse {getTypeDisplay()}</a>
      </Button>
    </div>
  );
};

export default FavoritesPage;
