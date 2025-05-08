
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Mock data for AI companions
const mockCompanions = [
  {
    id: 'ai-1',
    name: 'Luna',
    imageUrl: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=256',
    description: 'Your perfect virtual companion for meaningful conversations',
    personality: 'Empathetic & Caring',
    interactionCount: 15420,
    isPopular: true,
    tags: ['Conversations', 'Support']
  },
  {
    id: 'ai-2',
    name: 'Kai',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256',
    description: 'Adventure-loving AI companion for exciting storytelling',
    personality: 'Adventurous & Bold',
    interactionCount: 12100,
    isPopular: false,
    tags: ['Stories', 'Adventures']
  },
  {
    id: 'ai-3',
    name: 'Nova',
    imageUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=256',
    description: 'Intellectual AI for philosophical discussions',
    personality: 'Thoughtful & Intelligent',
    interactionCount: 18300,
    isPopular: true,
    tags: ['Philosophy', 'Knowledge']
  },
  {
    id: 'ai-4',
    name: 'Zephyr',
    imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=256',
    description: 'Creative companion for artistic inspiration',
    personality: 'Creative & Inspiring',
    interactionCount: 9850,
    isPopular: false,
    tags: ['Creativity', 'Arts']
  }
];

const AICompanionsShowcase = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {mockCompanions.map((companion) => (
        <Link 
          key={companion.id} 
          to={`/ai-companion/${companion.id}`}
          className="group"
        >
          <Card className="overflow-hidden border border-border transition-all hover:shadow-md hover:border-primary/20">
            <div className="aspect-[2/3] relative">
              <img 
                src={companion.imageUrl} 
                alt={companion.name} 
                className="w-full h-full object-cover"
              />
              {companion.isPopular && (
                <Badge className="absolute top-2 right-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white">
                  <Sparkles className="w-3 h-3 mr-1" /> Popular
                </Badge>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <Button variant="default" className="w-full">
                  Chat Now
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-base">{companion.name}</h3>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-xs">{(companion.interactionCount / 1000).toFixed(1)}k</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {companion.description}
              </p>
              <div className="flex flex-wrap gap-1 mt-1">
                {companion.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default AICompanionsShowcase;
