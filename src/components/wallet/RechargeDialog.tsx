
import { useState } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface LucoinPackage {
  id: string;
  name: string;
  amount: number;
  price: number;
  bonus_amount: number;
  currency: string;
  is_featured: boolean;
}

interface RechargeDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RechargeDialog({ isOpen, onClose }: RechargeDialogProps) {
  const { purchaseLucoins } = useWallet();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  // Fetch available packages
  const { data: packages, isLoading, error } = useQuery({
    queryKey: ['lucoinPackages'],
    queryFn: async () => {
      const { data } = await supabase.functions.invoke('wallet-api/packages');
      return data as LucoinPackage[];
    },
    enabled: isOpen,
  });

  const handlePurchase = async () => {
    if (!selectedPackage) {
      toast({
        title: 'Error',
        description: 'Please select a package',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsProcessing(true);
      const checkoutUrl = await purchaseLucoins(selectedPackage);
      
      if (checkoutUrl) {
        // Redirect to Stripe checkout
        window.location.href = checkoutUrl;
      } else {
        toast({
          title: 'Error',
          description: 'Failed to create checkout session',
          variant: 'destructive',
        });
      }
    } catch (err) {
      console.error('Error during purchase:', err);
      toast({
        title: 'Error',
        description: 'An error occurred during the purchase process',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCurrency = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Recharge Lucoins</DialogTitle>
          <DialogDescription>
            Select a package to purchase Lucoins and enjoy premium features.
          </DialogDescription>
        </DialogHeader>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">
            Failed to load packages. Please try again.
          </div>
        ) : (
          <div className="space-y-4 py-4">
            {packages?.map((pkg) => (
              <Card 
                key={pkg.id}
                className={`cursor-pointer transition-all ${
                  selectedPackage === pkg.id 
                    ? 'border-amber-500 ring-2 ring-amber-500/50' 
                    : 'hover:border-amber-500/50'
                } ${
                  pkg.is_featured ? 'relative overflow-hidden' : ''
                }`}
                onClick={() => setSelectedPackage(pkg.id)}
              >
                {pkg.is_featured && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-amber-500 text-white text-xs font-bold px-3 py-1 transform rotate-45 translate-x-2 -translate-y-1 shadow-md">
                      BEST VALUE
                    </div>
                  </div>
                )}
                
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">{pkg.name}</h3>
                    <div className="flex items-center mt-1">
                      <span className="font-semibold text-amber-600">{pkg.amount}</span>
                      <img
                        src="/lucoin-icon.png" 
                        alt="Lucoin"
                        className="h-4 w-4 ml-1"
                        onError={(e) => {
                          e.currentTarget.src = 'https://placehold.co/16x16/ffc107/ffffff?text=LC';
                        }}
                      />
                      {pkg.bonus_amount > 0 && (
                        <span className="ml-2 text-green-600 text-sm">
                          +{pkg.bonus_amount} bonus
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="font-bold">
                      {formatCurrency(pkg.price, pkg.currency)}
                    </span>
                    
                    {selectedPackage === pkg.id && (
                      <CheckCircle2 className="ml-2 h-5 w-5 text-amber-500" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <div className="mt-6 flex justify-end">
              <Button variant="outline" className="mr-2" onClick={onClose} disabled={isProcessing}>
                Cancel
              </Button>
              <Button 
                onClick={handlePurchase} 
                disabled={!selectedPackage || isProcessing}
                className="bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500"
              >
                {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Proceed to Payment
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
