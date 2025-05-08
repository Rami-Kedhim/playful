
import React, { useEffect, useState } from 'react';
import { Layout } from '@/layouts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { hermes } from '@/core/Hermes';
import { Shield, Activity, Zap } from 'lucide-react';
import SecureRouteWrapper from '@/components/security/SecureRouteWrapper';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const HermesPage = () => {
  const [systemStatus, setSystemStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchSystemStatus = async () => {
      try {
        const status = await hermes.getSystemStatus();
        setSystemStatus(status);
      } catch (error) {
        console.error('Failed to fetch hermes status:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSystemStatus();
  }, []);
  
  return (
    <Layout
      title="Hermes System"
      description="Visibility and algorithm engine of the UberEscorts ecosystem"
      showBreadcrumbs
    >
      <SecureRouteWrapper minimumSecurityLevel="enhanced">
        <div className="space-y-6">
          <Card className="border-t-4 border-t-primary">
            <CardContent className="pt-6 pb-4">
              <div className="flex items-center space-x-2 text-primary">
                <Shield className="h-5 w-5" />
                <span className="text-sm font-medium">Enhanced Security Protocol Active | Protected by Orus</span>
              </div>
            </CardContent>
          </Card>
          
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Hermes Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="font-medium">{systemStatus?.status}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Boost Queue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-6 text-center">
                    <div className="text-3xl font-bold">47</div>
                    <div className="text-sm text-muted-foreground mt-1">Active Boosts</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </SecureRouteWrapper>
    </Layout>
  );
};

export default HermesPage;
