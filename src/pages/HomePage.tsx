
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Shield, Brain, Users, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/auth';
import { AppPaths } from '@/routes/routeConfig.ts';

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleExploreClick = useCallback(() => {
    navigate(AppPaths.ESCORTS);
  }, [navigate]);

  const handleExploreAI = useCallback(() => {
    navigate(AppPaths.AI_COMPANION);
  }, [navigate]);
  
  const handleExploreBrainHub = useCallback(() => {
    navigate(AppPaths.BRAIN_HUB);
  }, [navigate]);

  const handleSafetyClick = useCallback(() => {
    navigate(AppPaths.SAFETY);
  }, [navigate]);

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
        
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-primary font-medium">Secure • Verified • Private</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight text-white">
              Premium Web3 Platform <br />
              <span className="text-primary">For Modern Connections</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
              A secure and trustworthy platform connecting people with verified professionals
              through advanced technology and AI-powered matching.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input 
                  type="text"
                  placeholder="Search services, locations, or profiles..."
                  className="pl-10 py-6"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90"
                onClick={handleExploreClick}
              >
                Explore Now
              </Button>
            </div>
            
            <div className="flex items-center gap-6">
              {/* Stats */}
              <div className="flex gap-8">
                <div>
                  <p className="text-3xl font-bold text-white">10K+</p>
                  <p className="text-sm text-gray-400">Verified Profiles</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">98%</p>
                  <p className="text-sm text-gray-400">Satisfaction Rate</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">24/7</p>
                  <p className="text-sm text-gray-400">Support Available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Platform Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Verified Connections</h3>
                <p className="text-muted-foreground">Connect with verified professionals who have passed our strict verification process.</p>
              </CardContent>
            </Card>

            <Card className="bg-card hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Brain className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Neural Matching</h3>
                <p className="text-muted-foreground">Our advanced AI technology ensures the perfect match based on your preferences.</p>
              </CardContent>
            </Card>

            <Card className="bg-card hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Shield className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Safety Features</h3>
                <p className="text-muted-foreground">Advanced security features including route sharing and panic alerts for ultimate safety.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who have found their perfect match on our platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={handleExploreClick} size="lg">
              Find Profiles <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={handleExploreAI} size="lg">
              Try AI Companions <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={handleSafetyClick} size="lg">
              Safety Features <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
