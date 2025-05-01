
import React from 'react';
import { UberPersona } from '@/types/uberPersona';
import UberPersonaCard from './UberPersonaCard';

interface UberPersonaGridProps {
  personas: UberPersona[];
  loading?: boolean;
  emptyMessage?: string;
  columns?: number;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

const UberPersonaGrid: React.FC<UberPersonaGridProps> = ({
  personas = [],
  loading = false,
  emptyMessage = "No personas found",
  columns = 4,
  size = 'md',
  showDetails = true
}) => {
  // Generate placeholder array for loading state
  const placeholders = Array(columns).fill(null);
  
  // Determine grid columns based on the columns prop
  const gridClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6',
  }[columns] || 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';

  if (loading) {
    return (
      <div className={`grid ${gridClass} gap-4`}>
        {placeholders.map((_, index) => (
          <div 
            key={`placeholder-${index}`} 
            className="bg-gray-800/20 animate-pulse rounded-lg"
            style={{ height: size === 'sm' ? '240px' : size === 'md' ? '320px' : '400px' }}
          />
        ))}
      </div>
    );
  }
  
  if (personas.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }
  
  return (
    <div className={`grid ${gridClass} gap-4`}>
      {personas.map((persona) => (
        <UberPersonaCard 
          key={persona.id} 
          persona={persona} 
          size={size}
          showDetails={showDetails}
        />
      ))}
    </div>
  );
};

export default UberPersonaGrid;
