
import React, { useState, useEffect } from 'react';
import { UnifiedLayout } from '@/layouts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { orus } from '@/core/Orus';
import { Shield, Check, AlertTriangle, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SystemIntegrityResult } from '@/types/core-systems';

const OrusPage: React.FC = () => {
  const [integrity, setIntegrity] = useState<SystemIntegrityResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [securityToken, setSecurityToken] = useState<string | null>(null);
  
  useEffect(() => {
    const checkSystemSecurity = async () => {
      try {
        setLoading(true);
        const integrityResult = await orus.checkIntegrity();
        setIntegrity(integrityResult);
        
        // Generate a secure token
        const token = await generateSecureToken();
        setSecurityToken(token);
      } catch (error) {
        console.error('Failed to check Orus security:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkSystemSecurity();
  }, []);
  
  // This would be a proper cryptographically secure token in production
  const generateSecureToken = async (): Promise<string> => {
    const randomValues = new Uint8Array(16);
    window.crypto.getRandomValues(randomValues);
    return Array.from(randomValues).map(b => b.toString(16).padStart(2, '0')).join('');
  };
  
  return (
    <UnifiedLayout 
      title="Orus Security System" 
      description="Maximum security protocol and system integrity verification"
      showBreadcrumbs
    >
      <div className="container mx-auto py-8 space-y-6">
        {/* Security Status Card */}
        <Card className="border-primary/20">
          <CardHeader className="bg-primary/5">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5 text-primary" />
                Orus Maximum Security Protocol
              </CardTitle>
              
              {!loading && integrity && (
                <Badge variant="outline" className={integrity.valid ? "bg-green-500/10 text-green-600 border-green-500" : "bg-yellow-500/10 text-yellow-600 border-yellow-500"}>
                  {integrity.valid ? (
                    <Check className="h-3 w-3 mr-1" />
                  ) : (
                    <AlertTriangle className="h-3 w-3 mr-1" />
                  )}
                  {integrity.valid ? 'Secure' : 'Warning'}
                </Badge>
              )}
            </div>
            <CardDescription>
              Enterprise-grade security infrastructure for the UberEscorts ecosystem
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6 space-y-6">
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <Shield className="h-8 w-8 text-primary animate-pulse" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">System Integrity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-primary">
                        {integrity?.integrity || 0}%
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Security Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className={`text-lg font-bold ${integrity?.valid ? 'text-green-500' : 'text-yellow-500'}`}>
                        {integrity?.valid ? 'Protected' : 'Warning'}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Last Check</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm">
                        {integrity?.lastChecked ? new Date(integrity.lastChecked).toLocaleTimeString() : 'Unknown'}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Warnings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-lg font-bold">
                        {integrity?.warnings.length || 0}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {integrity && integrity.checks && (
                  <Card>
                    <CardHeader>
                      <CardTitle>System Check Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {Object.entries(integrity.checks).map(([key, value]) => (
                          <div key={key} className="flex items-center space-x-2">
                            <div className={`h-3 w-3 rounded-full ${value ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <span className="capitalize">{key}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {securityToken && (
                  <div className="border rounded-lg p-4 bg-background">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Security Token</h3>
                      <Lock className="h-4 w-4 text-primary" />
                    </div>
                    <div className="p-3 bg-muted rounded font-mono text-xs truncate">
                      {securityToken}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      This one-time security token can be used to verify your identity.
                    </p>
                  </div>
                )}
              </>
            )}
            
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1">
                <Shield className="mr-2 h-4 w-4" />
                Security Scan
              </Button>
              <Button variant="outline" className="flex-1">
                <Lock className="mr-2 h-4 w-4" />
                Update Protocols
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </UnifiedLayout>
  );
};

export default OrusPage;
