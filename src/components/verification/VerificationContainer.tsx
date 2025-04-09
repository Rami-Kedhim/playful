
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import VerificationForm from './form/VerificationForm';
import VerificationStatus from './VerificationStatus';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Shield } from 'lucide-react';

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
      
      <Card className="mt-8 bg-muted/30">
        <CardContent className="pt-6">
          <h3 className="font-medium mb-3">Why Verification Matters</h3>
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
    </div>
  );
};

export default VerificationContainer;
