
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import UBXBalance from '@/components/profile/settings/UBXBalance';
import UBXPackageDialog from '@/components/profile/settings/UBXPackageDialog';
import { UnifiedLayout } from '@/layouts';
import { Wallet, ArrowUpRight, History, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WalletPage: React.FC = () => {
  return (
    <UnifiedLayout 
      title="UBX Wallet" 
      description="Manage your UBX tokens and transactions" 
      showBreadcrumbs
    >
      <div className="container mx-auto py-8">
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
                <CardTitle>Actions</CardTitle>
                <CardDescription>Manage your UBX wallet</CardDescription>
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </UnifiedLayout>
  );
};

export default WalletPage;
