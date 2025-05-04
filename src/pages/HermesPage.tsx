
import React, { useEffect } from 'react';
import { Container } from '@/components/ui/container';
import { hermes } from '@/core/Hermes';
import { useAuth } from '@/hooks/auth';

const HermesPage: React.FC = () => {
  const { user } = useAuth();
  const userId = user?.id || 'anonymous';
  
  useEffect(() => {
    // Connect to Hermes when page loads
    hermes.connect({
      system: 'HermesSystem',
      connectionId: `hermes-page-${Date.now()}`,
      userId,
      metadata: {
        page: 'HermesPage',
        timestamp: new Date().toISOString(),
      }
    });
    
    // Track this page view
    hermes.trackPageView(userId, '/hermes', document.referrer);
  }, [userId]);

  return (
    <Container>
      <h1 className="text-3xl font-bold mb-6">Hermes Analytics System</h1>
      
      <div className="bg-card rounded-lg p-6 border">
        <p className="text-lg">
          Welcome to the Hermes Analytics system. This system powers all analytics and tracking across the platform.
        </p>
      </div>
    </Container>
  );
};

export default HermesPage;
