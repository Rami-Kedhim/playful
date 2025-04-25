
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ContentUploader from '@/components/content/ContentUploader';
import ContentGallery from '@/components/content/ContentGallery';
import ContentAnalytics from '@/components/content/ContentAnalytics';
import ContentSettings from '@/components/content/ContentSettings';
import ContentLifecycleInfo from '@/components/content/ContentLifecycleInfo';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Info, LockIcon, Clock, Coins, BarChart, Shield } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';
import { VerificationLevel } from '@/types/verification';

const ContentManagementPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('gallery');
  
  // Properly check if user is verified by checking multiple possible locations of verification status
  const userMetadata = user?.user_metadata || {};
  const isVerified = 
    userMetadata.verification_status === 'approved' || 
    userMetadata.verification_level === VerificationLevel.BASIC || 
    userMetadata.verification_level === VerificationLevel.ENHANCED || 
    userMetadata.verification_level === VerificationLevel.PREMIUM || 
    userMetadata.isVerified === true;
  
  if (!user) {
    return (
      <MainLayout>
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-2xl font-bold mb-4">Content Management</h1>
          <p>Please sign in to access content management.</p>
        </div>
      </MainLayout>
    );
  }
  
  if (!isVerified) {
    return (
      <MainLayout>
        <div className="container mx-auto py-8 px-4">
          <div className="bg-muted/30 p-6 rounded-lg text-center">
            <LockIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h1 className="text-2xl font-bold mb-2">Verification Required</h1>
            <p className="mb-4 text-muted-foreground">
              You need to complete verification before you can upload and manage content.
            </p>
            <Button>Complete Verification</Button>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>Content Management | UberEscorts</title>
        <meta name="description" content="Manage your UberEscorts content, upload media and monitor performance." />
      </Helmet>
      
      <MainLayout>
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-2">Content Management</h1>
          <p className="text-muted-foreground mb-6">
            Upload and manage your content, track performance, and monetize your media.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="p-6 border-l-4 border-amber-500">
              <div className="flex items-start space-x-4">
                <Clock className="h-8 w-8 text-amber-500" />
                <div>
                  <h3 className="font-medium text-lg mb-1">Content Expiration</h3>
                  <p className="text-sm text-muted-foreground">
                    Photos and videos expire after 180 days of inactivity. Use Lucoin 
                    to renew expiring content or receive user interactions to extend automatically.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 border-l-4 border-emerald-500">
              <div className="flex items-start space-x-4">
                <Coins className="h-8 w-8 text-emerald-500" />
                <div>
                  <h3 className="font-medium text-lg mb-1">Renewal Pricing</h3>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Standard content:</span> 1 LC when expiring, 2 LC when expired<br />
                    <span className="font-medium">Premium/Video:</span> 2 LC when expiring, 3 LC when expired
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 border-l-4 border-blue-500">
              <div className="flex items-start space-x-4">
                <Shield className="h-8 w-8 text-blue-500" />
                <div>
                  <h3 className="font-medium text-lg mb-1">Content Policy</h3>
                  <p className="text-sm text-muted-foreground">
                    All content undergoes review for compliance with our content guidelines. 
                    Premium content requires age verification and follows stricter guidelines.
                  </p>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            <div className="lg:col-span-3">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="gallery">Gallery</TabsTrigger>
                  <TabsTrigger value="upload">Upload</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="gallery">
                  <ContentGallery />
                </TabsContent>
                
                <TabsContent value="upload">
                  <ContentUploader 
                    onSuccess={(media) => {
                      toast({
                        title: "Upload Successful",
                        description: `Your ${media.type} has been uploaded and is pending review.`,
                      });
                      setActiveTab('gallery');
                    }}
                  />
                </TabsContent>
                
                <TabsContent value="analytics">
                  <ContentAnalytics />
                </TabsContent>
                
                <TabsContent value="settings">
                  <ContentSettings />
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="lg:col-span-1">
              <ContentLifecycleInfo />
              
              <Alert className="mt-6">
                <Info className="h-4 w-4" />
                <AlertTitle>Chronos System</AlertTitle>
                <AlertDescription>
                  Our innovative content management system automatically manages your content lifecycle 
                  based on user engagement. Keep your profile fresh and relevant with minimal effort.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default ContentManagementPage;
