
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useHermesSeo } from '@/hooks/useHermesSeo';
import { SeoOptimizationResult } from '@/types/seo';

const ProfileOptimizer: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState<string>("");
  const [profileType, setProfileType] = useState<string>("escort");
  const [profileData, setProfileData] = useState({
    title: "",
    bio: "",
    services: "",
    keywords: ""
  });

  const { enhanceContentSeo, optimizationResult, isLoading } = useHermesSeo();

  // Mock profiles data (in a real app, this would come from an API)
  const mockProfiles = [
    { id: "1", name: "Jessica Star", type: "escort" },
    { id: "2", name: "Amanda Love", type: "escort" },
    { id: "3", name: "Crystal Moon", type: "escort" },
    { id: "4", name: "Mike Thunder", type: "creator" },
    { id: "5", name: "Sarah Delight", type: "creator" }
  ];

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleOptimize = async () => {
    if (!selectedProfile) return;
    
    try {
      await enhanceContentSeo(
        selectedProfile,
        'profile',
        profileData.title,
        profileData.bio,
        profileData.keywords.split(',').map(k => k.trim()).filter(Boolean)
      );
    } catch (error) {
      console.error('Error optimizing profile:', error);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Select Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue={profileType} onValueChange={setProfileType}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="escort">Escorts</TabsTrigger>
                <TabsTrigger value="creator">Creators</TabsTrigger>
              </TabsList>
              
              <TabsContent value="escort" className="pt-4">
                <Select onValueChange={setSelectedProfile} value={selectedProfile}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an escort profile" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockProfiles
                      .filter(p => p.type === 'escort')
                      .map(profile => (
                        <SelectItem key={profile.id} value={profile.id}>
                          {profile.name}
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </TabsContent>
              
              <TabsContent value="creator" className="pt-4">
                <Select onValueChange={setSelectedProfile} value={selectedProfile}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a creator profile" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockProfiles
                      .filter(p => p.type === 'creator')
                      .map(profile => (
                        <SelectItem key={profile.id} value={profile.id}>
                          {profile.name}
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {selectedProfile && (
          <Card>
            <CardHeader>
              <CardTitle>Profile Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Profile Name/Title</Label>
                <Input
                  id="title"
                  value={profileData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter profile name or title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Profile Bio</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Enter profile bio or description"
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="services">Services Offered</Label>
                <Textarea
                  id="services"
                  value={profileData.services}
                  onChange={(e) => handleInputChange('services', e.target.value)}
                  placeholder="Enter services offered"
                  className="min-h-[80px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="keywords">Target Keywords</Label>
                <Input
                  id="keywords"
                  value={profileData.keywords}
                  onChange={(e) => handleInputChange('keywords', e.target.value)}
                  placeholder="Enter keywords separated by commas"
                />
              </div>
              
              <Button 
                onClick={handleOptimize}
                disabled={isLoading || !selectedProfile}
                className="w-full"
              >
                {isLoading ? "Optimizing..." : "Optimize Profile"}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
      
      <div>
        {optimizationResult ? (
          <ProfileOptimizationResults result={optimizationResult} />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Optimization Results</CardTitle>
            </CardHeader>
            <CardContent className="py-8 text-center text-muted-foreground">
              <p>Select a profile and optimize to see results</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

// Helper component to display optimization results
const ProfileOptimizationResults: React.FC<{ result: SeoOptimizationResult }> = ({ result }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Optimization Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-md p-3">
            <p className="text-sm text-muted-foreground">SEO Score</p>
            <p className="text-2xl font-bold">{result.seoScore}/100</p>
          </div>
          <div className="border rounded-md p-3">
            <p className="text-sm text-muted-foreground">Visibility</p>
            <p className="text-2xl font-bold">{result.visibilityScore || "N/A"}</p>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Meta Description</h3>
          <div className="bg-muted p-3 rounded-md text-sm">
            {result.metaDescription || "No meta description generated"}
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Recommendations</h3>
          <ul className="space-y-2">
            {result.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span className="text-sm">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Optimized Profile</h3>
          <div className="bg-muted p-3 rounded-md text-sm whitespace-pre-wrap max-h-[200px] overflow-y-auto">
            {result.optimizedContent || "No optimized content available"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileOptimizer;
