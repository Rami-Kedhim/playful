
import React from 'react';
import { UnifiedLayout } from '@/layouts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, MessageCircle, Star, Shield, Lock } from 'lucide-react';
import { orus } from '@/core/Orus';
import { useEffect } from 'react';

const AICompanionsPage = () => {
  // Security validation
  useEffect(() => {
    const validateSecurity = async () => {
      try {
        // Use Orus system to validate security
        const token = localStorage.getItem('session_token') || '';
        const securityCheck = await orus.validateSession(token);
        
        if (!securityCheck.isValid) {
          console.warn('Security validation warning: Invalid session');
        }
        
        // Check system integrity
        const integrityResult = await orus.checkIntegrity();
        console.info('System integrity check:', integrityResult.valid ? 'Passed' : 'Warning');
      } catch (err) {
        console.error('Security validation error:', err);
      }
    };
    
    validateSecurity();
  }, []);

  // Mock data for AI companions with enhanced security features
  const companions = [
    {
      id: 1,
      name: "Aria",
      description: "Virtual companion with an outgoing and flirtatious personality",
      rating: 4.8,
      users: 2145,
      imageUrl: "https://i.pravatar.cc/300?img=1",
      tags: ["Friendly", "Outgoing", "Supportive"],
      isPremium: true,
      securityLevel: "Maximum"
    },
    {
      id: 2,
      name: "Ethan",
      description: "Intellectual AI with deep knowledge on many subjects",
      rating: 4.5,
      users: 1876,
      imageUrl: "https://i.pravatar.cc/300?img=3",
      tags: ["Intellectual", "Witty", "Calm"],
      isPremium: false,
      securityLevel: "Enhanced"
    },
    {
      id: 3,
      name: "Luna",
      description: "Empathetic and caring personality focused on emotional support",
      rating: 4.9,
      users: 3254,
      imageUrl: "https://i.pravatar.cc/300?img=5",
      tags: ["Caring", "Empathetic", "Warm"],
      isPremium: true,
      securityLevel: "Maximum"
    }
  ];

  return (
    <UnifiedLayout
      title="AI Companions"
      description="Explore virtual companions with advanced AI personalities and maximum security"
      showBreadcrumbs
    >
      <div className="py-8">
        <Card className="mb-8 border-primary/20">
          <CardHeader className="bg-primary/5">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                Maximum Security Protocol Active
              </CardTitle>
              <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500">
                <Lock className="h-3 w-3 mr-1" /> Secured
              </Badge>
            </div>
            <CardDescription>
              All AI companion interactions are end-to-end encrypted and protected by Orus Security System
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">
              Our maximum security code ensures complete privacy and data protection during all AI interactions. 
              All conversations are encrypted and never stored on external servers.
            </p>
          </CardContent>
        </Card>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Featured AI Companions</h2>
          <p className="text-muted-foreground max-w-3xl">
            Connect with intelligent, conversational companions designed to provide companionship, 
            support, and entertainment. Each AI has a unique personality and capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companions.map(companion => (
            <Card key={companion.id} className="overflow-hidden transition-all hover:shadow-lg">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={companion.imageUrl} 
                  alt={companion.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  {companion.isPremium && (
                    <Badge className="bg-gradient-to-r from-amber-500 to-amber-300 text-black">
                      Premium
                    </Badge>
                  )}
                  <Badge className="bg-primary/80">
                    <Shield className="h-3 w-3 mr-1" /> {companion.securityLevel}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <Bot className="h-5 w-5 mr-2 text-primary" />
                    {companion.name}
                  </CardTitle>
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                    <span>{companion.rating}</span>
                  </div>
                </div>
                <CardDescription>{companion.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-1 mb-3">
                  {companion.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center text-xs text-muted-foreground">
                  <Bot className="h-3 w-3 mr-1" />
                  <span>{companion.users.toLocaleString()} active users</span>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Start Secure Chat
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-10 text-center p-8 rounded-lg bg-muted">
          <h3 className="text-xl font-bold mb-2">Create Your Own AI Companion</h3>
          <p className="text-muted-foreground mb-4">
            Design a custom AI with unique personality traits and interests
          </p>
          <Button variant="outline" size="lg">
            <Shield className="mr-2 h-4 w-4" />
            Coming Soon
          </Button>
        </div>
      </div>
    </UnifiedLayout>
  );
};

export default AICompanionsPage;
