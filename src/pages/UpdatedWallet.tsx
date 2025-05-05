
import React from 'react';
import { Layout } from '@/layouts';

const UpdatedWallet = () => {
  return (
    <Layout title="Wallet" description="Manage your UBX wallet" showBreadcrumbs>
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
          <div>
            <div className="bg-card rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="bg-primary p-6">
                <h2 className="text-primary-foreground text-xl font-semibold">UBX Balance</h2>
                <div className="flex items-baseline mt-2">
                  <span className="text-primary-foreground text-3xl font-bold">1,250</span>
                  <span className="text-primary-foreground/80 ml-2">UBX</span>
                </div>
                <p className="text-primary-foreground/70 mt-1 text-sm">
                  ≈ $125.00 USD
                </p>
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
                    Deposit
                  </button>
                  <button className="px-4 py-2 border border-border rounded-md">
                    Withdraw
                  </button>
                  <button className="px-4 py-2 border border-border rounded-md">
                    Send UBX
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-4">Transaction History</h3>
              
              <div className="space-y-4">
                {[
                  { type: 'Deposit', amount: '+500 UBX', date: '2023-05-01', status: 'completed' },
                  { type: 'Purchase', amount: '-200 UBX', date: '2023-04-28', status: 'completed' },
                  { type: 'Boost', amount: '-50 UBX', date: '2023-04-25', status: 'completed' },
                  { type: 'Deposit', amount: '+1000 UBX', date: '2023-04-20', status: 'completed' },
                ].map((tx, i) => (
                  <div key={i} className="flex justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium">{tx.type}</p>
                      <p className="text-sm text-muted-foreground">{tx.date}</p>
                    </div>
                    <div className="text-right">
                      <p className={tx.amount.startsWith('+') ? 'text-green-500' : ''}>{tx.amount}</p>
                      <p className="text-xs uppercase text-muted-foreground">{tx.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-card rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 rounded-md hover:bg-accent flex items-center">
                  <span className="mr-2">🚀</span> Boost Profile
                </button>
                <button className="w-full text-left px-3 py-2 rounded-md hover:bg-accent flex items-center">
                  <span className="mr-2">🎁</span> Send Gift
                </button>
                <button className="w-full text-left px-3 py-2 rounded-md hover:bg-accent flex items-center">
                  <span className="mr-2">🔄</span> Convert Currency
                </button>
                <button className="w-full text-left px-3 py-2 rounded-md hover:bg-accent flex items-center">
                  <span className="mr-2">📊</span> View Reports
                </button>
              </div>
            </div>
            
            <div className="bg-card rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-3">UBX Packages</h3>
              <div className="space-y-3">
                <div className="border border-border rounded-md p-3 hover:border-primary cursor-pointer">
                  <div className="flex justify-between">
                    <span className="font-medium">Starter</span>
                    <span>$10</span>
                  </div>
                  <p className="text-sm text-muted-foreground">100 UBX + 10 bonus</p>
                </div>
                
                <div className="border border-border rounded-md p-3 hover:border-primary cursor-pointer">
                  <div className="flex justify-between">
                    <span className="font-medium">Popular</span>
                    <span>$25</span>
                  </div>
                  <p className="text-sm text-muted-foreground">250 UBX + 50 bonus</p>
                </div>
                
                <div className="border border-border rounded-md p-3 hover:border-primary cursor-pointer">
                  <div className="flex justify-between">
                    <span className="font-medium">Premium</span>
                    <span>$100</span>
                  </div>
                  <p className="text-sm text-muted-foreground">1000 UBX + 250 bonus</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdatedWallet;
