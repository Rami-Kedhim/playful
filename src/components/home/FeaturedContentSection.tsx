
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EscortCard from "@/components/cards/EscortCard";
import CreatorCard from "@/components/cards/CreatorCard";
import { ContentCreator } from "@/types/creator";
import { Escort } from "@/types/escort";

interface FeaturedContentSectionProps {
  featuredEscorts: Escort[];
  featuredCreators: ContentCreator[];
}

const FeaturedContentSection = ({ featuredEscorts, featuredCreators }: FeaturedContentSectionProps) => {
  return (
    <section className="py-16 container mx-auto px-4">
      <Tabs defaultValue="escorts" className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div>
            <Badge variant="outline" className="mb-2">FEATURED PROFILES</Badge>
            <h2 className="text-3xl font-bold">Discover Top Talent</h2>
          </div>
          <TabsList className="bg-background/50 backdrop-blur-sm">
            <TabsTrigger value="escorts">Escorts</TabsTrigger>
            <TabsTrigger value="creators">Creators</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="escorts" className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredEscorts.map(escort => (
              <EscortCard key={escort.id} {...escort} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild>
              <Link to="/escorts">View All Escorts</Link>
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="creators">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCreators.map(creator => (
              <CreatorCard key={creator.id} {...creator} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild>
              <Link to="/creators">View All Creators</Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default FeaturedContentSection;
