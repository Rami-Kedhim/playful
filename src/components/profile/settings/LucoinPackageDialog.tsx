
import { useState, useEffect } from "react";
import { PlusCircle, Loader2, Info, Coins, Wallet } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";
import { useLucoins, LucoinPackage } from "@/hooks/useLucoins";
import { useSolanaWallet } from "@/hooks/useSolanaWallet";
import { getSolanaPrice, getSolanaBalance, purchaseLucoinsWithSol } from "@/services/solanaService";
import WalletConnect from "@/components/solana/WalletConnect";

interface LucoinPackageDialogProps {
  onSuccess?: () => void;
}

const LucoinPackageDialog = ({ onSuccess }: LucoinPackageDialogProps) => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [packages, setPackages] = useState<LucoinPackage[]>([]);
  const [open, setOpen] = useState(false);
  const [solanaPrice, setSolanaPrice] = useState(0);
  const [solanaBalance, setSolanaBalance] = useState(0);
  const { loading, fetchPackages, purchasePackage } = useLucoins();
  const { walletAddress, connectWallet } = useSolanaWallet();

  useEffect(() => {
    if (open) {
      loadPackages();
      loadSolanaPrice();
    }
  }, [open]);

  useEffect(() => {
    if (walletAddress) {
      loadSolanaBalance(walletAddress);
    } else {
      setSolanaBalance(0);
    }
  }, [walletAddress]);

  const loadPackages = async () => {
    const data = await fetchPackages();
    setPackages(data);
    
    // Auto-select a featured package if available
    const featured = data.find(pkg => pkg.is_featured);
    if (featured) {
      setSelectedPackage(featured.id);
    }
  };

  const loadSolanaPrice = async () => {
    const price = await getSolanaPrice();
    setSolanaPrice(price);
  };

  const loadSolanaBalance = async (address: string) => {
    const balance = await getSolanaBalance(address);
    setSolanaBalance(balance);
  };

  const handlePurchase = async () => {
    if (!selectedPackage) {
      toast({
        title: "No package selected",
        description: "Please select a Lucoin package to purchase",
        variant: "destructive",
      });
      return;
    }

    // Get the selected package
    const pkg = packages.find(p => p.id === selectedPackage);
    if (!pkg) return;

    if (!walletAddress) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your Solana wallet to purchase Lucoins",
        variant: "destructive",
      });
      return;
    }

    // Check if user has enough SOL
    if (solanaBalance < (pkg.price_sol || 0)) {
      toast({
        title: "Insufficient SOL balance",
        description: "You don't have enough SOL to purchase this package",
        variant: "destructive",
      });
      return;
    }

    // Process the purchase using Solana
    const success = await purchaseLucoinsWithSol(
      selectedPackage,
      pkg.price_sol || 0,
      walletAddress
    );
    
    if (success) {
      // Update the local database record
      const dbSuccess = await purchasePackage(selectedPackage);
      
      if (dbSuccess) {
        setOpen(false);
        setSelectedPackage(null);
        if (onSuccess) onSuccess();
      }
    }
  };

  // Calculate the USD price for display
  const getUsdPrice = (priceSol?: number) => {
    if (!priceSol || !solanaPrice) return 'N/A';
    const usdPrice = priceSol * solanaPrice;
    return `$${usdPrice.toFixed(2)}`;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Add Lucoins</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Purchase Lucoins</DialogTitle>
          <DialogDescription>
            Select a package to add Lucoins to your account
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {!walletAddress && (
            <div className="flex flex-col items-center bg-muted p-4 rounded-md mb-4">
              <Wallet className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-center text-sm text-muted-foreground mb-3">
                Connect your Solana wallet to purchase Lucoins
              </p>
              <WalletConnect />
            </div>
          )}

          {walletAddress && (
            <div className="flex justify-between items-center bg-muted p-3 rounded-md mb-2">
              <div>
                <span className="text-sm text-muted-foreground">SOL Balance:</span>
                <span className="ml-2 font-medium">{solanaBalance.toFixed(4)} SOL</span>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">SOL Price:</span>
                <span className="ml-2 font-medium">${solanaPrice.toFixed(2)}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {packages.map((pkg) => (
              <Card 
                key={pkg.id}
                className={`p-4 cursor-pointer transition-all ${
                  selectedPackage === pkg.id 
                    ? "ring-2 ring-primary" 
                    : "hover:shadow-md"
                } ${pkg.is_featured ? "border-primary" : ""}`}
                onClick={() => setSelectedPackage(pkg.id)}
              >
                <div className="text-center">
                  <h3 className="font-medium">{pkg.name}</h3>
                  <div className="text-2xl font-bold my-2">
                    {pkg.amount} LC
                  </div>
                  {pkg.bonus_amount && pkg.bonus_amount > 0 && (
                    <div className="text-sm text-green-600 mb-2">
                      +{pkg.bonus_amount} bonus
                    </div>
                  )}
                  <div className="flex flex-col items-center gap-1">
                    <div className="text-base font-medium">{pkg.price_sol} SOL</div>
                    <div className="text-xs text-muted-foreground">
                      {getUsdPrice(pkg.price_sol)}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center text-sm text-muted-foreground cursor-help">
                  <Info className="h-4 w-4 mr-1" />
                  What are Lucoins?
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Lucoins are the virtual currency used on this platform to access premium features, content, and services.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handlePurchase} 
            disabled={!selectedPackage || loading || !walletAddress}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Coins className="mr-2 h-4 w-4" />
                Purchase
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LucoinPackageDialog;
