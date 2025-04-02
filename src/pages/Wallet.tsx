
import { useState } from 'react';
import { WalletProvider } from '@/contexts/WalletContext';
import WalletBalance from '@/components/wallet/WalletBalance';
import TransactionHistory from '@/components/wallet/TransactionHistory';
import RechargeDialog from '@/components/wallet/RechargeDialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, Download, History, CreditCard } from 'lucide-react';

export default function WalletPage() {
  const [isRechargeOpen, setIsRechargeOpen] = useState(false);

  const handleOpenRecharge = () => {
    setIsRechargeOpen(true);
  };

  const handleCloseRecharge = () => {
    setIsRechargeOpen(false);
  };

  return (
    <WalletProvider>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Wallet</h1>
            <p className="text-gray-500 mt-2">Manage your Lucoin balance and transactions</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button 
              onClick={handleOpenRecharge}
              className="bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500"
            >
              <Download className="mr-2 h-4 w-4" />
              Buy Lucoins
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Wallet balance card */}
          <WalletBalance 
            onRecharge={handleOpenRecharge} 
            className="lg:col-span-1"
          />

          {/* Quick access */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Quick Access</CardTitle>
              <CardDescription>Explore what you can do with Lucoins</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <QuickAccessCard 
                  icon={<CreditCard className="h-6 w-6" />}
                  title="Buy Credits"
                  description="Purchase Lucoins to access premium features"
                  onClick={handleOpenRecharge}
                />
                
                <QuickAccessCard 
                  icon={<Wallet className="h-6 w-6" />}
                  title="View Wallet"
                  description="Check your Solana wallet details"
                  onClick={() => {}}
                />
                
                <QuickAccessCard 
                  icon={<History className="h-6 w-6" />}
                  title="Transaction History"
                  description="View your recent transactions"
                  onClick={() => {
                    const historyElement = document.getElementById('transaction-history');
                    if (historyElement) {
                      historyElement.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transaction history */}
        <div id="transaction-history" className="mt-8">
          <TransactionHistory />
        </div>

        {/* Recharge dialog */}
        <RechargeDialog 
          isOpen={isRechargeOpen} 
          onClose={handleCloseRecharge} 
        />
      </div>
    </WalletProvider>
  );
}

interface QuickAccessCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

function QuickAccessCard({ icon, title, description, onClick }: QuickAccessCardProps) {
  return (
    <div 
      className="bg-white border rounded-lg p-6 cursor-pointer transition-all hover:shadow-md hover:border-amber-500"
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center">
        <div className="p-3 rounded-full bg-amber-100 text-amber-500 mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
    </div>
  );
}
