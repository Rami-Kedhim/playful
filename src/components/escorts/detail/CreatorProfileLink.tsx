
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Video, Image, Camera, Crown } from "lucide-react";

interface CreatorProfileLinkProps {
  escortName: string;
  creatorUsername: string;
}

const CreatorProfileLink = ({ escortName, creatorUsername }: CreatorProfileLinkProps) => {
  return (
    <Card className="border-purple-500/30 bg-gradient-to-br from-card to-purple-950/10">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg flex items-center">
              <Crown className="h-5 w-5 mr-2 text-purple-400" />
              Virtual Content
            </CardTitle>
            <CardDescription>
              {escortName} is also a content creator
            </CardDescription>
          </div>
          <Badge className="bg-purple-600">Virtual Creator</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex flex-col items-center justify-center p-2 bg-secondary/40 rounded-md">
            <Video className="h-4 w-4 mb-1 text-purple-400" />
            <span className="text-xs">Premium Videos</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 bg-secondary/40 rounded-md">
            <Image className="h-4 w-4 mb-1 text-purple-400" />
            <span className="text-xs">Exclusive Photos</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 bg-secondary/40 rounded-md">
            <Camera className="h-4 w-4 mb-1 text-purple-400" />
            <span className="text-xs">Live Streams</span>
          </div>
        </div>
        <Link to={`/creators/${creatorUsername}`}>
          <Button className="w-full bg-purple-600 hover:bg-purple-700">
            <Users className="mr-2 h-4 w-4" />
            View Creator Profile
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default CreatorProfileLink;
