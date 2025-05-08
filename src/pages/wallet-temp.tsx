
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import UBXBalance from '@/components/profile/settings/UBXBalance';
import UBXPackageDialog from '@/components/profile/settings/UBXPackageDialog';
import { UnifiedLayout } from '@/layouts';
import { Wallet, ArrowUpRight, History, CreditCard, Shield, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SecureRouteWrapper from '@/components/security/SecureRouteWrapper';
import { orus } from '@/core/Orus';
import { useEffect, useState } from 'react';

const WalletPage: React.FC = () => {
  const [securityStatus, setSecurityStatus] = useState({
    transactionsSecurity: false,
    walletSecurity: false,
    dataEncryption: false
  });

  useEffect(() => {
    const verifyWalletSecurity = async () => {
      try {
        // Use Orus for security validation
        const integrityCheck = await orus.checkIntegrity();
        
        setSecurityStatus({
          transactionsSecurity: integrityCheck.valid,
          walletSecurity: integrityCheck.integrity > 90,
          dataEncryption: integrityCheck.checks.database && integrityCheck.checks.network
        });
      } catch (error) {
        console.error('Wallet security check failed:', error);
      }
    };
    
    verifyWalletSecurity();
  }, []);

  return (
    <UnifiedLayout 
      title="UBX Wallet" 
      description="Manage your UBX tokens and transactions" 
      showBreadcrumbs
    >
      <SecureRouteWrapper minimumSecurityLevel="maximum">
        <div className="container mx-auto py-8">
          <Card className="mb-6 border-primary/20">
            <CardHeader className="bg-primary/5">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-primary" />
                  Wallet Security Status
                </CardTitle>
              </div>
              <CardDescription>
                Enhanced protection for your digital assets
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="flex items-center space-x-2">
                <div className={`h-3 w-3 rounded-full ${securityStatus.transactionsSecurity ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                <span>Transaction Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`h-3 w-3 rounded-full ${securityStatus.walletSecurity ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                <span>Wallet Protection</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`h-3 w-3 rounded-full ${securityStatus.dataEncryption ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                <span>Data Encryption</span>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <UBXBalance onRecharge={() => {}} />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="mr-2 h-5 w-5 text-primary" />
                      Quick Purchase
                    </CardTitle>
                    <CardDescription>Buy UBX tokens instantly</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UBXPackageDialog />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <History className="mr-2 h-5 w-5 text-primary" />
                      Recent Transactions
                    </CardTitle>
                    <CardDescription>Your latest wallet activity</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      No recent transactions to display
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      <History className="mr-2 h-4 w-4" />
                      View All Transactions
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lock className="mr-2 h-5 w-5 text-primary" />
                    Secure Actions
                  </CardTitle>
                  <CardDescription>Protected by maximum security protocol</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start">
                    <ArrowUpRight className="mr-2 h-4 w-4" />
                    Send UBX
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Wallet className="mr-2 h-4 w-4" />
                    UBX Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="mr-2 h-4 w-4" />
                    Security Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SecureRouteWrapper>
    </UnifiedLayout>
  );
};

export default WalletPage;
