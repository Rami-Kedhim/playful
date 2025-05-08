
import React from 'react';
import EscortCard from './EscortCard';
import { Escort } from '@/types/escort';

interface EscortsListProps {
  escorts: Escort[];
  loading?: boolean;
}

const EscortsList: React.FC<EscortsListProps> = ({ escorts, loading }) => {
  if (loading) {
    return <div>Loading escorts...</div>;
  }

  if (escorts.length === 0) {
    return <div>No escorts found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {escorts.map(escort => (
        <EscortCard key={escort.id} escort={escort} />
      ))}
    </div>
  );
};

export default EscortsList;
