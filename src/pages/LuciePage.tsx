
import React, { useEffect } from 'react';
import { Container } from '@/components/ui/container';
import { hermes } from '@/core/Hermes';
import { useAuth } from '@/hooks/auth';

const LuciePage: React.FC = () => {
  const { user } = useAuth();
  const userId = user?.id || 'anonymous';
  
  useEffect(() => {
    // Connect to Hermes when page loads
    hermes.connect({
      system: 'LucieSystem',
      connectionId: `lucie-page-${Date.now()}`,
      userId,
      metadata: {
        page: 'LuciePage',
        timestamp: new Date().toISOString(),
      },
    });
    
    // Track this page view
    hermes.trackPageView(userId, '/lucie', document.referrer);
  }, [userId]);

  return (
    <Container>
      <h1 className="text-3xl font-bold mb-6">Lucie AI System</h1>
      
      <div className="bg-card rounded-lg p-6 border">
        <p className="text-lg">
          Welcome to the Lucie AI system. This system powers all AI capabilities across the platform.
        </p>
      </div>
    </Container>
  );
};

export default LuciePage;
