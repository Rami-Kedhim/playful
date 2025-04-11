
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

const AccessDeniedPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="mx-auto bg-red-100 dark:bg-red-900/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
          <ShieldAlert className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
        <p className="text-muted-foreground mb-6">
          You don't have permission to access this page. If you believe this is
          an error, please contact support.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/">Go to Homepage</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/profile">Go to Profile</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccessDeniedPage;
