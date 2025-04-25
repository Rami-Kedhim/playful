
import React from 'react';
import Layout from '@/components/layout/Layout';

const WalletPage = () => {
  return (
    <Layout
      title="Wallet"
      description="Manage your wallet and transactions"
    >
      <div className="bg-card rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Wallet Page</h1>
        <p>Your wallet management interface will appear here.</p>
      </div>
    </Layout>
  );
};

export default WalletPage;
