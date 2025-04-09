
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import VerificationForm from './form/VerificationForm';
import VerificationStatus from './VerificationStatus';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Shield, ShieldCheck, ShieldAlert, Info } from 'lucide-react';
import VerificationBadge from './VerificationBadge';

const VerificationContainer = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>("status");
  
  // Check if we have a tab in the location state to handle redirects
  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);
  
  const handleStartVerification = () => {
    setActiveTab("submit");
  };

  const handleVerificationSuccess = () => {
    // Return to status tab after successful submission
    setActiveTab("status");
  };
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-2 flex items-center">
        <Shield className="h-5 w-5 mr-2 text-primary" />
        Identity Verification
      </h1>
      <p className="text-muted-foreground mb-6">
        Complete verification to enhance trust and access all platform features
      </p>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="status">Verification Status</TabsTrigger>
          <TabsTrigger value="submit">Submit Verification</TabsTrigger>
        </TabsList>
        
        <TabsContent value="status" className="mt-6">
          <VerificationStatus onStartVerification={handleStartVerification} />
        </TabsContent>
        
        <TabsContent value="submit" className="mt-6">
          <VerificationForm onSubmissionComplete={handleVerificationSuccess} />
        </TabsContent>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="text-base">Why Verification Matters</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[
                'Builds trust with potential clients and partners',
                'Improves your visibility in search results',
                'Helps maintain a safe and reliable community',
                'Unlocks premium features and boosted rankings'
              ].map((item, index) => (
                <li key={index} className="flex items-start text-sm text-muted-foreground">
                  <span className="text-primary mr-2">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="text-base flex items-center">
              <Info className="h-4 w-4 mr-2 text-blue-500" />
              Verification Levels
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <VerificationBadge level="basic" size="sm" showTooltip={false} />
                <span className="ml-2 text-sm">Basic Verification</span>
              </div>
              <span className="text-xs text-muted-foreground">ID Verification</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <VerificationBadge level="enhanced" size="sm" showTooltip={false} />
                <span className="ml-2 text-sm">Enhanced Verification</span>
              </div>
              <span className="text-xs text-muted-foreground">ID + Contact Verification</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <VerificationBadge level="premium" size="sm" showTooltip={false} />
                <span className="ml-2 text-sm">Premium Verification</span>
              </div>
              <span className="text-xs text-muted-foreground">ID + In-person Verification</span>
            </div>
            
            <p className="text-xs text-muted-foreground border-t border-border pt-3 mt-3">
              Higher verification levels increase trust and visibility on the platform.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerificationContainer;
