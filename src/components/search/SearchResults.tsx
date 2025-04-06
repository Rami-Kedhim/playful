
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Defining interface for search results items
interface SearchResultItem {
  id: string;
  name: string;
  location: string;
  age: number;
  tags: string[];
  avatar_url?: string;
  verified?: boolean;
}

interface EscortResult extends SearchResultItem {
  price: number;
  rating?: number;
}

interface CreatorResult extends SearchResultItem {
  subscriptionPrice: number;
  contentCount?: number;
}

interface SearchResultsProps {
  results: (EscortResult | CreatorResult)[];
  searchType: string;
  loading?: boolean;
}

const SearchResults = ({ results, searchType, loading = false }: SearchResultsProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <Card key={i} className="overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-300"></div>
            <CardContent className="pt-4">
              <div className="h-5 bg-gray-300 w-2/3 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 w-1/2 rounded mb-3"></div>
              <div className="flex gap-1 mb-3">
                <div className="h-6 bg-gray-300 w-16 rounded"></div>
                <div className="h-6 bg-gray-300 w-16 rounded"></div>
              </div>
              <div className="h-4 bg-gray-300 w-1/3 rounded"></div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="h-10 bg-gray-300 w-full rounded"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }
  
  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-3">No results found</h3>
        <p className="text-muted-foreground mb-4">Try adjusting your filters or search terms</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {results.map((result) => (
        <Card key={result.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <div className="h-48 bg-gray-800 relative">
            {result.avatar_url ? (
              <img 
                src={result.avatar_url} 
                alt={result.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                <span className="text-2xl font-bold text-white">
                  {result.name[0]}
                </span>
              </div>
            )}
            {result.verified && (
              <Badge className="absolute top-2 right-2" variant="default">Verified</Badge>
            )}
          </div>
          
          <CardContent className="pt-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-lg">{result.name}, {result.age}</h3>
              {'rating' in result && result.rating && (
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                  <span>{result.rating}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center text-muted-foreground mb-3">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{result.location}</span>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-3">
              {result.tags.slice(0, 3).map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
              {result.tags.length > 3 && (
                <Badge variant="outline">+{result.tags.length - 3}</Badge>
              )}
            </div>
            
            <div className="flex items-center font-medium">
              <DollarSign className="h-4 w-4 mr-1 text-green-500" />
              {'price' in result ? (
                <span>${result.price}/hr</span>
              ) : (
                <span>${(result as CreatorResult).subscriptionPrice}/mo</span>
              )}
            </div>
          </CardContent>
          
          <CardFooter className="border-t pt-4">
            <Link to={`/${searchType === 'escorts' ? 'escorts' : 'creators'}/${result.id}`} className="w-full">
              <Button className="w-full">View Profile</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default SearchResults;
