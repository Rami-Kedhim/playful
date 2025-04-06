
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, Star, ArrowRight } from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  image: string;
  type: 'escort' | 'creator' | 'livecam';
  rating?: number;
  price?: string;
  location?: string;
  username?: string;
  avatar?: string;
  featured?: boolean;
}

interface FeaturedContentProps {
  title: string;
  items: ContentItem[];
  type: 'escort' | 'creator' | 'livecam';
  viewAllLink: string;
}

export function FeaturedContent({ title, items, type, viewAllLink }: FeaturedContentProps) {
  // Show only the first 4 items
  const displayItems = items.slice(0, 4);
  
  return (
    <section className="py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">{title}</h2>
          <Button asChild variant="ghost">
            <Link to={viewAllLink}>
              View all <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayItems.map((item) => (
            <Link key={item.id} to={`/${type}s/${item.id}`} className="block">
              <Card className="overflow-hidden h-full hover:shadow-md transition-all">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="object-cover w-full h-full transition-transform hover:scale-105 duration-300"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    {item.featured && (
                      <Badge variant="default" className="bg-primary">Featured</Badge>
                    )}
                    <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full opacity-90">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    {item.rating && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current" />
                        {item.rating}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="p-4 pt-0">
                  {item.location && <p className="text-sm text-muted-foreground">{item.location}</p>}
                  {item.price && <p className="font-semibold mt-1">{item.price}</p>}
                </CardContent>
                
                {item.username && (
                  <CardFooter className="p-4 pt-0 flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={item.avatar} alt={item.username} />
                      <AvatarFallback>{item.username[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">{item.username}</span>
                  </CardFooter>
                )}
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
