
import React from 'react';
import Layout from '@/layouts/Layout';
import { useFavorites } from '@/contexts/FavoritesContext';

const FavoritesPage = () => {
  // You would normally use the actual hook to get favorites
  const { favorites = [] } = { favorites: [] };
  
  return (
    <Layout
      title="Favorites"
      description="Profiles you've saved as favorites"
      showBreadcrumbs
    >
      <div className="text-center py-20 text-muted-foreground">
        <h2 className="text-2xl mb-2">Favorites</h2>
        <p>This page will display your favorite profiles.</p>
      </div>
    </Layout>
  );
};

export default FavoritesPage;
