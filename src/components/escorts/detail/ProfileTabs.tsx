
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Escort } from "@/types/escort";
import EscortServices from "./EscortServices";
import EscortDetails from "./EscortDetails";
import EscortReviews from "./EscortReviews";
import { CalendarDays, Info, Star } from "lucide-react";

interface ProfileTabsProps {
  escort: Escort;
}

const ProfileTabs = ({ escort }: ProfileTabsProps) => {
  return (
    <Tabs defaultValue="services" className="w-full mt-6">
      <TabsList className="grid grid-cols-3 w-full">
        <TabsTrigger value="services" className="flex items-center gap-1.5">
          <CalendarDays className="h-4 w-4" />
          <span>Services</span>
        </TabsTrigger>
        <TabsTrigger value="details" className="flex items-center gap-1.5">
          <Info className="h-4 w-4" />
          <span>Details</span>
        </TabsTrigger>
        <TabsTrigger value="reviews" className="flex items-center gap-1.5">
          <Star className="h-4 w-4" />
          <span>Reviews</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="services" className="mt-4 animate-fade-in">
        <EscortServices tags={escort.tags} />
      </TabsContent>
      
      <TabsContent value="details" className="mt-4 animate-fade-in">
        <EscortDetails escort={escort} />
      </TabsContent>
      
      <TabsContent value="reviews" className="mt-4 animate-fade-in">
        <EscortReviews escort={escort} />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
