
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Shield } from 'lucide-react';

interface HomeHeaderProps {
  onExploreClick: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ onExploreClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);
  
  return (
    <header className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
      
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-primary font-medium">Secure • Verified • Private</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Real • Virtual • Intelligent <br />
            <span className="text-primary">Explore UberPersona Multiverse</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
            The next generation platform unifying human escorts, creators, 
            AI companions, and live performers in one powerful ecosystem.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input 
                type="text"
                placeholder="Search personas, services, or locations..."
                className="pl-10 py-6"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90"
              onClick={onExploreClick} // Use the passed callback
            >
              Boost Now with UBX
            </Button>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Stats */}
            <div className="flex gap-8">
              <div>
                <p className="text-3xl font-bold">10K+</p>
                <p className="text-sm text-gray-400">Verified Personas</p>
              </div>
              <div>
                <p className="text-3xl font-bold">98%</p>
                <p className="text-sm text-gray-400">Satisfaction Rate</p>
              </div>
              <div>
                <p className="text-3xl font-bold">24/7</p>
                <p className="text-sm text-gray-400">System Integrity</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
