
import React, { useState, useEffect } from 'react';
import { useBoostManager } from '@/hooks/boost/useBoostManager';
import { Card } from '@/components/ui/card';
import BoostDialogContainer from '@/components/boost/BoostDialogContainer';
import { useAuth } from '@/hooks/auth/useAuth';
import { useToast } from '@/hooks/use-toast';
import { oxum } from '@/core/Oxum';
import { useBoostAdapters } from '@/hooks/boost/useBoostAdapters';

const BoostManagerContainer = ({ profileId }: { profileId?: string }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [activeProfileId, setActiveProfileId] = useState<string>('');
  const { adaptFormatBoostDuration, formatBoostDuration } = useBoostAdapters(profileId || user?.id || '');

  const userId = profileId || user?.id;

  useEffect(() => {
    if (userId) {
      setActiveProfileId(userId);
    }
  }, [userId]);

  const handleBoostSuccess = async () => {
    toast({
      title: "Boost Applied",
      description: "Your profile boost has been successfully applied!",
    });

    // Connect to Oxum's boost allocation for real-time boost updates
    const matrix = [
      [0.6, 0.2, 0.1],
      [0.3, 0.7, 0.4],
      [0.1, 0.1, 0.5]
    ];

    // Use Oxum's boost allocation algorithm
    try {
      const allocationVector = oxum.boostAllocationEigen(matrix);
      console.log("Boost allocation vector:", allocationVector);
    } catch (e) {
      console.error("Failed to calculate boost allocation:", e);
    }

    return true;
  };

  // Apply our own custom formatter using the adapter
  const formatDuration = adaptFormatBoostDuration((duration: string) => {
    const [hours, minutes] = duration.split(':').map(Number);
    return hours >= 24 ? 
      `${Math.floor(hours / 24)} days` : 
      `${hours} hours`;
  });

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold">Profile Boosting</h3>
          <p className="text-muted-foreground">Increase your profile visibility</p>
        </div>
        
        <div className="mt-4 sm:mt-0">
          <BoostDialogContainer 
            profileId={activeProfileId} 
            onSuccess={handleBoostSuccess}
            buttonText="Manage Boost"
            buttonVariant="default"
          />
        </div>
      </div>

      <div className="p-4 bg-muted/50 rounded-md">
        <h4 className="font-medium mb-2">PULSE Boost</h4>
        <p className="text-sm text-muted-foreground">
          Boost your profile visibility in search results and recommendations.
          Our Precision Upgrade Layer for Scalable Exposure (PULSE) system uses
          advanced algorithms to maximize your profile's reach.
        </p>
      </div>
    </Card>
  );
};

export default BoostManagerContainer;
