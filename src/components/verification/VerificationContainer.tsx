
import React, { useState } from 'react';
import VerificationForm from './form/VerificationForm';
import VerificationStatus from './VerificationStatus';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

const VerificationContainer = () => {
  const [activeTab, setActiveTab] = useState<string>("status");
  
  const handleStartVerification = () => {
    setActiveTab("submit");
  };

  const handleVerificationSuccess = () => {
    // Return to status tab after successful submission
    setActiveTab("status");
  };
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Identity Verification</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="status">Verification Status</TabsTrigger>
          <TabsTrigger value="submit">Submit Verification</TabsTrigger>
        </TabsList>
        
        <TabsContent value="status" className="mt-6">
          <VerificationStatus onStartVerification={handleStartVerification} />
        </TabsContent>
        
        <TabsContent value="submit" className="mt-6">
          <VerificationForm />
        </TabsContent>
      </Tabs>
      
      <Card className="mt-8 bg-muted/30">
        <CardContent className="pt-6">
          <h3 className="font-medium mb-2">Why is verification important?</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>Increases trust with potential clients</li>
            <li>Improves your visibility in search results</li>
            <li>Helps maintain a safe and reliable community</li>
            <li>Allows access to premium features and boosted rankings</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationContainer;
