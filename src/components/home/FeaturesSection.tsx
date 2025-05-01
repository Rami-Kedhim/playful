
import React from 'react';
import { Shield, Star, User, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const FeaturesSection = () => {
  const features = [
    {
      title: "Verified Profiles",
      description: "Every profile is rigorously verified for authenticity and safety, ensuring your peace of mind.",
      icon: <Shield className="h-10 w-10 text-purple-500" />
    },
    {
      title: "Advanced Matching",
      description: "Our Oxum engine analyzes your preferences to find your perfect match with exceptional accuracy.",
      icon: <User className="h-10 w-10 text-purple-500" />
    },
    {
      title: "UBX Token Economy",
      description: "Secure transactions and premium features powered by our proprietary UBX token system.",
      icon: <div className="h-10 w-10 text-purple-500 font-bold text-xl flex items-center justify-center">UBX</div>
    },
    {
      title: "Secure Messaging",
      description: "End-to-end encrypted communication ensures your conversations remain private and secure.",
      icon: <MessageSquare className="h-10 w-10 text-purple-500" />
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose UberEscorts</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform combines cutting-edge technology with premium service to provide an unparalleled experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-gray-800/50 bg-gray-900/30">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-5 p-3 bg-gray-800/50 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 p-8 rounded-lg bg-gradient-to-r from-purple-900/30 to-gray-900/30 border border-purple-500/20">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-6">
              <div className="flex items-center mb-2">
                <Star className="text-yellow-500 h-5 w-5 mr-1" />
                <Star className="text-yellow-500 h-5 w-5 mr-1" />
                <Star className="text-yellow-500 h-5 w-5 mr-1" />
                <Star className="text-yellow-500 h-5 w-5 mr-1" />
                <Star className="text-yellow-500 h-5 w-5" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Ultra-Premium Experience</h3>
              <p className="text-muted-foreground">
                Our PULSE system ensures top profiles receive the visibility they deserve, 
                while our users enjoy the highest quality companions.
              </p>
            </div>
            <div className="bg-black/40 p-6 rounded-lg border border-purple-500/20">
              <div className="text-purple-400 font-bold mb-1">Members satisfaction</div>
              <div className="text-4xl font-bold mb-2">98.7%</div>
              <div className="text-sm text-muted-foreground">Based on 10,000+ reviews</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
