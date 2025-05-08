
import React from 'react';
import { Layout } from '@/layouts';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

const NotFoundPage = () => {
  const navigate = useNavigate();
  
  return (
    <Layout
      title="Page Not Found"
      description="The requested page does not exist or has been moved"
      showBreadcrumbs={false}
    >
      <div className="flex flex-col items-center justify-center py-12">
        <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <Shield className="h-12 w-12 text-primary" />
        </div>
        
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        
        <p className="text-muted-foreground text-center max-w-md mb-8">
          The page you're looking for doesn't exist or has been moved to a new location.
          This action has been logged by the Orus security system.
        </p>
        
        <div className="space-x-4">
          <Button onClick={() => navigate('/')}>
            Return Home
          </Button>
          <Button variant="outline" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
