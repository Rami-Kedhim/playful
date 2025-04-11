
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
import { Coins, CreditCard, Gift } from "lucide-react";

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
  
  const handleRecharge = async () => {
    setIsProcessing(true);
    
    // Simulate API call for recharging
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsProcessing(false);
    onRechargeComplete();
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
                <CreditCard className="h-4 w-4 mr-2" />
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
                  Connect your crypto wallet to purchase UBX tokens using Solana.
                </div>
                
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
              </div>
              
              <Button 
                onClick={handleRecharge}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Connect Wallet & Purchase'}
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
