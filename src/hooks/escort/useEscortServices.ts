
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

interface EscortService {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string; // e.g. "1 hour", "2 hours", "overnight"
  category: string;
  isPopular?: boolean;
  isAvailable?: boolean;
}

interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  services: EscortService[];
}

export const useEscortServices = (escortId?: string) => {
  const [services, setServices] = useState<EscortService[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(r => setTimeout(r, 700));
      
      // Mock data
      const mockServices: EscortService[] = [
        {
          id: '1',
          name: 'Standard Date',
          description: 'Companionship for dinner or events',
          price: 300,
          duration: '1 hour',
          category: 'companionship',
          isPopular: true,
          isAvailable: true
        },
        {
          id: '2',
          name: 'Extended Date',
          description: 'Extended companionship for longer events',
          price: 500,
          duration: '3 hours',
          category: 'companionship',
          isAvailable: true
        },
        {
          id: '3',
          name: 'Overnight',
          description: 'Full night companionship',
          price: 1200,
          duration: '8-10 hours',
          category: 'companionship',
          isPopular: true
        },
        {
          id: '4',
          name: 'Weekend Getaway',
          description: 'Full weekend companionship',
          price: 3000,
          duration: '48 hours',
          category: 'travel'
        },
        {
          id: '5',
          name: 'Business Trip',
          description: 'Travel companion for business trips',
          price: 5000,
          duration: '3-5 days',
          category: 'travel'
        },
        {
          id: '6',
          name: 'Erotic Massage',
          description: 'Full body sensual massage',
          price: 250,
          duration: '1 hour',
          category: 'massage',
          isAvailable: true,
          isPopular: true
        },
        {
          id: '7',
          name: 'Couples Experience',
          description: 'Special experience for couples',
          price: 600,
          duration: '2 hours',
          category: 'specialty'
        },
        {
          id: '8',
          name: 'BDSM Session',
          description: 'Customized BDSM experience',
          price: 400,
          duration: '2 hours',
          category: 'specialty'
        }
      ];
      
      // Create categories
      const categoryMap: Record<string, ServiceCategory> = {
        companionship: {
          id: 'companionship',
          name: 'Companionship',
          description: 'Social companionship services',
          services: []
        },
        travel: {
          id: 'travel',
          name: 'Travel Companionship',
          description: 'Extended travel and getaway services',
          services: []
        },
        massage: {
          id: 'massage',
          name: 'Massage',
          description: 'Professional massage services',
          services: []
        },
        specialty: {
          id: 'specialty',
          name: 'Specialty Services',
          description: 'Specialized experiences',
          services: []
        }
      };
      
      // Group services by category
      mockServices.forEach(service => {
        if (categoryMap[service.category]) {
          categoryMap[service.category].services.push(service);
        }
      });
      
      const categoriesArray = Object.values(categoryMap);
      
      setServices(mockServices);
      setCategories(categoriesArray);
    } catch (err) {
      console.error('Error fetching escort services:', err);
      setError('Failed to load escort services');
      
      toast({
        title: 'Error Loading Services',
        description: 'Could not load escort services. Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchServices();
  }, [escortId]);
  
  const getPopularServices = () => {
    return services.filter(service => service.isPopular);
  };
  
  const getServicesByCategory = (categoryId: string) => {
    return services.filter(service => service.category === categoryId);
  };
  
  const getAvailableServices = () => {
    return services.filter(service => service.isAvailable);
  };
  
  return {
    services,
    categories,
    loading,
    error,
    refreshServices: fetchServices,
    getPopularServices,
    getServicesByCategory,
    getAvailableServices
  };
};

export default useEscortServices;
