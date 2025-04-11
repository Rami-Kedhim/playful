
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock, RefreshCw, Filter, SortAsc, SortDesc } from 'lucide-react';
import { 
  getSolanaTransactionHistory,
  getSolanaTransactionDetails
} from '@/services/solanaService';
import { useSolanaWallet } from '@/hooks/useSolanaWallet';
import SolanaTransaction from './SolanaTransaction';

export const SolanaTransactionHistory: React.FC = () => {
  const { walletAddress } = useSolanaWallet();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  // Fetch transaction history
  const fetchTransactions = async () => {
    if (!walletAddress) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Get transaction signatures
      const txHistory = await getSolanaTransactionHistory(walletAddress);
      
      if (!txHistory || !txHistory.length) {
        setTransactions([]);
        return;
      }
      
      // Get details for each transaction (limit to 5 for performance)
      const detailedTxs = await Promise.all(
        txHistory.slice(0, 5).map(async (tx) => {
          const details = await getSolanaTransactionDetails(tx.signature);
          return { 
            signature: tx.signature, 
            blockTime: tx.blockTime ? new Date(tx.blockTime * 1000) : new Date(),
            details: details || {}
          };
        })
      );
      
      setTransactions(detailedTxs);
    } catch (error: any) {
      console.error('Error fetching transaction history:', error);
      setError('Failed to load transaction history');
    } finally {
      setLoading(false);
    }
  };
  
  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
  };

  // Load transactions when wallet address changes
  useEffect(() => {
    if (walletAddress) {
      fetchTransactions();
    } else {
      setTransactions([]);
    }
  }, [walletAddress]);

  // Sort transactions
  const sortedTransactions = [...transactions].sort((a, b) => {
    const aTime = new Date(a.blockTime).getTime();
    const bTime = new Date(b.blockTime).getTime();
    return sortOrder === 'desc' ? bTime - aTime : aTime - bTime;
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg">Transaction History</CardTitle>
          <CardDescription>Recent Solana blockchain activity</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSortOrder}
            title={`Sort ${sortOrder === 'desc' ? 'oldest' : 'newest'} first`}
          >
            {sortOrder === 'desc' ? <SortDesc className="h-4 w-4" /> : <SortAsc className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={fetchTransactions}
            disabled={loading || !walletAddress}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex justify-between items-center py-3">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="py-8 text-center">
            <p className="text-destructive">{error}</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fetchTransactions} 
              className="mt-2"
            >
              Try Again
            </Button>
          </div>
        ) : transactions.length === 0 ? (
          <div className="py-8 text-center">
            <Clock className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No transactions found</p>
            {walletAddress && (
              <p className="text-xs text-muted-foreground mt-1">
                New transactions will appear here
              </p>
            )}
          </div>
        ) : (
          <div className="divide-y">
            {sortedTransactions.map((tx) => (
              <SolanaTransaction
                key={tx.signature}
                signature={tx.signature}
                timestamp={tx.blockTime}
                status="confirmed"
                type="outgoing"
                amount={0.001} // This would come from tx details in a real implementation
                description="UBX Token Purchase"
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SolanaTransactionHistory;
