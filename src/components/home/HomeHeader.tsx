
import React from 'react';
import { Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HomeHeaderProps {
  onExploreClick?: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ onExploreClick }) => {
  return (
    <header className="relative py-12 md:py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-background to-background -z-10"></div>
      
      {/* Glowing orb effects */}
      <div className="absolute top-20 -left-20 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-fuchsia-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="outline" className="mb-6 py-1.5 border-white/10">
            <Shield className="h-3.5 w-3.5 mr-1.5 text-primary" />
            Experience The UberPersona Ecosystem
          </Badge>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-500">
              Unified Platform for Virtual and Real Personas
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore the integrated ecosystem of profiles, virtual environments, and AI companions powered by 
            advanced neural networks and the Oxum boost system.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700"
              onClick={onExploreClick}
            >
              Start Exploring
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Learn About UberPersona
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
