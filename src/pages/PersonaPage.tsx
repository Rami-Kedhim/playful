import React from 'react';
import { useUberPersonaContext } from '@/contexts/UberPersonaContext';

const PersonaPage = () => {
  const { escortPersonas, creatorPersonas, livecamPersonas, aiPersonas } = useUberPersonaContext();

  const escorts = escortPersonas;
  const creators = creatorPersonas;
  const livecams = livecamPersonas;
  const aiList = aiPersonas;

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold">Personas Overview</h1>

      {/* Temporarily remove missing components until implemented */}
      {/* <PersonaOverviewTab personas={escorts} /> */}

      {/* <PersonaDetailsTab personas={creators} /> */}

      {/* Could add other tabs similarly */}
    </div>
  );
};
export default PersonaPage;
