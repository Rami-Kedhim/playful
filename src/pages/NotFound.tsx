
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, Search } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';

const NotFound = () => {
  return (
    <AppLayout>
      <div className="container flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mb-6">
          <span className="text-4xl font-bold text-primary">404</span>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Page not found</h1>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-md">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" onClick={() => window.history.back()} className="flex gap-2">
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          
          <Button asChild>
            <Link to="/" className="flex gap-2">
              <Home className="h-4 w-4" />
              Home Page
            </Link>
          </Button>
          
          <Button variant="secondary" asChild>
            <Link to="/search" className="flex gap-2">
              <Search className="h-4 w-4" />
              Search
            </Link>
          </Button>
        </div>
        
        <div className="mt-16 border-t pt-8 w-full max-w-md">
          <h2 className="text-xl font-medium mb-4">Popular Links</h2>
          <div className="grid grid-cols-2 gap-2">
            <Link to="/escorts" className="hover:underline text-primary">Escorts</Link>
            <Link to="/creators" className="hover:underline text-primary">Creators</Link>
            <Link to="/livecams" className="hover:underline text-primary">Live Cams</Link>
            <Link to="/ai-companion" className="hover:underline text-primary">AI Companions</Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default NotFound;
