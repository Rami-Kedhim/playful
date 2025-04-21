
// Fix verificationLevel typing to use VerificationLevel enum and strict typing from '@/types/verification'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Escort } from "@/types/Escort";
import { VerificationLevel } from "@/types/verification";
import AboutTab from "./AboutTab";
import ServicesTab from "./ServicesTab";
import RatesTab from "./RatesTab";
import SafetyTips from "../SafetyTips";
import VerificationBadge from "../VerificationBadge";
import { Shield, UserCheck, DollarSign, Info } from "lucide-react";

interface ProfileTabsProps {
  escort: Escort;
}

const ProfileTabs = ({ escort }: ProfileTabsProps) => {
  // Normalize the verificationLevel prop to strict VerificationLevel union and fallback to 'none'
  const verificationLevel: VerificationLevel =
    escort.verificationLevel &&
    typeof escort.verificationLevel === "string" &&
    Object.values(VerificationLevel).includes(escort.verificationLevel as VerificationLevel)
      ? (escort.verificationLevel as VerificationLevel)
      : VerificationLevel.NONE;

  return (
    <div className="mt-6">
      <Tabs defaultValue="about">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="about" className="gap-2">
            <UserCheck className="h-4 w-4 hidden sm:inline" />
            <span>About</span>
          </TabsTrigger>
          <TabsTrigger value="services" className="gap-2">
            <Info className="h-4 w-4 hidden sm:inline" />
            <span>Services</span>
          </TabsTrigger>
          <TabsTrigger value="rates" className="gap-2">
            <DollarSign className="h-4 w-4 hidden sm:inline" />
            <span>Rates</span>
          </TabsTrigger>
          <TabsTrigger value="safety" className="gap-2">
            <Shield className="h-4 w-4 hidden sm:inline" />
            <span>Safety</span>
          </TabsTrigger>
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
            <VerificationBadge level={verificationLevel} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileTabs;

