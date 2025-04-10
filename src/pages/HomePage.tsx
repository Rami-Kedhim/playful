
import React from 'react';
import { AIController } from '@/components/ai';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useHermesInsights } from '@/hooks/useHermesInsights';
import { useAuth } from '@/hooks/auth';
import { Brain, Users, Video, MessageSquare, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import LucieHermesIntegration from '@/components/home/LucieHermesIntegration';

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const { insights } = useHermesInsights(user?.id);
  
  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main AI-driven features section */}
        <div className="lg:col-span-2 space-y-6">
          <section className="space-y-4">
            <h1 className="text-3xl font-bold flex items-center">
              <Brain className="mr-2 h-7 w-7 text-primary" />
              AI-Powered Experiences
            </h1>
            
            <p className="text-muted-foreground">
              Discover personalized connections and enhanced interactions powered by our advanced neural networks.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* AI Companions */}
              <Card className="bg-gradient-to-br from-primary/5 to-background border border-primary/20 shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex flex-col h-full space-y-4">
                    <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    
                    <h3 className="text-xl font-medium">AI Companions</h3>
                    
                    <p className="text-sm text-muted-foreground flex-grow">
                      Chat with intelligent virtual companions trained to provide engaging conversation and company.
                    </p>
                    
                    <Button asChild variant="default" size="sm" className="w-full">
                      <Link to="/ai-companions">
                        Explore Companions
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Livecams */}
              <Card className="bg-gradient-to-br from-blue-500/5 to-background border border-blue-500/20 shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex flex-col h-full space-y-4">
                    <div className="rounded-full bg-blue-500/10 w-12 h-12 flex items-center justify-center">
                      <Video className="h-6 w-6 text-blue-500" />
                    </div>
                    
                    <h3 className="text-xl font-medium">Livecams</h3>
                    
                    <p className="text-sm text-muted-foreground flex-grow">
                      Interactive live video sessions with smart content suggestions and seamless integrations.
                    </p>
                    
                    <Button asChild variant="outline" size="sm" className="w-full border-blue-500/20 text-blue-500">
                      <Link to="/livecams">
                        Explore Livecams
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Real Escorts */}
              <Card className="bg-gradient-to-br from-purple-500/5 to-background border border-purple-500/20 shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex flex-col h-full space-y-4">
                    <div className="rounded-full bg-purple-500/10 w-12 h-12 flex items-center justify-center">
                      <Users className="h-6 w-6 text-purple-500" />
                    </div>
                    
                    <h3 className="text-xl font-medium">Intelligent Matching</h3>
                    
                    <p className="text-sm text-muted-foreground flex-grow">
                      Our HERMES+Oxum AI system connects you with the perfect companions based on your preferences.
                    </p>
                    
                    <Button asChild variant="outline" size="sm" className="w-full border-purple-500/20 text-purple-500">
                      <Link to="/escorts">
                        Find Your Match
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Boost System */}
              <Card className="bg-gradient-to-br from-amber-500/5 to-background border border-amber-500/20 shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex flex-col h-full space-y-4">
                    <div className="rounded-full bg-amber-500/10 w-12 h-12 flex items-center justify-center">
                      <Rocket className="h-6 w-6 text-amber-500" />
                    </div>
                    
                    <h3 className="text-xl font-medium">Boost Your Profile</h3>
                    
                    <p className="text-sm text-muted-foreground flex-grow">
                      Stand out with our AI-optimized boost system that increases your visibility at just the right times.
                    </p>
                    
                    <Button asChild variant="outline" size="sm" className="w-full border-amber-500/20 text-amber-500">
                      <Link to="/boost">
                        Get Featured
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* AI-powered recommendations */}
          {user && insights.recommendedProfileId && (
            <section className="pt-4">
              <h2 className="text-xl font-semibold mb-4">Recommended For You</h2>
              {/* Recommendation components would go here */}
            </section>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <AIController userId={user?.id} />
          
          {/* Add more AI-related sidebar components here */}
        </div>
      </div>
      
      {/* Lucie AI Assistant */}
      <LucieHermesIntegration forceVisible={false} />
    </div>
  );
};

export default HomePage;
