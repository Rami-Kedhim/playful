
import React from 'react';
import Layout from '@/layouts/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { APP_PATHS } from '@/routes/routeConfig';
import { useTitle } from '@/hooks/useTitle';

const NotFoundPage: React.FC = () => {
  useTitle("Page Not Found | UberEscorts");
  
  return (
    <Layout>
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-6xl font-bold mb-6">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link to={APP_PATHS.HOME}>Go Home</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to={APP_PATHS.ESCORTS}>Browse Escorts</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
