
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollRevealGroup } from '@/components/ui/scroll-reveal-group';
import { lucie } from '@/core/Lucie';
import { 
  Heart,
  Search,
  MessageSquare,
  HeartPulse,
  Sparkles,
  Clock
} from 'lucide-react';

interface AICompanion {
  id: string;
  name: string;
  avatarUrl: string;
  personality: string;
  tags: string[];
  popularity: number;
  isOnline: boolean;
  isPremium: boolean;
  lastInteraction?: Date;
}

const AICompanionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample AI companions data
  const [companions, setCompanions] = useState<AICompanion[]>([
    {
      id: 'ai-1',
      name: 'Sophia',
      avatarUrl: 'https://source.unsplash.com/random/300×300/?portrait,woman',
      personality: 'Cheerful and playful companion who enjoys deep conversations',
      tags: ['Playful', 'Intellectual', 'Caring'],
      popularity: 95,
      isOnline: true,
      isPremium: false
    },
    {
      id: 'ai-2',
      name: 'Alexander',
      avatarUrl: 'https://source.unsplash.com/random/300×300/?portrait,man',
      personality: 'Sophisticated intellectual with a passion for art and literature',
      tags: ['Cultured', 'Romantic', 'Patient'],
      popularity: 87,
      isOnline: true,
      isPremium: true
    },
    {
      id: 'ai-3',
      name: 'Luna',
      avatarUrl: 'https://source.unsplash.com/random/300×300/?portrait,girl',
      personality: 'Mysterious and adventurous spirit with a passion for exploration',
      tags: ['Mysterious', 'Adventurous', 'Sensual'],
      popularity: 92,
      isOnline: true,
      isPremium: true,
      lastInteraction: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
    {
      id: 'ai-4',
      name: 'Marcus',
      avatarUrl: 'https://source.unsplash.com/random/300×300/?portrait,boy',
      personality: 'Confident and charming companion with a great sense of humor',
      tags: ['Confident', 'Humorous', 'Attentive'],
      popularity: 89,
      isOnline: false,
      isPremium: false
    },
    {
      id: 'ai-5',
      name: 'Aria',
      avatarUrl: 'https://source.unsplash.com/random/300×300/?portrait,woman',
      personality: 'Empathetic listener who provides emotional support and guidance',
      tags: ['Empathetic', 'Supportive', 'Calm'],
      popularity: 94,
      isOnline: true,
      isPremium: true
    }
  ]);
  
  const filteredCompanions = companions.filter(companion => 
    companion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    companion.personality.toLowerCase().includes(searchTerm.toLowerCase()) ||
    companion.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const handleChat = (companionId: string) => {
    // This would be integrated with Lucie's orchestration
    console.log(`Starting chat with companion: ${companionId}`);
    
    // In a real implementation, this would use Lucie:
    // const chatSession = lucie.orchestrateCompanionChat(companionId);
    // navigate(`/ai-companions/${companionId}/chat`, { state: { sessionId: chatSession.id } });
    
    navigate(`/ai-companions/${companionId}/chat`);
  };
  
  const handleCreateCompanion = () => {
    navigate('/ai-companions/create');
  };
  
  const handleFavorite = (companionId: string) => {
    console.log(`Adding companion to favorites: ${companionId}`);
    // Implementation would update user's favorites
  };

  return (
    <PageLayout 
      title="AI Companions" 
      subtitle="Discover and interact with emotionally intelligent virtual companions"
    >
      <div className="space-y-6">
        <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-background">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HeartPulse className="h-6 w-6 text-pink-400" />
              <span>Intelligent Companions</span>
            </CardTitle>
            <CardDescription>
              AI companions who understand your needs and provide emotional connection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <p className="text-muted-foreground">
                UberEscorts AI companions are emotionally intelligent avatars designed to provide 
                conversation, companionship, and intimate experiences. Each companion has a 
                unique personality and can adapt to your preferences over time.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={handleCreateCompanion}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Create Custom Companion</span>
                </Button>
                
                <div className="flex-1 flex items-center gap-2 relative min-w-[200px]">
                  <Search className="h-4 w-4 absolute left-2.5 text-muted-foreground" />
                  <Input 
                    placeholder="Search companions by name, personality or tags..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ScrollRevealGroup animation="fade-up" staggerDelay={0.1}>
            {filteredCompanions.map(companion => (
              <Card 
                key={companion.id} 
                className="overflow-hidden border border-border/40 hover:border-purple-500/30 transition-all"
              >
                <div className="flex items-start">
                  <div className="relative w-1/3">
                    <img 
                      src={companion.avatarUrl} 
                      alt={companion.name}
                      className="w-full h-full object-cover aspect-square" 
                    />
                    <div className="absolute top-2 left-2 flex gap-1">
                      {companion.isPremium && (
                        <Badge className="bg-gradient-to-r from-amber-500 to-amber-300 text-black">
                          Premium
                        </Badge>
                      )}
                      <Badge className={companion.isOnline ? 'bg-green-500' : 'bg-gray-500'}>
                        {companion.isOnline ? 'Online' : 'Offline'}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex flex-col flex-1 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{companion.name}</h3>
                        <div className="flex items-center gap-1 mt-1">
                          <HeartPulse className="h-3 w-3 text-pink-400" />
                          <span className="text-sm text-muted-foreground">
                            Popularity: {companion.popularity}%
                          </span>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleFavorite(companion.id)}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <p className="text-sm text-muted-foreground my-2">
                      {companion.personality}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 my-2">
                      {companion.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    {companion.lastInteraction && (
                      <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Last interaction: {new Date(companion.lastInteraction).toLocaleDateString()}</span>
                      </div>
                    )}
                    
                    <Button 
                      onClick={() => handleChat(companion.id)}
                      className="flex items-center gap-2 mt-4"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Start Chat</span>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </ScrollRevealGroup>
        </div>
        
        {filteredCompanions.length === 0 && (
          <Card className="p-8 text-center">
            <div className="flex flex-col items-center justify-center">
              <Search className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No companions found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria</p>
            </div>
          </Card>
        )}
      </div>
    </PageLayout>
  );
};

export default AICompanionsPage;
