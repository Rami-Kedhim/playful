
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownCircle, ArrowUpCircle, Clock, RefreshCw, Search, Shield, ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { getUBXTransactionHistory } from "@/services/ubxTransactionService";

interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  transaction_type: string;
  description?: string;
  created_at: string;
  metadata?: any;
}

const UBXTransactionHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadTransactions();
    }
  }, [user]);

  useEffect(() => {
    if (search) {
      const filtered = transactions.filter(
        tx => 
          tx.description?.toLowerCase().includes(search.toLowerCase()) ||
          tx.transaction_type.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredTransactions(filtered);
    } else {
      setFilteredTransactions(transactions);
    }
  }, [search, transactions]);

  const loadTransactions = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      const data = await getUBXTransactionHistory(user.id);
      setTransactions(data);
      setFilteredTransactions(data);
    } catch (error) {
      console.error("Error fetching transaction history:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'purchase':
        return <ArrowDownCircle className="h-5 w-5 text-green-500" />;
      case 'boost_purchase':
        return <ArrowUpCircle className="h-5 w-5 text-orange-500" />;
      case 'gift_sent':
        return <ArrowUpCircle className="h-5 w-5 text-pink-500" />;
      case 'gift_received':
        return <ArrowDownCircle className="h-5 w-5 text-green-500" />;
      case 'subscription':
        return <ArrowUpCircle className="h-5 w-5 text-blue-500" />;
      case 'recharge':
        return <ArrowDownCircle className="h-5 w-5 text-green-500" />;
      case 'transfer':
        return <ArrowUpCircle className="h-5 w-5 text-red-500" />;
      case 'receive':
        return <ArrowDownCircle className="h-5 w-5 text-green-500" />;
      default:
        return Number(type) > 0 || type.includes('receive') 
          ? <ArrowDownCircle className="h-5 w-5 text-green-500" /> 
          : <ArrowUpCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getTransactionBadge = (type: string, amount: number) => {
    const isCredit = type.includes('receive') || amount > 0 || type === 'purchase' || type === 'recharge';
    
    let readableType = type.replace(/_/g, ' ');
    readableType = readableType.charAt(0).toUpperCase() + readableType.slice(1);
    
    return (
      <Badge 
        variant={isCredit ? "success" : "destructive"}
        className="capitalize"
      >
        {readableType}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Transaction History</CardTitle>
        <CardDescription>View your recent UBX transactions</CardDescription>
        
        <div className="flex items-center gap-2 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={loadTransactions}
            disabled={loading}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {search ? "No matching transactions found" : "No transactions yet"}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTransactions.map((tx) => (
              <div 
                key={tx.id} 
                className="flex items-center justify-between p-3 rounded-lg border"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    {getTransactionIcon(tx.transaction_type)}
                  </div>
                  <div>
                    <div className="font-medium">{tx.description || "Transaction"}</div>
                    <div className="flex items-center gap-2 mt-1">
                      {getTransactionBadge(tx.transaction_type, tx.amount)}
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(tx.created_at), "MMM d, yyyy h:mm a")}
                      </span>
                      {tx.metadata?.transaction_id && (
                        <a 
                          href={`https://explorer.solana.com/tx/${tx.metadata.transaction_id}`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline flex items-center gap-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          View
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className={`text-lg font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount} UBX
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
