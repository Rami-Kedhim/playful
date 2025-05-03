
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Star, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { oxum } from '@/core/Oxum';

interface HeroProps {
  searchLocation: string;
  setSearchLocation: (location: string) => void;
}

const HeroSection = ({ searchLocation, setSearchLocation }: HeroProps) => {
  const navigate = useNavigate();

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?location=${encodeURIComponent(searchLocation)}`);
  }, [navigate, searchLocation]);
  
  const handleBoostClick = useCallback(() => {
    // Call Oxum's boostAllocationEigen
    const mockAdjacencyMatrix = [
      [0, 1, 1, 0],
      [1, 0, 1, 1],
      [1, 1, 0, 1],
      [0, 1, 1, 0]
    ];
    
    try {
      const boostScores = oxum.boostAllocationEigen(mockAdjacencyMatrix);
      console.log('Boost scores calculated:', boostScores);
      navigate('/pulse-boost');
    } catch (error) {
      console.error('Error calculating boost scores:', error);
    }
  }, [navigate]);

  const handleLocationChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchLocation(e.target.value);
  }, [setSearchLocation]);

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900/90 to-gray-900">
      <div className="absolute inset-0 bg-[url('https://source.unsplash.com/random/1920x1080/?cityscape,night')] opacity-20 bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background/70"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-purple-500/10 text-purple-300 text-sm font-medium">
            Powered by UberCore™ Neural Ecosystem
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Digital • Personal • Intelligent — <span className="text-purple-300">Premium Connections</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            An innovative platform connecting you with verified professionals and digital companions 
            in a secure environment, enhanced by our advanced UBX blockchain technology.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <form onSubmit={handleSearch} className="flex-grow flex flex-col md:flex-row gap-4 w-full">
              <div className="relative flex-grow">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Enter your location..."
                  className="pl-10 py-6 bg-background/80 backdrop-blur-sm border-gray-700"
                  value={searchLocation}
                  onChange={handleLocationChange}
                />
              </div>
              <Button type="submit" size="lg" className="bg-purple-600 hover:bg-purple-700">
                <Search className="mr-2 h-5 w-5" /> Find Companions
              </Button>
            </form>
            
            <Button 
              size="lg" 
              onClick={handleBoostClick}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Star className="mr-2 h-5 w-5" /> Live Boost
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-8">
            <div className="flex flex-col items-center">
              <div className="bg-purple-500/10 p-3 rounded-full mb-3">
                <Shield className="h-7 w-7 text-purple-400" />
              </div>
              <h3 className="text-lg font-medium text-white">Verified Profiles</h3>
              <p className="text-gray-400">All profiles undergo rigorous verification</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-purple-500/10 p-3 rounded-full mb-3">
                <Star className="h-7 w-7 text-purple-400" />
              </div>
              <h3 className="text-lg font-medium text-white">Premium Experience</h3>
              <p className="text-gray-400">Curated selection of elite companions</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-purple-500/10 p-3 rounded-full mb-3">
                <div className="h-7 w-7 text-purple-400 font-bold flex items-center justify-center">UBX</div>
              </div>
              <h3 className="text-lg font-medium text-white">Token Economy</h3>
              <p className="text-gray-400">Secure payments with UBX blockchain</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
