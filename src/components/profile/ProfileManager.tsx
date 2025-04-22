
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import AccountSettings from "./AccountSettings";
import NotificationSettings from "./NotificationSettings";
import SecuritySettings from "./SecuritySettings";
import { useAuth } from '@/hooks/auth';
import { useAuthActions } from "@/hooks/auth/useAuthActions";
import { Loader2 } from "lucide-react";

interface ProfileManagerProps {
  defaultTab?: string;
}

const ProfileManager = ({ defaultTab = "account" }: ProfileManagerProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { refreshProfile } = useAuthActions();
  
  // Mock profile data since we don't have a real profile property
  const profile = user ? {
    id: user.id,
    userId: user.id,
    username: user.username || '',
    email: user.email || '',
    name: user.name || '',
    bio: user.bio || '',
    avatarUrl: user.avatarUrl || '',
    role: user.role || 'user',
    roles: user.roles || [],
  } : null;
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!user) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            Please log in to manage your profile
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>
          Manage your account settings and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={defaultTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          <div className="mt-6">
            <TabsContent value="account">
              <AccountSettings />
            </TabsContent>
            <TabsContent value="notifications">
              <NotificationSettings />
            </TabsContent>
            <TabsContent value="security">
              <SecuritySettings />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProfileManager;
