
import React from 'react';
import { lucie } from '@/core/Lucie';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LuciePage = () => {
  const [status, setStatus] = React.useState<any>(null);

  React.useEffect(() => {
    // Get system status from Lucie
    const systemStatus = lucie.getSystemStatus();
    setStatus(systemStatus);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between space-y-4 md:space-y-0 md:space-x-4">
        <div>
          <h1 className="text-3xl font-bold">Lucie AI System</h1>
          <p className="text-muted-foreground mt-1">
            AI Content Generation and Orchestration
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="flex items-center mb-2">
              <span className={`w-3 h-3 rounded-full mr-2 ${status?.operational ? 'bg-green-500' : 'bg-red-500'}`}></span>
              {status?.operational ? 'Operational' : 'Degraded'}
            </p>
            <p className="text-sm text-muted-foreground">
              Last updated: {status?.lastUpdated ? new Date(status.lastUpdated).toLocaleString() : 'Unknown'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Models</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {status?.modelStatus && Object.entries(status.modelStatus).map(([model, status]) => (
                <li key={model} className="flex items-center justify-between">
                  <span>{model}</span>
                  <span className="text-sm font-medium">{status}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md">
                Content Generation
              </button>
              <button className="w-full bg-secondary text-secondary-foreground px-4 py-2 rounded-md">
                Content Moderation
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Documentation</h2>
        <p className="text-muted-foreground">
          Lucie is the central AI component for NSFW generation, moderation, and content orchestration 
          in the UberEscorts ecosystem. It provides advanced AI capabilities for content 
          generation, moderation, and personalization.
        </p>
      </div>
    </div>
  );
};

export default LuciePage;
