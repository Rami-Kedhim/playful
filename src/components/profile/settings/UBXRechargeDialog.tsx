
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useUBX } from '@/hooks/useUBX';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Loader2, QrCode, Zap } from 'lucide-react';

interface UBXRechargeDialogProps {
  open: boolean;
  onClose: () => void;
}

const UBXRechargeDialog: React.FC<UBXRechargeDialogProps> = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [packages, setPackages] = useState<any[]>([]);
  const { fetchPackages, processTransaction } = useUBX();
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      loadPackages();
    }
  }, [open]);

  const loadPackages = async () => {
    setLoading(true);
    try {
      const packageList = await fetchPackages();
      setPackages(packageList);
    } catch (error) {
      console.error("Error loading packages:", error);
      toast({
        description: "Could not load UBX packages. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRecharge = async () => {
    if (!selectedPackage) return;

    const selectedPkg = packages.find(pkg => pkg.id === selectedPackage);
    if (!selectedPkg) return;

    setLoading(true);
    try {
      const result = await processTransaction({
        amount: selectedPkg.amount + (selectedPkg.bonus_amount || 0),
        type: 'credit',
        description: `Recharged ${selectedPkg.amount} UBX`
      });

      if (result) {
        toast({
          description: `Added ${selectedPkg.amount + (selectedPkg.bonus_amount || 0)} UBX to your wallet`,
        });
        onClose();
      } else {
        toast({
          description: "There was a problem processing your recharge",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Recharge error:", error);
      toast({
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-400" />
            Recharge UBX Balance
          </DialogTitle>
          <DialogDescription>
            Add UBX to your account to use for boosts, tips, and exclusive content
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {packages.map(pkg => (
                <Card 
                  key={pkg.id} 
                  className={`cursor-pointer transition border-2 ${
                    selectedPackage === pkg.id 
                      ? 'border-primary' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedPackage(pkg.id)}
                >
                  <CardHeader className="pb-2">
                    <h3 className="font-semibold">{pkg.name}</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-1">{pkg.amount} UBX</div>
                    {pkg.bonus_amount > 0 && (
                      <div className="text-green-500 text-sm">+{pkg.bonus_amount} bonus</div>
                    )}
                    <div className="text-muted-foreground">${pkg.price.toFixed(2)}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="bg-secondary/20 rounded-md p-4 flex items-center gap-3">
          <QrCode className="h-5 w-5 text-blue-500" />
          <div className="text-sm">
            <p className="font-medium">Instant Recharge</p>
            <p className="text-muted-foreground">Use mobile payment or crypto options for immediate UBX</p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleRecharge} 
            disabled={!selectedPackage || loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Recharge Now'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UBXRechargeDialog;

