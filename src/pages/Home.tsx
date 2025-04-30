
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CircleUser,
  Rocket,
  Globe,
  Wallet,
  Video,
  Code
} from 'lucide-react';

import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useUberCore } from '@/contexts/UberCoreContext';
import { oxum } from '@/core/Oxum';
import { lucie } from '@/core/Lucie';

// Types for the featured personas
interface FeaturedPersona {
  id: string;
  name: string;
  displayName: string;
  avatarUrl: string;
  type: string;
  boostScore?: number;
  isOnline?: boolean;
  tags?: string[];
}

// Types for the pulse boost data
interface BoostDataPoint {
  id: string;
  type: string;
  location: string;
  boostScore: number;
  trend: 'rising' | 'stable' | 'falling';
  lastUpdated: Date;
}

const HomePage: React.FC = () => {
  const { isInitialized, initialize } = useUberCore();
  const [featuredPersonas, setFeaturedPersonas] = useState<FeaturedPersona[]>([]);
  const [boostMap, setBoostMap] = useState<BoostDataPoint[]>([]);
  const [systemStatus, setSystemStatus] = useState({
    operational: true,
    components: {
      lucie: 'active',
      hermes: 'active',
      oxum: 'active',
      orus: 'active',
      wallet: 'active'
    }
  });

  // Initialize UberCore on component mount
  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
    
    // Load featured personas
    const loadPersonas = async () => {
      try {
        const personas = await lucie.loadFeaturedPersonas();
        setFeaturedPersonas(personas);
      } catch (error) {
        console.error('Failed to load featured personas:', error);
      }
    };
    
    // Get live boost map
    const getBoostMap = () => {
      try {
        const boostData = oxum.getLiveBoostMap(5);
        setBoostMap(boostData);
      } catch (error) {
        console.error('Failed to load boost map:', error);
      }
    };
    
    // Get system status
    const getStatus = async () => {
      try {
        const status = await lucie.getSystemStatus();
        setSystemStatus(status);
      } catch (error) {
        console.error('Failed to get system status:', error);
      }
    };
    
    loadPersonas();
    getBoostMap();
    getStatus();
    
    // Refresh boost map every 30 seconds
    const intervalId = setInterval(getBoostMap, 30000);
    return () => clearInterval(intervalId);
  }, [isInitialized, initialize]);

  return (
    <MainLayout>
      {/* Hero Section */}
      <motion.section 
        className="py-12 md:py-20 bg-gradient-to-tr from-black via-gray-900 to-purple-950 text-white rounded-lg mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto text-center px-4">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
          >
            Real • Virtual • Intelligent
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8 text-gray-300"
            initial={{ y: -30 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
          >
            Explore UberPersona Multiverse
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button size="lg" variant="default" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Link to="/pulse-boost" className="flex items-center gap-2">
                <Rocket className="h-5 w-5" />
                <span>Boost Now with UBX</span>
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured UberPersonas Carousel */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Featured UberPersonas</h2>
          <Button variant="outline" size="sm">
            <Link to="/personas">View All</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredPersonas.map((persona) => (
            <motion.div 
              key={persona.id}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Card>
                <CardContent className="p-4">
                  <Link to={`/persona/${persona.id}`}>
                    <div className="relative mb-3">
                      <img 
                        src={persona.avatarUrl} 
                        alt={persona.displayName}
                        className="w-full h-48 object-cover rounded-md"
                      />
                      {persona.isOnline && (
                        <span className="absolute top-2 right-2 bg-green-500 rounded-full h-3 w-3"></span>
                      )}
                      {persona.boostScore && (
                        <div className="absolute bottom-2 right-2 bg-black/70 rounded-full px-2 py-1 text-xs flex items-center">
                          <Rocket className="w-3 h-3 mr-1 text-purple-400" />
                          <span>{persona.boostScore}</span>
                        </div>
                      )}
                    </div>
                    <h3 className="font-medium text-lg">{persona.displayName}</h3>
                    <p className="text-sm text-muted-foreground">{persona.type}</p>
                    {persona.tags && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {persona.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-xs bg-secondary px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Core Action Grid */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Core Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Card className="hover:bg-accent/10 transition-colors">
            <CardContent className="p-6">
              <Link to="/metaverse" className="flex flex-col items-center text-center">
                <Globe className="h-12 w-12 mb-4 text-primary" />
                <h3 className="font-medium text-lg mb-1">Metaverse Gateway</h3>
                <p className="text-sm text-muted-foreground">Enter immersive 3D experiences</p>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="hover:bg-accent/10 transition-colors">
            <CardContent className="p-6">
              <Link to="/wallet" className="flex flex-col items-center text-center">
                <Wallet className="h-12 w-12 mb-4 text-primary" />
                <h3 className="font-medium text-lg mb-1">UberWallet</h3>
                <p className="text-sm text-muted-foreground">Manage your UBX tokens</p>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="hover:bg-accent/10 transition-colors">
            <CardContent className="p-6">
              <Link to="/companion" className="flex flex-col items-center text-center">
                <CircleUser className="h-12 w-12 mb-4 text-primary" />
                <h3 className="font-medium text-lg mb-1">AI Companion</h3>
                <p className="text-sm text-muted-foreground">Chat with your personal companion</p>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Two-column layout for Boost Monitor and System HUD */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Live Pulse Boosting Monitor */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Rocket className="mr-2 h-5 w-5 text-purple-500" />
              Live Pulse Boosting Monitor
            </h2>
            <Separator className="mb-4" />
            {boostMap.length > 0 ? (
              <ul className="space-y-3">
                {boostMap.map((item) => (
                  <li key={item.id} className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{item.type}</span>
                      <span className="text-sm text-muted-foreground ml-2">{item.location}</span>
                    </div>
                    <div className="flex items-center">
                      <span className={`mr-2 ${
                        item.trend === 'rising' ? 'text-green-500' : 
                        item.trend === 'falling' ? 'text-red-500' : 'text-yellow-500'
                      }`}>
                        {item.boostScore}
                      </span>
                      {item.trend === 'rising' && <span className="text-green-500">↑</span>}
                      {item.trend === 'falling' && <span className="text-red-500">↓</span>}
                      {item.trend === 'stable' && <span className="text-yellow-500">→</span>}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No active boosts at the moment</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Lucie System HUD */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Code className="mr-2 h-5 w-5 text-blue-500" />
              Lucie System HUD
            </h2>
            <Separator className="mb-4" />
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-secondary/50 p-3 rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground">System Status</div>
                  <div className={`flex items-center ${systemStatus.operational ? 'text-green-500' : 'text-red-500'}`}>
                    <span className="h-2 w-2 rounded-full mr-2 bg-current"></span>
                    <span>{systemStatus.operational ? 'Operational' : 'Degraded'}</span>
                  </div>
                </div>
                <div className="bg-secondary/50 p-3 rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground">Components</div>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(systemStatus.components).map(([key, value]) => (
                      <span key={key} className={`text-xs px-2 py-1 rounded-full ${
                        value === 'active' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                      }`}>
                        {key}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-secondary/50 rounded-lg">
                <p className="text-sm">Lucie is monitoring system performance and user interactions to optimize your experience.</p>
              </div>
              
              <div className="flex justify-center">
                <Button variant="outline" size="sm">
                  <Link to="/brain-hub">System Analytics</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default HomePage;
