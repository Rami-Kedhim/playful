
import { Card, CardContent } from "@/components/ui/card";
import { Escort } from "@/data/escortData";
import ProfileHeader from "./ProfileHeader";
import ProfileActions from "./ProfileActions";
import ProfileTabs from "./ProfileTabs";
import CreatorProfileLink from "./CreatorProfileLink";

interface ProfileInfoProps {
  escort: Escort;
  onFavoriteToggle: () => void;
  onBookingOpen: () => void;
  onMessageOpen: () => void;
  onShareOpen: () => void;
}

const ProfileInfo = ({ 
  escort, 
  onFavoriteToggle,
  onBookingOpen,
  onMessageOpen,
  onShareOpen
}: ProfileInfoProps) => {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <ProfileHeader 
            escort={escort} 
            onFavoriteToggle={onFavoriteToggle} 
          />
          
          <ProfileActions 
            escort={escort}
            onBookingOpen={onBookingOpen}
            onMessageOpen={onMessageOpen}
            onShareOpen={onShareOpen}
          />
        </CardContent>
      </Card>
      
      {/* Display virtual creator card if escort is also a content creator */}
      {escort.isContentCreator && escort.creatorUsername && (
        <CreatorProfileLink 
          escortName={escort.name}
          creatorUsername={escort.creatorUsername}
        />
      )}
      
      <ProfileTabs escort={escort} />
    </div>
  );
};

export default ProfileInfo;
