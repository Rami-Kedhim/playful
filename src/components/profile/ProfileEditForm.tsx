
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UserProfile } from '@/types/user';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

export interface ProfileEditFormProps {
  initialData: UserProfile;
  userId: string;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ initialData, userId }) => {
  const [formData, setFormData] = useState({
    bio: initialData.bio || '',
    location: initialData.location || '',
    phone: initialData.phone || '',
    website: initialData.website || '',
    sexual_orientation: initialData.sexual_orientation || ''
  });
  
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Mock update profile API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated."
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          placeholder="Tell us about yourself"
          rows={4}
          value={formData.bio}
          onChange={handleChange}
        />
      </div>
      
      <div className="space-y-1">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          name="location"
          placeholder="City, Country"
          value={formData.location}
          onChange={handleChange}
        />
      </div>
      
      <div className="space-y-1">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+1 (555) 123-4567"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      
      <div className="space-y-1">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          name="website"
          type="url"
          placeholder="https://yourwebsite.com"
          value={formData.website}
          onChange={handleChange}
        />
      </div>
      
      <div className="space-y-1">
        <Label htmlFor="sexual_orientation">Sexual Orientation</Label>
        <Input
          id="sexual_orientation"
          name="sexual_orientation"
          placeholder="Orientation"
          value={formData.sexual_orientation}
          onChange={handleChange}
        />
      </div>
      
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
};

export default ProfileEditForm;
