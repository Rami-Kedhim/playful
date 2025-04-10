
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Wallet, CreditCard } from 'lucide-react';
import SecurityProtection from '@/components/security/SecurityProtection';
import { toast } from '@/hooks/use-toast';

interface SecureWalletSectionProps {
  balance?: number;
  currency?: string;
}

const SecureWalletSection: React.FC<SecureWalletSectionProps> = ({
  balance = 0,
  currency = 'USD'
}) => {
  const handleWithdraw = () => {
    toast({
      title: "Withdrawal Initiated",
      description: "Your withdrawal has been successfully initiated",
    });
  };
  
  const handleDeposit = () => {
    toast({
      title: "Deposit Successful",
      description: "Your account has been credited successfully",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Wallet className="mr-2 h-5 w-5" /> Wallet
            </CardTitle>
            <CardDescription>Securely manage your funds</CardDescription>
          </div>
          <div className="flex items-center text-sm bg-primary/10 text-primary rounded-full px-3 py-1">
            <Shield className="mr-1 h-4 w-4" /> 2FA Protected
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="text-sm text-muted-foreground mb-1">Available Balance</div>
          <div className="text-3xl font-bold">{currency} {balance.toFixed(2)}</div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <SecurityProtection 
            operation="payment" 
            title="Verify Your Identity to Deposit"
            description="For your security, we need to verify your identity before adding funds to your account."
          >
            <Button className="w-full" onClick={handleDeposit}>
              <CreditCard className="mr-2 h-4 w-4" /> Deposit
            </Button>
          </SecurityProtection>
          
          <SecurityProtection 
            operation="withdrawal"
            title="Verify Your Identity to Withdraw"
            description="For your security, we need to verify your identity before withdrawing funds from your account."  
          >
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleWithdraw}
              disabled={balance <= 0}
            >
              <Wallet className="mr-2 h-4 w-4" /> Withdraw
            </Button>
          </SecurityProtection>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecureWalletSection;
