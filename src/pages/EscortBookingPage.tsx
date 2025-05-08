
import React from 'react';
import { useParams } from 'react-router-dom';

const EscortBookingPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Book an Escort</h1>
      <p>This is a placeholder for the Escort Booking page for ID: {id}</p>
    </div>
  );
};

export default EscortBookingPage;
