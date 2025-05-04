
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MainLayout from '@/layouts/MainLayout';

const NotFound = () => {
  return (
    <MainLayout hideNavbar={true} hideFooter={true}>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
        <p className="text-muted-foreground mt-2 max-w-md">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <Button asChild className="mt-8">
          <Link to="/">Return to Homepage</Link>
        </Button>
      </div>
    </MainLayout>
  );
};

export default NotFound;
