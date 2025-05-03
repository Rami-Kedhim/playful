
import React, { useEffect } from 'react';
import { Container } from '@/components/ui/container';
import { hermes } from '@/core/Hermes';
import { useAuth } from '@/hooks/auth';

const MetaversePage: React.FC = () => {
  const { user } = useAuth();
  const userId = user?.id || 'anonymous';

  useEffect(() => {
    // Connect to Hermes when page loads
    hermes.connect({
      system: 'MetaverseSystem',
      connectionId: `metaverse-page-${Date.now()}`,
      userId,
    });
  }, [userId]);

  return (
    <Container>
      <h1 className="text-3xl font-bold mb-6">Metaverse</h1>
      
      <div className="bg-card rounded-lg p-6 border">
        <p className="text-lg">
          Welcome to the Metaverse area. Virtual experiences await!
        </p>
      </div>
    </Container>
  );
};

export default MetaversePage;
