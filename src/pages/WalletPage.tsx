
import React from 'react';
import { UBXWallet } from '@/components/wallet/UBXWallet';

const WalletPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">UBX Wallet</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UBXWallet showRefresh={true} showHistory={true} />
          
          <div className="mt-8 bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
            <div className="text-center py-8 text-muted-foreground">
              Your transaction history will appear here
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-card border rounded-lg p-6">
            <h3 className="font-medium mb-4">Add UBX Tokens</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Purchase UBX tokens to access premium features and services across the platform.
            </p>
            <button className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
              Purchase Tokens
            </button>
          </div>
          
          <div className="bg-card border rounded-lg p-6">
            <h3 className="font-medium mb-4">About UBX Tokens</h3>
            <p className="text-sm text-muted-foreground">
              UBX tokens are our platform's currency, enabling secure and private transactions across all services.
              Use them for appointments, content access, tipping, and more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
