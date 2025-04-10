
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/auth/useAuthContext';
import Navbar from '@/components/layout/Navbar';

const AccessDeniedPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto p-4 md:p-6 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <div className="flex justify-center">
            <div className="bg-destructive/10 p-6 rounded-full">
              <AlertCircle className="h-16 w-16 text-destructive" />
            </div>
          </div>
          
          <h1 className="mt-6 text-3xl font-bold tracking-tight">Access Denied</h1>
          
          <p className="mt-4 text-muted-foreground">
            You don't have permission to access this page. This area requires additional privileges.
          </p>
          
          <div className="mt-8 space-y-4">
            <Button 
              onClick={() => navigate('/')} 
              className="w-full"
            >
              Return to Homepage
            </Button>
            
            {isAuthenticated && (
              <Button 
                variant="outline" 
                onClick={() => navigate('/profile')}
                className="w-full"
              >
                Go to Your Profile
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccessDeniedPage;
