
import React from 'react';
import { UberPersona } from "@/types/uberPersona";
import UberPersonaCard from "./UberPersonaCard";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface UberPersonaGridProps {
  personas: UberPersona[];
  loading?: boolean;
  emptyMessage?: string;
}

const LoadingSkeletons = ({ count = 8 }: { count?: number }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <Card key={i} className="overflow-hidden">
        <div className="aspect-[3/4] relative">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="p-4">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </Card>
    ))}
  </>
);

const UberPersonaGrid: React.FC<UberPersonaGridProps> = ({ 
  personas, 
  loading = false,
  emptyMessage = "No profiles found matching your criteria."
}) => {
  // Display loading skeletons when loading
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <LoadingSkeletons />
      </div>
    );
  }

  // Display message if no personas
  if (personas.length === 0) {
    return (
      <Card className="w-full p-16 text-center">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </Card>
    );
  }

  // Display persona grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {personas.map(persona => (
        <UberPersonaCard key={persona.id} persona={persona} />
      ))}
    </div>
  );
};

export default UberPersonaGrid;
