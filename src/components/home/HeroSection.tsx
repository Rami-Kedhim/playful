
import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Search, Shield, Wallet, Users, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface HeroSectionProps {
  searchLocation: string;
  setSearchLocation: (value: string) => void;
}

const HeroSection = ({ searchLocation, setSearchLocation }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[85vh] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background z-10"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1499689496495-5bdf4421b725?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-15"></div>
      
      <div className="container mx-auto px-4 relative z-20 mt-10">
        <div className="max-w-3xl mx-auto">
          <Badge variant="outline" className="mb-4 py-1 px-3 border-primary/50 text-primary animate-pulse">
            <Zap size={14} className="mr-1" /> Web3 Powered Adult Platform
          </Badge>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-glow">
            <span className="bg-gradient-to-r from-primary via-lucoin to-accent bg-clip-text text-transparent">
              Secure. Verified. Private.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
            UberEscorts connects verified escorts, content creators and clients through our secure blockchain platform, with advanced verification, privacy protection, and Lucoin integration.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <Button asChild size="lg" className="group">
              <Link to="/escorts">
                Explore Escorts
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/auth">Join Now</Link>
            </Button>
          </div>
          
          <Card className="p-4 max-w-2xl mx-auto bg-card/50 backdrop-blur-md border-white/10">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-grow">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    type="text"
                    placeholder="Enter your location"
                    className="pl-10 bg-background/50"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                </div>
                <Button className="gap-2 bg-primary hover:bg-primary/90">
                  <Search size={18} />
                  Find Nearby
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-center items-center gap-6 mt-10 text-sm text-gray-400">
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-1 text-primary" />
              <span>100% Verified</span>
            </div>
            <div className="flex items-center">
              <Wallet className="h-4 w-4 mr-1 text-lucoin" />
              <span>Lucoin Powered</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1 text-accent" />
              <span>10K+ Users</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
