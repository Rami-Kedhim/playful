
import React, { useState } from 'react';
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
import { Coins } from 'lucide-react';
import { useLucoins } from '@/hooks/useLucoins';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface LucoinPackageDialogProps {
  onSuccess?: () => Promise<void>;
}

const LucoinPackageDialog: React.FC<LucoinPackageDialogProps> = ({ onSuccess }) => {
  const [open, setOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const { fetchPackages, purchasePackage, packages } = useLucoins();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const handleOpen = async (open: boolean) => {
    setOpen(open);
    if (open) {
      try {
        await fetchPackages();
      } catch (error) {
        console.error("Error fetching packages:", error);
        toast({
          title: "Failed to load packages",
          description: "Could not load Lucoin packages. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handlePurchase = async () => {
    if (!selectedPackage) {
      toast({
        title: "No package selected",
        description: "Please select a package first",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    try {
      const result = await purchasePackage(selectedPackage);
      if (result.success) {
        toast({
          title: "Purchase successful",
          description: `You have purchased ${result.amount} Lucoins`,
        });
        setOpen(false);
        if (onSuccess) await onSuccess();
      } else {
        toast({
          title: "Purchase failed",
          description: result.error || "An error occurred during purchase",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Error purchasing package:", error);
      toast({
        title: "Purchase error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Coins className="h-4 w-4" />
          Buy Lucoins
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Purchase Lucoins</DialogTitle>
          <DialogDescription>
            Lucoins are used for premium features, content, and interactions
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {packages.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No packages available at the moment</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex justify-between items-center">
                      <span>{pkg.name}</span>
                      {pkg.is_featured && (
                        <span className="bg-yellow-500/10 text-yellow-500 text-xs px-2 py-1 rounded-full">
                          Best Value
                        </span>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold flex items-center gap-1 mb-1">
                      <Coins className="h-5 w-5 text-yellow-500" />
                      {pkg.amount}
                      {pkg.bonus_amount > 0 && (
                        <span className="text-sm text-green-500">+{pkg.bonus_amount} bonus</span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">${pkg.price.toFixed(2)}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)}
            disabled={processing}
          >
            Cancel
          </Button>
          <Button 
            onClick={handlePurchase} 
            disabled={!selectedPackage || processing}
          >
            {processing ? 'Processing...' : 'Purchase'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LucoinPackageDialog;
