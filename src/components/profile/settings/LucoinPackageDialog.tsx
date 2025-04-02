
import { useState, useEffect } from "react";
import { PlusCircle, Loader2, Info } from "lucide-react";
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

interface LucoinPackageDialogProps {
  onSuccess?: () => void;
}

const LucoinPackageDialog = ({ onSuccess }: LucoinPackageDialogProps) => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [packages, setPackages] = useState<LucoinPackage[]>([]);
  const [open, setOpen] = useState(false);
  const { loading, fetchPackages, purchasePackage } = useLucoins();

  useEffect(() => {
    if (open) {
      loadPackages();
    }
  }, [open]);

  const loadPackages = async () => {
    const data = await fetchPackages();
    setPackages(data);
    
    // Auto-select a featured package if available
    const featured = data.find(pkg => pkg.is_featured);
    if (featured) {
      setSelectedPackage(featured.id);
    }
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

    const success = await purchasePackage(selectedPackage);
    
    if (success) {
      setOpen(false);
      setSelectedPackage(null);
      if (onSuccess) onSuccess();
    }
  };

  // Display mock packages if no data is available yet
  const displayPackages = packages.length > 0 ? packages : [
    { id: "pkg1", name: "Starter", amount: 100, price: 9.99 },
    { id: "pkg2", name: "Popular", amount: 300, price: 24.99, bonus_amount: 50, is_featured: true },
    { id: "pkg3", name: "Premium", amount: 600, price: 49.99, bonus_amount: 150 },
  ];

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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {displayPackages.map((pkg) => (
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
                  <div className="text-base">${pkg.price}</div>
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
          <Button onClick={handlePurchase} disabled={!selectedPackage || loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <PlusCircle className="mr-2 h-4 w-4" />
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
