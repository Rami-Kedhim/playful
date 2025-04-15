
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const WalletPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">UBX Wallet</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Balance</CardTitle>
            <CardDescription>Your current UBX balance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0 UBX</div>
            <p className="text-sm text-muted-foreground mt-2">
              UBX can be used to access premium features and services
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>Recent UBX transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No transactions yet</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>UBX Management</CardTitle>
            <CardDescription>Manage your UBX</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <button className="w-full bg-primary text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition">
              Purchase UBX
            </button>
            <button className="w-full border border-input bg-background hover:bg-accent hover:text-accent-foreground p-2 rounded-md transition">
              Transfer UBX
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WalletPage;
