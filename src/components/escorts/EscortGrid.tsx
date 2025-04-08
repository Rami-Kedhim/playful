
import React from 'react';
import { Escort } from '@/types/escort';
import EscortCard from './EscortCard';

interface EscortGridProps {
  escorts: Escort[];
  loading?: boolean;
}

const EscortGrid: React.FC<EscortGridProps> = ({ escorts, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div 
            key={index} 
            className="rounded-lg bg-card shadow-sm animate-pulse h-80 p-4"
          >
            <div className="w-full h-48 rounded-md bg-muted mb-3"></div>
            <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-muted rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }
  
  if (escorts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl font-medium text-muted-foreground">No escorts found</p>
        <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {escorts.map(escort => (
        <EscortCard 
          key={escort.id}
          name={escort.name}
          age={escort.age}
          location={escort.location}
          rating={escort.rating}
          reviews={escort.reviews}
          tags={escort.tags}
          imageUrl={escort.imageUrl}
          price={escort.price}
          verified={escort.verified}
          escortId={escort.id}
          profileType={escort.profileType}
          availableNow={escort.availableNow}
        />
      ))}
    </div>
  );
};

export default EscortGrid;
