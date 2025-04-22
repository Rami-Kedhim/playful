
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useBoost } from '@/hooks/useBoost';
import { BoostPackage } from '@/types/boost';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Check } from 'lucide-react';

interface BoostProfileDialogProps {
  profileId?: string;
  onSuccess?: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const BoostProfileDialog: React.FC<BoostProfileDialogProps> = ({ 
  profileId, 
  onSuccess, 
  open, 
  setOpen 
}) => {
  const { packages, boostProfile, isActive } = useBoost();
  const [selectedPackage, setSelectedPackage] = useState<BoostPackage | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleBoostProfile = async () => {
    if (!selectedPackage || !profileId) return;

    setProcessing(true);
    try {
      await boostProfile(profileId, selectedPackage.id);
      if (onSuccess) onSuccess();
      setOpen(false);
    } catch (error) {
      console.error('Failed to boost profile:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-400" />
            Boost Your Profile
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-4">
            Select a boost package to increase your profile's visibility and get more views:
          </p>
          
          <div className="grid gap-3">
            {packages && packages.map((pkg) => (
              <Card 
                key={pkg.id}
                className={`cursor-pointer border-2 transition-all ${selectedPackage?.id === pkg.id ? 'border-primary' : 'border-transparent'}`}
                onClick={() => setSelectedPackage(pkg)}
              >
                <CardContent className="flex justify-between items-center p-4">
                  <div>
                    <div className="font-medium">{pkg.name}</div>
                    <div className="text-sm text-muted-foreground">{pkg.duration}</div>
                    {pkg.features && pkg.features.length > 0 && (
                      <ul className="text-xs mt-1">
                        {pkg.features.map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-center gap-1">
                            <Check className="h-3 w-3 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="font-bold">${pkg.price}</div>
                    {pkg.price_ubx && (
                      <div className="text-xs text-muted-foreground">
                        or {pkg.price_ubx} UBX
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
            disabled={!selectedPackage || processing} 
            onClick={handleBoostProfile}
          >
            {processing ? 'Processing...' : 'Boost Profile'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BoostProfileDialog;
