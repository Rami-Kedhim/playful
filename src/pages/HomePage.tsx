
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight, Rocket, Wallet, Star, Globe, User } from 'lucide-react';
import { lucie } from '@/core/Lucie';
import { hermes } from '@/core/Hermes';
import { oxum } from '@/core/Oxum';
import { uberWallet } from '@/core/UberWallet';
import { logInteraction } from '@/utils/uberCore';
import { UberPersona } from '@/types/shared';
import { AppRoutes } from '@/utils/navigation';

/**
 * UberEscorts Homepage - Central entry point for the ecosystem
 */
const HomePage: React.FC = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [featuredUsers, setFeaturedUsers] = useState<UberPersona[]>([]);
  const [loading, setLoading] = useState(true);
  const [boostStats, setBoostStats] = useState({ activeBoosts: 0, topScore: 0 });
  const [systemStatus, setSystemStatus] = useState({ operational: true });
  const [recommendedAction, setRecommendedAction] = useState('explore');

  // Load featured users through Lucie AI
  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const users = await lucie.loadFeaturedUsers(8);
        setFeaturedUsers(users);
      } catch (error) {
        console.error('Error loading featured personas:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeatured();
    
    // Log interaction through Hermes
    logInteraction('HomePage', 'page-view', { timestamp: new Date().toISOString() });
    
    // Get recommended next action
    const nextAction = hermes.recommendNextAction();
    setRecommendedAction(nextAction);
    
    // Mock boost stats
    setBoostStats({
      activeBoosts: 12,
      topScore: 87
    });
  }, []);

  // Calculate user visibility score for UI display
  const calculateVisibility = () => {
    try {
      return hermes.calculateVisibilityScore('current-user');
    } catch (error) {
      console.error('Error calculating visibility score:', error);
      return 50; // Default fallback
    }
  };

  const visibilityScore = calculateVisibility();

  return (
    <div className="container mx-auto p-4">
      {/* Hero Banner */}
      <section className="relative w-full bg-gradient-to-r from-purple-900 to-blue-900 text-white rounded-xl p-8 mb-8 shadow-lg">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold mb-2">
            Real • Virtual • Intelligent
          </h1>
          <p className="text-xl mb-6">Your Ultimate Connection</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Enter your location"
                className="w-full p-3 rounded-lg text-gray-800"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </div>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
              onClick={() => {
                logInteraction('HomePage', 'search-button', { location: searchLocation });
              }}
            >
              Find Connection
            </Button>
          </div>
        </div>

        <div className="absolute right-8 bottom-8 hidden lg:block">
          <div className="bg-black bg-opacity-30 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-sm">Your Profile Visibility</p>
            <div className="text-2xl font-bold">{visibilityScore}%</div>
            <Link 
              to={AppRoutes.PULSE_BOOST}
              className="text-xs text-pink-300 flex items-center"
              onClick={() => logInteraction('HomePage', 'boost-cta-click')}
            >
              Boost Now <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* Boost CTA */}
      <section className="mb-8">
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg p-6 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold text-white">Pulse Boost</h2>
              <p className="text-white text-opacity-90">
                Get 5x more visibility with our intelligent boosting system.
              </p>
            </div>
            <Link to={AppRoutes.PULSE_BOOST}>
              <Button 
                variant="secondary" 
                size="lg" 
                className="whitespace-nowrap"
                onClick={() => logInteraction('HomePage', 'boost-button-click')}
              >
                <Rocket className="h-4 w-4 mr-2" />
                Boost Profile
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Profiles */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Featured Profiles</h2>
          <Link 
            to={AppRoutes.ESCORTS} 
            className="text-sm text-blue-500 flex items-center"
            onClick={() => logInteraction('HomePage', 'view-all-escorts')}
          >
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-lg h-64 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredUsers.map((user) => (
              <Link 
                key={user.id} 
                to={`/persona/${user.id}`}
                onClick={() => logInteraction('HomePage', 'featured-profile-click', { profileId: user.id })}
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="aspect-[3/4] relative bg-gray-200 dark:bg-gray-700">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <User className="h-12 w-12" />
                    </div>
                    {user.avatarUrl && (
                      <img 
                        src={user.avatarUrl} 
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                    {user.isOnline && (
                      <div className="absolute top-2 right-2">
                        <div className="bg-green-500 rounded-full h-3 w-3"></div>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold">{user.displayName || user.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.location}</p>
                    {user.isVerified && (
                      <div className="flex items-center mt-1 text-blue-500 text-xs">
                        <Star className="h-3 w-3 mr-1" />
                        Verified
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Action Cards */}
      <section className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Metaverse Card */}
        <Card className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" /> Metaverse Gateway
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Explore immersive 3D environments and connect with others in virtual spaces.</p>
          </CardContent>
          <CardFooter>
            <Link 
              to={AppRoutes.METAVERSE} 
              className="w-full"
              onClick={() => {
                hermes.enterSpatialFlow('anonymous', 'homepage-entry');
                logInteraction('HomePage', 'metaverse-card-click');
              }}
            >
              <Button variant="secondary" className="w-full">Enter Metaverse</Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Wallet Card */}
        <Card className="bg-gradient-to-br from-emerald-900 to-teal-900 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" /> UBX Wallet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Manage your UBX tokens, track transactions, and fund your activities.</p>
          </CardContent>
          <CardFooter>
            <Link 
              to={AppRoutes.WALLET} 
              className="w-full"
              onClick={() => logInteraction('HomePage', 'wallet-card-click')}
            >
              <Button variant="secondary" className="w-full">Open Wallet</Button>
            </Link>
          </CardFooter>
        </Card>

        {/* AI Companions Card */}
        <Card className="bg-gradient-to-br from-pink-900 to-red-900 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" /> AI Companions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Connect with emotionally intelligent AI companions for conversation and companionship.</p>
          </CardContent>
          <CardFooter>
            <Link 
              to={AppRoutes.AI_COMPANION} 
              className="w-full"
              onClick={() => logInteraction('HomePage', 'ai-companion-card-click')}
            >
              <Button variant="secondary" className="w-full">Meet Companions</Button>
            </Link>
          </CardFooter>
        </Card>
      </section>

      {/* System HUD */}
      <section className="mb-8">
        <div className="bg-black bg-opacity-10 rounded-lg p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-500">System Status</p>
              <p className="font-medium flex items-center">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                {systemStatus.operational ? 'Operational' : 'Degraded'}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Active Boosts</p>
              <p className="font-medium">{boostStats.activeBoosts}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Top Boost Score</p>
              <p className="font-medium">{boostStats.topScore}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Recommended</p>
              <p className="font-medium capitalize">{recommendedAction}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
