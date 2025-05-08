
import React, { useEffect, useState } from 'react';
import { Layout } from '@/layouts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { oxum } from '@/core/Oxum';
import { Shield, Database, LineChart } from 'lucide-react';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import SecureRouteWrapper from '@/components/security/SecureRouteWrapper';

const OxumPage = () => {
  const [systemStatus, setSystemStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchSystemStatus = async () => {
      try {
        const status = await oxum.getSystemStatus();
        setSystemStatus(status);
      } catch (error) {
        console.error('Failed to fetch system status:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSystemStatus();
  }, []);
  
  return (
    <Layout
      title="Oxum System"
      description="Financial and transaction processing core of the UberEscorts ecosystem"
      showBreadcrumbs
    >
      <SecureRouteWrapper minimumSecurityLevel="maximum">
        <div className="space-y-6">
          <Card className="border-t-4 border-t-primary">
            <CardContent className="pt-6 pb-4">
              <div className="flex items-center space-x-2 text-primary">
                <Shield className="h-5 w-5" />
                <span className="text-sm font-medium">Maximum Security Protocol Active | Protected by Orus</span>
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
                    <Database className="h-5 w-5" />
                    System Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Operational:</span>
                      <span className="font-medium">{systemStatus?.operational ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Performance:</span>
                      <span className="font-medium">{systemStatus?.performance}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Update:</span>
                      <span className="font-medium">{new Date(systemStatus?.lastUpdate).toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5" />
                    Service Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {systemStatus?.serviceStatus && Object.entries(systemStatus.serviceStatus).map(([service, status]) => (
                      <div key={service} className="flex justify-between">
                        <span className="text-muted-foreground capitalize">{service}:</span>
                        <span className="font-medium capitalize">{status as string}</span>
                      </div>
                    ))}
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

export default OxumPage;
