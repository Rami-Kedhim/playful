import { useState } from 'react';
import { UnifiedLayout } from '@/components/layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AICompanionChat from '@/components/ai/AICompanionChat';
import { Sparkles, MessageCircle } from 'lucide-react';

const AICompanionPage = () => {
  const [activeCompanionId, setActiveCompanionId] = useState<string | null>(null);
  
  const companions = [
    {
      id: 'sophia-1',
      name: 'Sophia',
      description: 'An empathetic companion who loves discussing art, psychology and personal growth.',
      avatar: '/sophia-avatar.png',
      personality: 'Warm, empathetic, insightful',
    },
    {
      id: 'max-2',
      name: 'Max',
      description: 'A tech enthusiast and gamer who keeps up with the latest trends.',
      avatar: '/max-avatar.png',
      personality: 'Energetic, knowledgeable, tech-savvy',
    },
    {
      id: 'aria-3',
      name: 'Aria',
      description: 'A creative writer who can help with storytelling and creative expression.',
      avatar: '/aria-avatar.png',
      personality: 'Creative, imaginative, eloquent',
    }
  ];
  
  return (
    <UnifiedLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            AI Companions
          </h1>
          <p className="text-xl text-gray-400">
            Have meaningful conversations with our AI companions, each with their own unique personality.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {companions.map(companion => (
            <Card key={companion.id} className="overflow-hidden border border-white/10 bg-black/30 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full overflow-hidden bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                    {companion.avatar ? (
                      <img src={companion.avatar} alt={companion.name} className="h-12 w-12 object-cover" />
                    ) : (
                      <span className="text-xl font-bold">{companion.name[0]}</span>
                    )}
                  </div>
                  <div>
                    <CardTitle>{companion.name}</CardTitle>
                    <CardDescription className="text-sm text-gray-400">{companion.personality}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{companion.description}</p>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={() => setActiveCompanionId(companion.id)}
                  variant="default"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Chat with {companion.name}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {activeCompanionId && (
          <AICompanionChat 
            companionId={activeCompanionId} 
            onClose={() => setActiveCompanionId(null)}
          />
        )}
      </div>
    </UnifiedLayout>
  );
};

export default AICompanionPage;
