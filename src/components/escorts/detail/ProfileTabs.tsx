
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Escort } from "@/types/escort";
import { VerificationLevel } from "@/types/verification";
import AboutTab from "./profile/AboutTab";
import ServicesTab from "./profile/ServicesTab";
import RatesTab from "./profile/RatesTab";
import SafetyTips from "./SafetyTips";
import VerificationBadge from "./VerificationBadge";
import { Shield, UserCheck, DollarSign, Info } from "lucide-react";

interface ProfileTabsProps {
  escort: Escort;
}

const ProfileTabs = ({ escort }: ProfileTabsProps) => {
  // Normalize the verificationLevel prop to a string type compatible with VerificationBadge
  let verificationLevel: VerificationLevel;
  
  if (escort.verificationLevel) {
    // Convert to proper enum value if it's a string
    if (typeof escort.verificationLevel === 'string') {
      switch(escort.verificationLevel) {
        case "none":
          verificationLevel = VerificationLevel.NONE;
          break;
        case "basic":
          verificationLevel = VerificationLevel.BASIC;
          break;
        case "verified":
          verificationLevel = VerificationLevel.VERIFIED;
          break;
        case "premium":
          verificationLevel = VerificationLevel.PREMIUM;
          break;
        case "enhanced":
          verificationLevel = VerificationLevel.ENHANCED;
          break;
        default:
          verificationLevel = VerificationLevel.NONE;
          break;
      }
    } else {
      // It's already an enum value
      verificationLevel = escort.verificationLevel;
    }
  } else {
    verificationLevel = VerificationLevel.NONE;
  }

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
