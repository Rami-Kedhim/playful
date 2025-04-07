
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { Check, Loader2 } from 'lucide-react';

const ProfileSettings = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState({
    fullName: 'John Doe',
    username: 'johndoe',
    bio: 'This is my profile bio, where I can tell people about myself.',
    location: 'New York, USA',
    website: 'https://example.com',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Profile updated",
      description: "Your profile details have been saved.",
    });
    
    setIsSubmitting(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>Update your personal information and how others see you.</CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center space-x-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={formValues.avatarUrl} />
              <AvatarFallback>{formValues.fullName.substring(0, 2)}</AvatarFallback>
            </Avatar>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Profile Picture</h3>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" type="button">
                  Change
                </Button>
                <Button variant="outline" size="sm" type="button">
                  Remove
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                JPG, GIF or PNG. Max size 2MB.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input 
                id="fullName"
                name="fullName"
                value={formValues.fullName}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username"
                name="username"
                value={formValues.username}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea 
              id="bio"
              name="bio"
              value={formValues.bio}
              onChange={handleInputChange}
              rows={4}
              placeholder="Tell us about yourself"
            />
            <p className="text-xs text-muted-foreground">
              Brief description for your profile. URLs are hyperlinked.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location"
                name="location"
                value={formValues.location}
                onChange={handleInputChange}
                placeholder="City, Country"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input 
                id="website"
                name="website"
                value={formValues.website}
                onChange={handleInputChange}
                placeholder="https://yoursite.com"
                type="url"
              />
            </div>
          </div>
          
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Profile'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;
