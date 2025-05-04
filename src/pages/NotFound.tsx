
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';

const NotFound: React.FC = () => {
  return (
    <MainLayout
      showNavigation={false}
    >
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <h1 className="text-4xl font-bold">404</h1>
        <h2 className="text-2xl mt-2 mb-6">Page not found</h2>
        <p className="text-muted-foreground max-w-md text-center mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild>
          <Link to="/">Go back home</Link>
        </Button>
      </div>
    </MainLayout>
  );
};

export default NotFound;
