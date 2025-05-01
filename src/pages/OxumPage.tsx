
import React from 'react';
import { oxum } from '@/core/Oxum';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const OxumPage = () => {
  const [status, setStatus] = React.useState<any>(null);

  React.useEffect(() => {
    // Get system status
    const systemStatus = oxum.checkSystemStatus();
    setStatus(systemStatus);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Oxum System</h1>
        <p className="text-muted-foreground mt-1">
          Boost mechanism and visibility allocation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="flex items-center mb-2">
              <span className={`w-3 h-3 rounded-full mr-2 ${status?.isValid ? 'bg-green-500' : 'bg-red-500'}`}></span>
              {status?.isValid ? 'Operational' : 'Degraded'}
            </p>
            <p className="text-sm text-muted-foreground">
              Message: {status?.message}
            </p>
            <p className="text-sm text-muted-foreground">
              Last updated: {status?.timestamp ? new Date(status.timestamp).toLocaleString() : 'Unknown'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>System Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-4xl font-bold">{status?.score || 0}</span>
              <span className="text-sm text-muted-foreground">/100</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md">
                Apply Boost
              </button>
              <button className="w-full bg-secondary text-secondary-foreground px-4 py-2 rounded-md">
                Calculate Score
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Documentation</h2>
        <p className="text-muted-foreground">
          Oxum is the visibility and boost allocation system for the UberEscorts ecosystem. It provides
          algorithmic promotion and visibility calculation for profiles, ensuring fair and optimized
          distribution of attention across the platform.
        </p>
      </div>
    </div>
  );
};

export default OxumPage;
