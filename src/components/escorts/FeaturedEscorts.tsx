
import React from 'react';
import { Escort } from '@/types/Escort';
import EscortCard from './EscortCard';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface FeaturedEscortsProps {
  escorts: Escort[];
  loading?: boolean;
  limit?: number;
}

const FeaturedEscorts: React.FC<FeaturedEscortsProps> = ({ 
  escorts, 
  loading = false,
  limit = 4 
}) => {
  // Display loading skeletons when loading
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: limit }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="aspect-[3/4] relative">
              <Skeleton className="w-full h-full" />
            </div>
            <CardContent className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <Skeleton className="h-4 w-1/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Display message if no featured escorts
  if (escorts.length === 0) {
    return (
      <Card className="w-full p-6 text-center">
        <p className="text-muted-foreground">No featured escorts available at this time.</p>
      </Card>
    );
  }

  // Display featured escorts
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {escorts.slice(0, limit).map(escort => (
        <EscortCard 
          key={escort.id} 
          escort={escort}
          featured 
        />
      ))}
    </div>
  );
};

export default FeaturedEscorts;
