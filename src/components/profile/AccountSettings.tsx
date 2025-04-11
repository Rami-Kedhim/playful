
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { toast } from '@/components/ui/use-toast';
import { Loader2, Mail, KeyRound, User, ShieldCheck } from 'lucide-react';
import EmailDialog from './settings/EmailDialog';
import PasswordDialog from './settings/PasswordDialog';
import { AuthUser } from '@/types/auth';

interface AccountSettingsProps {
  initialTab?: string;
  user: AuthUser | null;
  profile: any;
}

const AccountSettings: React.FC<AccountSettingsProps> = ({ 
  initialTab = "general", 
  user, 
  profile 
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState(user?.username || '');
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const { updateUserProfile, userRoles } = useAuth();

  const handleSaveGeneral = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      await updateUserProfile({
        username,
      });
      
      toast({
        title: "Profile Updated",
        description: "Your general information has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update profile information.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tabs 
      value={activeTab} 
      onValueChange={setActiveTab} 
      className="w-full"
    >
      <TabsList className="grid grid-cols-3 mb-8">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>General Information</CardTitle>
            <CardDescription>
              Update your basic profile information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={user?.email}
                  disabled
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleSaveGeneral} 
              disabled={isLoading}
              className="ml-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : 'Save Changes'}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>
              Manage your account security settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Email Address</Label>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{user?.email}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEmailDialogOpen(true)}
                >
                  Change Email
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <KeyRound className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>••••••••</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPasswordDialogOpen(true)}
                >
                  Change Password
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <EmailDialog 
          open={isEmailDialogOpen} 
          onOpenChange={setIsEmailDialogOpen} 
        />
        
        <PasswordDialog 
          open={isPasswordDialogOpen} 
          onOpenChange={setIsPasswordDialogOpen} 
        />
      </TabsContent>

      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              View details about your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Your Roles</Label>
              <div className="flex items-center">
                <ShieldCheck className="mr-2 h-4 w-4 text-muted-foreground" />
                <div className="px-3 py-1 bg-primary/10 rounded-md text-sm">
                  {userRoles.join(', ') || 'user'}
                </div>
              </div>
            </div>

            {user?.created_at && (
              <div className="space-y-2">
                <Label>Member Since</Label>
                <div className="text-sm text-muted-foreground">
                  {new Date(user.created_at).toLocaleDateString()} 
                  ({new Date(user.created_at).toLocaleTimeString()})
                </div>
              </div>
            )}

            <div className="border-t pt-4 mt-4">
              <h3 className="text-lg font-medium mb-2">Account Actions</h3>
              <div className="flex gap-2">
                <Button variant="destructive" size="sm">
                  Delete Account
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Warning: Deleting your account is permanent and cannot be undone.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AccountSettings;
