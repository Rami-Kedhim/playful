
import React from 'react';
import { UnifiedLayout } from '@/layouts';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AppPaths } from '@/routes';

const NotFoundPage = () => {
  return (
    <UnifiedLayout hideNavbar>
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-medium mb-2">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Button asChild>
          <Link to={AppPaths.HOME}>Return to Home</Link>
        </Button>
      </div>
    </UnifiedLayout>
  );
};

export default NotFoundPage;
