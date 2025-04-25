
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Layout hideNavbar hideFooter>
      <div className="h-[70vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          We couldn't find the page you were looking for. It might have been removed or doesn't exist.
        </p>
        <Button asChild>
          <Link to="/">Return Home</Link>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
