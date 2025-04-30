
import React from 'react';
import { useParams } from 'react-router-dom';
// Fix the import casing issue by using consistent casing
import type { UberPersona } from '@/types/uberPersona';

interface PersonaStoriesTabProps {
  persona?: UberPersona;
}

const PersonaStoriesTab: React.FC<PersonaStoriesTabProps> = ({ persona }) => {
  const { id } = useParams();
  
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Stories by {persona?.name || 'Persona'}</h2>
      <div className="bg-muted/30 p-6 rounded-lg text-center">
        <p>Stories functionality will be available soon.</p>
        <p className="text-muted-foreground mt-2">
          This feature is under development.
        </p>
      </div>
    </div>
  );
};

export default PersonaStoriesTab;
