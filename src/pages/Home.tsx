
import React, { useEffect, useState } from 'react';
import { uberCoreInstance } from '@/core/UberCore';
import { lucie } from '@/core/Lucie';
import FeaturedPersonas from '@/components/home/FeaturedPersonas';
import { formatSystemStatus } from '@/types/home';
import SystemStatusPanel from '@/components/home/SystemStatusPanel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Users, Globe, Wallet, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NeuralAnalyticsPanel from '@/components/brainHub/NeuralAnalyticsPanel';
import { UberPersona } from '@/types/uberPersona';
import HeroSection from '@/components/home/HeroSection';

const Home = () => {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState('');
  const [featuredPersonas, setFeaturedPersonas] = useState<UberPersona[]>([]);
  
  useEffect(() => {
    // Initialize UberCore when the home page loads
    const initCore = async () => {
      try {
        await uberCoreInstance.initialize();
        console.log('UberCore initialized successfully');
        
        // Load featured personas through Lucie
        const personas = await lucie.loadFeaturedPersonas();
        setFeaturedPersonas(personas || []);
      } catch (error) {
        console.error('Failed to initialize UberCore:', error);
      }
    };
    
    initCore();
  }, []);
  
  // If Lucie didn't return any personas, use these fallback ones
  const fallbackPersonas = [
    {
      id: 'persona1',
      name: 'Sophie',
      displayName: 'Sophie Dreams',
      type: 'escort',
      avatarUrl: 'https://picsum.photos/seed/sophie/400/600',
      location: 'New York',
      isVerified: true,
      isOnline: true,
      tags: ['luxury', 'gfe', 'travel']
    },
    {
      id: 'persona2',
      name: 'Luna',
      displayName: 'Luna Eclipse',
      type: 'creator',
      avatarUrl: 'https://picsum.photos/seed/luna/400/600',
      location: 'Miami',
      isVerified: true,
      isOnline: false,
      tags: ['photos', 'videos', 'exclusive']
    },
    {
      id: 'persona3',
      name: 'TiffanyLive',
      displayName: 'Tiffany Stars',
      type: 'livecam',
      avatarUrl: 'https://picsum.photos/seed/tiffany/400/600',
      location: 'Los Angeles',
      isVerified: true,
      isOnline: true,
      tags: ['interactive', 'shows', 'private']
    },
    {
      id: 'persona4',
      name: 'Aria',
      displayName: 'Aria Intelligence',
      type: 'ai',
      avatarUrl: 'https://picsum.photos/seed/aria/400/600',
      location: 'Metaverse',
      isVerified: true,
      isOnline: true,
      tags: ['adaptive', 'personalized', 'learning']
    }
  ];
  
  // Use personas from Lucie or fallback
  const displayPersonas = featuredPersonas.length > 0 ? featuredPersonas : fallbackPersonas;
  
  // Get system status from UberCore
  const systemStatus = formatSystemStatus(uberCoreInstance.getSystemStatus());
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section with UberPersona Multiverse */}
      <HeroSection searchLocation={searchLocation} setSearchLocation={setSearchLocation} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Featured UberPersonas Carousel */}
        <FeaturedPersonas personas={displayPersonas} />
        
        {/* Core Action Grid - UberConcepts */}
        <section className="py-12 bg-gradient-to-r from-gray-900 to-black rounded-xl p-8 backdrop-blur-lg border border-white/5">
          <h2 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">UberConcepts Ecosystem</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-black/60 to-purple-900/20 backdrop-blur-sm border-white/10 overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  <span>Metaverse Gateway</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Experience spatial 3D encounters with realistic AI personas in our immersive metaverse.
                </p>
                <Button variant="outline" className="w-full bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10" onClick={() => navigate('/metaverse')}>
                  Enter Metaverse
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-black/60 to-purple-900/20 backdrop-blur-sm border-white/10 overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  <span>UBX Wallet</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Manage your UBX tokens, boost profiles, and participate in the UberEscorts economy.
                </p>
                <Button variant="outline" className="w-full bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10" onClick={() => navigate('/wallet')}>
                  Open Wallet
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-black/60 to-purple-900/20 backdrop-blur-sm border-white/10 overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  <span>AI Companion</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Connect with intelligent AI companions that adapt to your preferences and personality.
                </p>
                <Button variant="outline" className="w-full bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10" onClick={() => navigate('/companion')}>
                  Meet Companions
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8">
            <Card className="bg-gradient-to-br from-black/60 to-purple-900/20 backdrop-blur-sm border-white/10 overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Pulse Boost with UBX</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Increase your visibility and engagement with our proprietary Oxum boosting technology.
                </p>
                <Button variant="default" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 border-none" onClick={() => navigate('/pulse-boost')}>
                  Boost Now with UBX
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* System Status & Neural Analytics */}
        <section className="py-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">System Status</h3>
            <SystemStatusPanel status={systemStatus} />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Neural Performance</h3>
            <NeuralAnalyticsPanel />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
