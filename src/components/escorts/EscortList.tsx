
import React from 'react';
import { Escort } from '@/types/Escort';
import EscortProfileCard from './EscortProfileCard';

interface EscortListProps {
  escorts: Escort[];
  isLoading?: boolean;
}

const EscortList: React.FC<EscortListProps> = ({ escorts, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-muted h-64 animate-pulse rounded-md"></div>
        ))}
      </div>
    );
  }

  if (escorts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No escorts found</h3>
        <p className="text-muted-foreground mt-2">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {escorts.map((escort) => (
        <EscortProfileCard key={escort.id} escort={escort} />
      ))}
    </div>
  );
};

export default EscortList;
