
import React, { useEffect } from 'react';
import { Container } from '@/components/ui/container';
import { hermes } from '@/core/Hermes';
import { useAuth } from '@/hooks/auth';
import { UnifiedLayout } from '@/layouts';

const MetaversePage: React.FC = () => {
  const { user } = useAuth();
  const userId = user?.id || 'anonymous';

  useEffect(() => {
    // Connect to Hermes when page loads
    hermes.connect({
      system: 'MetaverseSystem',
      connectionId: `metaverse-page-${Date.now()}`,
      userId,
      metadata: { page: 'metaverse', timestamp: new Date().toISOString() }
    });
  }, [userId]);

  return (
    <UnifiedLayout title="Metaverse" description="Virtual experiences in the UberEscorts ecosystem" showBreadcrumbs>
      <Container>
        <div className="py-8">
          <h1 className="text-3xl font-bold mb-6">Metaverse</h1>
          
          <div className="bg-card rounded-lg p-6 border">
            <p className="text-lg mb-4">
              Welcome to the Metaverse area. Virtual experiences await!
            </p>
            <p className="text-muted-foreground">
              Explore virtual environments, interact with AI companions, and discover new ways to connect.
              Our metaverse integrates with Oxum for secure transactions and Hermes for intelligent recommendations.
            </p>
          </div>
        </div>
      </Container>
    </UnifiedLayout>
  );
};

export default MetaversePage;
