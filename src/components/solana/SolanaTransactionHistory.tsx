
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { getSolanaTransactionHistory, getSolanaTransactionDetails } from "@/services/solanaService";
import { useSolanaWallet } from "@/hooks/useSolanaWallet";
import { ArrowUpRight, ArrowDownLeft, RefreshCw, ExternalLink } from "lucide-react";

const SolanaTransactionHistory = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState<Record<string, boolean>>({});
  const [expandedTx, setExpandedTx] = useState<string | null>(null);
  const [transactionDetails, setTransactionDetails] = useState<Record<string, any>>({});
  const { walletAddress } = useSolanaWallet();

  useEffect(() => {
    if (walletAddress) {
      loadTransactions(walletAddress);
    } else {
      setTransactions([]);
    }
  }, [walletAddress]);

  const loadTransactions = async (address: string) => {
    setLoading(true);
    try {
      const history = await getSolanaTransactionHistory(address);
      setTransactions(history);
    } catch (error) {
      console.error("Error loading transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    if (walletAddress) {
      loadTransactions(walletAddress);
    }
  };

  const handleExpand = async (signature: string) => {
    if (expandedTx === signature) {
      setExpandedTx(null);
      return;
    }

    setExpandedTx(signature);
    
    if (!transactionDetails[signature]) {
      setLoadingDetails({...loadingDetails, [signature]: true});
      try {
        const details = await getSolanaTransactionDetails(signature);
        setTransactionDetails({
          ...transactionDetails,
          [signature]: details
        });
      } catch (error) {
        console.error("Error loading transaction details:", error);
      } finally {
        setLoadingDetails({...loadingDetails, [signature]: false});
      }
    }
  };

  const formatAmount = (transaction: any) => {
    const details = transactionDetails[transaction.signature];
    if (!details) return "—";
    
    // This is a simplified calculation and would need to be expanded 
    // for a production app to properly calculate the SOL amount
    const amount = 0.01; // Placeholder
    return `${amount} SOL`;
  };

  const getExplorerUrl = (signature: string) => {
    return `https://explorer.solana.com/tx/${signature}`;
  };

  if (!walletAddress) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Connect your Solana wallet to view transactions</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <WalletIcon className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No wallet connected</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Solana Transactions</CardTitle>
          <CardDescription>View your recent Solana transactions</CardDescription>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No transactions found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div key={tx.signature} className="border rounded-lg overflow-hidden">
                <div 
                  className="p-3 flex items-center justify-between cursor-pointer hover:bg-accent/50"
                  onClick={() => handleExpand(tx.signature)}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {tx.err ? (
                        <ArrowUpRight className="h-5 w-5 text-destructive" />
                      ) : (
                        <ArrowDownLeft className="h-5 w-5 text-success" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">
                        {tx.signature.substring(0, 8)}...{tx.signature.substring(tx.signature.length - 8)}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={tx.err ? "destructive" : "success"}>
                          {tx.err ? "Failed" : "Success"}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(tx.blockTime * 1000), "MMM d, yyyy h:mm a")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a 
                      href={getExplorerUrl(tx.signature)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-primary hover:text-primary/80"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                
                {expandedTx === tx.signature && (
                  <div className="p-3 border-t bg-muted/50">
                    {loadingDetails[tx.signature] ? (
                      <Skeleton className="h-24 w-full" />
                    ) : transactionDetails[tx.signature] ? (
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <span className="font-medium">
                            {tx.err ? "Failed" : "Confirmed"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Amount:</span>
                          <span className="font-medium">{formatAmount(tx)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Slot:</span>
                          <span className="font-medium">{tx.slot.toLocaleString()}</span>
                        </div>
                        <div className="text-xs mt-2">
                          <a
                            href={getExplorerUrl(tx.signature)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline inline-flex items-center"
                          >
                            View on Solana Explorer
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Error loading transaction details</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Helper component for the no wallet state
const WalletIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
    <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
  </svg>
);

export default SolanaTransactionHistory;
