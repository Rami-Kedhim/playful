
import React, { useEffect } from 'react';
import { uberCoreInstance } from '@/core/UberCore';
import FeaturedPersonas from '@/components/home/FeaturedPersonas';
import { formatSystemStatus } from '@/types/home';
import SystemStatusPanel from '@/components/home/SystemStatusPanel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Users, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NeuralAnalyticsPanel from '@/components/brainHub/NeuralAnalyticsPanel';

const Home = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Initialize UberCore when the home page loads
    const initCore = async () => {
      try {
        await uberCoreInstance.initialize();
        console.log('UberCore initialized successfully');
      } catch (error) {
        console.error('Failed to initialize UberCore:', error);
      }
    };
    
    initCore();
  }, []);
  
  // Sample featured personas
  const featuredPersonas = [
    {
      id: 'persona1',
      name: 'Sophie',
      displayName: 'Sophie Dreams',
      type: 'escort' as const,
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
      type: 'creator' as const,
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
      type: 'livecam' as const,
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
      type: 'ai' as const,
      avatarUrl: 'https://picsum.photos/seed/aria/400/600',
      location: 'Metaverse',
      isVerified: true,
      isOnline: true,
      tags: ['adaptive', 'personalized', 'learning']
    }
  ];
  
  // Get system status from UberCore
  const systemStatus = formatSystemStatus(uberCoreInstance.getSystemStatus());
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="py-12 md:py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            Real • Virtual • Intelligent
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Explore the UberPersona Multiverse
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-gradient-to-r from-violet-600 to-fuchsia-600">
              Boost Now with UBX
            </Button>
            <Button size="lg" variant="outline">
              Explore Personas
            </Button>
          </div>
        </div>
      </section>
      
      {/* Featured Personas */}
      <FeaturedPersonas personas={featuredPersonas} />
      
      {/* Core Action Grid */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-10">UberEscorts Ecosystem</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-card/50 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                <span>Metaverse</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Experience spatial 3D encounters with realistic AI personas in our immersive metaverse.
              </p>
              <Button variant="outline" className="w-full" onClick={() => navigate('/metaverse')}>
                Enter Metaverse
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>UberWallet</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Manage your UBX tokens, boost profiles, and participate in the UberEscorts economy.
              </p>
              <Button variant="outline" className="w-full" onClick={() => navigate('/wallet')}>
                Open Wallet
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>AI Companion</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Connect with intelligent AI companions that adapt to your preferences and personality.
              </p>
              <Button variant="outline" className="w-full" onClick={() => navigate('/companion')}>
                Meet Companions
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* System Status & Neural Analytics */}
      <section className="py-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-semibold mb-4">System Status</h3>
          <SystemStatusPanel status={systemStatus} />
        </div>
        
        <div>
          <h3 className="text-2xl font-semibold mb-4">Neural Performance</h3>
          <NeuralAnalyticsPanel />
        </div>
      </section>
    </div>
  );
};

export default Home;
