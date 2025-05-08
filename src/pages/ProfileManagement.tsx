
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { UserProfile } from '@/types/pulse-boost';

const ProfileManagement = () => {
  // Mock user profile with the missing properties
  const mockProfile: UserProfile = {
    id: '1',
    email: 'user@example.com',
    username: 'user123',
    fullName: 'John Doe',
    bio: 'Professional escort with 5 years of experience.',
    avatar_url: 'https://example.com/avatar.jpg',
    location: 'New York, NY',
    userId: 'user-123',
    createdAt: new Date(2022, 5, 15),
    isBoosted: false
  };
  
  const [profile, setProfile] = useState<UserProfile>(mockProfile);
  
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-bold">Profile Management</h1>
        <div className="mt-3 md:mt-0">
          <Link to="/profile/edit">
            <Button>Edit Profile</Button>
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 mb-4">
                  {profile.avatar_url ? (
                    <img src={profile.avatar_url} alt={profile.username} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center text-4xl font-bold text-muted-foreground">
                      {profile.username?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                
                <h2 className="text-xl font-bold">{profile.fullName}</h2>
                <p className="text-muted-foreground">@{profile.username}</p>
                
                <div className="mt-4 w-full">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Profile Completion</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div className="mt-6 w-full">
                  <div className="flex flex-col space-y-2">
                    <Button variant="outline" size="sm" className="justify-start">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Personal Information
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
                      </svg>
                      Security Settings
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Subscription & Billing
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="md:col-span-2">
          <Tabs defaultValue="profile">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="ads">Ads & Boost</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Full Name</div>
                        <div>{profile.fullName}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Username</div>
                        <div>{profile.username}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Email</div>
                        <div>{profile.email}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Location</div>
                        <div>{profile.location || 'Not specified'}</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground">Bio</div>
                      <div>{profile.bio || 'No bio added yet.'}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground">Member Since</div>
                      <div>{profile.createdAt?.toLocaleDateString()}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Verification Status</h3>
                  
                  <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-start space-x-3">
                    <div className="bg-green-100 p-1 rounded-full">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Verified Account</h4>
                      <p className="text-sm text-green-700 mt-1">Your account is fully verified and has access to all features.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-6">
              {/* Analytics tab content */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Profile Analytics</h3>
                  <p className="text-muted-foreground">View detailed analytics about your profile performance.</p>
                  
                  {/* Add analytics components here */}
                  <div className="mt-6">Coming soon...</div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="ads" className="space-y-6">
              {/* Ads & Boost tab content */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Boost Your Profile</h3>
                  <p className="text-muted-foreground">Get more visibility with our powerful boost options.</p>
                  
                  <div className="mt-6">
                    <Link to="/pulse-boost">
                      <Button>View Boost Options</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;
