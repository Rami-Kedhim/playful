
import React from 'react';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  BadgeAlert, 
  ShieldAlert, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Bell, 
  BellOff,
  Trash2,
  RefreshCw,
  Download
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { VerificationBadge } from '@/components/ui/verification-badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const ContentSettings: React.FC = () => {
  const { toast } = useToast();
  
  const [settings, setSettings] = React.useState({
    // Content defaults
    defaultVisibility: 'public',
    defaultContentType: 'image',
    defaultPremium: false,
    defaultPrice: '5',
    
    // Watermarking
    watermarkEnabled: true,
    watermarkText: '@YourUsername',
    watermarkOpacity: '30',
    watermarkPosition: 'bottom-right',
    
    // Notifications
    notifyComments: true,
    notifyLikes: true,
    notifyPurchases: true,
    notifyMentions: true,
    
    // Privacy
    hideViewCount: false,
    hideLikeCount: false,
    disableComments: false,
    hideFromSearch: false,
    
    // Moderation
    autoModeration: true,
    sensitiveContent: false,
    
    // Auto-analytics
    weeklyReports: true,
    monthlyInsights: true
  });
  
  const handleChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handleSave = (section: string) => {
    // In a real application, this would make an API call
    toast({
      title: "Settings Saved",
      description: `Your ${section} settings have been updated.`
    });
  };
  
  const handleReset = () => {
    // In a real application, this would reset to defaults from the server
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to their defaults."
    });
  };
  
  return (
    <div className="space-y-6">
      <Accordion type="single" collapsible className="w-full" defaultValue="defaults">
        <AccordionItem value="defaults">
          <AccordionTrigger>
            <div className="flex items-center">
              <Eye className="mr-2 h-5 w-5" />
              <span>Content Default Settings</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardHeader>
                <CardTitle>Content Defaults</CardTitle>
                <CardDescription>
                  Set the default settings for new content uploads
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="defaultVisibility">Default Visibility</Label>
                    <Select 
                      value={settings.defaultVisibility} 
                      onValueChange={(value) => handleChange('defaultVisibility', value)}
                    >
                      <SelectTrigger id="defaultVisibility">
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="followers">Followers Only</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="defaultContentType">Default Content Type</Label>
                    <Select 
                      value={settings.defaultContentType} 
                      onValueChange={(value) => handleChange('defaultContentType', value)}
                    >
                      <SelectTrigger id="defaultContentType">
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="image">Image</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="audio">Audio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex flex-col">
                    <Label htmlFor="defaultPremium" className="mb-2">Default Premium Content</Label>
                    <div className="text-sm text-muted-foreground">
                      Make all uploaded content premium by default
                    </div>
                  </div>
                  <Switch 
                    id="defaultPremium" 
                    checked={settings.defaultPremium}
                    onCheckedChange={(checked) => handleChange('defaultPremium', checked)}
                  />
                </div>
                
                {settings.defaultPremium && (
                  <div className="space-y-2 border-l-2 pl-4 ml-2 border-primary/20">
                    <Label htmlFor="defaultPrice">Default Price (Lucoins)</Label>
                    <Input 
                      id="defaultPrice" 
                      type="number" 
                      min="1" 
                      value={settings.defaultPrice}
                      onChange={(e) => handleChange('defaultPrice', e.target.value)}
                    />
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => handleSave('content defaults')}
                  className="w-full sm:w-auto"
                >
                  Save Default Settings
                </Button>
              </CardFooter>
            </Card>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="watermarking">
          <AccordionTrigger>
            <div className="flex items-center">
              <ShieldCheck className="mr-2 h-5 w-5" />
              <span>Content Protection</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardHeader>
                <CardTitle>Watermarking Settings</CardTitle>
                <CardDescription>
                  Configure watermarks to protect your content from unauthorized use
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex flex-col">
                    <Label htmlFor="watermarkEnabled" className="mb-2">Enable Watermarking</Label>
                    <div className="text-sm text-muted-foreground">
                      Add watermark to all uploaded images and videos
                    </div>
                  </div>
                  <Switch 
                    id="watermarkEnabled" 
                    checked={settings.watermarkEnabled}
                    onCheckedChange={(checked) => handleChange('watermarkEnabled', checked)}
                  />
                </div>
                
                {settings.watermarkEnabled && (
                  <div className="space-y-4 border-l-2 pl-4 ml-2 border-primary/20">
                    <div className="space-y-2">
                      <Label htmlFor="watermarkText">Watermark Text</Label>
                      <Input 
                        id="watermarkText" 
                        value={settings.watermarkText}
                        onChange={(e) => handleChange('watermarkText', e.target.value)}
                        placeholder="Your username or custom text"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="watermarkOpacity">Opacity ({settings.watermarkOpacity}%)</Label>
                      <Input 
                        id="watermarkOpacity" 
                        type="range"
                        min="10"
                        max="100"
                        value={settings.watermarkOpacity}
                        onChange={(e) => handleChange('watermarkOpacity', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="watermarkPosition">Position</Label>
                      <Select 
                        value={settings.watermarkPosition} 
                        onValueChange={(value) => handleChange('watermarkPosition', value)}
                      >
                        <SelectTrigger id="watermarkPosition">
                          <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="top-left">Top Left</SelectItem>
                          <SelectItem value="top-right">Top Right</SelectItem>
                          <SelectItem value="center">Center</SelectItem>
                          <SelectItem value="bottom-left">Bottom Left</SelectItem>
                          <SelectItem value="bottom-right">Bottom Right</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => handleSave('watermarking')}
                  className="w-full sm:w-auto"
                >
                  Save Watermark Settings
                </Button>
              </CardFooter>
            </Card>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="notifications">
          <AccordionTrigger>
            <div className="flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              <span>Notification Preferences</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Control which content-related notifications you receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex-1">
                    <Label htmlFor="notifyComments" className="flex items-center cursor-pointer justify-between">
                      <span>Content Comments</span>
                      <Switch 
                        id="notifyComments" 
                        checked={settings.notifyComments}
                        onCheckedChange={(checked) => handleChange('notifyComments', checked)}
                      />
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Get notified when someone comments on your content
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex-1">
                    <Label htmlFor="notifyLikes" className="flex items-center cursor-pointer justify-between">
                      <span>Content Likes</span>
                      <Switch 
                        id="notifyLikes" 
                        checked={settings.notifyLikes}
                        onCheckedChange={(checked) => handleChange('notifyLikes', checked)}
                      />
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Get notified when someone likes your content
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex-1">
                    <Label htmlFor="notifyPurchases" className="flex items-center cursor-pointer justify-between">
                      <span>Content Purchases</span>
                      <Switch 
                        id="notifyPurchases" 
                        checked={settings.notifyPurchases}
                        onCheckedChange={(checked) => handleChange('notifyPurchases', checked)}
                      />
                    </Label>
                    <div className="flex items-center mt-1">
                      <Badge variant="default" className="mr-2">Important</Badge>
                      <p className="text-sm text-muted-foreground">
                        Get notified when someone purchases your premium content
                      </p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex-1">
                    <Label htmlFor="notifyMentions" className="flex items-center cursor-pointer justify-between">
                      <span>Content Mentions</span>
                      <Switch 
                        id="notifyMentions" 
                        checked={settings.notifyMentions}
                        onCheckedChange={(checked) => handleChange('notifyMentions', checked)}
                      />
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Get notified when someone mentions your content
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => handleSave('notifications')}
                  className="w-full sm:w-auto"
                >
                  Save Notification Settings
                </Button>
              </CardFooter>
            </Card>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="analytics">
          <AccordionTrigger>
            <div className="flex items-center">
              <RefreshCw className="mr-2 h-5 w-5" />
              <span>Analytics & Reports</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardHeader>
                <CardTitle>Analytics Settings</CardTitle>
                <CardDescription>
                  Configure your analytics preferences and automated reports
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex-1">
                    <Label htmlFor="weeklyReports" className="flex items-center cursor-pointer justify-between">
                      <span>Weekly Performance Reports</span>
                      <Switch 
                        id="weeklyReports" 
                        checked={settings.weeklyReports}
                        onCheckedChange={(checked) => handleChange('weeklyReports', checked)}
                      />
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Receive a weekly email with your content performance analytics
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex-1">
                    <Label htmlFor="monthlyInsights" className="flex items-center cursor-pointer justify-between">
                      <span>Monthly Insights Report</span>
                      <Switch 
                        id="monthlyInsights" 
                        checked={settings.monthlyInsights}
                        onCheckedChange={(checked) => handleChange('monthlyInsights', checked)}
                      />
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Get detailed monthly insights about your content performance and earnings
                    </p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Export Analytics Data (CSV)
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => handleSave('analytics')}
                  className="w-full sm:w-auto"
                >
                  Save Analytics Settings
                </Button>
              </CardFooter>
            </Card>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="verification">
          <AccordionTrigger>
            <div className="flex items-center">
              <BadgeAlert className="mr-2 h-5 w-5" />
              <span>Content Creator Verification</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <CardTitle>Content Creator Verification</CardTitle>
                    <CardDescription>
                      Complete verification to unlock premium features
                    </CardDescription>
                  </div>
                  <VerificationBadge status="verified" showLabel />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted rounded-md p-4">
                  <h3 className="font-medium mb-1">Verification Benefits</h3>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Premium content monetization</li>
                    <li>Higher visibility in search results</li>
                    <li>Access to exclusive creator tools</li>
                    <li>Verified badge on your profile</li>
                    <li>Higher credibility with users</li>
                  </ul>
                </div>
                
                <div className="rounded-md border p-4">
                  <div className="flex items-center">
                    <ShieldCheck className="h-5 w-5 text-green-500 mr-2" />
                    <div>
                      <h3 className="font-medium">Verification Status: Complete</h3>
                      <p className="text-sm text-muted-foreground">You have completed the verification process</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Button variant="outline">Review Verification Details</Button>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={handleReset}>
          Reset All Settings
        </Button>
        <Button variant="destructive" className="hidden" disabled>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete All Content
        </Button>
      </div>
    </div>
  );
};

export default ContentSettings;
