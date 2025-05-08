
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEscorts } from '@/hooks/useEscorts';
import { formatCurrency } from '@/lib/utils';

const FeaturedEscorts = () => {
  const { escorts, loading } = useEscorts();
  
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="overflow-hidden border border-border">
            <div className="aspect-[2/3] bg-zinc-900/30 animate-pulse" />
            <CardContent className="p-4 space-y-2">
              <div className="h-4 bg-zinc-900/30 rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-zinc-900/30 rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {escorts.slice(0, 4).map((escort) => (
        <Link 
          key={escort.id} 
          to={`/escort/${escort.id}`}
          className="group"
        >
          <Card className="overflow-hidden border border-border transition-all hover:shadow-md hover:border-primary/20">
            <div className="aspect-[2/3] relative">
              <img 
                src={escort.imageUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256'} 
                alt={escort.name} 
                className="w-full h-full object-cover"
              />
              {escort.isVerified && (
                <Badge className="absolute top-2 right-2 bg-primary text-white">
                  Verified
                </Badge>
              )}
              {escort.availableNow && (
                <Badge className="absolute top-2 left-2 bg-green-500 text-white">
                  Available Now
                </Badge>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <Button variant="default" className="w-full">
                  View Profile
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-base">{escort.name}</h3>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm">{escort.rating}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {escort.age} • {escort.location?.split(',')[0]}
                </div>
                <div className="text-primary font-medium">
                  {formatCurrency(escort.price)}
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default FeaturedEscorts;
