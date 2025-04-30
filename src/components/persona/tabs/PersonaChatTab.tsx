
import React from 'react';
import { useParams } from 'react-router-dom';
// Fix the import casing issue
import type { UberPersona } from '@/types/uberPersona';

interface PersonaChatTabProps {
  persona?: UberPersona;
}

const PersonaChatTab: React.FC<PersonaChatTabProps> = ({ persona }) => {
  const { id } = useParams();
  
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Chat with {persona?.name || 'Persona'}</h2>
      <div className="bg-muted/30 p-6 rounded-lg text-center">
        <p>Chat functionality is coming soon.</p>
        <p className="text-muted-foreground mt-2">
          You'll be able to communicate directly with this persona.
        </p>
      </div>
    </div>
  );
};

export default PersonaChatTab;
