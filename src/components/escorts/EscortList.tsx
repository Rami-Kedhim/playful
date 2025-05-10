
import React from 'react';
import { Escort } from '@/types/Escort';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface EscortListProps {
  escorts: Escort[];
  isLoading: boolean;
}

const EscortList: React.FC<EscortListProps> = ({ escorts, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array(6).fill(0).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <Skeleton className="h-40 w-full rounded-md mb-2" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (escorts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No escorts found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {escorts.map(escort => (
        <Card key={escort.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative h-48">
              <img 
                src={escort.avatar_url || escort.avatarUrl || '/placeholder-escort.jpg'} 
                alt={escort.name}
                className="w-full h-full object-cover"
              />
              {escort.isVerified && (
                <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  Verified
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{escort.name}</h3>
              <div className="flex justify-between text-sm mt-1">
                <span>{escort.location || 'Unknown Location'}</span>
                <span className="font-semibold">${escort.price}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EscortList;
