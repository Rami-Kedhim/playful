
import React from "react";
import { useAuth } from "@/hooks/auth/useAuth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";

const UserProfileSummary = () => {
  const { user, profile } = useAuth();

  if (!user) {
    return null;
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown";
    try {
      return format(new Date(dateString), "MMMM d, yyyy");
    } catch (error) {
      return "Invalid date";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={profile?.avatar_url} alt={user.username || "User"} />
            <AvatarFallback className="text-2xl">
              {profile?.full_name?.[0] || user.username?.[0] || user.email?.[0] || "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold leading-none tracking-tight">
                {profile?.full_name || user.username || "User"}
              </h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {user.role && (
                <Badge variant="secondary" className="text-xs">
                  {user.role}
                </Badge>
              )}
              {profile?.isVerified && (
                <Badge className="bg-blue-500 hover:bg-blue-700 text-xs">
                  Verified
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {profile?.bio && (
          <div className="mt-2">
            <p className="text-sm">{profile.bio}</p>
          </div>
        )}
        <div className="flex items-center gap-2 mt-4">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            Member since {formatDate(user.created_at)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileSummary;
