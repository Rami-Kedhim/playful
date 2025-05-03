import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UBXPriceDisplay } from '@/components/oxum/UBXPriceDisplay';
import { OxumInfoTooltip } from '@/components/oxum/OxumInfoTooltip';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Loader2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const UpdatedWallet = () => {
  const { user, profile } = useAuth();
  const [selectedTab, setSelectedTab] = useState<string>("balance");
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);
  const [isBoostModalOpen, setBoostModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Mock transaction loading
    const loadTransactions = async () => {
      setIsLoadingTransactions(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setTransactions([
        { id: 'tx-1', type: 'credit', amount: 50, description: 'Referral bonus', date: new Date() },
        { id: 'tx-2', type: 'debit', amount: -20, description: 'Content purchase', date: new Date() },
      ]);
      setIsLoadingTransactions(false);
    };

    loadTransactions();
  }, []);

  const isUserBoosted = profile?.isBoosted || profile?.is_boosted || false;

  const renderTransactionHistory = () => {
    if (isLoadingTransactions) {
      return (
        <div className="flex justify-center items-center p-4">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      );
    }

    if (!transactions.length) {
      return <p className="text-muted-foreground">No transactions yet.</p>;
    }

    return (
      <Table>
        <TableCaption>Your recent transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">{transaction.date.toLocaleDateString()}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell className="text-right">{transaction.amount} UBX</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  const renderSubscriptionContent = () => {
    const subscriptionTier = profile?.subscription_tier || 'free';
    
    if (subscriptionTier === 'free') {
      return (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Free Tier</h3>
          <p className="text-muted-foreground">You are currently on the free tier.</p>
          <Button onClick={() => setIsUpgradeModalOpen(true)}>
            Upgrade Subscription
          </Button>
        </div>
      );
    }
    
    if (subscriptionTier === 'basic') {
      return (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Basic Tier</h3>
          <p className="text-muted-foreground">You are currently on the basic tier.</p>
          <Badge variant="secondary">Active</Badge>
          <p className="text-sm">Renews on next billing cycle.</p>
          <Button onClick={() => setIsUpgradeModalOpen(true)}>
            Manage Subscription
          </Button>
        </div>
      );
    }
    
    if (subscriptionTier === 'premium') {
      return (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Premium Tier</h3>
          <p className="text-muted-foreground">You are currently on the premium tier.</p>
          <Badge variant="success">Active</Badge>
          <p className="text-sm">Renews on next billing cycle.</p>
          <Button onClick={() => setIsUpgradeModalOpen(true)}>
            Manage Subscription
          </Button>
        </div>
      );
    }
    
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Unknown Tier</h3>
        <p className="text-muted-foreground">Your subscription tier is unknown.</p>
        <Button onClick={() => setIsUpgradeModalOpen(true)}>
          Manage Subscription
        </Button>
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="container max-w-4xl py-8">
        <h1 className="text-3xl font-bold mb-6">Wallet</h1>

        <Tabs defaultValue={selectedTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="balance">Balance</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
          </TabsList>
          <TabsContent value="balance">
            <Card>
              <CardHeader>
                <CardTitle>UBX Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-3xl font-bold">
                    <UBXPriceDisplay amount={user?.ubxBalance || 0} />
                  </div>
                  <p className="text-muted-foreground">
                    Your current UBX balance.
                  </p>
                  <Button onClick={() => navigate('/boost')}>
                    {isUserBoosted ? 'Manage Boost' : 'Boost Profile'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                {renderTransactionHistory()}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="subscription">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Details</CardTitle>
              </CardHeader>
              <CardContent>
                {renderSubscriptionContent()}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default UpdatedWallet;
