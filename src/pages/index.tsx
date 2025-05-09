
import React from 'react';

const HomePage = () => {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">UberEscorts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-card rounded-lg border">
          <h2 className="text-xl font-semibold mb-2">Welcome</h2>
          <p className="text-muted-foreground">
            Welcome to the UberEscorts ecosystem.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
