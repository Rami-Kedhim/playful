
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Escort } from '@/types/escort';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import EscortGrid, { ExtendedEscort } from '@/components/escorts/EscortGrid';
import Layout from '@/layouts/Layout';

const FavoritesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('escorts');
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  const handleEscortClick = (escort: ExtendedEscort) => {
    navigate(`/escorts/${escort.id}`);
  };

  const escortCount = favorites.escorts?.length || 0;
  const creatorsCount = favorites.creators?.length || 0;
  const livecamsCount = favorites.livecams?.length || 0;
  const totalCount = escortCount + creatorsCount + livecamsCount;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold flex items-center">
            <Heart className="mr-2 h-6 w-6" />
            Favorites
          </h1>
          <div className="text-sm text-muted-foreground">
            {totalCount} {totalCount === 1 ? 'item' : 'items'}
          </div>
        </div>

        <Tabs 
          defaultValue="escorts" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="mb-8">
            <TabsTrigger value="escorts">
              Escorts ({escortCount})
            </TabsTrigger>
            <TabsTrigger value="creators">
              Creators ({creatorsCount})
            </TabsTrigger>
            <TabsTrigger value="livecams">
              Live Cams ({livecamsCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="escorts" className="mt-0">
            {escortCount === 0 ? (
              <div className="text-center py-12">
                <Heart className="h-12 w-12 mx-auto text-muted-foreground/30" />
                <h3 className="mt-4 text-lg font-medium">No favorite escorts yet</h3>
                <p className="mt-2 text-muted-foreground">
                  Browse escorts and add them to your favorites for quick access
                </p>
              </div>
            ) : (
              <EscortGrid 
                escorts={favorites.escorts as ExtendedEscort[]} 
                onEscortClick={handleEscortClick}
              />
            )}
          </TabsContent>

          <TabsContent value="creators" className="mt-0">
            {creatorsCount === 0 ? (
              <div className="text-center py-12">
                <Heart className="h-12 w-12 mx-auto text-muted-foreground/30" />
                <h3 className="mt-4 text-lg font-medium">No favorite creators yet</h3>
                <p className="mt-2 text-muted-foreground">
                  Browse creators and add them to your favorites for quick access
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Creator cards will go here */}
                <div className="text-center py-12 col-span-full">
                  <p>Creator favorites display coming soon</p>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="livecams" className="mt-0">
            {livecamsCount === 0 ? (
              <div className="text-center py-12">
                <Heart className="h-12 w-12 mx-auto text-muted-foreground/30" />
                <h3 className="mt-4 text-lg font-medium">No favorite live cams yet</h3>
                <p className="mt-2 text-muted-foreground">
                  Browse live cams and add them to your favorites for quick access
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Live cam cards will go here */}
                <div className="text-center py-12 col-span-full">
                  <p>Live cam favorites display coming soon</p>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default FavoritesPage;
