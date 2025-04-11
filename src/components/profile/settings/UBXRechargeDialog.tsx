
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Coins, Shield, ArrowRight, Check, RefreshCw, QrCode } from 'lucide-react';
import { useSolanaWallet } from '@/hooks/useSolanaWallet';
import { useAuth } from '@/contexts/AuthContext';
import { NETWORK_CONFIG } from '@/services/blockchainService';
import { getFantomBalance, getFantomPrice } from '@/services/fantomService';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useUBX } from '@/hooks/useUBX';

interface UBXRechargeDialogProps {
  open: boolean;
  onClose: () => void;
}

const UBXRechargeDialog: React.FC<UBXRechargeDialogProps> = ({ open, onClose }) => {
  const [tab, setTab] = useState<string>('solana');
  const { walletAddress } = useSolanaWallet();
  const { isProcessing: iotaProcessing, balance, fetchPackages } = useUBX();
  const { user } = useAuth();
  const [solLoading, setSolLoading] = useState(false);
  const [solBalance, setSolBalance] = useState<number | null>(null);
  const [solanaPrice, setSolanaPrice] = useState<number | null>(null);
  const [iotaQrCode, setIotaQrCode] = useState<string>('');
  const [iotaAddress, setIotaAddress] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [packages, setPackages] = useState<any[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  
  useEffect(() => {
    if (open) {
      loadPackages();
      if (walletAddress) {
        loadSolanaData(walletAddress);
      }
      generateIotaAddress();
    }
  }, [open, walletAddress]);
  
  const loadPackages = async () => {
    try {
      const pkgs = await fetchPackages();
      setPackages(pkgs);
    } catch (err) {
      console.error("Error loading packages:", err);
    }
  };
  
  const loadSolanaData = async (address: string) => {
    setSolLoading(true);
    try {
      const [balance, price] = await Promise.all([
        getFantomBalance(address),
        getFantomPrice()
      ]);
      
      setSolBalance(balance);
      setSolanaPrice(price);
    } catch (error) {
      console.error("Error loading Solana data:", error);
    } finally {
      setSolLoading(false);
    }
  };
  
  const generateIotaAddress = () => {
    // Placeholder for IOTA address generation
    // In a real implementation, this would call an API to generate a unique deposit address
    setIotaAddress('iota1qp9427vdcwjv4f6xwd8vfw2ec2f9pmkzgdwgdl6tmzm8ztgq2umm7vwjtmx');
    setIotaQrCode('data:image/png;base64,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');
  };
  
  const refreshBalance = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Recharge UBX</DialogTitle>
          <DialogDescription>
            Add UBX tokens to your account using cryptocurrency
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue={tab} value={tab} onValueChange={setTab} className="mt-4">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="solana" className="flex items-center gap-2">
              Solana
            </TabsTrigger>
            <TabsTrigger value="iota" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              IOTA Privacy
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="solana" className="space-y-4 mt-4">
            {!walletAddress ? (
              <div className="text-center py-6">
                <p className="text-muted-foreground mb-4">Please connect your Solana wallet to continue</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Wallet Balance</p>
                    {solLoading ? (
                      <Skeleton className="h-6 w-24" />
                    ) : (
                      <p className="text-xl font-bold">{solBalance?.toFixed(4) || '0.0000'} SOL</p>
                    )}
                  </div>
                  <Button variant="outline" size="sm" onClick={() => loadSolanaData(walletAddress)} disabled={solLoading}>
                    <RefreshCw className={`h-4 w-4 mr-1 ${solLoading ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                </div>
                
                <div className="space-y-4 mt-4">
                  <p className="font-medium">Select a package to purchase with Solana</p>
                  <div className="grid grid-cols-2 gap-4">
                    {packages.map((pkg) => (
                      <Card 
                        key={pkg.id}
                        className={`cursor-pointer transition-all ${
                          selectedPackage === pkg.id 
                            ? 'border-primary bg-primary/5' 
                            : 'hover:border-primary/50'
                        }`}
                        onClick={() => setSelectedPackage(pkg.id)}
                      >
                        <CardContent className="p-4">
                          <div className="absolute top-2 right-2">
                            {selectedPackage === pkg.id && (
                              <Check className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                          <CardTitle className="text-md mb-2">{pkg.name}</CardTitle>
                          <div className="text-2xl font-bold flex items-center gap-1 mb-1">
                            <Coins className="h-4 w-4 text-blue-500" />
                            {pkg.amount}
                            {pkg.bonus_amount > 0 && (
                              <span className="text-xs text-green-500">+{pkg.bonus_amount}</span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{pkg.price_sol} SOL</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <Button onClick={onClose} variant="outline" className="mr-2">Cancel</Button>
                    <Button 
                      disabled={!selectedPackage || solLoading}
                      className="gap-1"
                    >
                      Purchase with Solana <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="iota" className="space-y-4 mt-4">
            <div className="border rounded-md p-4 bg-muted/20">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-medium">Current UBX Balance</p>
                  {refreshing ? (
                    <Skeleton className="h-6 w-24" />
                  ) : (
                    <p className="text-xl font-bold">{balance} UBX</p>
                  )}
                </div>
                <Button variant="outline" size="sm" onClick={refreshBalance} disabled={refreshing}>
                  <RefreshCw className={`h-4 w-4 mr-1 ${refreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Send IOTA to this address</h3>
              <div className="flex flex-col items-center justify-center p-3 border rounded-md">
                {iotaQrCode ? (
                  <div className="mb-3">
                    <img src={iotaQrCode} alt="IOTA QR Code" className="w-40 h-40" />
                  </div>
                ) : (
                  <div className="w-40 h-40 flex items-center justify-center">
                    <Skeleton className="w-full h-full" />
                  </div>
                )}
                <div className="bg-muted p-2 rounded-md w-full text-sm text-center break-all">
                  <p>{iotaAddress}</p>
                </div>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800 mt-4">
                <h4 className="font-medium flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-green-500" />
                  How it works
                </h4>
                <ul className="mt-2 space-y-1 text-sm list-disc pl-5">
                  <li>Send any amount of MIOTA to this address</li>
                  <li>We'll instantly convert it to UBX at rate of 100 UBX per 0.1 MIOTA</li>
                  <li>Your UBX balance will update automatically</li>
                  <li>Each transaction uses a unique address for maximum privacy</li>
                </ul>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button onClick={onClose}>Done</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default UBXRechargeDialog;
