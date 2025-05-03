
import React, { useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { User } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AccountSettingsFormProps {
  user: User;
  onUpdate: (data: Partial<User>) => Promise<boolean>;
}

const AccountSettingsForm = ({ user, onUpdate }: AccountSettingsFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm({
    defaultValues: {
      username: user.username || '',
      email: user.email || '',
      name: user.name || '',
      website: user.website || '',
      bio: user.bio || '',
    }
  });
  
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    
    try {
      const success = await onUpdate(data);
      
      if (success) {
        toast({
          title: "Settings updated",
          description: "Your account settings have been updated successfully."
        });
      } else {
        toast({
          title: "Update failed",
          description: "There was a problem updating your account settings.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error updating account settings:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  
  const theme = user.user_metadata?.aiPreferences?.theme || 'system';
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatarUrl || user.avatar_url || ''} />
            <AvatarFallback>{getInitials(user.name || user.username || 'User')}</AvatarFallback>
          </Avatar>
          
          <div>
            <Button type="button" variant="outline" size="sm">
              Change Avatar
            </Button>
            <p className="text-xs text-muted-foreground mt-1">
              Recommended: Square image, at least 400x400px
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly type="email" />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input {...field} type="url" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea {...field} rows={4} />
              </FormControl>
            </FormItem>
          )}
        />
        
        <div className="pt-4 border-t flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AccountSettingsForm;
