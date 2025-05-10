
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { BoostStatus, BoostPackage } from '@/types/pulse-boost';
import { Sparkles } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import BoostDialog from './dialog/BoostDialog';
import { pulseService } from '@/services/boost/pulseService';

interface PulseBoostManagerProps {
  profileId?: string;
}

const PulseBoostManager: React.FC<PulseBoostManagerProps> = ({ profileId }) => {
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({
    isActive: false,
    expiresAt: '',
    timeRemaining: '',
    boostLevel: 0,
    isExpiring: false,
    packageName: '',
    progress: 0
  });
  
  const [packages, setPackages] = useState<BoostPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, [profileId]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Fetch boost packages
      const availablePackages = pulseService.getPackages();
      setPackages(availablePackages);
      
      // Mock active boost for demonstration
      const mockBoost = Math.random() > 0.5;
      
      if (mockBoost) {
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + Math.floor(Math.random() * 48 + 1));
        
        const startDate = new Date();
        startDate.setHours(startDate.getHours() - 24);
        
        const expiresIn = formatDistanceToNow(expiryDate);
        const progress = Math.round(((expiryDate.getTime() - Date.now()) / 
                                     (expiryDate.getTime() - startDate.getTime())) * 100);
        
        setBoostStatus({
          isActive: true,
          expiresAt: expiryDate.toISOString(),
          startedAt: startDate.toISOString(),
          packageName: 'Premium Boost',
          timeRemaining: expiresIn,
          packageId: '2',
          boostLevel: 2,
          progress: progress,
          isExpiring: progress < 25
        });
      }
    } catch (error) {
      console.error('Error loading boost data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load boost information',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApplyBoost = async (packageId: string) => {
    try {
      setLoadingAction(true);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const selectedPackage = packages.find(p => p.id === packageId);
      
      if (!selectedPackage) {
        throw new Error('Invalid package');
      }
      
      // Set a new boost status
      const startDate = new Date();
      const expiryDate = new Date();
      expiryDate.setMinutes(expiryDate.getMinutes() + selectedPackage.durationMinutes);
      
      setBoostStatus({
        isActive: true,
        expiresAt: expiryDate.toISOString(),
        startedAt: startDate.toISOString(),
        packageName: selectedPackage.name,
        timeRemaining: formatDistanceToNow(expiryDate),
        packageId: packageId,
        boostLevel: selectedPackage.isMostPopular ? 2 : 1,
        progress: 100,
        isExpiring: false
      });
      
      toast({
        title: 'Success!',
        description: `Your profile has been boosted with ${selectedPackage.name}`,
      });
      
      setShowDialog(false);
      return true;
    } catch (error) {
      console.error('Error applying boost:', error);
      toast({
        title: 'Error',
        description: 'Failed to apply boost',
        variant: 'destructive'
      });
      return false;
    } finally {
      setLoadingAction(false);
    }
  };

  const renderActiveBoost = () => {
    if (!boostStatus.isActive) return null;
    
    return (
      <Card className={boostStatus.isExpiring ? "border-orange-500" : "border-green-500"}>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-amber-500" />
            Active Boost
          </CardTitle>
          <CardDescription>
            {boostStatus.packageName} expires in {boostStatus.timeRemaining}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full" 
              style={{ width: `${boostStatus.progress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1 text-right">
            {boostStatus.progress}% remaining
          </p>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {renderActiveBoost()}
      
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">Profile Visibility</h3>
          <p className="text-muted-foreground">
            {boostStatus.isActive 
              ? "Your profile is receiving boosted visibility" 
              : "Boost your profile to increase visibility"}
          </p>
        </div>
        <Button 
          onClick={() => setShowDialog(true)}
          disabled={loadingAction}
        >
          <Sparkles className="mr-2 h-4 w-4" />
          {boostStatus.isActive ? "Upgrade Boost" : "Boost Profile"}
        </Button>
      </div>
      
      <BoostDialog
        profileId={profileId || ''}
        open={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </div>
  );
};

export default PulseBoostManager;
