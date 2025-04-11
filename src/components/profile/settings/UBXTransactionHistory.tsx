
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownCircle, ArrowUpCircle, Clock, Info, Shield, ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { useAuth } from '@/contexts/AuthContext';

interface Transaction {
  id: string;
  date: Date;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'gift' | 'purchase';
  description: string;
  status: 'completed' | 'pending' | 'failed';
  metadata?: {
    network?: string;
    txHash?: string;
  };
}

const UBXTransactionHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        // In a real app, this would come from an API call
        // For now, let's use mock data
        const mockTransactions: Transaction[] = [
          {
            id: '1',
            date: new Date(),
            amount: 1000,
            type: 'deposit',
            description: 'Purchase of Standard UBX package',
            status: 'completed'
          },
          {
            id: '2',
            date: new Date(Date.now() - 86400000),
            amount: 500,
            type: 'withdrawal',
            description: 'Gift to EscortUser123',
            status: 'completed'
          },
          {
            id: '3',
            date: new Date(Date.now() - 172800000),
            amount: 200,
            type: 'purchase',
            description: 'Access to premium content',
            status: 'completed'
          },
          {
            id: '4',
            date: new Date(Date.now() - 259200000),
            amount: 750,
            type: 'deposit',
            description: 'IOTA transfer',
            status: 'completed',
            metadata: {
              network: 'iota',
              txHash: 'a1b2c3d4e5f6g7h8i9j0'
            }
          }
        ];
        
        // Simulate API delay
        setTimeout(() => {
          setTransactions(mockTransactions);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching UBX transactions', error);
        setLoading(false);
      }
    };

    if (user) {
      fetchTransactions();
    } else {
      setLoading(false);
    }
  }, [user]);
  
  const getTransactionIcon = (type: string, metadata?: any) => {
    if (metadata?.network === 'iota') {
      return <Shield className="h-5 w-5 text-primary" />;
    }
    
    switch (type) {
      case 'deposit':
        return <ArrowDownCircle className="h-5 w-5 text-green-500" />;
      case 'withdrawal':
      case 'gift':
        return <ArrowUpCircle className="h-5 w-5 text-red-500" />;
      case 'purchase':
        return <ArrowUpCircle className="h-5 w-5 text-orange-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getExplorerUrl = (txHash: string) => {
    return `https://explorer.iota.org/mainnet/message/${txHash}`;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Your recent UBX transactions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="flex items-center space-x-4 py-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>Your recent UBX transactions</CardDescription>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No transactions yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-start justify-between pb-4 border-b last:border-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <div className="mt-1">{getTransactionIcon(transaction.type, transaction.metadata)}</div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(transaction.date, 'PPp')}
                    </p>
                    {transaction.metadata?.txHash && (
                      <a 
                        href={getExplorerUrl(transaction.metadata.txHash)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline mt-1 flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        View on explorer
                      </a>
                    )}
                  </div>
                </div>
                <div className={`text-right ${transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                  <p className="font-medium">
                    {transaction.type === 'deposit' ? '+' : '-'}{transaction.amount} UBX
                  </p>
                  <p className="text-xs text-muted-foreground uppercase">
                    {transaction.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UBXTransactionHistory;
