
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Escort } from "@/data/escortData";
import AboutTab from "./AboutTab";
import ServicesTab from "./ServicesTab";
import RatesTab from "./RatesTab";
import SafetyTips from "../SafetyTips";
import VerificationBadge from "../VerificationBadge";

interface ProfileTabsProps {
  escort: Escort;
}

const ProfileTabs = ({ escort }: ProfileTabsProps) => {
  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <Tabs defaultValue="about">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="rates">Rates</TabsTrigger>
            <TabsTrigger value="safety">Safety</TabsTrigger>
          </TabsList>
          
          <TabsContent value="about">
            <AboutTab escort={escort} />
          </TabsContent>
          
          <TabsContent value="services">
            <ServicesTab escort={escort} />
          </TabsContent>
          
          <TabsContent value="rates">
            <RatesTab escort={escort} />
          </TabsContent>
          
          <TabsContent value="safety">
            <SafetyTips />
            
            <div className="mt-6">
              <VerificationBadge level={escort.verificationLevel || "basic"} />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProfileTabs;
