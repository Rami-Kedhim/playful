
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import ContentCard, { ProfileProps } from './ContentCard';
import { AppRoutes } from '@/utils/navigation';

interface FeaturedContentSectionProps {
  title: string;
  profiles: ProfileProps[];
  viewMoreLink: string;
}

const FeaturedContentSection: React.FC<FeaturedContentSectionProps> = ({ title, profiles = [], viewMoreLink }) => {
  const getDescriptionText = () => {
    if (!title) return "Check out our featured content";

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
            {Array.isArray(profiles) && profiles.length > 0 ? (
              profiles.map(profile => (
                <ContentCard
                  key={profile.id}
                  id={profile.id}
                  name={profile.name}
                  imageUrl={profile.imageUrl}
                  location={profile.location || ''}
                  rating={profile.rating || 0}
                  isPremium={profile.isPremium}
                  price={profile.price || 0}
                />
              ))
            ) : (
              <div className="p-4 text-muted-foreground text-center w-full">
                No profiles available to display
              </div>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <Button variant="outline" asChild>
          {/* Use Link for client-side navigation */}
          <a href={viewMoreLink}>{`View More`}</a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FeaturedContentSection;
