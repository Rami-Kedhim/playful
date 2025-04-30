import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import { uberCoreInstance } from '@/core/UberCore';
import { lucie } from '@/core/Lucie';
import { FeaturedPersona, SystemStatusDisplay, convertToFeaturedPersonas, formatSystemStatus } from '@/types/home';
import LucieHermesIntegration from '@/components/home/LucieHermesIntegration';

const Home: React.FC = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [featuredPersonas, setFeaturedPersonas] = useState<FeaturedPersona[]>([]);
  const [systemStatus, setSystemStatus] = useState<SystemStatusDisplay>({
    operational: false,
    components: {
      lucie: 'unknown',
      hermes: 'unknown',
      oxum: 'unknown',
      orus: 'unknown',
      wallet: 'unknown'
    }
  });

  useEffect(() => {
    const initializePage = async () => {
      try {
        // Initialize core services
        await uberCoreInstance.initialize();
        
        // Load featured personas
        const personas = await lucie.loadFeaturedPersonas();
        setFeaturedPersonas(convertToFeaturedPersonas(personas));
        
        // Get system status
        const statusData = uberCoreInstance.getSystemStatus();
        setSystemStatus(formatSystemStatus(statusData));
      } catch (error) {
        console.error('Error initializing homepage:', error);
      }
    };

    initializePage();
  }, []);

  return (
    <MainLayout title="UberEscorts - The Web3 Platform for Secure Adult Connections" fullWidth>
      {/* Hero Section with Search */}
      <HeroSection searchLocation={searchLocation} setSearchLocation={setSearchLocation} />
      
      {/* Lucie Hermes Integration - Optional component that appears contextually */}
      <LucieHermesIntegration />
      
      {/* We'll implement the rest of the home page as per the plan in the next steps */}
    </MainLayout>
  );
};

export default Home;
