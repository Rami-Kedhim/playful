
import React from 'react';
import { Layout } from '@/layouts';
import { orus } from '@/core/Orus';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock } from 'lucide-react';
import SecureRouteWrapper from '@/components/security/SecureRouteWrapper';

const OrusPage = () => {
  const [status, setStatus] = React.useState<any>(null);

  React.useEffect(() => {
    // Get system integrity status
    const checkIntegrity = async () => {
      const integrityResult = await orus.checkIntegrity();
      setStatus(integrityResult);
    };
    
    checkIntegrity();
  }, []);

  return (
    <Layout 
      title="Orus Security System" 
      description="Security and Session Validation"
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  System Integrity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="flex items-center mb-2">
                  <span className={`w-3 h-3 rounded-full mr-2 ${status?.valid ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  {status?.valid ? 'Verified' : 'Compromised'}
                </p>
                <p className="text-sm text-muted-foreground">
                  Last checked: {status?.lastChecked ? new Date(status.lastChecked).toLocaleString() : 'Unknown'}
                </p>
                {status?.integrity && (
                  <p className="text-sm text-muted-foreground">
                    Integrity score: {status.integrity}%
                  </p>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Security Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {status?.checks && Object.entries(status.checks).map(([check, isValid]) => (
                    <div key={check} className="flex justify-between items-center">
                      <span className="text-muted-foreground capitalize">{check.replace(/_/g, ' ')}:</span>
                      <span className={`font-medium ${isValid ? 'text-green-500' : 'text-red-500'}`}>
                        {isValid ? 'Secure' : 'Issue Detected'}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SecureRouteWrapper>
    </Layout>
  );
};

export default OrusPage;
