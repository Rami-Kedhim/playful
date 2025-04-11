
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowDownLeft, ArrowUpRight, Clock, RefreshCw, 
  Shield, AlertCircle, CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';

type Transaction = {
  id: string;
  amount: number;
  transaction_type: string;
  description: string;
  created_at: string;
  metadata: any;
};

const UBXTransactionHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  const fetchTransactions = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('lucoin_transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);
      
      if (error) throw error;
      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchTransactions();
  }, [user]);
  
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownLeft className="h-4 w-4 text-green-500" />;
      case 'spend':
        return <ArrowUpRight className="h-4 w-4 text-amber-500" />;
      case 'receive':
        return <ArrowDownLeft className="h-4 w-4 text-blue-500" />;
      case 'transfer':
        return <ArrowUpRight className="h-4 w-4 text-violet-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };
  
  const getTransactionStatusIcon = (metadata: any) => {
    if (!metadata) return null;
    
    if (metadata.txHash) {
      return (
        <a 
          href={`https://explorer.iota.org/mainnet/message/${metadata.txHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary"
          title="View on IOTA Explorer"
        >
          <Shield className="h-4 w-4" />
        </a>
      );
    }
    
    return null;
  };
  
  const formatAmount = (amount: number, type: string) => {
    if (['spend', 'transfer'].includes(type) && amount > 0) {
      return `-${amount}`;
    }
    return amount > 0 ? `+${amount}` : amount;
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Transaction History</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={fetchTransactions} 
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>
      
      {loading ? (
        <div className="py-8 flex justify-center">
          <RefreshCw className="animate-spin h-8 w-8 text-muted-foreground" />
        </div>
      ) : transactions.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4 opacity-30" />
            <h3 className="text-lg font-medium mb-2">No transactions yet</h3>
            <p className="text-muted-foreground max-w-md">
              When you receive or spend UBX, your transactions will appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div 
              key={tx.id} 
              className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center">
                <div className="bg-muted rounded-full p-2 mr-3">
                  {getTransactionIcon(tx.transaction_type)}
                </div>
                <div>
                  <p className="font-medium">
                    {tx.description || tx.transaction_type.charAt(0).toUpperCase() + tx.transaction_type.slice(1)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(tx.created_at), { addSuffix: true })}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <span className={`font-medium mr-2 ${
                  tx.amount > 0 && tx.transaction_type !== 'spend' ? 'text-green-600 dark:text-green-400' : 
                  'text-red-600 dark:text-red-400'
                }`}>
                  {formatAmount(tx.amount, tx.transaction_type)} UBX
                </span>
                {getTransactionStatusIcon(tx.metadata)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UBXTransactionHistory;
