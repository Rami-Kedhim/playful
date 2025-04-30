
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedPersonas from '@/components/home/FeaturedPersonas';
import SystemStatusPanel from '@/components/home/SystemStatusPanel';
import { uberCoreInstance } from '@/core/UberCore';
import { lucie } from '@/core/Lucie';
import { oxum } from '@/core/Oxum';
import { FeaturedPersona, SystemStatusDisplay, convertToFeaturedPersonas, formatSystemStatus } from '@/types/home';
import LucieHermesIntegration from '@/components/home/LucieHermesIntegration';
import { Button } from '@/components/ui/button';
import { Cpu, Wallet, CreditCard, Globe, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  const [liveBoostMap, setLiveBoostMap] = useState<any[]>([]);

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
        
        // Get live boost map
        const boostMap = oxum.getLiveBoostMap(8);
        setLiveBoostMap(boostMap);
      } catch (error) {
        console.error('Error initializing homepage:', error);
      }
    };

    initializePage();
  }, []);

  return (
    <MainLayout>
      {/* Hero Section with Search */}
      <HeroSection searchLocation={searchLocation} setSearchLocation={setSearchLocation} />
      
      {/* Featured Personas */}
      <FeaturedPersonas personas={featuredPersonas} />
      
      {/* Core Action Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Explore the UberPersona Multiverse</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { 
                icon: Globe, 
                title: "Metaverse", 
                description: "Enter our immersive 3D spaces",
                link: "/metaverse",
                color: "from-blue-500 to-purple-700"
              },
              { 
                icon: Wallet, 
                title: "UBX Wallet", 
                description: "Secure transactions with UBX tokens",
                link: "/wallet",
                color: "from-green-500 to-emerald-700"
              },
              { 
                icon: Cpu, 
                title: "AI Companion", 
                description: "Your personal AI assistant",
                link: "/companion",
                color: "from-pink-500 to-rose-700"
              },
              { 
                icon: Zap, 
                title: "Pulse Boost", 
                description: "Maximize your visibility",
                link: "/pulse-boost",
                color: "from-amber-500 to-orange-700"
              }
            ].map((item, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-80 group-hover:opacity-90 transition-opacity duration-300`}></div>
                <div className="relative p-6 flex flex-col items-center text-white h-full">
                  <item.icon className="h-12 w-12 mb-4" />
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-center mb-6 opacity-80">{item.description}</p>
                  <Button asChild variant="secondary" size="sm" className="mt-auto">
                    <Link to={item.link}>
                      Explore Now
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* System Status & Live Boost Map */}
      <section className="py-12 px-4 bg-black/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <SystemStatusPanel status={systemStatus} />
            </div>
            
            <div className="lg:col-span-2">
              <Card className="bg-card/50 backdrop-blur-sm border-white/10 h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Zap className="h-5 w-5 text-amber-500 mr-2" />
                    Live Pulse Boosting Monitor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {liveBoostMap.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {liveBoostMap.map((boost, index) => (
                          <div key={index} className={`rounded-lg p-3 border ${
                            boost.trend === 'rising' ? 'border-green-500/30 bg-green-500/10' : 
                            boost.trend === 'falling' ? 'border-red-500/30 bg-red-500/10' : 
                            'border-white/10 bg-white/5'
                          }`}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs uppercase opacity-70">{boost.type}</span>
                              <span className={`text-xs ${
                                boost.trend === 'rising' ? 'text-green-400' : 
                                boost.trend === 'falling' ? 'text-red-400' : 
                                'text-gray-400'
                              }`}>
                                {boost.trend}
                              </span>
                            </div>
                            <div className="font-bold text-lg">{boost.boostScore}</div>
                            <div className="text-xs opacity-70">{boost.location}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No boosted profiles currently active</p>
                      </div>
                    )}
                    
                    <div className="flex justify-center mt-6">
                      <Button asChild variant="outline" size="sm">
                        <Link to="/pulse-boost">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Boost Your Profile
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Lucie Hermes Integration - Optional component that appears contextually */}
      <LucieHermesIntegration />
    </MainLayout>
  );
};

export default Home;
