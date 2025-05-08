import React from 'react';
import { Layout } from '@/layouts'; // Correctly import Layout
import { useFavorites } from '@/contexts/FavoritesContext';
import EscortGrid from '@/components/escorts/EscortGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

const Favorites = () => {
  const [activeTab, setActiveTab] = React.useState('escorts');
  const { favorites } = useFavorites(); // Fix: Use correct argument count

  return (
    <Layout title="Favorites">
      <div className="container mx-auto py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="escorts">Escorts</TabsTrigger>
            <TabsTrigger value="creators">Creators</TabsTrigger>
            <TabsTrigger value="livecams">Livecams</TabsTrigger>
          </TabsList>
          <TabsContent value="escorts" className="mt-4">
            <ScrollArea>
              <EscortGrid escorts={favorites.escorts} emptyMessage="No favorite escorts found." />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="creators" className="mt-4">
            <ScrollArea>
              <EscortGrid escorts={favorites.creators} emptyMessage="No favorite creators found." />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="livecams" className="mt-4">
            <ScrollArea>
              <EscortGrid escorts={favorites.livecams} emptyMessage="No favorite livecams found." />
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Favorites;
