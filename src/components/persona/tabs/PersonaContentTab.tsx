
import React from 'react';
import { useParams } from 'react-router-dom';
// Fix the import casing issue by using consistent casing
import type { UberPersona } from '@/types/uberPersona';

interface PersonaContentTabProps {
  persona?: UberPersona;
}

const PersonaContentTab: React.FC<PersonaContentTabProps> = ({ persona }) => {
  const { id } = useParams();
  
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Content from {persona?.name || 'Persona'}</h2>
      <div className="bg-muted/30 p-6 rounded-lg text-center">
        <p>Content will be displayed here soon.</p>
        <p className="text-muted-foreground mt-2">
          This section is under development.
        </p>
      </div>
    </div>
  );
};

export default PersonaContentTab;
