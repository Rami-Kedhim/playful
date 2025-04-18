
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CardContent, CardFooter } from '@/components/ui/card';
import { UserProfile } from '@/types/user';

interface ProfileEditFormProps {
  initialData: UserProfile;
  onSubmit: (data: Partial<UserProfile>) => Promise<boolean>;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState<UserProfile>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await onSubmit(formData);
      if (!result) {
        // Handle error if needed
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const capitalizeFirstLetter = (value: string | number | undefined): string => {
    const stringValue = String(value || '');
    return stringValue.length > 0 
      ? stringValue.charAt(0).toUpperCase() + stringValue.slice(1) 
      : '';
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-6 pt-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={formData.avatarUrl || formData.avatar_url || ''} alt="Profile" />
            <AvatarFallback>
              {capitalizeFirstLetter(initialData.id)}
            </AvatarFallback>
          </Avatar>
          
          <Button type="button" variant="outline" size="sm">
            Change Avatar
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input 
              id="location" 
              name="location"
              value={formData.location || ''}
              onChange={handleChange}
              placeholder="City, Country"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
              placeholder="+X XXX XXX XXXX"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input 
            id="website" 
            name="website"
            value={formData.website || ''}
            onChange={handleChange}
            placeholder="https://"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea 
            id="bio" 
            name="bio"
            value={formData.bio || ''}
            onChange={handleChange}
            placeholder="Tell us about yourself"
            rows={5}
          />
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-6">
        <Button type="button" variant="outline">Cancel</Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </CardFooter>
    </form>
  );
};

export default ProfileEditForm;
