
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Loader2,
  ExternalLink,
  Search,
  RefreshCw
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  getSolanaTransactionHistory, 
  getSolanaTransactionDetails 
} from "@/services/solanaService";
import { useSolanaWallet } from "@/hooks/useSolanaWallet";

const SolanaTransactionHistory = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [detailView, setDetailView] = useState<string | null>(null);
  const [transactionDetails, setTransactionDetails] = useState<any>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const { walletAddress } = useSolanaWallet();

  useEffect(() => {
    if (walletAddress) {
      loadTransactions();
    }
  }, [walletAddress]);

  useEffect(() => {
    if (search) {
      const filtered = transactions.filter(
        tx => 
          tx.signature.toLowerCase().includes(search.toLowerCase()) ||
          (tx.memo && tx.memo.toLowerCase().includes(search.toLowerCase()))
      );
      setFilteredTransactions(filtered);
    } else {
      setFilteredTransactions(transactions);
    }
  }, [search, transactions]);

  const loadTransactions = async () => {
    if (!walletAddress) return;
    
    setLoading(true);
    try {
      const data = await getSolanaTransactionHistory(walletAddress, 20);
      setTransactions(data);
      setFilteredTransactions(data);
    } catch (error) {
      console.error("Error loading transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const viewTransactionDetails = async (signature: string) => {
    setDetailView(signature);
    setLoadingDetails(true);
    
    try {
      const details = await getSolanaTransactionDetails(signature);
      setTransactionDetails(details);
    } catch (error) {
      console.error("Error loading transaction details:", error);
    } finally {
      setLoadingDetails(false);
    }
  };

  const closeDetailView = () => {
    setDetailView(null);
    setTransactionDetails(null);
  };

  const formatTimestamp = (timestamp: number) => {
    return format(new Date(timestamp * 1000), "MMM d, yyyy h:mm a");
  };

  const openExplorer = (signature: string) => {
    window.open(`https://explorer.solana.com/tx/${signature}`, '_blank');
  };

  if (!walletAddress) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Solana Transactions</CardTitle>
          <CardDescription>Connect your wallet to view transaction history</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">No wallet connected</p>
        </CardContent>
      </Card>
    );
  }

  if (detailView && transactionDetails) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Transaction Details</CardTitle>
            <CardDescription className="mt-1">
              <span className="font-mono text-xs">{detailView.substring(0, 16)}...</span>
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={closeDetailView}>
              Back
            </Button>
            <Button variant="outline" size="sm" onClick={() => openExplorer(detailView)}>
              <ExternalLink className="h-4 w-4 mr-1" />
              Explorer
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loadingDetails ? (
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/5" />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium">Status</div>
                <div>
                  {transactionDetails.meta?.err ? (
                    <Badge variant="destructive">Failed</Badge>
                  ) : (
                    <Badge variant="success">Success</Badge>
                  )}
                </div>
                
                <div className="text-sm font-medium">Block Time</div>
                <div>{formatTimestamp(transactionDetails.blockTime)}</div>
                
                <div className="text-sm font-medium">Slot</div>
                <div>{transactionDetails.slot}</div>
                
                <div className="text-sm font-medium">Fee</div>
                <div>{transactionDetails.meta?.fee / 1000000000} SOL</div>
              </div>
              
              {transactionDetails.meta?.logMessages && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Transaction Logs</h4>
                  <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto max-h-40">
                    {transactionDetails.meta.logMessages.join('\n')}
                  </pre>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Solana Transactions</CardTitle>
        <CardDescription>Recent transactions for your connected wallet</CardDescription>
        
        <div className="flex items-center gap-2 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by transaction signature..."
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
          <div className="space-y-3">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {search ? "No matching transactions found" : "No transactions yet"}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTransactions.map((tx) => (
              <div 
                key={tx.signature} 
                className="flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-accent/50"
                onClick={() => viewTransactionDetails(tx.signature)}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    {tx.err ? (
                      <ArrowUpRight className="h-5 w-5 text-red-500" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">
                      {tx.signature.substring(0, 10)}...{tx.signature.substring(tx.signature.length - 5)}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge 
                        variant={tx.err ? "destructive" : "outline"}
                      >
                        {tx.err ? "Failed" : "Success"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(tx.blockTime)}
                      </span>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    openExplorer(tx.signature);
                  }}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SolanaTransactionHistory;
