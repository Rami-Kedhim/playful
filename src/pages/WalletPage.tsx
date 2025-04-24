
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

const WalletPage = () => {
  return (
    <MainLayout title="Wallet" description="Manage your wallet and transactions">
      <div className="bg-card rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Wallet Page</h1>
        <p>Your wallet management interface will appear here.</p>
      </div>
    </MainLayout>
  );
};

export default WalletPage;
