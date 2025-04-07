import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from 'react-hook-form';
import { useAuth } from '@/hooks/auth/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface AccountFormData {
  username?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

interface PasswordChangeResult {
  success: boolean;
  error?: string;
}

const AccountSettings = () => {
  const { user, profile, updateUserProfile, updatePassword } = useAuth();
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors } 
  } = useForm<AccountFormData>({
    defaultValues: {
      username: profile?.username || '',
      email: user?.email || ''
    }
  });
  
  const onSubmit = async (data: AccountFormData) => {
    if (!user) return;
    
    setIsUpdating(true);
    try {
      await updateUserProfile({
        username: data.username,
        email: data.email
      });
      
      toast({
        title: "Profile Updated",
        description: "Your account settings have been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "There was a problem updating your account settings.",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };
  
  const onChangePassword = async (data: AccountFormData) => {
    if (!data.currentPassword || !data.newPassword) return;
    
    setIsChangingPassword(true);
    try {
      const result = await updatePassword(data.currentPassword, data.newPassword) as PasswordChangeResult;
      
      if (result.success) {
        toast({
          title: "Password Changed",
          description: "Your password has been changed successfully.",
        });
      } else {
        toast({
          title: "Password Change Failed",
          description: result.error || "There was a problem changing your password.",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      toast({
        title: "Password Change Failed",
        description: error?.message || "There was a problem changing your password.",
        variant: "destructive"
      });
    } finally {
      setIsChangingPassword(false);
    }
  };
  
  return (
    <div className="container mx-auto max-w-2xl p-4">
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>
            Manage your account settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Username"
                defaultValue={profile?.username}
                {...register("username")}
                disabled={isUpdating}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                defaultValue={user?.email}
                {...register("email")}
                disabled={isUpdating}
              />
            </div>
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Profile"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onChangePassword)} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                placeholder="Current Password"
                {...register("currentPassword", { required: true })}
                disabled={isChangingPassword}
              />
              {errors.currentPassword && (
                <p className="text-sm text-red-500">Current password is required</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="New Password"
                {...register("newPassword", { required: true })}
                disabled={isChangingPassword}
              />
              {errors.newPassword && (
                <p className="text-sm text-red-500">New password is required</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm New Password"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) => value === watch("newPassword") || "Passwords do not match",
                })}
                disabled={isChangingPassword}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>
            <Button type="submit" disabled={isChangingPassword}>
              {isChangingPassword ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Changing Password...
                </>
              ) : (
                "Change Password"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountSettings;
