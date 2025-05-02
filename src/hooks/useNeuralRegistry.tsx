
import { useState, useEffect, useCallback } from 'react';
import neuralServiceRegistry from '@/services/neural/registry/NeuralServiceRegistry';

export default function useNeuralRegistry() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      const allServices = neuralServiceRegistry.getAllServices();
      setServices(allServices);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch neural services:', err);
      setError('Failed to load neural services');
    } finally {
      setLoading(false);
    }
  }, []);
  
  const optimizeResources = useCallback(async () => {
    console.log('Optimizing neural resources...');
    // In a real app, this would call a backend API to optimize resource allocation
    try {
      // Simulate optimization (delay + get services again)
      await new Promise(resolve => setTimeout(resolve, 1000));
      await fetchServices();
      return true;
    } catch (err) {
      console.error('Failed to optimize resources:', err);
      return false;
    }
  }, [fetchServices]);
  
  useEffect(() => {
    fetchServices();
  }, [fetchServices]);
  
  return {
    services,
    loading,
    error,
    refreshServices: fetchServices,
    optimizeResources
  };
}
