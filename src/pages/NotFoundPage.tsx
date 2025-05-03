
import React from 'react';
import { Link } from 'react-router-dom';
import { UnifiedLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { AppPaths } from '@/routes/routeConfig';

const NotFoundPage = () => {
  return (
    <UnifiedLayout hideHeader={true}>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-x-4">
          <Button asChild>
            <Link to={AppPaths.HOME}>Go Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to={AppPaths.SAFETY}>Safety Center</Link>
          </Button>
        </div>
      </div>
    </UnifiedLayout>
  );
};

export default NotFoundPage;
