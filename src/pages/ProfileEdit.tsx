
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';

const ProfileEdit = () => {
  const { profile, updateUserProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    bio: '',
    location: '',
    sexual_orientation: '',
    website: ''
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || profile.fullName || '',
        username: profile.username || '',
        bio: profile.bio || '',
        location: profile.location || '',
        sexual_orientation: profile.sexual_orientation || '',
        website: profile.website || ''
      });
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await updateUserProfile({
        name: formData.name,
        username: formData.username,
        bio: formData.bio,
        location: formData.location,
        sexual_orientation: formData.sexual_orientation,
        website: formData.website
      });

      if (success) {
        toast({
          title: "Profile updated",
          description: "Your profile has been successfully updated."
        });
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was an error updating your profile.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container max-w-4xl py-8">
        <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <Input 
                id="name"
                name="name" 
                value={formData.name} 
                onChange={handleChange}
                placeholder="Your name"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">Username</label>
              <Input 
                id="username"
                name="username" 
                value={formData.username} 
                onChange={handleChange}
                placeholder="Your username"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="bio" className="text-sm font-medium">Bio</label>
            <Textarea 
              id="bio"
              name="bio" 
              value={formData.bio} 
              onChange={handleChange}
              placeholder="Tell us about yourself"
              rows={4}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">Location</label>
              <Input 
                id="location"
                name="location" 
                value={formData.location} 
                onChange={handleChange}
                placeholder="Your location"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="sexual_orientation" className="text-sm font-medium">Sexual Orientation</label>
              <Select 
                value={formData.sexual_orientation}
                onValueChange={(value) => handleSelectChange('sexual_orientation', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select orientation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="straight">Straight</SelectItem>
                  <SelectItem value="gay">Gay</SelectItem>
                  <SelectItem value="lesbian">Lesbian</SelectItem>
                  <SelectItem value="bisexual">Bisexual</SelectItem>
                  <SelectItem value="pansexual">Pansexual</SelectItem>
                  <SelectItem value="asexual">Asexual</SelectItem>
                  <SelectItem value="queer">Queer</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="website" className="text-sm font-medium">Website</label>
            <Input 
              id="website"
              name="website" 
              type="url"
              value={formData.website} 
              onChange={handleChange}
              placeholder="https://your-website.com"
            />
          </div>
          
          <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </MainLayout>
  );
};

export default ProfileEdit;
