
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, MessageSquare, Shield, Brain, Wallet, Video, User, Heart } from 'lucide-react';
import { AppPaths } from '@/routes/routeConfig';
import { useAuth } from '@/hooks/auth';

const HomePage = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const { isAuthenticated } = useAuth();
  
  const features = [
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Verified Connections",
      description: "All profiles are verified using our proprietary Orus system, ensuring safety and authenticity."
    },
    {
      icon: <Wallet className="h-10 w-10 text-primary" />,
      title: "0% Platform Fee",
      description: "Unlike other platforms, we take no commission. All payments go directly to escorts and creators."
    },
    {
      icon: <Brain className="h-10 w-10 text-primary" />,
      title: "Oxum Algorithm",
      description: "Our dynamic ranking system ensures visibility is earned or boosted with UBX tokens."
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: "Secure Messaging",
      description: "End-to-end encrypted communications between verified users for complete privacy."
    }
  ];
  
  const categories = [
    {
      title: "Escorts",
      icon: <User className="h-6 w-6" />,
      path: AppPaths.ESCORTS,
      description: "Find verified in-person companions"
    },
    {
      title: "Creators",
      icon: <Heart className="h-6 w-6" />,
      path: AppPaths.CREATORS,
      description: "Premium content creators and models"
    },
    {
      title: "LiveCams",
      icon: <Video className="h-6 w-6" />,
      path: AppPaths.LIVECAMS,
      description: "Live interactive streaming experiences"
    },
    {
      title: "AI Companions",
      icon: <Brain className="h-6 w-6" />,
      path: AppPaths.AI_COMPANION,
      description: "Intelligent virtual companionship"
    }
  ];
  
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-primary/10 py-16 md:py-24 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Premium Connections, Zero Commission
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              UberEscorts revolutionizes adult services with verified profiles, secure transactions, 
              and zero platform fees. Powered by the Oxum algorithm and UBX token.
            </p>
            
            <div className="bg-card shadow-lg rounded-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow relative">
                  <Search className="absolute left-3 top-3 text-muted-foreground" />
                  <Input 
                    type="text"
                    className="w-full pl-10 py-6"
                    placeholder="Enter location, city or postal code..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                </div>
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90"
                  asChild
                >
                  <Link to={AppPaths.ESCORTS}>Find Escorts</Link>
                </Button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="outline" size="sm">New York</Button>
                <Button variant="outline" size="sm">Los Angeles</Button>
                <Button variant="outline" size="sm">Chicago</Button>
                <Button variant="outline" size="sm">Miami</Button>
                <Button variant="outline" size="sm">Las Vegas</Button>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>5,000+ verified escorts available • 100% secure booking</p>
              <p className="mt-1">Neural matching system for personalized recommendations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Browse Categories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <Link to={category.path}>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                    <p className="text-muted-foreground">{category.description}</p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose UberEscorts</h2>
            <p className="text-muted-foreground">
              Our platform offers unique features designed to create a safer, more efficient,
              and more profitable experience for everyone.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary/5 border-t">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of verified users enjoying private, secure, and commission-free connections.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated && (
              <>
                <Button size="lg" asChild>
                  <Link to="/auth?tab=register">Create an Account</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/auth?tab=login">Sign In</Link>
                </Button>
              </>
            )}
            {isAuthenticated && (
              <>
                <Button size="lg" asChild>
                  <Link to={AppPaths.ESCORTS}>Browse Escorts</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to={AppPaths.WALLET}>My Wallet</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
