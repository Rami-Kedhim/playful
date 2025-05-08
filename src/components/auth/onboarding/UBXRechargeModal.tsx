
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/hooks/useWallet';
import { Loader2, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface UBXRechargeModalProps {
  open: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

interface PackageOption {
  id: string;
  name: string;
  amount: number;
  bonus: number;
  price: number;
}

const UBXRechargeModal: React.FC<UBXRechargeModalProps> = ({
  open,
  onClose,
  onComplete,
}) => {
  const { balance, loading, purchaseUbx, refresh } = useWallet();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [purchasing, setPurchasing] = useState(false);

  const packages: PackageOption[] = [
    { id: 'basic', name: 'Basic', amount: 100, bonus: 0, price: 9.99 },
    { id: 'standard', name: 'Standard', amount: 300, bonus: 30, price: 24.99 },
    { id: 'premium', name: 'Premium', amount: 600, bonus: 120, price: 49.99 },
  ];

  const handlePurchase = async () => {
    if (!selectedPackage) return;
    
    const selectedOption = packages.find(p => p.id === selectedPackage);
    if (!selectedOption) return;
    
    setPurchasing(true);
    try {
      const result = await purchaseUbx(selectedOption.amount + selectedOption.bonus);
      
      if (result.success) {
        refresh();
        if (onComplete) onComplete();
        onClose();
      }
    } catch (error) {
      console.error('Error purchasing UBX:', error);
    } finally {
      setPurchasing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="flex items-center">
          <Zap className="mr-2 h-5 w-5 text-yellow-500" />
          Purchase UBX Tokens
        </DialogTitle>
        
        <div className="py-4 space-y-4">
          <p className="text-sm text-muted-foreground">
            UBX tokens can be used to purchase premium services across the platform.
          </p>
          
          <div className="grid grid-cols-1 gap-3">
            {packages.map((pkg) => (
              <Card 
                key={pkg.id}
                className={`cursor-pointer transition ${
                  selectedPackage === pkg.id ? 'border-primary' : 'border-border'
                }`}
                onClick={() => setSelectedPackage(pkg.id)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{pkg.name}</p>
                      <p className="text-2xl font-bold">{pkg.amount} UBX</p>
                      {pkg.bonus > 0 && (
                        <p className="text-xs text-green-500">+{pkg.bonus} bonus UBX</p>
                      )}
                    </div>
                    <div className="text-lg font-semibold">${pkg.price}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handlePurchase}
            disabled={!selectedPackage || purchasing}
            className="bg-gradient-to-r from-indigo-500 to-purple-600"
          >
            {purchasing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Purchase Tokens'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UBXRechargeModal;
