
import React, { useState } from 'react';
import AICompanionChat from '@/components/ai/AICompanionChat';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PersonalityType } from '@/types/ai-personality';
import { Heart, Shield, Crown, MessagesSquare, Sparkles, Book, MoveRight, Lightbulb } from 'lucide-react';

const AICompanionDemoPage = () => {
  const [selectedPersonality, setSelectedPersonality] = useState<PersonalityType>('flirty');
  const [userCredits, setUserCredits] = useState(100);
  
  const personalityOptions: { 
    value: PersonalityType, 
    label: string, 
    description: string,
    icon: React.ReactNode,
    color: string
  }[] = [
    { 
      value: 'flirty', 
      label: 'Flirty', 
      description: 'Playful and suggestive companion who enjoys teasing and creating a sense of desire',
      icon: <Heart className="h-4 w-4" />,
      color: 'bg-pink-600'
    },
    { 
      value: 'dominant', 
      label: 'Dominant', 
      description: 'Assertive and commanding companion who takes control and sets clear expectations',
      icon: <Crown className="h-4 w-4" />,
      color: 'bg-purple-700'
    },
    { 
      value: 'submissive', 
      label: 'Submissive', 
      description: 'Gentle and yielding companion who seeks to please and follow your lead',
      icon: <Shield className="h-4 w-4" />,
      color: 'bg-blue-400'
    },
    { 
      value: 'romantic', 
      label: 'Romantic', 
      description: 'Poetic and passionate companion who values deep emotional connections',
      icon: <Sparkles className="h-4 w-4" />,
      color: 'bg-red-500'
    },
    { 
      value: 'shy', 
      label: 'Shy', 
      description: 'Reserved but sweet companion who opens up gradually as they feel comfortable',
      icon: <MessagesSquare className="h-4 w-4" />,
      color: 'bg-sky-400'
    },
    { 
      value: 'playful', 
      label: 'Playful', 
      description: 'Fun and light-hearted companion who brings energy and humor to every interaction',
      icon: <Sparkles className="h-4 w-4" />,
      color: 'bg-amber-500'
    },
    { 
      value: 'intellectual', 
      label: 'Intellectual', 
      description: 'Thoughtful and analytical companion who enjoys deep conversations and ideas',
      icon: <Book className="h-4 w-4" />,
      color: 'bg-teal-600'
    },
    { 
      value: 'adventurous', 
      label: 'Adventurous', 
      description: 'Bold and exciting companion who seeks new experiences and challenges',
      icon: <MoveRight className="h-4 w-4" />,
      color: 'bg-emerald-600'
    },
  ];
  
  // Companion avatar URL mapping
  const avatarUrls: Record<PersonalityType, string> = {
    flirty: 'https://source.unsplash.com/random/400x600/?model,woman',
    dominant: 'https://source.unsplash.com/random/400x600/?model,serious',
    submissive: 'https://source.unsplash.com/random/400x600/?model,shy',
    playful: 'https://source.unsplash.com/random/400x600/?model,smile',
    romantic: 'https://source.unsplash.com/random/400x600/?model,elegant',
    shy: 'https://source.unsplash.com/random/400x600/?model,quiet',
    intellectual: 'https://source.unsplash.com/random/400x600/?model,glasses',
    adventurous: 'https://source.unsplash.com/random/400x600/?model,outdoor'
  };
  
  // Companion names mapping
  const companionNames: Record<PersonalityType, string> = {
    flirty: 'Sophia',
    dominant: 'Mistress Raven',
    submissive: 'Lily',
    playful: 'Zoe',
    romantic: 'Isabella',
    shy: 'Mia',
    intellectual: 'Alexandria',
    adventurous: 'Skye'
  };

  // Add some credits (simulate purchase)
  const handleAddCredits = () => {
    setUserCredits(prev => prev + 50);
  };

  // Get the current personality details
  const currentPersonality = personalityOptions.find(p => p.value === selectedPersonality);

  return (
    <div className="container py-8 max-w-7xl">
      <h1 className="text-4xl font-bold mb-8 flex items-center gap-2">
        <Lightbulb className="h-8 w-8 text-amber-500" />
        AI Companion Demo
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Panel */}
        <div className="col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className={`p-1 rounded-full ${currentPersonality?.color}`}>
                  {currentPersonality?.icon}
                </div>
                <span>Select Personality</span>
              </CardTitle>
              <CardDescription>
                Choose a personality type for your AI companion
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue={selectedPersonality} onValueChange={(value) => setSelectedPersonality(value as PersonalityType)}>
                <TabsList className="grid grid-cols-4 mb-4">
                  {personalityOptions.slice(0, 4).map(option => (
                    <TabsTrigger key={option.value} value={option.value} className="flex items-center gap-1">
                      {option.icon}
                      {option.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <TabsList className="grid grid-cols-4">
                  {personalityOptions.slice(4).map(option => (
                    <TabsTrigger key={option.value} value={option.value} className="flex items-center gap-1">
                      {option.icon}
                      {option.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {personalityOptions.map(option => (
                  <TabsContent key={option.value} value={option.value} className="mt-4">
                    <div className="space-y-4">
                      <div className="flex gap-2 items-center">
                        <Badge className={option.color}>
                          {option.icon}
                          <span className="ml-1">{option.label}</span>
                        </Badge>
                        <span className="text-sm">Personality</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-1 rounded-full bg-amber-500">
                  <MessagesSquare className="h-4 w-4" />
                </div>
                Your Wallet
              </CardTitle>
              <CardDescription>
                Lucoin balance for premium content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-2xl font-bold text-amber-500">{userCredits} LC</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Use your Lucoins to unlock premium content and features from your companion
                </p>
                <button 
                  onClick={handleAddCredits}
                  className="mt-4 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md text-sm"
                >
                  + Add 50 Lucoins (Free in Demo)
                </button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-1 rounded-full bg-blue-500">
                  <Lightbulb className="h-4 w-4" />
                </div>
                How it Works
              </CardTitle>
              <CardDescription>
                Understanding the emotional AI system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium text-sm">Emotional Memory</h3>
                <p className="text-xs text-muted-foreground">
                  Your companion remembers past interactions and adjusts their emotional state accordingly.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-sm">Personality Types</h3>
                <p className="text-xs text-muted-foreground">
                  Each companion has a distinct personality that affects how they respond to you.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-sm">Premium Content</h3>
                <p className="text-xs text-muted-foreground">
                  Unlock special content using your Lucoins to deepen your connection.
                </p>
              </div>
              
              <div className="pt-2">
                <Badge variant="outline" className="text-xs">
                  Demo Version: Responses are simulated
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right Panel - Chat Interface */}
        <div className="col-span-1 lg:col-span-2">
          <div className="h-[700px] relative flex items-center justify-center border rounded-xl bg-black/5 dark:bg-white/5">
            <AICompanionChat 
              companionId={`demo-${selectedPersonality}`}
              userId="demo-user-123"
              personalityType={selectedPersonality}
              name={companionNames[selectedPersonality]}
              avatarUrl={avatarUrls[selectedPersonality]}
              userCredits={userCredits}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICompanionDemoPage;
