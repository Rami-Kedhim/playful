
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Layout 
      title="Welcome to the App" 
      description="Explore our features and services"
    >
      <div className="grid gap-6 py-10">
        <div className="bg-card rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Get Started</h2>
          <p className="text-muted-foreground mb-6">
            Browse our features and find what you're looking for.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link to="/search">Search</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/wallet">Wallet</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/pulse-boost">Pulse Boost</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
