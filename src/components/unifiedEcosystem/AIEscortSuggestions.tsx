
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Escort } from '@/types/Escort';

interface AIEscortSuggestionsProps {
  relatedEscorts?: Escort[];
  escort?: Escort;
}

const AIEscortSuggestions: React.FC<AIEscortSuggestionsProps> = ({
  relatedEscorts,
  escort,
}) => {
  // If we have related escorts to show
  if (relatedEscorts && relatedEscorts.length > 0) {
    return (
      <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20">
        <CardContent className="p-4">
          <div className="flex items-center mb-3">
            <Users className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
            <h3 className="font-medium text-sm">Similar profiles you might like</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            {relatedEscorts.slice(0, 2).map(escort => (
              <div key={escort.id} className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center">
                  {escort.imageUrl ? (
                    <img 
                      src={escort.imageUrl} 
                      alt={escort.name} 
                      className="w-8 h-8 rounded-full object-cover mr-2"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-2">
                      {escort.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-medium">{escort.name}</p>
                    <p className="text-xs text-muted-foreground">{escort.location}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" asChild className="h-7">
                  <Link to={`/escorts/${escort.id}`}>
                    View
                  </Link>
                </Button>
              </div>
            ))}
          </div>
          
          <Button 
            variant="default"
            size="sm" 
            className="w-full mt-3" 
            asChild
          >
            <Link to="/escorts">
              Explore More Escorts <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  return null;
};

export default AIEscortSuggestions;

