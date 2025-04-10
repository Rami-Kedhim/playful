
import React from 'react';
import { Helmet } from 'react-helmet-async';
import MainLayout from '@/components/layout/MainLayout';
import { EscortsModule } from '@/modules/escorts/EscortsModule';
import EscortContainer from '@/components/escorts/EscortContainer';
import { useEscorts } from '@/hooks/useEscorts';

const EscortDirectoryPage: React.FC = () => {
  return (
    <EscortsModule>
      <EscortDirectoryContent />
    </EscortsModule>
  );
};

const EscortDirectoryContent: React.FC = () => {
  const { escorts, loading, clearAllFilters } = useEscorts();
  
  // Extract unique services for filters
  const availableServices = React.useMemo(() => {
    const servicesSet = new Set<string>();
    
    escorts.forEach(escort => {
      if (escort.services && Array.isArray(escort.services)) {
        escort.services.forEach(service => servicesSet.add(service));
      }
    });
    
    return Array.from(servicesSet);
  }, [escorts]);

  return (
    <>
      <Helmet>
        <title>Public Escort Directory | UberEscorts</title>
        <meta name="description" content="Browse our verified escorts directory. Connect with professional verified escorts." />
      </Helmet>
      
      <MainLayout>
        <div className="container mx-auto py-8 px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Escort Directory</h1>
            <p className="text-muted-foreground">
              Browse our directory of verified escorts. UberEscorts provides a free platform for connecting with professional escorts.
            </p>
            <div className="text-sm text-muted-foreground mt-2 bg-primary/10 p-3 rounded-md">
              <p className="font-medium">Important Notice:</p>
              <p>UberEscorts only provides a connection interface and does not facilitate or earn money from real-life encounters. 
              All appointments are non-binding and for organizational purposes only.</p>
            </div>
          </div>
          
          <EscortContainer 
            escorts={escorts} 
            services={availableServices}
            isLoading={loading}
          />
        </div>
      </MainLayout>
    </>
  );
};

export default EscortDirectoryPage;
