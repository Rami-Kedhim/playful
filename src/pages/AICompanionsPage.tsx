import React, { useState, useEffect } from 'react';
import { Container } from '@/components/ui/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { lucieAI } from '@/core/Lucie';
import { hermes } from '@/core/Hermes';
import { useAuth } from '@/hooks/auth';

const AICompanionsPage: React.FC = () => {
  const [companions, setCompanions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();
  const userId = user?.id || 'anonymous';

  useEffect(() => {
    const fetchCompanions = async () => {
      setLoading(true);
      try {
        // In a real implementation, this would fetch from an API
        // For now, we'll use mock data
        const mockCompanions = [
          {
            id: 'ai-1',
            name: 'Luna',
            description: 'Your virtual companion for deep conversations',
            imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
            personality: 'Thoughtful and philosophical',
            rating: 4.8
          },
          {
            id: 'ai-2',
            name: 'Max',
            description: 'Fun-loving AI that keeps you entertained',
            imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
            personality: 'Playful and energetic',
            rating: 4.6
          },
          {
            id: 'ai-3',
            name: 'Sophia',
            description: 'Sophisticated AI with a wealth of knowledge',
            imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
            personality: 'Intelligent and articulate',
            rating: 4.9
          }
        ];
        
        // Track this view with Hermes
        hermes.connect({
          system: 'AICompanionSystem',
          connectionId: `ai-companions-page-${Date.now()}`,
          metadata: { page: 'ai-companions', timestamp: new Date().toISOString() },
          userId
        });
        
        // Check if Lucie AI is operational
        const lucieStatus = lucieAI.getSystemStatus();
        console.log('Lucie AI status:', lucieStatus);
        
        setCompanions(mockCompanions);
      } catch (error) {
        console.error('Error fetching AI companions:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCompanions();
  }, [userId]);
  
  const filteredCompanions = companions.filter(companion => 
    companion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    companion.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    companion.personality.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold">AI Companions</h1>
          <p className="text-muted-foreground">
            Discover AI companions that match your personality and interests
          </p>
        </div>
        
        <div className="w-full max-w-md">
          <Input
            placeholder="Search companions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p>Loading companions...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanions.map((companion) => (
              <Card key={companion.id} className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={companion.imageUrl} 
                    alt={companion.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{companion.name}</span>
                    <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {companion.rating} ★
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{companion.description}</p>
                  <p className="text-sm"><strong>Personality:</strong> {companion.personality}</p>
                  <Button className="w-full">Chat Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {!loading && filteredCompanions.length === 0 && (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No companions found matching your search.</p>
          </div>
        )}
      </div>
    </Container>
  );
};

export default AICompanionsPage;
