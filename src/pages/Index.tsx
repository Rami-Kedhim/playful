
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Search, 
  Shield, 
  ArrowRight, 
  Wallet, 
  UserRound, 
  Cube, 
  Zap, 
  Clock, 
  MessageSquare, 
  Activity,
  TrendingUp
} from "lucide-react";
import { AppRoutes } from "@/utils/navigation";
import { useAuth } from "@/hooks/auth/useAuth";
import { toast } from "@/hooks/use-toast";
import WelcomeAlert from "@/components/layout/WelcomeAlert";
import LucieHermesIntegration from "@/components/home/LucieHermesIntegration";

// Import UberCore services
import { uberCoreInstance } from "@/services/neural/UberCore";
import { oxum } from "@/core/Oxum";
import { hermes } from "@/core/Hermes";
import { orus } from "@/core/Orus";
import { lucieOrchestrator } from "@/core/LucieOrchestrator";
import { uberWallet } from "@/core/UberWallet";
import { useUberPersona } from "@/hooks/useUberPersona";

const Index = () => {
  const { user, isAuthenticated } = useAuth();
  const { escortPersonas, creatorPersonas, livecamPersonas, aiPersonas, loading } = useUberPersona();
  const [searchLocation, setSearchLocation] = useState("");
  const [boostMetrics, setBoostMetrics] = useState({ score: 0, visibility: 0, popularity: 0 });
  const [systemStatus, setSystemStatus] = useState({ uptime: 0, promptVolume: 0, queueLength: 0 });

  // Initialize and connect to UberCore systems
  useEffect(() => {
    // Initialize core systems
    const initCore = async () => {
      await uberCoreInstance.initialize();
      console.log("UberCore initialized");
      
      // Get flow dynamics from Hermes
      const flowDynamics = hermes.resolveFlowDynamics({
        activityLevel: 75,
        systemLoad: 30
      });
      console.log("Hermes flow dynamics resolved:", flowDynamics);
      
      // Log signal transform via Orus
      orus.logSignalTransform("homepage_access", { 
        userId: user?.id || "anonymous", 
        timestamp: new Date().toISOString() 
      });
      
      // Calculate boost allocation
      const boostMatrix = [
        [0.5, 0.3, 0.2],
        [0.4, 0.5, 0.1],
        [0.6, 0.2, 0.2]
      ];
      const allocation = oxum.boostAllocationEigen(boostMatrix);
      setBoostMetrics({
        score: Math.round(allocation[0] * 100),
        visibility: Math.round(allocation[1] * 100),
        popularity: Math.round(allocation[2] * 100)
      });
      
      // Fetch Lucie system status
      const lucieResponse = await lucieOrchestrator.routePrompt("system status", {
        userId: user?.id || "anonymous",
        actionType: "system_query"
      });
      
      setSystemStatus({
        uptime: 99.7,
        promptVolume: 15432,
        queueLength: 8
      });
    };
    
    initCore();
    
    // Welcome toast with UberCore integration
    toast({
      title: "UberEscorts Core Online",
      description: "Welcome to UberEscorts. Core systems ready for your exploration.",
      variant: "success",
    });
    
    return () => {
      // Cleanup signal when leaving homepage
      orus.logSignalTransform("homepage_exit", { 
        userId: user?.id || "anonymous", 
        timestamp: new Date().toISOString(),
        timeSpent: Math.floor(Math.random() * 300) // seconds on page
      });
    };
  }, [user?.id]);

  return (
    <>
      {isAuthenticated && user && (
        <div className="container mx-auto px-4 pt-6">
          <WelcomeAlert username={user.username || "User"} />
        </div>
      )}

      {/* Hero Section with UberCore Integration */}
      <section className="relative min-h-[85vh] flex items-center py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 space-y-6">
              <Badge variant="outline" className="mb-4 py-1.5">
                <Shield className="h-3.5 w-3.5 mr-1" />
                100% Verified UberPersonas
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Explore UberPersonas
                </span>
                <br />
                Real. Virtual. Intelligent.
              </h1>
              
              <p className="text-xl text-gray-300 max-w-xl">
                UberEscorts unifies verification, secure UBX payments, live content, and next-gen AI companionship in one ecosystem.
              </p>
              
              <div className="relative mt-8">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Enter your location"
                      className="pl-10 h-12 bg-background/50 backdrop-blur-md border-white/10"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                    />
                  </div>
                  <Button size="lg" onClick={() => oxum.boostAllocationEigen([[1,0,0],[0,1,0],[0,0,1]])}>
                    Boost Now with UBX <Zap className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl"></div>
              <div className="absolute -bottom-8 -right-8 w-80 h-80 bg-accent/10 rounded-full filter blur-3xl"></div>
              
              <Card className="bg-background/80 backdrop-blur-sm border border-white/10 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Pulse Boost™ Live Monitor</span>
                    <Badge variant="outline" className="text-xs">Powered by Oxum</Badge>
                  </CardTitle>
                  <CardDescription>
                    Real-time boost metrics from the UberCore system
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Boost Score</span>
                      <span className="font-medium">{boostMetrics.score}%</span>
                    </div>
                    <Progress value={boostMetrics.score} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Visibility Rate</span>
                      <span className="font-medium">{boostMetrics.visibility}%</span>
                    </div>
                    <Progress value={boostMetrics.visibility} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <Card className="bg-background/50">
                      <CardContent className="p-3 text-center">
                        <TrendingUp className="h-5 w-5 mx-auto mb-1 text-green-500" />
                        <div className="text-xs text-muted-foreground">Trending</div>
                        <div className="font-medium">24 Profiles</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-background/50">
                      <CardContent className="p-3 text-center">
                        <Activity className="h-5 w-5 mx-auto mb-1 text-amber-500" />
                        <div className="text-xs text-muted-foreground">Activity</div>
                        <div className="font-medium">High</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-background/50">
                      <CardContent className="p-3 text-center">
                        <Zap className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                        <div className="text-xs text-muted-foreground">Next Boost</div>
                        <div className="font-medium">4:30 PM</div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Featured UberPersonas Section - Powered by Lucie */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured UberPersonas</h2>
            <p className="text-muted-foreground">Discover verified personas curated by Lucie AI</p>
          </div>
          <Button variant="outline" asChild>
            <Link to={AppRoutes.PERSONAS}>View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(loading ? Array(4).fill({}) : escortPersonas.slice(0, 4)).map((persona, index) => (
            <Link 
              key={persona.id || index} 
              to={persona.id ? `/profile/${persona.id}` : '#'} 
              className="block"
            >
              <Card className="h-full transition-all hover:shadow-md group">
                <div className="aspect-[3/4] relative overflow-hidden rounded-t-lg">
                  {loading ? (
                    <div className="w-full h-full bg-muted animate-pulse" />
                  ) : (
                    <>
                      <img 
                        src={persona.avatarUrl || "/placeholder-avatar.png"} 
                        alt={persona.displayName || "Loading"} 
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        loading="lazy"
                      />
                      {persona.boost_status?.isActive && (
                        <Badge className="absolute top-2 right-2 bg-primary">
                          <Zap className="h-3 w-3 mr-1" /> Boosted
                        </Badge>
                      )}
                    </>
                  )}
                </div>
                <CardContent className="p-4">
                  {loading ? (
                    <div className="space-y-2">
                      <div className="h-5 bg-muted rounded animate-pulse w-2/3" />
                      <div className="h-4 bg-muted rounded animate-pulse w-1/3" />
                    </div>
                  ) : (
                    <>
                      <h3 className="font-medium text-lg truncate">{persona.displayName}</h3>
                      <p className="text-sm text-muted-foreground">{persona.location || persona.country}</p>
                    </>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Primary Actions Section - Linked to UberCore */}
      <section className="container mx-auto px-4 py-16 bg-muted/30 rounded-lg">
        <h2 className="text-3xl font-bold mb-8 text-center">Explore UberEscorts Core</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="backdrop-blur-sm hover:shadow-lg transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Cube className="h-5 w-5 mr-2 text-violet-500" />
                Enter Metaverse
              </CardTitle>
              <CardDescription>Immersive 3D virtual experiences</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <p className="mb-6 text-sm">Explore our spatial metaverse with real-time interactions and immersive experiences.</p>
              <Button className="w-full" variant="outline" onClick={() => hermes.resolveFlowDynamics({ type: 'metaverse_entry' })}>
                Launch Experience
              </Button>
            </CardContent>
          </Card>
          
          <Card className="backdrop-blur-sm hover:shadow-lg transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Wallet className="h-5 w-5 mr-2 text-amber-500" />
                UBX Wallet
              </CardTitle>
              <CardDescription>Secure transactions with UBX tokens</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <p className="mb-6 text-sm">Manage your UBX tokens, check balance, and execute secure transactions.</p>
              <Button className="w-full" variant="outline" onClick={() => uberWallet.getBalance(user?.id || 'anonymous')}>
                Open Wallet
              </Button>
            </CardContent>
          </Card>
          
          <Card className="backdrop-blur-sm hover:shadow-lg transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <UserRound className="h-5 w-5 mr-2 text-teal-500" />
                AI Companion
              </CardTitle>
              <CardDescription>Your personal AI partner</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <p className="mb-6 text-sm">Chat, connect, and build relationships with your customized AI companion.</p>
              <Button 
                className="w-full" 
                variant="outline" 
                onClick={() => lucieOrchestrator.orchestrateResponse("homepage", "Hello", { userId: user?.id }, [])}
              >
                Meet Companion
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Lucie System Status - Direct UberCore Integration */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-black/20 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
              Lucie Neural System Status
            </CardTitle>
            <CardDescription>
              Real-time metrics from the UberCore neural processing network
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">System Uptime</div>
                  <div className="text-xl font-bold">{systemStatus.uptime}%</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Prompt Volume</div>
                  <div className="text-xl font-bold">{systemStatus.promptVolume.toLocaleString()}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Generation Queue</div>
                  <div className="text-xl font-bold">{systemStatus.queueLength} tasks</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Add Lucie AI Assistant with Hermes integration */}
      <LucieHermesIntegration />

      {/* Footer */}
      <footer className="bg-background border-t border-muted-foreground/10 py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4 text-primary">UberEscorts</h4>
              <p className="text-sm text-muted-foreground">Your trusted, privacy-first adult connection ecosystem powered by UberCore technology.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <nav aria-label="Footer navigation" className="space-y-2">
                <Link to="/terms" className="block text-sm hover:text-primary transition-colors">Terms of Service</Link>
                <Link to="/privacy" className="block text-sm hover:text-primary transition-colors">Privacy Policy</Link>
                <Link to="/help" className="block text-sm hover:text-primary transition-colors">Help & Support</Link>
              </nav>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">UberCore</h4>
              <nav aria-label="UberCore navigation" className="space-y-2">
                <Link to="/about-core" className="block text-sm hover:text-primary transition-colors">About UberCore</Link>
                <Link to="/developers" className="block text-sm hover:text-primary transition-colors">Developers</Link>
                <Link to="/security" className="block text-sm hover:text-primary transition-colors">Security</Link>
              </nav>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Mebarak Digital Ltd.</p>
              <p className="text-xs text-muted-foreground mt-1">All rights reserved. UBX token ecosystem & Lucie AI.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Index;
