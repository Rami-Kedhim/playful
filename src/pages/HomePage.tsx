
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Shield, Star, Users, ChevronRight, Calendar, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import HomeHeader from '@/components/home/HomeHeader';
import ActionGrid from '@/components/home/ActionGrid';
import CtaSection from '@/components/home/CtaSection';
import HomeFeaturedEscorts from '@/components/home/FeaturedEscorts';
import FeaturedCreators from '@/components/home/FeaturedCreators';
import AICompanionsShowcase from '@/components/home/AICompanionsShowcase';
import { AppPaths } from '@/routes/routeConfig';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState('');
  
  const handleExploreClick = () => {
    navigate(AppPaths.ESCORT_SEARCH);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <HomeHeader onExploreClick={handleExploreClick} />
      
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4">
          {/* Stats */}
          <div className="py-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard 
              icon={<Users className="h-6 w-6 text-blue-500" />} 
              value="10,000+" 
              label="Verified Profiles"
            />
            <StatCard 
              icon={<Star className="h-6 w-6 text-amber-500" />} 
              value="4.8/5" 
              label="Satisfaction Rate"
            />
            <StatCard 
              icon={<Calendar className="h-6 w-6 text-green-500" />} 
              value="1,250+" 
              label="New Profiles Weekly"
            />
            <StatCard 
              icon={<Shield className="h-6 w-6 text-purple-500" />} 
              value="100%" 
              label="Secure Payments"
            />
          </div>
          
          {/* Featured Tabs */}
          <div className="py-8">
            <Tabs defaultValue="escorts" className="w-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">Featured Profiles</h2>
                <TabsList className="grid grid-cols-3 w-auto">
                  <TabsTrigger value="escorts">Escorts</TabsTrigger>
                  <TabsTrigger value="creators">Creators</TabsTrigger>
                  <TabsTrigger value="ai">AI Companions</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="escorts" className="mt-0">
                <HomeFeaturedEscorts />
              </TabsContent>
              
              <TabsContent value="creators" className="mt-0">
                <FeaturedCreators />
              </TabsContent>
              
              <TabsContent value="ai" className="mt-0">
                <AICompanionsShowcase />
              </TabsContent>
            </Tabs>
          </div>
          
          <ActionGrid />
          
          {/* Premium Features */}
          <section className="py-12">
            <h2 className="text-3xl font-bold mb-8">Premium Features</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Zap className="h-10 w-10 text-primary" />}
                title="Pulse Boost™"
                description="Get featured at the top of search results and increase your visibility by up to 500%"
                action={() => navigate(AppPaths.PULSE_BOOST)}
              />
              <FeatureCard 
                icon={<Shield className="h-10 w-10 text-blue-500" />}
                title="Verified Profiles"
                description="All profiles undergo our strict verification process for your safety"
                action={() => navigate("/verification")}
              />
              <FeatureCard 
                icon={<Heart className="h-10 w-10 text-red-500" />}
                title="Personalized Matching"
                description="Our AI technology finds your perfect matches based on preferences"
                action={() => navigate("/matching")}
              />
            </div>
          </section>
          
          {/* AI Features */}
          <section className="py-12 bg-gradient-to-br from-zinc-900/50 to-zinc-800/30 rounded-3xl p-8 mb-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium text-primary">UberEscorts Neural Hub</h3>
              </div>
              
              <h2 className="text-3xl font-bold">Powered by Advanced AI</h2>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Our ecosystem leverages cutting-edge AI technology to enhance your experience and provide intelligent matching, content moderation, and personalized recommendations.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <AIFeatureCard 
                  title="Lucie AI Assistant"
                  description="24/7 intelligent support and personalized recommendations"
                  path="/lucie"
                />
                <AIFeatureCard 
                  title="Oxum Neural Network"
                  description="Advanced matching algorithm for perfect compatibility"
                  path="/oxum"
                />
                <AIFeatureCard 
                  title="Hermes SEO"
                  description="Boost your profile visibility with neural optimization"
                  path="/hermes"
                />
              </div>
            </div>
          </section>
        </div>
        
        <CtaSection />
      </main>
    </div>
  );
};

// Helper Components
const StatCard = ({ icon, value, label }) => (
  <div className="flex items-center gap-4 bg-card p-4 rounded-lg border border-border">
    <div className="bg-background p-3 rounded-full">
      {icon}
    </div>
    <div>
      <h3 className="text-xl font-bold">{value}</h3>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  </div>
);

const FeatureCard = ({ icon, title, description, action }) => (
  <Card className="h-full border border-border hover:border-primary/50 transition-all">
    <CardContent className="pt-6 flex flex-col h-full">
      <div className="bg-primary/10 p-4 rounded-full w-fit mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 flex-grow">{description}</p>
      <Button onClick={action} variant="outline" className="w-full justify-between">
        Learn More <ChevronRight className="h-4 w-4" />
      </Button>
    </CardContent>
  </Card>
);

const AIFeatureCard = ({ title, description, path }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className="bg-card/50 backdrop-blur border border-border/50 rounded-xl p-6 hover:border-primary/30 hover:bg-card/80 transition-all cursor-pointer"
      onClick={() => navigate(path)}
    >
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="flex items-center text-primary text-sm font-medium">
        <span>Explore</span> <ChevronRight className="h-4 w-4 ml-1" />
      </div>
    </div>
  );
};

export default HomePage;
