
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Escort } from "@/data/escortData";
import EscortServices from "./EscortServices";
import EscortDetails from "./EscortDetails";
import EscortReviews from "./EscortReviews";

interface ProfileTabsProps {
  escort: Escort;
}

const ProfileTabs = ({ escort }: ProfileTabsProps) => {
  return (
    <Tabs defaultValue="services" className="w-full">
      <TabsList className="grid grid-cols-3 w-full">
        <TabsTrigger value="services">Services</TabsTrigger>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>
      
      <TabsContent value="services" className="mt-4">
        <EscortServices tags={escort.tags} />
      </TabsContent>
      
      <TabsContent value="details" className="mt-4">
        <EscortDetails escort={escort} />
      </TabsContent>
      
      <TabsContent value="reviews" className="mt-4">
        <EscortReviews escort={escort} />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
