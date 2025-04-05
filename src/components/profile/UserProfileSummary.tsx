
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { HeartIcon, MessageSquare, Settings } from "lucide-react";
import { useNotifications } from "@/contexts/NotificationsContext";
import { AuthUser } from "@/types/auth";

interface UserProfileSummaryProps {
  user: AuthUser;
  onEdit?: () => void;
}

const UserProfileSummary = ({ user, onEdit }: UserProfileSummaryProps) => {
  const { showSuccess } = useNotifications();

  const handleContactClick = () => {
    showSuccess("Message sent", "Your message has been sent to the user.");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-14 w-14">
              <AvatarImage src={user.profileImageUrl} />
              <AvatarFallback className="bg-primary/10">
                {user.username?.substring(0, 2).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{user.username}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </div>
          </div>

          {onEdit && (
            <Button variant="ghost" size="icon" onClick={onEdit}>
              <Settings className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge>Member</Badge>
          <Badge variant="outline">Balance: {user.lucoinsBalance || 0} LC</Badge>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>Account created: {new Date().toLocaleDateString()}</p>
          <p>Last active: Recently</p>
        </div>
        
        <Separator className="my-4" />
        
        <div className="flex justify-between text-sm">
          <div className="text-center">
            <p className="font-semibold">12</p>
            <p className="text-muted-foreground">Visits</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">3</p>
            <p className="text-muted-foreground">Messages</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">7</p>
            <p className="text-muted-foreground">Favorites</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-0">
        <Button className="flex-1" onClick={handleContactClick}>
          <MessageSquare className="h-4 w-4 mr-2" />
          Message
        </Button>
        <Button variant="outline" className="flex-1">
          <HeartIcon className="h-4 w-4 mr-2" />
          Follow
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserProfileSummary;
