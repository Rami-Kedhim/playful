import React, { useEffect, useState } from 'react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { uberWallet } from '@/core/UberWallet';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import UBXPriceDisplay from '@/components/oxum/UBXPriceDisplay';
import OxumInfoTooltip from '@/components/oxum/OxumInfoTooltip';
import { useToast } from '@/hooks/use-toast';
import { Wallet, Loader2, Clock, ArrowUpRight } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuth } from '@/hooks/auth';
import { useNavigate } from 'react-router-dom';

const UpdatedWallet = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  
  useEffect(() => {
    const loadWalletData = async () => {
      if (!user?.id) return;
      
      try {
        setIsLoading(true);
        const walletBalance = await uberWallet.getBalance(user.id);
        const txHistory = await uberWallet.getTransactionHistory(user.id);
        
        setBalance(walletBalance);
        setTransactions(txHistory);
      } catch (error) {
        console.error('Failed to load wallet data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load wallet data. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadWalletData();
  }, [user?.id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  // Check for boosted status with fallbacks
  const isBoostedProfile = profile?.isBoosted || profile?.is_boosted;
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold flex items-center gap-2 mb-6">
        <Wallet className="h-7 w-7" />
        Wallet
      </h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Balance Card */}
        <Card>
          <CardHeader>
            <CardTitle>Your Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">{balance}</span>
                <span className="ml-2 text-xl">UBX</span>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Equivalent to approximately ${(balance * 0.1).toFixed(2)} USD
              </p>
              
              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <Button onClick={() => navigate('/wallet/add-funds')}>
                  Add Funds
                </Button>
                <Button variant="outline" onClick={() => navigate('/wallet/withdraw')}>
                  Withdraw
                </Button>
              </div>
              
              {isBoostedProfile && (
                <div className="mt-4 p-3 bg-primary/10 rounded-md flex items-center gap-2">
                  <Badge variant="outline" className="bg-primary/20">
                    Boosted
                  </Badge>
                  <span className="text-sm">Your profile is currently boosted!</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>Your recent transactions</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.length > 0 ? (
                  transactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell className="font-medium">{tx.description || tx.type}</TableCell>
                      <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">{tx.amount} UBX</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-4 text-muted-foreground">
                      No transactions yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UpdatedWallet;
