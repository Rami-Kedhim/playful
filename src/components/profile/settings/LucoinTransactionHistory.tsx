import { useState, useEffect } from "react";
import { format } from "date-fns";
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Gift, 
  Zap, 
  ShoppingCart, 
  Clock, 
  Search,
  CreditCard
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLucoins, TransactionHistory } from "@/hooks/useLucoins";

const LucoinTransactionHistory = () => {
  const [transactions, setTransactions] = useState<TransactionHistory[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<TransactionHistory[]>([]);
  const [search, setSearch] = useState("");
  const { getTransactionHistory, loading } = useLucoins();

  useEffect(() => {
    loadTransactions();
  }, []);

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
    const data = await getTransactionHistory();
    setTransactions(data);
    setFilteredTransactions(data);
  };

  // Helper function to get icon for transaction type
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'purchase':
        return <ShoppingCart className="h-5 w-5" />;
      case 'boost_purchase':
        return <Zap className="h-5 w-5" />;
      case 'gift_sent':
        return <Gift className="h-5 w-5 text-pink-500" />;
      case 'gift_received':
        return <Gift className="h-5 w-5 text-green-500" />;
      case 'subscription':
        return <CreditCard className="h-5 w-5" />;
      default:
        return type.includes('receive') || parseInt(type) > 0 
          ? <ArrowDownLeft className="h-5 w-5 text-green-500" /> 
          : <ArrowUpRight className="h-5 w-5 text-red-500" />;
    }
  };

  // Helper function to get badge for transaction type
  const getTransactionBadge = (type: string, amount: number) => {
    // Determine if credit or debit
    const isCredit = type.includes('receive') || amount > 0;
    const color = isCredit ? "success" : "destructive";
    
    // Format readable transaction type
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
        <CardDescription>View your recent Lucoin transactions</CardDescription>
        
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
            <Clock className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
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
                    </div>
                  </div>
                </div>
                <div className={`text-lg font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount} LC
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LucoinTransactionHistory;
