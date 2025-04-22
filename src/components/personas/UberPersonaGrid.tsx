
// Fix import casing to use lowercase 'uberPersona' to avoid duplicate type issues
import React from 'react';
import { UberPersona } from '@/types/uberPersona';  // changed from "@/types/UberPersona"
import UberPersonaCard from './UberPersonaCard';
import { Skeleton } from '@/components/ui/skeleton';

interface UberPersonaGridProps {
  personas: UberPersona[];
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

const UberPersonaGrid: React.FC<UberPersonaGridProps> = ({
  personas,
  loading = false,
  emptyMessage = "No profiles found",
  className,
}) => {
  // Create skeleton array for loading state
  const loadingSkeletons = Array(12).fill(null);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {loadingSkeletons.map((_, index) => (
          <div key={index} className="overflow-hidden rounded-md border bg-card">
            <Skeleton className="aspect-[3/4] w-full" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-1/2" />
              <div className="flex gap-1 pt-1">
                <Skeleton className="h-5 w-12 rounded-full" />
                <Skeleton className="h-5 w-12 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (personas.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 px-4 text-center">
        <div>
          <h3 className="text-xl font-medium mb-2">No Results Found</h3>
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ${className}`}>
      {personas.map((persona) => (
        <UberPersonaCard key={persona.id} persona={persona} />
      ))}
    </div>
  );
};

export default UberPersonaGrid;
