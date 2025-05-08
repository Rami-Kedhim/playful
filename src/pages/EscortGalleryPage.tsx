
import React from 'react';
import { useParams } from 'react-router-dom';

const EscortGalleryPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Escort Gallery</h1>
      <p>This is a placeholder for the Escort Gallery page for ID: {id}</p>
    </div>
  );
};

export default EscortGalleryPage;
