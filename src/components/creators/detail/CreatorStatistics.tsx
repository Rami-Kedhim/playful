
import { Card, CardContent } from "@/components/ui/card";
import ProfileCompleteness from "@/components/profile/ProfileCompleteness";
import { Shield, Users } from "lucide-react";

interface CreatorStatisticsProps {
  creator: {
    subscriberCount: number;
    contentCount: {
      photos: number;
      videos: number;
    };
    id: string;
  };
}

const CreatorStatistics = ({ creator }: CreatorStatisticsProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <Shield className="text-primary mr-2" size={18} />
          <h3 className="text-lg font-semibold">Creator Statistics</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col items-center p-3 bg-muted rounded-md">
            <Users className="mb-1 text-primary" size={18} />
            <span className="font-bold text-lg">{creator.subscriberCount.toLocaleString()}</span>
            <span className="text-xs text-gray-500">Subscribers</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-muted rounded-md">
            <span className="font-bold text-lg">{Math.floor(Math.random() * 5000) + 1000}</span>
            <span className="text-xs text-gray-500">Profile Views</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-muted rounded-md">
            <span className="font-bold text-lg">{creator.contentCount.photos + creator.contentCount.videos}</span>
            <span className="text-xs text-gray-500">Total Content</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-muted rounded-md">
            <span className="font-bold text-lg">{Math.floor(Math.random() * 12) + 1}</span>
            <span className="text-xs text-gray-500">Months Active</span>
          </div>
        </div>
        
        <div className="mt-2">
          <p className="text-sm font-semibold mb-2">Profile Completeness</p>
          <ProfileCompleteness completeness={85} />
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatorStatistics;
