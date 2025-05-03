
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeroSectionProps {
  searchLocation: string;
  setSearchLocation: (location: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ searchLocation, setSearchLocation }) => {
  return (
    <section className="bg-gradient-to-br from-primary/5 to-primary/10 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Find Your Perfect Match in Minutes
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Browse through thousands of verified escorts, companions, and AI personalities.
            Connect securely with ease.
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
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Find Escorts
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
  );
};

export default HeroSection;
