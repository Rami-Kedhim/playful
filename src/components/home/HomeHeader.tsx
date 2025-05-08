
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HomeHeaderProps {
  onExploreClick?: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ onExploreClick }) => {
  return (
    <header className="bg-gradient-to-br from-black to-zinc-800 text-white">
      <div className="container mx-auto px-4 py-24 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="text-primary">Premium</span> Escort Services
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-10">
          Discover verified professional escorts, premium content creators, and immersive AI companions
        </p>
        
        <div className="w-full max-w-md mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="Search by location or service..." 
              className="pl-10 h-12 bg-black/40 border-gray-700 focus:border-primary text-white placeholder:text-gray-400"
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg" onClick={onExploreClick}>
            Explore Now
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent hover:bg-white/10 text-white border-white hover:text-white">
            Sign Up Free
          </Button>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
