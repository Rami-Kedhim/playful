import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, MessageCircle, Star, Users, Heart, ChevronRight, Sparkles, Award, Zap, Gift } from 'lucide-react';

const AICompanionDemo = () => {
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
    },
    {
      id: 4,
      name: "Max",
      description: "Adventurous spirit with exciting stories and travel knowledge",
      rating: 4.7,
      users: 1432,
      imageUrl: "https://i.pravatar.cc/300?img=7",
      tags: ["Adventurous", "Energetic", "Curious"],
      isPremium: false
    },
    {
      id: 5,
      name: "Sophie",
      description: "Creative artist who loves to discuss art, music, and culture",
      rating: 4.6,
      users: 1985,
      imageUrl: "https://i.pravatar.cc/300?img=9",
      tags: ["Creative", "Artistic", "Passionate"],
      isPremium: true
    },
    {
      id: 6,
      name: "Zoe",
      description: "Fun-loving companion with a great sense of humor",
      rating: 4.4,
      users: 1245,
      imageUrl: "https://i.pravatar.cc/300?img=10",
      tags: ["Humorous", "Playful", "Uplifting"],
      isPremium: false
    }
  ];

  return (
    <MainLayout
      title="AI Companions"
      description="Explore virtual companions with advanced AI personalities"
      showBreadcrumbs
    >
      <div className="py-8">
        {/* Hero Section */}
        <div className="mb-12 relative overflow-hidden rounded-xl">
          <div className="bg-gradient-to-r from-primary to-primary/80 p-8 md:p-12">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">Meet Your Perfect AI Companion</h1>
              <p className="text-lg text-white/90 mb-6">
                Discover intelligent, conversational companions designed to provide companionship,
                support, and entertainment. Each AI has a unique personality and capabilities.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" variant="secondary">
                  <MessageCircle className="mr-2 h-5 w-5" /> 
                  Start Chatting Now
                </Button>
                <Button size="lg" variant="outline" className="bg-white/20 hover:bg-white/30 text-white border-white">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Explore Premium
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Companions */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Featured AI Companions</h2>
            <Button variant="ghost" className="flex items-center text-primary">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {companions.slice(0, 3).map(companion => (
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
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Explore by Category</h2>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full grid grid-cols-4 md:grid-cols-7 mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="romantic">Romantic</TabsTrigger>
              <TabsTrigger value="friendly">Friendly</TabsTrigger>
              <TabsTrigger value="supportive">Supportive</TabsTrigger>
              <TabsTrigger value="creative">Creative</TabsTrigger>
              <TabsTrigger value="intellectual">Intellectual</TabsTrigger>
              <TabsTrigger value="entertaining">Entertaining</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  
                  <CardFooter className="flex justify-between">
                    <Button variant="ghost" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
            
            {/* Other tab contents would follow the same pattern */}
            <TabsContent value="romantic">
              <div className="text-center py-12">
                <Bot className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Romantic AI Companions</h3>
                <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                  Our romantic companions are designed to provide affection, flirtation, and deep emotional connections.
                </p>
                <Button>Explore Category</Button>
              </div>
            </TabsContent>
            
            {/* Similar placeholder content for other tabs */}
          </Tabs>
        </div>

        {/* Premium Features */}
        <div className="mb-12">
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2 text-primary" />
                Premium AI Companion Features
              </CardTitle>
              <CardDescription>
                Unlock enhanced experiences with our premium AI companions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center p-4">
                  <Zap className="h-10 w-10 mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Advanced Personalities</h3>
                  <p className="text-muted-foreground text-sm">
                    More complex and nuanced personality traits with deeper emotional connections
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4">
                  <MessageCircle className="h-10 w-10 mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Unlimited Conversations</h3>
                  <p className="text-muted-foreground text-sm">
                    No limits on message frequency or conversation length
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4">
                  <Gift className="h-10 w-10 mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Exclusive Content</h3>
                  <p className="text-muted-foreground text-sm">
                    Access to premium companions and special interaction scenarios
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button size="lg" className="bg-primary">
                <Sparkles className="mr-2 h-4 w-4" />
                Upgrade to Premium
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Create Your Own */}
        <div className="mt-10 text-center p-8 rounded-lg bg-muted">
          <h3 className="text-xl font-bold mb-2">Create Your Own AI Companion</h3>
          <p className="text-muted-foreground mb-4 max-w-lg mx-auto">
            Design a custom AI companion with unique personality traits, interests, and appearance to match your preferences
          </p>
          <Button variant="outline" size="lg">
            Coming Soon
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default AICompanionDemo;
