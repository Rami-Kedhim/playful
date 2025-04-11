
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Copy, RefreshCw, CheckCircle, Shield } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { 
  NETWORK_CONFIG, 
  generateReceiveAddress, 
  monitorAddress,
  convertIotaToUBX
} from '@/services/blockchainService';
import QRCode from 'qrcode.react';
import useUBX from '@/hooks/useUBX';

const UBXRechargeDialog = () => {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isWaitingForTx, setIsWaitingForTx] = useState(false);
  const [recentTx, setRecentTx] = useState<{ amount: number, txHash: string } | null>(null);
  
  const { toast } = useToast();
  const { user } = useAuth();
  const { processTransaction } = useUBX();
  
  // Generate wallet address when dialog opens
  useEffect(() => {
    const generateAddress = async () => {
      if (!open || !user) return;
      
      setIsGenerating(true);
      try {
        const result = await generateReceiveAddress(user.id);
        setAddress(result.address);
        setQrCodeData(result.qrCodeData);
      } catch (error) {
        console.error("Error generating address:", error);
        toast({
          title: "Error generating address",
          description: "Could not generate IOTA address. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsGenerating(false);
      }
    };
    
    generateAddress();
  }, [open, user, toast]);
  
  // Set up transaction monitoring when we have an address
  useEffect(() => {
    if (!address || !open) return;
    
    setIsWaitingForTx(true);
    
    // Set up monitoring for incoming transactions
    const unsubscribe = monitorAddress(address, async (iotaAmount, txHash) => {
      // Convert IOTA to UBX using fixed oracle rate
      const ubxAmount = convertIotaToUBX(iotaAmount);
      
      setRecentTx({ amount: ubxAmount, txHash });
      setIsWaitingForTx(false);
      
      // Process the transaction in our system
      try {
        await processTransaction({
          amount: ubxAmount,
          transactionType: 'deposit',
          description: `UBX deposit via IOTA`,
          metadata: { 
            txHash, 
            network: 'iota', 
            address,
            originalAmount: iotaAmount,
            conversionRate: ubxAmount / iotaAmount 
          }
        });
        
        toast({
          title: "UBX Received!",
          description: `${ubxAmount} UBX have been added to your account.`,
          variant: "default",
        });
      } catch (error) {
        console.error("Error processing UBX transaction:", error);
      }
    });
    
    return () => {
      unsubscribe();
    };
  }, [address, open, processTransaction, toast]);
  
  // Reset state when dialog closes
  useEffect(() => {
    if (!open) {
      setRecentTx(null);
      setIsWaitingForTx(false);
    }
  }, [open]);
  
  const copyAddressToClipboard = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast({
        title: "Address copied",
        description: "Address copied to clipboard",
      });
    }
  };
  
  const regenerateAddress = async () => {
    if (!user) return;
    
    setAddress(null);
    setQrCodeData(null);
    setIsGenerating(true);
    
    try {
      const result = await generateReceiveAddress(user.id);
      setAddress(result.address);
      setQrCodeData(result.qrCodeData);
    } catch (error) {
      console.error("Error regenerating address:", error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Shield className="h-4 w-4" /> Add UBX
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add UBX to Your Account</DialogTitle>
          <DialogDescription>
            Add UBX tokens via private IOTA transfers to top up your account.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-green-500" />
              <h3 className="font-medium">High Privacy IOTA Network</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              IOTA transactions provide enhanced privacy with one-time addresses and zero transaction fees.
            </p>
            <div className="text-xs mt-2 text-muted-foreground">
              Confirmation time: {NETWORK_CONFIG.confirmationTime}
            </div>
          </div>
          
          <div className="border rounded-lg p-5 flex flex-col items-center space-y-4">
            {recentTx ? (
              <div className="flex flex-col items-center gap-3 py-6">
                <CheckCircle className="h-16 w-16 text-green-500" />
                <h3 className="text-xl font-bold">{recentTx.amount} UBX Received!</h3>
                <p className="text-center text-muted-foreground">
                  Your UBX tokens have been added to your account.
                </p>
                <div className="text-xs text-muted-foreground mt-2">
                  Transaction ID: {recentTx.txHash.substring(0, 8)}...{recentTx.txHash.substring(recentTx.txHash.length - 8)}
                </div>
              </div>
            ) : (
              <>
                <div className="text-center">
                  <h3 className="font-medium mb-2">Send IOTA to this address</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Only send IOTA tokens from a compatible wallet (e.g. Firefly)
                  </p>
                </div>
                
                {isGenerating ? (
                  <div className="h-[200px] w-[200px] flex items-center justify-center">
                    <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div>
                  </div>
                ) : qrCodeData ? (
                  <div className="bg-white p-3 rounded-lg">
                    <QRCode value={qrCodeData} size={200} />
                  </div>
                ) : null}
                
                {address && !isGenerating && (
                  <div className="w-full">
                    <div className="flex items-center gap-2 bg-muted/50 p-2 rounded-md">
                      <div className="text-xs font-mono truncate flex-1">{address}</div>
                      <Button variant="ghost" size="sm" onClick={copyAddressToClipboard}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex justify-end mt-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={regenerateAddress}
                        className="text-xs flex items-center gap-1"
                      >
                        <RefreshCw className="h-3 w-3" />
                        Generate new address
                      </Button>
                    </div>
                    
                    {isWaitingForTx && (
                      <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
                        <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full"></div>
                        Waiting for transaction...
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
            <h4 className="font-medium mb-1">How to get IOTA?</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Purchase IOTA on exchanges like Binance, Bitfinex, or BitPanda</li>
              <li>Transfer to a compatible wallet like Firefly (the official IOTA wallet)</li>
              <li>Send the exact amount you wish to convert to UBX</li>
            </ul>
          </div>
          
          <div className="text-xs text-muted-foreground">
            <p>
              Note: The UBX will appear in your account once the transaction is confirmed on the {NETWORK_CONFIG.displayName}.
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UBXRechargeDialog;
