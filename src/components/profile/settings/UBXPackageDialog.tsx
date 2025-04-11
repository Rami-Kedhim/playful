
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Coins, Check, Shield } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useUbxTransactions } from '@/hooks/useUbxTransactions';
import { useWalletConnection } from '@/hooks/useWalletConnection';

interface UBXPackage {
  id: string;
  name: string;
  amount: number;
  price_sol?: number;
  bonus_amount?: number;
  is_featured?: boolean;
}

const packages: UBXPackage[] = [
  {
    id: "basic",
    name: "Basic Pack",
    amount: 100,
    price_sol: 0.05,
    is_featured: false
  },
  {
    id: "standard",
    name: "Standard Pack",
    amount: 500,
    price_sol: 0.2,
    bonus_amount: 50,
    is_featured: true
  },
  {
    id: "premium",
    name: "Premium Pack",
    amount: 1000,
    price_sol: 0.35,
    bonus_amount: 150,
    is_featured: false
  }
];

const UBXPackageDialog = () => {
  const [open, setOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<UBXPackage | null>(null);
  const [solPrice, setSolPrice] = useState<number | null>(null);
  const { toast } = useToast();
  const { isProcessing, purchaseUbxWithSolana } = useUbxTransactions();
  const { isConnected, connectWallet } = useWalletConnection();
  
  // Fetch current SOL price for display
  useEffect(() => {
    const fetchSolPrice = async () => {
      try {
        // For demo, using a hardcoded price - in production, fetch from an API
        setSolPrice(20.50);
      } catch (error) {
        console.error("Error fetching SOL price:", error);
      }
    };
    
    if (open) {
      fetchSolPrice();
    }
  }, [open]);

  const handlePurchase = async (pkg: UBXPackage) => {
    setSelectedPackage(pkg);
    
    if (!isConnected) {
      try {
        await connectWallet();
      } catch (error) {
        return; // Error handling done in the wallet hook
      }
    }
    
    if (!pkg.price_sol) {
      toast({
        title: "Invalid package",
        description: "This package cannot be purchased with SOL",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const result = await purchaseUbxWithSolana(pkg.amount, pkg.id);
      
      if (result.success) {
        setTimeout(() => setOpen(false), 1500);
      }
    } finally {
      setSelectedPackage(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Coins className="h-4 w-4" />
          Buy UBX
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-primary" />
            Purchase UBX Tokens
          </DialogTitle>
          <DialogDescription>
            Choose a package to add UBX tokens to your account.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id} 
              className={`relative overflow-hidden ${pkg.is_featured ? 'border-primary' : ''}`}
            >
              {pkg.is_featured && (
                <div className="absolute top-0 right-0">
                  <Badge variant="default" className="rounded-tl-none rounded-br-none">
                    Best Value
                  </Badge>
                </div>
              )}
              <CardHeader className="pb-2">
                <CardTitle>{pkg.name}</CardTitle>
                <CardDescription>{pkg.amount} UBX Tokens</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-2xl font-bold">{pkg.price_sol} SOL</div>
                    {solPrice && (
                      <div className="text-xs text-muted-foreground">
                        ≈ ${(pkg.price_sol || 0 * solPrice).toFixed(2)} USD
                      </div>
                    )}
                  </div>
                  {pkg.bonus_amount && (
                    <Badge variant="secondary" className="text-xs">
                      +{pkg.bonus_amount} Bonus
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full gap-2" 
                  onClick={() => handlePurchase(pkg)}
                  disabled={isProcessing}
                >
                  {isProcessing && selectedPackage?.id === pkg.id ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4" />
                      Buy Now
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-xs text-muted-foreground flex items-center justify-center mt-4">
          <Shield className="h-3 w-3 mr-1" />
          Secure payment via Solana blockchain
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UBXPackageDialog;
