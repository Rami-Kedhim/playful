
import React, { useState, useEffect } from 'react';
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
import { Check, CreditCard, Package, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import useUBX from '@/hooks/useUBX';

const UBXPackageDialog = () => {
  const [open, setOpen] = useState(false);
  const [packages, setPackages] = useState<any[]>([]);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchPackages, purchasePackage, isProcessing } = useUBX();
  const { toast } = useToast();

  useEffect(() => {
    const loadPackages = async () => {
      setIsLoading(true);
      try {
        const availablePackages = await fetchPackages();
        setPackages(availablePackages);
      } catch (error) {
        console.error('Error loading packages:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (open) {
      loadPackages();
    }
  }, [open, fetchPackages]);

  const handlePurchase = async () => {
    if (!selectedPackageId) return;
    
    try {
      const success = await purchasePackage(selectedPackageId);
      if (success) {
        toast({
          title: "Purchase successful",
          description: "Your UBX package has been added to your account.",
        });
        setOpen(false);
      }
    } catch (error) {
      console.error("Error purchasing package:", error);
      toast({
        title: "Purchase failed",
        description: "There was an error processing your purchase. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <CreditCard className="h-4 w-4" /> Buy UBX
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Purchase UBX Packages</DialogTitle>
          <DialogDescription>
            Select a package to add UBX to your account.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {isLoading ? (
            <div className="space-y-4">
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                  <Skeleton className="h-[100px] w-full rounded-md" />
                </div>
              ))}
            </div>
          ) : packages.length > 0 ? (
            <div className="grid gap-4">
              {packages.map((pkg) => (
                <Card 
                  key={pkg.id}
                  className={`p-4 cursor-pointer transition-all ${
                    selectedPackageId === pkg.id 
                      ? 'border-primary ring-2 ring-primary/20' 
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedPackageId(pkg.id)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-md ${pkg.is_featured ? 'bg-primary/20' : 'bg-secondary'}`}>
                        <Package className={`h-6 w-6 ${pkg.is_featured ? 'text-primary' : ''}`} />
                      </div>
                      <div>
                        <h3 className="font-medium">{pkg.name}</h3>
                        <p className="text-sm text-muted-foreground">${pkg.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold">{pkg.amount} UBX</div>
                      {pkg.bonus_amount > 0 && (
                        <div className="text-sm text-green-500 flex items-center gap-1">
                          <Zap className="h-3 w-3" /> +{pkg.bonus_amount} bonus
                        </div>
                      )}
                    </div>
                    {selectedPackageId === pkg.id && (
                      <div className="absolute top-4 right-4">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No packages available at the moment.
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handlePurchase} 
            disabled={!selectedPackageId || isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Purchase'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UBXPackageDialog;
