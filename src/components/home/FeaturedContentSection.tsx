
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import ContentCard from './ContentCard';
import { ProfileProps } from '@/data/mockData';

interface FeaturedContentSectionProps {
  title: string;
  profiles: ProfileProps[];
  viewMoreLink: string;
}

const FeaturedContentSection: React.FC<FeaturedContentSectionProps> = ({ title, profiles, viewMoreLink }) => {
  // Create a safe description text that avoids the toLowerCase error
  const getDescriptionText = () => {
    if (!title) return "Check out our featured content";
    
    // Extract the content type from the title, safely handling undefined
    const contentType = title.replace('Featured ', '').toLowerCase();
    return `Check out our featured ${contentType}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{getDescriptionText()}</CardDescription>
      </CardHeader>
      <CardContent className="pl-4 pb-4">
        <ScrollArea className="h-[250px] w-full">
          <div className="flex space-x-4">
            {profiles.map(profile => (
              <ContentCard
                key={profile.id}
                id={profile.id}
                name={profile.name}
                imageUrl={profile.imageUrl}
                location={profile.location}
                rating={profile.rating}
                isPremium={profile.isPremium}
                price={profile.price}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <Button variant="outline" asChild>
          <a href={viewMoreLink}>View More</a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FeaturedContentSection;
