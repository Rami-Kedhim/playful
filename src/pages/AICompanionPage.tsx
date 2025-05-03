
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, MessageCircle, Star, Users } from 'lucide-react';

const AICompanionPage = () => {
  // Mock data for AI companions
  const companions = [
    {
      id: 1,
      name: "Aria",
      description: "Virtual companion with an outgoing and flirtatious personality",
      rating: 4.8,
      users: 2145,
      imageUrl: "https://i.pravatar.cc/300?img=1",
      tags: ["Friendly", "Outgoing", "Supportive"],
      isPremium: true
    },
    {
      id: 2,
      name: "Ethan",
      description: "Intellectual AI with deep knowledge on many subjects",
      rating: 4.5,
      users: 1876,
      imageUrl: "https://i.pravatar.cc/300?img=3",
      tags: ["Intellectual", "Witty", "Calm"],
      isPremium: false
    },
    {
      id: 3,
      name: "Luna",
      description: "Empathetic and caring personality focused on emotional support",
      rating: 4.9,
      users: 3254,
      imageUrl: "https://i.pravatar.cc/300?img=5",
      tags: ["Caring", "Empathetic", "Warm"],
      isPremium: true
    }
  ];

  return (
    <MainLayout
      title="AI Companions"
      description="Explore virtual companions with advanced AI personalities"
      showBreadcrumbs
    >
      <div className="py-8">
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
                {companion.isPremium && (
                  <Badge className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-amber-300 text-black">
                    Premium
                  </Badge>
                )}
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-primary" />
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
                  <Users className="h-3 w-3 mr-1" />
                  <span>{companion.users.toLocaleString()} active users</span>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Start Chat
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
            Coming Soon
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default AICompanionPage;
