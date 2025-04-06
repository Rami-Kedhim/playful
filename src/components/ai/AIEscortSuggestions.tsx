
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface AIEscortSuggestionsProps {
  aiProfileId: string;
}

// Mock data for escorts that would be recommended
const mockEscorts = [
  {
    id: 'escort-1',
    name: 'Sophia',
    age: 24,
    location: 'New York',
    imageUrl: 'https://source.unsplash.com/random/300x300/?portrait,woman',
    rating: 4.9,
    isOnline: true,
    verified: true
  },
  {
    id: 'escort-2',
    name: 'Mia',
    age: 26,
    location: 'Los Angeles',
    imageUrl: 'https://source.unsplash.com/random/300x300/?model,woman',
    rating: 4.8,
    isOnline: false,
    verified: true
  },
  {
    id: 'escort-3',
    name: 'Isabella',
    age: 23,
    location: 'Miami',
    imageUrl: 'https://source.unsplash.com/random/300x300/?face,woman',
    rating: 5.0,
    isOnline: true,
    verified: true
  }
];

const AIEscortSuggestions: React.FC<AIEscortSuggestionsProps> = ({ aiProfileId }) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Real Verified Escorts</h3>
          <Link to="/escorts">
            <Button variant="link" className="p-0 h-auto text-sm">
              See all <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </div>
        
        <div className="space-y-4">
          {mockEscorts.map(escort => (
            <div key={escort.id} className="flex items-center space-x-3">
              <div className="relative h-12 w-12 rounded-full overflow-hidden bg-muted">
                <img 
                  src={escort.imageUrl} 
                  alt={escort.name} 
                  className="object-cover w-full h-full"
                />
                {escort.isOnline && (
                  <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center">
                  <h4 className="font-medium text-sm truncate">
                    {escort.name}, {escort.age}
                  </h4>
                  {escort.verified && (
                    <Badge variant="outline" className="ml-2 px-1 py-0 text-[10px]">
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-muted-foreground flex items-center">
                  {escort.location}
                  <span className="inline-flex items-center ml-2">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-0.5" />
                    {escort.rating}
                  </span>
                </div>
              </div>
              
              <Button variant="outline" size="sm" asChild>
                <Link to={`/escorts/${escort.id}`}>
                  View
                </Link>
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-center text-muted-foreground">
            Meet real verified escorts in your area
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIEscortSuggestions;
