
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus, ArrowUpRight } from "lucide-react";
import { useAuth } from "@/hooks/auth";
import { useAuthActions } from "@/hooks/auth/useAuthActions";

interface UBXBalanceProps {
  onRecharge?: () => void;
}

const UBXBalance: React.FC<UBXBalanceProps> = ({ onRecharge }) => {
  const { user } = useAuth();
  const { refreshProfile } = useAuthActions();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Get UBX balance safely
  const ubxBalance = user && 'ubxBalance' in user ? user.ubxBalance || 0 : 0;
  
  // Track balance in state
  const [balance, setBalance] = useState(ubxBalance);

  useEffect(() => {
    // Update balance when user changes
    if (user && 'ubxBalance' in user) {
      setBalance(user.ubxBalance || 0);
    }
  }, [user]);

  const handleAddFunds = async () => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update local state
      const addedAmount = 100;
      setBalance(prev => prev + addedAmount);

      toast({
        title: "Funds Added",
        description: `${addedAmount} UBX has been added to your account.`,
      });
    } catch (error) {
      console.error("Error adding funds:", error);
      toast({
        title: "Transaction Failed",
        description: "There was a problem adding funds to your account.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatBalance = (value: number) => {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">UBX Balance</CardTitle>
            <CardDescription>Your available UBX funds</CardDescription>
          </div>
          <Button
            variant="outline"
            className="h-8 px-3"
            onClick={handleAddFunds}
            disabled={isLoading}
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            Add Funds
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <div className="text-3xl font-bold">{formatBalance(balance)}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Available UBX
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-xs">
            Transaction History
            <ArrowUpRight className="ml-1 h-3 w-3" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <Button className="w-full">
            Send UBX
          </Button>
          <Button variant="outline" className="w-full">
            Withdraw UBX
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UBXBalance;
