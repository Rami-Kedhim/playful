
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Star, Calendar, User, Mail, MapPin } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";
import UBXWallet from "@/components/wallet/UBXWallet";

interface UserProfileSummaryProps {
  showSettings?: boolean;
  showWallet?: boolean;
}

export const UserProfileSummary: React.FC<UserProfileSummaryProps> = ({
  showSettings = true,
  showWallet = true
}) => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  
  if (!user) return null;
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Profile Summary</CardTitle>
            {showSettings && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/settings')}
              >
                <Settings className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.profileImageUrl || profile?.avatar_url} alt="Profile" />
              <AvatarFallback>
                {user?.email?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold">
                {profile?.full_name || user?.username || "User"}
              </h3>
              
              <div className="flex flex-col gap-1 mt-2">
                {user?.email && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 mr-2" />
                    {user.email}
                  </div>
                )}
                
                {profile?.location && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {profile.location}
                  </div>
                )}
                
                {profile?.created_at && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    Member since {format(new Date(profile.created_at), 'MMM yyyy')}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {profile?.is_verified && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500" />
                Verified
              </Badge>
            )}
            
            {profile?.profile_type && (
              <Badge variant="outline" className="capitalize">
                {profile.profile_type}
              </Badge>
            )}
            
            {profile?.is_content_creator && (
              <Badge variant="secondary">Creator</Badge>
            )}
          </div>
        </CardContent>
      </Card>
      
      {showWallet && (
        <UBXWallet />
      )}
    </div>
  );
};

export default UserProfileSummary;
