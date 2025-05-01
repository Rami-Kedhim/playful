
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, Fingerprint, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

// Features to display on the homepage
const features = [
  {
    icon: Shield,
    title: 'Secure & Verified',
    description: 'All profiles are verified with our advanced Orus Security System for your safety and peace of mind.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10'
  },
  {
    icon: Users,
    title: 'Unified Personas',
    description: 'Access real escorts, content creators, live cam performers, and AI companions all in one platform.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10'
  },
  {
    icon: Fingerprint,
    title: 'Privacy Protected',
    description: 'Your identity and activity are fully protected with our advanced encryption and privacy controls.',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10'
  },
  {
    icon: Zap,
    title: 'UBX Token Economy',
    description: 'Use UBX tokens for secure payments, boosts, and exclusive access throughout the ecosystem.',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10'
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">The UberPersona Multiverse</h2>
          <p className="text-xl text-muted-foreground">
            Experience our revolutionary platform unifying human escorts, creators, AI companions, and live performers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-md">
              <CardHeader className="pb-2">
                <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center mb-4', feature.bgColor)}>
                  <feature.icon className={cn('h-6 w-6', feature.color)} />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
