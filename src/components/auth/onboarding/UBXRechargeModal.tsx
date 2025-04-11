
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coins, CreditCard, Gift, Wallet } from "lucide-react";
import { useToast } from '@/components/ui/use-toast';
import useWallet from '@/hooks/useWallet';

interface UBXRechargeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRechargeComplete: () => void;
}

const UBXRechargeModal: React.FC<UBXRechargeModalProps> = ({
  isOpen,
  onClose,
  onRechargeComplete,
}) => {
  const [rechargeMethod, setRechargeMethod] = useState<'wallet' | 'voucher'>('wallet');
  const [voucherCode, setVoucherCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const { wallet, loading: walletLoading, error: walletError, refreshWallet, updateBalance } = useWallet();
  
  // Check for wallet connection through Solana integration
  const hasWallet = typeof window !== 'undefined' && 
    (!!window.solana || (!!window.chainstack && !!window.chainstack.solana));
  
  const isConnected = wallet !== null;
  const walletAddress = wallet?.id || null;
  
  const handleConnectWallet = async () => {
    if (!hasWallet) {
      toast({
        title: "No Wallet Found",
        description: "Please install a compatible crypto wallet extension like Phantom",
        variant: "destructive",
      });
      return;
    }
    
    // For now we'll just use the mock implementation
    // This would be replaced with actual wallet connection logic
    await refreshWallet();
  };
  
  const handleRecharge = async () => {
    setIsProcessing(true);
    
    if (rechargeMethod === 'wallet') {
      if (!isConnected) {
        await handleConnectWallet();
        setIsProcessing(false);
        return;
      }
      
      // Simulate blockchain transaction for recharging
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Add UBX tokens to the user's balance
      const success = await updateBalance(100); // Add 100 UBX tokens
      
      if (success) {
        toast({
          title: "UBX Tokens Added",
          description: "Your wallet has been recharged with UBX tokens",
        });
        onRechargeComplete();
      } else {
        toast({
          title: "Recharge Failed",
          description: "Failed to add UBX tokens to your wallet",
          variant: "destructive",
        });
      }
    } else {
      // Voucher code redemption
      if (!voucherCode.trim()) {
        toast({
          title: "Invalid Voucher",
          description: "Please enter a valid voucher code",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }
      
      // Simulate voucher redemption
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Voucher Redeemed",
        description: "Your UBX tokens have been added to your account",
      });
      onRechargeComplete();
    }
    
    setIsProcessing(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Coins className="h-5 w-5 mr-2 text-yellow-500" />
            Recharge UBX Tokens
          </DialogTitle>
          <DialogDescription>
            Select your preferred method to add UBX tokens to your wallet.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Tabs value={rechargeMethod} onValueChange={(value: 'wallet' | 'voucher') => setRechargeMethod(value)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="wallet">
                <Wallet className="h-4 w-4 mr-2" />
                Crypto Wallet
              </TabsTrigger>
              <TabsTrigger value="voucher">
                <Gift className="h-4 w-4 mr-2" />
                Voucher Code
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="wallet" className="space-y-4 mt-4">
              <div className="grid gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-md p-3 text-blue-800 text-sm">
                  {isConnected ? (
                    <p>Connected wallet: {walletAddress?.substring(0, 6)}...{walletAddress?.substring(walletAddress.length - 4)}</p>
                  ) : (
                    <p>Connect your crypto wallet to purchase UBX tokens using Solana.</p>
                  )}
                </div>
                
                {!isConnected && (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleConnectWallet}
                  >
                    <Wallet className="h-4 w-4 mr-2" />
                    Connect Wallet
                  </Button>
                )}
                
                {isConnected && (
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="flex flex-col items-center justify-center h-20">
                      <div className="font-medium">50 UBX</div>
                      <div className="text-xs text-muted-foreground">0.05 SOL</div>
                    </Button>
                    <Button variant="outline" className="flex flex-col items-center justify-center h-20 border-purple-300">
                      <div className="font-medium">100 UBX</div>
                      <div className="text-xs text-muted-foreground">0.09 SOL</div>
                      <div className="text-xs text-purple-600">+10% bonus</div>
                    </Button>
                    <Button variant="outline" className="flex flex-col items-center justify-center h-20">
                      <div className="font-medium">200 UBX</div>
                      <div className="text-xs text-muted-foreground">0.18 SOL</div>
                      <div className="text-xs text-purple-600">+15% bonus</div>
                    </Button>
                    <Button variant="outline" className="flex flex-col items-center justify-center h-20">
                      <div className="font-medium">500 UBX</div>
                      <div className="text-xs text-muted-foreground">0.40 SOL</div>
                      <div className="text-xs text-purple-600">+25% bonus</div>
                    </Button>
                  </div>
                )}
              </div>
              
              <Button 
                onClick={handleRecharge}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500"
                disabled={!isConnected || isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Purchase UBX Tokens'}
              </Button>
            </TabsContent>
            
            <TabsContent value="voucher" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="voucher-code">Enter Voucher Code</Label>
                <Input 
                  id="voucher-code"
                  placeholder="Enter your UBX voucher code"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                />
              </div>
              
              <Button 
                onClick={handleRecharge}
                className="w-full"
                disabled={!voucherCode || isProcessing}
              >
                {isProcessing ? 'Redeeming...' : 'Redeem Voucher'}
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UBXRechargeModal;
