
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/layouts/Layout';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <Layout 
      hideNavbar
      className="flex items-center justify-center"
    >
      <div className="text-center py-20">
        <h1 className="text-6xl font-bold mb-6">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild>
          <Link to="/">
            <Home className="w-4 h-4 mr-2" /> Go Home
          </Link>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
