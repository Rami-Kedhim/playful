
import React from 'react';
import { Link } from 'react-router-dom';
import { UnifiedLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, Sparkles } from 'lucide-react';

const HomePage = () => {
  return (
    <UnifiedLayout hideNavbar fullWidth className="px-0">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-background/80 pt-16 pb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500">
            UberEscorts Platform
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Advanced AI-powered companion and escort services with neural processing technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/escorts">
                Browse Escorts <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/ai-companions">
                AI Companions <Sparkles className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-3">Escort Services</h3>
              <p className="text-muted-foreground mb-4">
                Browse and connect with professional escorts verified by our system.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/escorts">Explore Services</Link>
              </Button>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-3">AI Companions</h3>
              <p className="text-muted-foreground mb-4">
                Intelligent AI companions powered by our advanced neural systems.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/ai-companions">Meet Companions</Link>
              </Button>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-3">Metaverse Experience</h3>
              <p className="text-muted-foreground mb-4">
                Immersive experiences in our virtual metaverse environments.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/metaverse">Enter Metaverse</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Neural System Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block mb-4">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto">
              <Brain className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4">UberCore Neural System</h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">
            Our platform is powered by the advanced UberCore neural system, providing intelligent matching, personalized experiences, and robust security.
          </p>
          <Button asChild variant="outline">
            <Link to="/brain-hub">
              <Brain className="mr-2 h-4 w-4" />
              Explore Brain Hub
            </Link>
          </Button>
        </div>
      </section>
    </UnifiedLayout>
  );
};

export default HomePage;
