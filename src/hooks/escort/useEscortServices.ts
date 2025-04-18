
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';

// Service type enum
export enum ServiceType {
  Massage = 'massage',
  Roleplay = 'roleplay',
  Overnight = 'overnight',
  Companionship = 'companionship',
  Dinner = 'dinner',
  Events = 'events',
  Travel = 'travel',
  BDSM = 'bdsm'
}

interface ServiceOption {
  value: string;
  label: string;
  description: string;
}

interface UseEscortServicesProps {
  escortId?: string;
  initialServices?: string[];
}

export const useEscortServices = ({
  escortId,
  initialServices = []
}: UseEscortServicesProps) => {
  const [services, setServices] = useState<string[]>(initialServices);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Available service options
  const serviceOptions: ServiceOption[] = [
    { value: ServiceType.Massage, label: 'Massage', description: 'Professional massage services' },
    { value: ServiceType.Roleplay, label: 'Role Play', description: 'Customized role play experiences' },
    { value: ServiceType.Overnight, label: 'Overnight', description: 'Overnight companionship' },
    { value: ServiceType.Companionship, label: 'Companionship', description: 'General companionship services' },
    { value: ServiceType.Dinner, label: 'Dinner Date', description: 'Accompaniment for dinner engagements' },
    { value: ServiceType.Events, label: 'Event Companion', description: 'Accompaniment for various events' },
    { value: ServiceType.Travel, label: 'Travel Companion', description: 'Accompaniment for travel' },
    { value: ServiceType.BDSM, label: 'BDSM', description: 'BDSM experiences' }
  ];

  // Toggle a service
  const toggleService = useCallback((serviceValue: string) => {
    setServices(prev => {
      if (prev.includes(serviceValue)) {
        return prev.filter(s => s !== serviceValue);
      } else {
        return [...prev, serviceValue];
      }
    });
  }, []);

  // Check if a service is selected
  const isServiceSelected = useCallback((serviceValue: string) => {
    return services.includes(serviceValue);
  }, [services]);

  // Save services to the server
  const saveServices = useCallback(async () => {
    if (!escortId) {
      setError('Escort ID is required to save services');
      return false;
    }

    setSaving(true);
    setError(null);

    try {
      // In a real app, this would be an API call
      console.log('Saving services for escort:', escortId, services);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Services updated',
        description: 'Your service offerings have been saved.',
      });
      
      return true;
    } catch (err) {
      console.error('Error saving services:', err);
      setError('Failed to save services. Please try again.');
      
      toast({
        title: 'Save failed',
        description: 'There was a problem updating your services. Please try again.',
        variant: 'destructive',
      });
      
      return false;
    } finally {
      setSaving(false);
    }
  }, [escortId, services, toast]);

  // Get services by category
  const getServicesByCategory = useCallback((category: 'all' | 'basic' | 'premium') => {
    // In a real app, you would have categories defined for services
    return services;
  }, [services]);

  return {
    services,
    serviceOptions,
    loading,
    saving,
    error,
    toggleService,
    isServiceSelected,
    saveServices,
    getServicesByCategory
  };
};

export default useEscortServices;
