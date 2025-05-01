
import React from 'react';
import { orus } from '@/core/Orus';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const OrusPage = () => {
  const [status, setStatus] = React.useState<any>(null);

  React.useEffect(() => {
    // Get system integrity status
    const integrityResult = orus.checkIntegrity();
    setStatus(integrityResult);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Orus Security System</h1>
        <p className="text-muted-foreground mt-1">
          Security and Session Validation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>System Integrity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="flex items-center mb-2">
              <span className={`w-3 h-3 rounded-full mr-2 ${status?.isValid ? 'bg-green-500' : 'bg-red-500'}`}></span>
              {status?.isValid ? 'Verified' : 'Compromised'}
            </p>
            <p className="text-sm text-muted-foreground">
              Status: {status?.overallStatus}
            </p>
            <p className="text-sm text-muted-foreground">
              Last checked: {status?.timestamp ? new Date(status.timestamp).toLocaleString() : 'Unknown'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Modules Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {status?.modules && Object.entries(status.modules).map(([module, moduleStatus]) => (
                <li key={module} className="flex items-center justify-between">
                  <span className="capitalize">{module}</span>
                  <span className="text-sm font-medium">{moduleStatus as string}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {status?.recommendations?.map((rec: string, index: number) => (
                <li key={index} className="text-sm">• {rec}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Documentation</h2>
        <p className="text-muted-foreground">
          Orus is the security subsystem of the UberEscorts ecosystem. It validates sessions,
          ensures system integrity, and protects against unauthorized access or modifications
          to the platform.
        </p>
      </div>
    </div>
  );
};

export default OrusPage;
