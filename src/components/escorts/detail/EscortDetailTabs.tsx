
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Escort } from "@/types/escort";
import EscortAbout from './tabs/EscortAbout';
import EscortServices from './tabs/EscortServices';
import EscortReviews from './tabs/EscortReviews';
import EscortRates from './tabs/EscortRates';

interface EscortDetailTabsProps {
  escort: Escort;
}

const EscortDetailTabs: React.FC<EscortDetailTabsProps> = ({ escort }) => {
  return (
    <Tabs defaultValue="about">
      <TabsList className="grid grid-cols-4 w-full">
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="services">Services</TabsTrigger>
        <TabsTrigger value="rates">Rates</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>
      
      <TabsContent value="about" className="mt-6">
        <EscortAbout escort={escort} />
      </TabsContent>
      
      <TabsContent value="services" className="mt-6">
        <EscortServices escort={escort} />
      </TabsContent>
      
      <TabsContent value="rates" className="mt-6">
        <EscortRates escort={escort} />
      </TabsContent>
      
      <TabsContent value="reviews" className="mt-6">
        <EscortReviews escort={escort} />
      </TabsContent>
    </Tabs>
  );
};

export default EscortDetailTabs;
