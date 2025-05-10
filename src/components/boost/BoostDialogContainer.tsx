import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Zap } from 'lucide-react';
import BoostDialog from './BoostDialog';
import { BoostStatus, BoostEligibility, BoostPackage, HermesStatus } from '@/types/pulse-boost';

// Helper function to mock fetching boost packages from API
const fetchBoostPackages = async (): Promise<BoostPackage[]> => {
  // Simulated delay and response
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    {
      id: 'basic',
      name: 'Basic Boost',
      description: 'Enhance your visibility for 24 hours',
      price: 29.99,
      price_ubx: 300,
      duration: '24:00:00',
      visibility: '50%',
      durationMinutes: 1440, 
      visibility_increase: 50,
      features: ['Top search positions', 'Featured section placement'],
      isMostPopular: false,
      boost_power: 10
    },
    {
      id: 'premium',
      name: 'Premium Boost',
      description: 'Maximum visibility for 3 days',
      price: 69.99,
      price_ubx: 700,
      duration: '72:00:00',
      visibility: '100%',
      durationMinutes: 4320,
      visibility_increase: 100,
      features: ['Top search positions', 'Featured section', 'Highlighted profile'],
      isMostPopular: true,
      boost_power: 20
    }
  ];
};

interface BoostDialogContainerProps {
  profileId: string;
  onSuccess?: () => Promise<boolean>;
  buttonText?: string;
  buttonVariant?: string;
  buttonSize?: string;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

const BoostDialogContainer: React.FC<BoostDialogContainerProps> = ({
  profileId,
  onSuccess = async () => true,
  buttonText = "Boost Profile",
  buttonVariant = "default",
  buttonSize = "default",
  open: externalOpen,
  setOpen: externalSetOpen
}) => {
  // State variables
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('packages');
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [packages, setPackages] = useState<BoostPackage[]>([]);
  
  // Mock boost status
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({
    isActive: false,
    progress: 0,
    timeRemaining: '00:00:00',
    remainingTime: '00:00:00'
  });
  
  // Mock eligibility 
  const [safeEligibility, setSafeEligibility] = useState<BoostEligibility>({
    eligible: true,
    reason: '',
    reasons: []
  });
  
  // Mock Hermes status
  const [hermesStatus, setHermesStatus] = useState<HermesStatus>({
    position: 12,
    activeUsers: 45,
    estimatedVisibility: 75,
    lastUpdateTime: new Date().toISOString(),
    boostScore: 85,
    effectivenessScore: 92
  });
  
  useEffect(() => {
    // Load the boost packages when the component mounts
    const loadData = async () => {
      setLoading(true);
      try {
        const packages = await fetchBoostPackages();
        setPackages(packages);
        
        // If we have packages, preselect the first one
        if (packages.length > 0) {
          setSelectedPackage(packages[0].id);
        }
        
      } catch (err) {
        console.error('Error loading boost packages:', err);
        setError('Failed to load boost packages. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  const openDialog = () => {
    const open = externalSetOpen || setIsOpen;
    open(true);
  };
  
  const closeDialog = () => {
    const open = externalSetOpen || setIsOpen;
    open(false);
  };
  
  const handleBoost = async () => {
    if (!selectedPackage) return false;
    
    // Simulate boost API call
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update eligibility
    setSafeEligibility({
      eligible: false,
      reason: 'You already have an active boost',
      reasons: ['This profile has an active boost.', 'Wait until the current boost expires.'],
      nextEligibleTime: '2 days, 5 hours'
    });
    
    setLoading(false);
    closeDialog();
    await onSuccess();
    
    return true;
  };
  
  const handleCancel = async () => {
    // Simulate cancel operation
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Update boost status
    setBoostStatus({
      isActive: false,
      progress: 0,
      timeRemaining: '00:00:00',
      remainingTime: '00:00:00'
    });
    
    // Update eligibility
    setSafeEligibility({
      eligible: true,
      reason: '',
      reasons: []
    });
    
    setLoading(false);
    closeDialog();
    return true;
  };

  // Helper function to format duration
  const formatBoostDuration = (duration: any) => {
    if (!duration) return '0 hours';
    
    // If it's already a readable string, return it
    if (typeof duration === 'string' && !duration.includes(':')) {
      return duration;
    }
    
    // Extract hours from format like "24:00:00"
    if (typeof duration === 'string' && duration.includes(':')) {
      const hours = parseInt(duration.split(':')[0], 10);
      if (hours === 24) return '1 day';
      if (hours === 72) return '3 days';
      if (hours === 168) return '7 days';
      return `${hours} hours`;
    }
    
    return '24 hours';
  };
  
  const isDialogOpen = externalOpen !== undefined ? externalOpen : isOpen;
  
  return (
    <div>
      <Button 
        onClick={openDialog} 
        variant={buttonVariant as any} 
        size={buttonSize as any}
        className="flex items-center gap-2"
      >
        <Zap className="h-4 w-4" />
        {buttonText}
      </Button>
      
      <BoostDialog
        profileId={profileId}
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (externalSetOpen) {
            externalSetOpen(open);
          } else {
            setIsOpen(open);
          }
        }}
      />
    </div>
  );
};

export default BoostDialogContainer;
