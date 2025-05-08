
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfile } from "@/types/user";
import { User } from "@/types/user";
import AboutTab from "@/components/profile/AboutTab";
import ServicesTab from "@/components/profile/ServicesTab";
import RatesTab from "@/components/profile/RatesTab";
import SafetyTips from "@/components/verification/SafetyTips";
import VerificationBadge from "@/components/verification/VerificationBadge";
import { useRole } from "@/hooks/auth/useRole";
import { VerificationLevel } from "@/types/verification";

interface ProfileTabsProps {
  user: User;
  profile: UserProfile;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({
  user,
  profile,
  activeTab,
  onTabChange
}) => {
  const handleTabChange = (value: string) => {
    onTabChange(value);
  };

  // Convert the string verification level to the proper enum type
  let verificationLevel = VerificationLevel.NONE;
  
  if (profile.verification_level) {
    switch (profile.verification_level) {
      case "basic":
        verificationLevel = VerificationLevel.BASIC;
        break;
      case "verified":
        verificationLevel = VerificationLevel.VERIFIED;
        break;
      case "enhanced":
        verificationLevel = VerificationLevel.ENHANCED;
        break;
      case "premium":
        verificationLevel = VerificationLevel.PREMIUM;
        break;
      case "none":
      default:
        verificationLevel = VerificationLevel.NONE;
        break;
    }
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange}>
      <TabsList className="grid grid-cols-4 mb-8">
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="services">Services</TabsTrigger>
        <TabsTrigger value="rates">Rates</TabsTrigger>
        <TabsTrigger value="safety">Safety</TabsTrigger>
      </TabsList>
      
      <TabsContent value="about">
        <AboutTab profile={profile} />
      </TabsContent>
      
      <TabsContent value="services">
        <ServicesTab profile={profile} />
      </TabsContent>
      
      <TabsContent value="rates">
        <RatesTab profile={profile} />
      </TabsContent>
      
      <TabsContent value="safety">
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-xl font-semibold">Verification Status</h3>
            <VerificationBadge level={verificationLevel} />
          </div>
          
          <SafetyTips />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
