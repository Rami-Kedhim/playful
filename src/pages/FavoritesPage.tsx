
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/layouts/Layout';
import { useFavorites } from '@/contexts/FavoritesContext';
import EscortGrid from '@/components/escorts/EscortGrid';
import { Button } from '@/components/ui/button';
import { AppPaths } from '@/routes/routeConfig';
import { HeartOff } from 'lucide-react';
import { Escort } from '@/types/escort';

const FavoritesPage = () => {
  // Use escorts array directly from the favorites object
  const { favorites } = useFavorites();
  const favoriteEscorts = favorites.escorts || [];
  
  const emptyState = (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="bg-muted/30 p-6 rounded-full mb-4">
        <HeartOff className="h-12 w-12 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-bold mb-2">No favorites yet</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        Start exploring and save profiles you like to access them quickly later
      </p>
      <Button asChild>
        <Link to={AppPaths.ESCORTS}>Browse Escorts</Link>
      </Button>
    </div>
  );
  
  return (
    <Layout
      title="My Favorites"
      description="Profiles you've saved as favorites"
      showBreadcrumbs
    >
      {favoriteEscorts.length === 0 ? (
        emptyState
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">
              {favoriteEscorts.length} {favoriteEscorts.length === 1 ? 'favorite' : 'favorites'}
            </p>
            <Button variant="outline" size="sm">
              Clear All
            </Button>
          </div>
          
          <EscortGrid
            escorts={favoriteEscorts}
            emptyMessage="No favorites found"
          />
        </div>
      )}
    </Layout>
  );
};

export default FavoritesPage;
