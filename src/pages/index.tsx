
import React from 'react';
import { UnifiedLayout } from '@/layouts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { UnifiedRoutes } from '@/routes/unifiedRoutes';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <UnifiedLayout title="Welcome to UberEscorts" hideHeader={false} fullWidth={false}>
      <div className="py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">UberEscorts Ecosystem</h1>
            <p className="text-lg text-muted-foreground">
              Your premium platform for escorts, creators, and AI companions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Escorts Card */}
            <Card className="hover:shadow-md transition-shadow cursor-pointer" 
                  onClick={() => navigate(UnifiedRoutes.escorts.base)}>
              <CardHeader>
                <CardTitle>Escorts</CardTitle>
                <CardDescription>Discover verified escorts</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  Browse our curated selection of premium escorts, 
                  verified for your safety and satisfaction.
                </p>
                <Button variant="outline" className="w-full">
                  Browse Escorts
                </Button>
              </CardContent>
            </Card>
            
            {/* Creators Card */}
            <Card className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(UnifiedRoutes.creators.base)}>
              <CardHeader>
                <CardTitle>Creators</CardTitle>
                <CardDescription>Exclusive content creators</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  Subscribe to premium creators who share exclusive content and experiences.
                </p>
                <Button variant="outline" className="w-full">
                  View Creators
                </Button>
              </CardContent>
            </Card>
            
            {/* AI Companions Card */}
            <Card className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate('/ai-companions')}>
              <CardHeader>
                <CardTitle>AI Companions</CardTitle>
                <CardDescription>Virtual companions powered by AI</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  Experience our cutting-edge AI companions with unique personalities.
                </p>
                <Button variant="outline" className="w-full">
                  Meet AI Companions
                </Button>
              </CardContent>
            </Card>
            
            {/* Metaverse Card */}
            <Card className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(UnifiedRoutes.lucie.base)}>
              <CardHeader>
                <CardTitle>Lucie AI</CardTitle>
                <CardDescription>Your personal AI assistant</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  Talk to Lucie, an advanced AI designed to enhance your UberEscorts experience.
                </p>
                <Button variant="outline" className="w-full">
                  Chat with Lucie
                </Button>
              </CardContent>
            </Card>
            
            {/* Wallet Card */}
            <Card className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(UnifiedRoutes.wallet.base)}>
              <CardHeader>
                <CardTitle>UBX Wallet</CardTitle>
                <CardDescription>Manage your tokens</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  Purchase and manage UBX tokens for transactions on our platform.
                </p>
                <Button variant="outline" className="w-full">
                  Open Wallet
                </Button>
              </CardContent>
            </Card>
            
            {/* Neural Hub Card */}
            <Card className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate('/brain-hub')}>
              <CardHeader>
                <CardTitle>Brain Hub</CardTitle>
                <CardDescription>Neural ecosystem insights</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  Dive into the UberEscorts neural network and ecosystem analytics.
                </p>
                <Button variant="outline" className="w-full">
                  Explore Brain Hub
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </UnifiedLayout>
  );
};

export default HomePage;
