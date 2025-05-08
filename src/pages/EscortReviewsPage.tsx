
import React from 'react';
import { useParams } from 'react-router-dom';

const EscortReviewsPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Escort Reviews</h1>
      <p>This is a placeholder for the Escort Reviews page for ID: {id}</p>
    </div>
  );
};

export default EscortReviewsPage;
