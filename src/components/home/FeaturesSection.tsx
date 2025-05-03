
import React from 'react';
import { Shield, Brain, Sparkles, Star } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Powerful Platform Features</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Experience the most advanced escort platform with revolutionary features designed for safety, convenience, and enhanced experiences.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {/* Feature 1 */}
        <div className="flex flex-col items-center text-center">
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Shield className="h-7 w-7 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Safety Verified</h3>
          <p className="text-muted-foreground">
            All profiles are thoroughly verified with advanced identity systems and regular safety checks.
          </p>
        </div>
        
        {/* Feature 2 */}
        <div className="flex flex-col items-center text-center">
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Brain className="h-7 w-7 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Neural Optimization</h3>
          <p className="text-muted-foreground">
            Our unique neural system optimizes visibility and matches for maximum satisfaction.
          </p>
        </div>
        
        {/* Feature 3 */}
        <div className="flex flex-col items-center text-center">
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Sparkles className="h-7 w-7 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Pulse Boost</h3>
          <p className="text-muted-foreground">
            Increase your profile visibility with our powerful UBX-powered boost system.
          </p>
        </div>
        
        {/* Feature 4 */}
        <div className="flex flex-col items-center text-center">
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Star className="h-7 w-7 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Premium Experiences</h3>
          <p className="text-muted-foreground">
            Access exclusive premium content and personalized services tailored to your preferences.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
