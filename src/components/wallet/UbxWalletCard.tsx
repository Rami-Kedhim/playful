
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Wallet, ArrowDown, ArrowUp, Clock } from 'lucide-react';
import { UbxBalance, UbxTransaction } from '@/types/shared';

interface UbxWalletCardProps {
  balance: UbxBalance;
  recentTransactions?: UbxTransaction[];
  onTopUp?: () => void;
  onViewAll?: () => void;
  isLoading?: boolean;
}

/**
 * UBX Wallet Card component showing balance and recent transactions
 */
const UbxWalletCard: React.FC<UbxWalletCardProps> = ({
  balance,
  recentTransactions = [],
  onTopUp,
  onViewAll,
  isLoading = false
}) => {
  const formatAmount = (amount: number) => {
    return amount.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  };
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'purchase':
        return <ArrowDown className="h-4 w-4 text-green-500" />;
      case 'spend':
        return <ArrowUp className="h-4 w-4 text-red-500" />;
      case 'earn':
        return <ArrowDown className="h-4 w-4 text-green-500" />;
      case 'refund':
        return <ArrowDown className="h-4 w-4 text-blue-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-emerald-700 to-teal-800 text-white">
        <CardTitle className="flex items-center">
          <Wallet className="h-5 w-5 mr-2" /> UBX Wallet
        </CardTitle>
        <CardDescription className="text-emerald-100">
          Securely manage your UBX tokens
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        ) : (
          <>
            <div className="text-3xl font-bold mb-1">{formatAmount(balance.total)} UBX</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Available: {formatAmount(balance.available)} UBX
              {balance.pending > 0 && ` • Pending: ${formatAmount(balance.pending)} UBX`}
              {balance.reserved > 0 && ` • Reserved: ${formatAmount(balance.reserved)} UBX`}
            </div>
            
            <Button onClick={onTopUp} className="w-full mb-6">Top Up Wallet</Button>
            
            {recentTransactions.length > 0 && (
              <>
                <div className="text-sm font-medium mb-2">Recent Transactions</div>
                <div className="space-y-3">
                  {recentTransactions.map((tx) => (
                    <div key={tx.id} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                      <div className="flex items-center">
                        <div className="mr-3">
                          {getTransactionIcon(tx.type)}
                        </div>
                        <div>
                          <div className="font-medium">{tx.description}</div>
                          <div className="text-xs text-gray-500">{formatDate(tx.timestamp)}</div>
                        </div>
                      </div>
                      <div className={`font-medium ${tx.type === 'spend' ? 'text-red-500' : 'text-green-500'}`}>
                        {tx.type === 'spend' ? '-' : '+'}{formatAmount(Math.abs(tx.amount))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </CardContent>
      
      {recentTransactions.length > 0 && (
        <CardFooter className="bg-gray-50 dark:bg-gray-900">
          <Button variant="ghost" className="w-full" onClick={onViewAll}>
            View All Transactions <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default UbxWalletCard;
