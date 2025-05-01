
import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollRevealGroup } from '@/components/ui/scroll-reveal-group';
import ScrollReveal from '@/components/ui/scroll-reveal';
import { ChevronUp, ChevronRight, Zap, Activity, History, Settings, Info } from 'lucide-react';
import { checkBoostEligibility, logInteraction } from '@/utils/uberCore';
import { oxum } from '@/core/Oxum';
import { uberWallet } from '@/core/UberWallet';
import { BoostStatus, BoostStats } from '@/types/shared';

const PulseBoostPage = () => {
  const [activeTab, setActiveTab] = useState<string>('boost');
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({
    isActive: false,
    packageName: 'None'
  });
  const [boostStats, setBoostStats] = useState<BoostStats>({
    activeBoosts: 0,
    topBoostScore: 0,
    averageVisibility: 0,
    peakHours: [],
    recentChanges: []
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Mock boost packages
  const boostPackages = [
    { id: 'basic', name: 'Basic Boost', price: 25, duration: '24 hours', visibilityIncrease: '50%', rank: 'Good' },
    { id: 'premium', name: 'Premium Boost', price: 75, duration: '3 days', visibilityIncrease: '150%', rank: 'Better' },
    { id: 'ultra', name: 'Ultra Boost', price: 200, duration: '7 days', visibilityIncrease: '300%', rank: 'Best' },
  ];

  useEffect(() => {
    const loadBoostData = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, these would call the actual Oxum methods
        // const boostStatusData = await oxum.getBoostStatus(userId);
        // const boostStatsData = await oxum.getBoostStats(userId);
        
        // For now, we'll use mock data
        setTimeout(() => {
          setBoostStatus({
            isActive: false,
            packageName: 'None',
            expiresAt: undefined,
          });
          
          setBoostStats({
            activeBoosts: 42,
            topBoostScore: 89,
            averageVisibility: 65,
            peakHours: ['18:00', '22:00'],
            recentChanges: [+5, -2, +8, +4, -1, +3]
          });
          
          setIsLoading(false);
        }, 1000);
        
        // Log this interaction with Hermes
        logInteraction('PulseBoostPage', 'loadBoostData');
      } catch (error) {
        console.error('Error loading boost data:', error);
        setIsLoading(false);
      }
    };

    loadBoostData();
  }, []);

  const handleActivateBoost = async (packageId: string) => {
    setIsLoading(true);
    
    try {
      // Check if user has enough UBX
      const walletCheck = await uberWallet.getBalance('mock-user-id');
      const selectedPackage = boostPackages.find(pkg => pkg.id === packageId);
      
      if (!selectedPackage) {
        console.error('Invalid package selected');
        setIsLoading(false);
        return;
      }
      
      if (walletCheck.available < selectedPackage.price) {
        alert('Insufficient UBX balance. Please top up your wallet first.');
        setIsLoading(false);
        return;
      }
      
      // In a real implementation:
      // await oxum.activateBoost(userId, packageId);
      // await uberWallet.spendUbx(userId, selectedPackage.price, 'Boost Package');
      
      // For the mock implementation:
      setTimeout(() => {
        setBoostStatus({
          isActive: true,
          packageId: packageId,
          packageName: selectedPackage.name,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
          startedAt: new Date(),
        });
        
        setIsLoading(false);
        
        // Log interaction with Hermes
        logInteraction('PulseBoostPage', 'activateBoost', { packageId });
      }, 1500);
    } catch (error) {
      console.error('Error activating boost:', error);
      setIsLoading(false);
    }
  };

  return (
    <PageLayout 
      title="Pulse Boost" 
      subtitle="Enhance your visibility and reach with UberEscorts boost system">
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
          <TabsTrigger value="boost" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span>Boost</span>
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            <span>History</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="boost" className="space-y-6">
          {boostStatus.isActive ? (
            <ScrollReveal animation="fade-up" className="w-full">
              <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-background">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-green-500" />
                      Active Boost
                    </CardTitle>
                    <div className="bg-green-500/20 text-green-500 px-3 py-1 rounded-full text-sm font-medium">
                      Active
                    </div>
                  </div>
                  <CardDescription>
                    Your profile is currently boosted with {boostStatus.packageName}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Started</p>
                      <p className="font-medium">{boostStatus.startedAt?.toLocaleString()}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Expires</p>
                      <p className="font-medium">{boostStatus.expiresAt?.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Visibility Boost</p>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Base</span>
                      <span className="text-green-500 font-medium">+75% Boosted</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ) : (
            <ScrollReveal animation="fade-up">
              <Card className="border-amber-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-amber-500" />
                    Boost Your Profile
                  </CardTitle>
                  <CardDescription>
                    Increase your visibility and get more client requests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">You currently have no active boosts. Select a package below to increase your visibility.</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          )}

          <ScrollRevealGroup
            animation="fade-up"
            staggerDelay={0.1}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {boostPackages.map((pkg, index) => (
              <Card key={pkg.id} className={`${
                index === 2 ? 'border-purple-500/50 shadow-lg shadow-purple-500/10' : 
                index === 1 ? 'border-blue-500/30' : ''
              }`}>
                <CardHeader>
                  <CardTitle className="text-lg">{pkg.name}</CardTitle>
                  <CardDescription>
                    {pkg.duration} • {pkg.visibilityIncrease} visibility
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-2xl font-bold">{pkg.price} UBX</div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Duration</span>
                      <span className="font-medium">{pkg.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Visibility</span>
                      <span className="font-medium">{pkg.visibilityIncrease}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ranking</span>
                      <span className="font-medium">{pkg.rank}</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant={index === 2 ? "default" : "outline"} 
                    className={index === 2 ? "w-full bg-gradient-to-r from-violet-600 to-purple-600" : "w-full"}
                    onClick={() => handleActivateBoost(pkg.id)}
                    disabled={isLoading || boostStatus.isActive}
                  >
                    {isLoading ? "Processing..." : "Activate"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </ScrollRevealGroup>
        </TabsContent>

        <TabsContent value="stats">
          <ScrollRevealGroup 
            animation="fade-up"
            staggerDelay={0.1}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Boost Performance</CardTitle>
                <CardDescription>
                  How your profile visibility has changed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/30 rounded-md">
                  <p className="text-muted-foreground">[Visibility chart will appear here]</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Active Boosts</p>
                    <p className="font-medium text-lg">{boostStats.activeBoosts}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Top Score</p>
                    <p className="font-medium text-lg">{boostStats.topBoostScore}/100</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Avg. Visibility</p>
                    <p className="font-medium text-lg">{boostStats.averageVisibility}%</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Peak Hours</p>
                    <p className="font-medium text-lg">{boostStats.peakHours.join(', ')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Changes</CardTitle>
                <CardDescription>
                  Your visibility score fluctuations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  {boostStats.recentChanges.map((change, i) => (
                    <div 
                      key={i} 
                      className={`flex items-center ${change > 0 ? 'text-green-500' : 'text-red-500'}`}
                    >
                      <span>{change > 0 ? '+' : ''}{change}</span>
                      {change > 0 ? <ChevronUp className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollRevealGroup>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Boost History
              </CardTitle>
              <CardDescription>
                Your previous boost activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="py-4 text-center">Loading history...</div>
              ) : (
                <div className="space-y-4">
                  {/* We'll show "No history" since we're just creating the page */}
                  <div className="py-8 text-center text-muted-foreground flex flex-col items-center gap-4">
                    <p>No boost history found</p>
                    <Button 
                      variant="outline"
                      onClick={() => setActiveTab('boost')}
                      className="flex items-center gap-2"
                    >
                      <Zap className="h-4 w-4" />
                      <span>Get Your First Boost</span>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                About Pulse Boost
              </CardTitle>
              <CardDescription>
                How the UberEscorts visibility system works
              </CardDescription>
            </div>
            <Settings className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Pulse Boost is UberEscorts' visibility enhancement system powered by the UBX token economy. 
              When you boost your profile, the Oxum algorithm increases your visibility to potential clients
              in search results and featured sections.
            </p>
            <p className="text-sm text-muted-foreground">
              Boost effectiveness is calculated through Hermes flow dynamics and adapts to the platform's
              current user activity levels and your profile's engagement metrics.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Higher Visibility</h4>
                <p className="text-sm text-muted-foreground">
                  Appear more frequently in search results and featured sections
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">More Interactions</h4>
                <p className="text-sm text-muted-foreground">
                  Receive more profile views, messages, and booking requests
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Smart Timing</h4>
                <p className="text-sm text-muted-foreground">
                  Boosts are optimized for peak activity times via Hermes system
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default PulseBoostPage;
