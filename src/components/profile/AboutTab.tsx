
import React from "react";
import { UserProfile } from "@/types/user";

interface AboutTabProps {
  profile: UserProfile;
}

const AboutTab: React.FC<AboutTabProps> = ({ profile }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">About Me</h3>
      <p>{profile.bio || "No bio information available."}</p>
      
      <h3 className="text-xl font-semibold mt-6">Contact Information</h3>
      <p>Phone: {profile.phone || "Not provided"}</p>
      <p>Website: {profile.website || "Not provided"}</p>
      
      <h3 className="text-xl font-semibold mt-6">Location</h3>
      <p>{profile.location || "Not specified"}</p>
    </div>
  );
};

export default AboutTab;
