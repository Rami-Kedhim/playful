
import React, { useState } from 'react';
import AICompanionChat from '@/components/ai/AICompanionChat';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalityType } from '@/types/ai-personality';

const AICompanionDemoPage = () => {
  const [selectedPersonality, setSelectedPersonality] = useState<PersonalityType>('flirty');
  const [userCredits, setUserCredits] = useState(100);
  
  const personalityOptions: { value: PersonalityType, label: string, description: string }[] = [
    { value: 'flirty', label: 'Flirty', description: 'Playful and suggestive companion' },
    { value: 'dominant', label: 'Dominant', description: 'Assertive and commanding companion' },
    { value: 'submissive', label: 'Submissive', description: 'Gentle and yielding companion' },
    { value: 'romantic', label: 'Romantic', description: 'Poetic and passionate companion' },
    { value: 'shy', label: 'Shy', description: 'Reserved but sweet companion' },
    { value: 'playful', label: 'Playful', description: 'Fun and light-hearted companion' },
    { value: 'intellectual', label: 'Intellectual', description: 'Thoughtful and analytical companion' },
    { value: 'adventurous', label: 'Adventurous', description: 'Bold and exciting companion' },
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

  return (
    <div className="container py-8 max-w-7xl">
      <h1 className="text-4xl font-bold mb-8">AI Companion Demo</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Panel */}
        <div className="col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Personality</CardTitle>
              <CardDescription>
                Choose a personality type for your AI companion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={selectedPersonality} onValueChange={(value) => setSelectedPersonality(value as PersonalityType)}>
                <TabsList className="grid grid-cols-4 mb-4">
                  {personalityOptions.slice(0, 4).map(option => (
                    <TabsTrigger key={option.value} value={option.value}>
                      {option.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <TabsList className="grid grid-cols-4">
                  {personalityOptions.slice(4).map(option => (
                    <TabsTrigger key={option.value} value={option.value}>
                      {option.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {personalityOptions.map(option => (
                  <TabsContent key={option.value} value={option.value} className="mt-4">
                    <div className="text-sm space-y-2">
                      <p className="font-medium">{option.label} Personality</p>
                      <p className="text-muted-foreground">{option.description}</p>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Your Wallet</CardTitle>
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
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>How it Works</CardTitle>
              <CardDescription>
                Understanding the emotional AI system
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-4">
              <div>
                <h3 className="font-medium">Emotional Memory</h3>
                <p className="text-muted-foreground">
                  Your companion remembers past interactions and adjusts their emotional state accordingly.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium">Personality Types</h3>
                <p className="text-muted-foreground">
                  Each companion has a distinct personality that affects how they respond to you.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium">Premium Content</h3>
                <p className="text-muted-foreground">
                  Unlock special content using your Lucoins to deepen your connection.
                </p>
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
