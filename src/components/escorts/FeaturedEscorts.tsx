
import React from 'react';
import { Escort } from '@/types/escort';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Star, TrendingUp } from 'lucide-react';

interface FeaturedEscortsProps {
  escorts: Escort[];
  loading?: boolean;
}

const FeaturedEscorts: React.FC<FeaturedEscortsProps> = ({ escorts, loading = false }) => {
  if (loading) {
    return (
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <TrendingUp className="h-5 w-5 text-primary mr-2" />
          <h2 className="text-2xl font-bold">Featured Escorts</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-lg bg-card shadow-sm animate-pulse h-60">
              <div className="h-40 bg-muted rounded-t-lg"></div>
              <div className="p-3">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (escorts.length === 0) {
    return null;
  }
  
  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <TrendingUp className="h-5 w-5 text-primary mr-2" />
        <h2 className="text-2xl font-bold">Featured Escorts</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {escorts.slice(0, 4).map(escort => (
          <Link 
            key={escort.id} 
            to={`/escorts/${escort.id}`}
            className="group relative overflow-hidden rounded-lg"
          >
            <div className="aspect-[3/4] w-full">
              <img 
                src={escort.imageUrl || escort.avatar_url || "https://via.placeholder.com/300x400"} 
                alt={escort.name}
                className="w-full h-full object-cover rounded-lg transition-transform group-hover:scale-105"
              />
            </div>
            
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white">
              <h3 className="font-semibold">{escort.name}</h3>
              <div className="flex items-center text-xs">
                <span>{escort.age} • {escort.location}</span>
              </div>
              {escort.verified && (
                <Badge variant="outline" className="mt-1 border-white/30 text-white text-xs">Verified</Badge>
              )}
            </div>
            
            {escort.rating > 0 && (
              <div className="absolute top-2 right-2 bg-black/50 text-white text-xs rounded-full px-2 py-0.5 flex items-center">
                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 mr-0.5" />
                {escort.rating.toFixed(1)}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedEscorts;
