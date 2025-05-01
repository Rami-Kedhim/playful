
import { useState } from "react";
import { Search, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  searchLocation: string;
  setSearchLocation: (location: string) => void;
}

const HeroSection = ({ searchLocation, setSearchLocation }: HeroSectionProps) => {
  const [showLucie, setShowLucie] = useState(false);

  return (
    <section className="relative min-h-[85vh] flex items-center py-20 overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black opacity-90"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-purple-600/10 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-pink-600/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 space-y-6">
            <Badge variant="outline" className="mb-4 py-1.5 backdrop-blur-md bg-white/5 border-white/10">
              <Shield className="h-3.5 w-3.5 mr-1" />
              Real • Virtual • Intelligent
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Explore UberPersona
              </span>
              <br />
              <span className="text-white">Multiverse</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-xl">
              UberEscorts unifies verification, secure payments with UBX tokens, live content, and GPS safety in one powerful ecosystem.
            </p>
            
            <div className="relative mt-8">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter your location"
                    className="pl-10 h-12 bg-white/5 backdrop-blur-md border-white/10"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                </div>
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 border-none hover:opacity-90" asChild>
                  <Link to="/personas">
                    Browse UberPersonas <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-6 mt-8">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 flex items-center justify-center">
                    <span className="text-xs">{num}K+</span>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm text-gray-400">Joined our verified network this month</p>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-8 -right-8 w-80 h-80 bg-pink-500/10 rounded-full filter blur-3xl"></div>
            
            <div className="relative backdrop-blur-lg bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl">
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-3 py-1 rounded-full">
                AI Assistant
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center">
                  <span className="text-xl">L</span>
                </div>
                <div>
                  <h3 className="font-medium">Lucie</h3>
                  <p className="text-xs text-gray-400">Your personal guide</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4">
                Hello, I'm Lucie! I can help you navigate UberEscorts safely and efficiently. Would you like me to assist you today?
              </p>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10" onClick={() => setShowLucie(true)}>
                  Chat with Lucie
                </Button>
                <Button size="sm" variant="secondary" className="bg-white/10 hover:bg-white/20">
                  Learn about UBX Token
                </Button>
              </div>
              
              {showLucie && (
                <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-sm text-gray-300">
                    I can help you verify your profile, show you how to use UBX tokens, or explain our security features. What would you like to know?
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
