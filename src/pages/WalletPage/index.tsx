
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import UBXBalance from '@/components/profile/settings/UBXBalance';
import UBXPackageDialog from '@/components/profile/settings/UBXPackageDialog';

const WalletPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">UBX Wallet</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UBXBalance onRecharge={() => {}} />
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your UBX tokens</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <UBXPackageDialog />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WalletPage;
