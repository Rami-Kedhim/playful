
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VerificationForm from '@/components/verification/form/VerificationForm';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { useRole } from '@/hooks/auth/useRole';

const VerificationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('escort');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const { user } = useAuth();
  const { hasRole } = useRole();
  
  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // TODO: Handle actual verification submission to backend
      console.log('Verification data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Verification submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Authentication Required</AlertTitle>
          <AlertDescription>
            You must be logged in to access the verification page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (submitSuccess) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-md">
        <Alert className="bg-green-50 border-green-200">
          <ShieldCheck className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Verification Submitted</AlertTitle>
          <AlertDescription className="text-green-700">
            Your verification request has been submitted successfully. We will review your documents and update your status shortly.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Account Verification</h1>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Verify Your Account</CardTitle>
          <CardDescription>
            Verification helps ensure a safe community and unlocks additional features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="escort">Escort</TabsTrigger>
              <TabsTrigger value="creator">Creator</TabsTrigger>
              <TabsTrigger value="livecam">Livecam</TabsTrigger>
            </TabsList>
            
            <TabsContent value="escort">
              <VerificationForm 
                onSubmit={handleSubmit}
                loading={isSubmitting}
                serviceType="escort"
              />
            </TabsContent>
            
            <TabsContent value="creator">
              <VerificationForm 
                onSubmit={handleSubmit}
                loading={isSubmitting}
                serviceType="creator"
              />
            </TabsContent>
            
            <TabsContent value="livecam">
              <VerificationForm 
                onSubmit={handleSubmit}
                loading={isSubmitting}
                serviceType="livecam"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationPage;
