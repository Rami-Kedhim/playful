
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UserProfile } from '@/types/pulse-boost';

const ProfileEdit = () => {
  const navigate = useNavigate();
  // Mock profile data
  const initialProfile: UserProfile = {
    id: '1',
    fullName: 'John Doe',
    bio: 'I am a professional escort with 5 years of experience.',
    avatar_url: 'https://example.com/avatar.jpg',
    email: 'john@example.com',
    location: 'New York',
    sexual_orientation: 'Straight'
  };
  
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update profile success
      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              value={profile.fullName || ''}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={profile.email || ''}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={profile.location || ''}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          
          <div>
            <Label htmlFor="sexual_orientation">Sexual Orientation</Label>
            <Input
              id="sexual_orientation"
              name="sexual_orientation"
              value={profile.sexual_orientation || ''}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={profile.bio || ''}
              onChange={handleChange}
              className="w-full min-h-[150px]"
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => navigate('/profile')}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
