
import React from 'react';
import { Link } from 'react-router-dom';
import { UnifiedLayout } from '@/layouts';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <UnifiedLayout
      title="Page Not Found"
      description="The page you are looking for does not exist"
      showBreadcrumbs={false}
      hideNavbar={false}
    >
      <div className="py-12 flex flex-col items-center justify-center">
        <div className="bg-card rounded-lg shadow p-8 text-center max-w-md">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <h2 className="text-xl font-medium mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Button asChild>
            <Link to="/" className="inline-flex items-center">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </UnifiedLayout>
  );
};

export default NotFoundPage;
