
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bot, ChevronRight, Sparkles, MessageSquare } from 'lucide-react';
import { AppPaths } from '@/routes/routeConfig';

const AICompanionsShowcase: React.FC = () => {
  const navigate = useNavigate();
  
  const aiCompanions = [
    {
      id: 'ai-1',
      name: 'Lucia',
      avatarUrl: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=256',
      personality: 'Friendly & Flirty',
      interests: ['Art', 'Travel', 'Deep Conversations'],
      responseTime: 'Instant',
      isPremium: true
    },
    {
      id: 'ai-2',
      name: 'Aria',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256',
      personality: 'Intellectual & Compassionate',
      interests: ['Philosophy', 'Science', 'Literature'],
      responseTime: 'Instant',
      isPremium: true
    },
    {
      id: 'ai-3',
      name: 'Nova',
      avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=256',
      personality: 'Playful & Adventurous',
      interests: ['Gaming', 'Sports', 'Comedy'],
      responseTime: 'Instant',
      isPremium: false
    },
    {
      id: 'ai-4',
      name: 'Zara',
      avatarUrl: 'https://images.unsplash.com/photo-1614251056798-0a63eda2bb25?q=80&w=256',
      personality: 'Mysterious & Intriguing',
      interests: ['Psychology', 'History', 'Music'],
      responseTime: 'Instant',
      isPremium: false
    }
  ];
  
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {aiCompanions.map((companion) => (
          <Card key={companion.id} className="overflow-hidden hover:shadow-md transition-all group">
            <div className="relative">
              <div className="aspect-[3/4] bg-gradient-to-b from-transparent to-black/50 relative overflow-hidden">
                <img 
                  src={companion.avatarUrl} 
                  alt={companion.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {companion.isPremium && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-amber-500 text-white flex items-center gap-1">
                      <Sparkles className="h-3 w-3" /> Premium
                    </Badge>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Bot className="h-4 w-4 text-primary" />
                    <span className="text-white font-medium">{companion.name}</span>
                  </div>
                  <p className="text-white/80 text-sm">{companion.personality}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {companion.interests.slice(0, 2).map((interest) => (
                      <Badge key={interest} variant="secondary" className="text-xs bg-black/40 text-white">
                        {interest}
                      </Badge>
                    ))}
                    {companion.interests.length > 2 && (
                      <Badge variant="secondary" className="text-xs bg-black/40 text-white">
                        +{companion.interests.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>{companion.responseTime} response</span>
                </div>
                <div className="text-sm font-medium">
                  {companion.isPremium ? 'Premium' : 'Free'}
                </div>
              </div>
              <Button 
                className="w-full gap-1"
                onClick={() => navigate(`/ai-companions/${companion.id}`)}
              >
                <MessageSquare className="h-4 w-4" />
                Start Conversation
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-6 flex justify-center">
        <Button className="gap-2" onClick={() => navigate(AppPaths.AI_COMPANION || '/ai-companions')}>
          Browse All AI Companions
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AICompanionsShowcase;
