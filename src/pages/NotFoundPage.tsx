
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/layouts/Layout';
import { Button } from '@/components/ui/button';
import { AppPaths } from '@/routes/routeConfig';
import { MoveLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <Layout hideNavbar={true} className="bg-gradient-to-br from-background to-background/90">
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 animate-fade-in">
        <div className="relative mb-6">
          <div className="text-8xl font-bold text-primary/20 animate-pulse-slow">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Page Not Found</h1>
          </div>
        </div>
        
        <p className="text-muted-foreground mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="space-x-4">
          <Button asChild className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-md hover:shadow-lg transition-all">
            <Link to={AppPaths.HOME} className="flex items-center gap-2">
              <MoveLeft size={16} />
              <span>Go Home</span>
            </Link>
          </Button>
          <Button variant="outline" asChild className="border-primary/20 hover:border-primary/40 transition-all">
            <Link to={AppPaths.SAFETY}>Safety Center</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
