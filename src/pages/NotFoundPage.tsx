
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

const NotFoundPage = () => {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 px-4">
        <div className="bg-purple-500/10 p-6 rounded-full">
          <span className="text-5xl sm:text-7xl font-bold text-purple-400">404</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-bold">Page Not Found</h1>
        
        <p className="text-lg text-muted-foreground max-w-md">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button asChild variant="default">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" /> Go to Homepage
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="javascript:history.back()">
              <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
            </Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFoundPage;
