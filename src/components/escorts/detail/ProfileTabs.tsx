
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VerificationLevel } from "@/types/verification";
import AboutTab from "./profile/AboutTab";
import ServicesTab from "./profile/ServicesTab";
import RatesTab from "./profile/RatesTab";
import SafetyTips from "./SafetyTips";
import VerificationBadge from "./VerificationBadge";
import { Shield, UserCheck, DollarSign, Info } from "lucide-react";
import { convertEscortType, ensureCompatibleAvailabilityDays } from "@/utils/typeConverters";
import type { Escort } from "@/types/Escort";

interface ProfileTabsProps {
  escort: any; // Use any to avoid circular type references
}

const ProfileTabs = ({ escort }: ProfileTabsProps) => {
  // Convert escort to compatible type with proper processing to ensure type safety
  const processedEscort = React.useMemo(() => {
    const convertedEscort = convertEscortType(escort);
    
    // Additional processing to ensure compatibility with the specific EscortAvailability type
    if (convertedEscort && convertedEscort.availability && 
        typeof convertedEscort.availability === 'object' && 
        !Array.isArray(convertedEscort.availability)) {
      const availObj = convertedEscort.availability as any;
      if (availObj.days) {
        availObj.days = ensureCompatibleAvailabilityDays(availObj.days);
      }
    }
    
    return convertedEscort as Escort; // Cast to Escort type expected by components
  }, [escort]);
  
  // Normalize the verificationLevel prop to a string type compatible with VerificationBadge
  let verificationLevel: "none" | "basic" | "enhanced" | "premium" = "none";
  
  if (processedEscort?.verificationLevel) {
    // Convert to string if it's an enum value
    const level = typeof processedEscort.verificationLevel === 'string' 
      ? processedEscort.verificationLevel 
      : String(processedEscort.verificationLevel);
    
    // Map verification levels to expected values
    if (level === VerificationLevel.NONE || level === "none") {
      verificationLevel = "none";
    } else if (level === VerificationLevel.BASIC || level === "basic") {
      verificationLevel = "basic";
    } else if (level === VerificationLevel.VERIFIED || level === "verified") {
      verificationLevel = "basic"; // Map verified to basic for now
    } else if (level === VerificationLevel.PREMIUM || level === "premium") {
      verificationLevel = "premium";
    } else if (level === VerificationLevel.ENHANCED || level === "enhanced") {
      verificationLevel = "enhanced";
    }
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
          <AboutTab escort={processedEscort} />
        </TabsContent>

        <TabsContent value="services">
          <ServicesTab escort={processedEscort} />
        </TabsContent>

        <TabsContent value="rates">
          <RatesTab escort={processedEscort} />
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
