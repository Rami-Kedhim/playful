
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useVerificationStatus } from './hooks/useVerificationStatus';
import VerificationForm from './form/VerificationForm';
import VerificationStatus from './VerificationStatus';
import VerificationLevelUpgrade from './level/VerificationLevelUpgrade';
import VerificationLevelType from './level/VerificationLevelType';

const VerificationContainer = () => {
  const { verification, loading, error } = useVerificationStatus();
  const [activeTab, setActiveTab] = useState('status');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleSelectType = (type: string) => {
    setSelectedType(type);
  };

  // Extract status and level safely
  const status = verification?.status?.toLowerCase() || 'none';
  const level = verification?.verificationLevel || verification?.requested_level || 'none';

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Identity Verification</CardTitle>
        <CardDescription>
          Verify your identity to unlock all platform features and build trust with other users.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="status">Status</TabsTrigger>
            <TabsTrigger value="verify">Verify</TabsTrigger>
            <TabsTrigger value="upgrade">Upgrade</TabsTrigger>
          </TabsList>
          
          <TabsContent value="status">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className="text-destructive">Error: {error}</div>
            ) : (
              <VerificationStatus 
                status={status as 'none' | 'pending' | 'approved' | 'rejected'}
                level={level}
              />
            )}
          </TabsContent>
          
          <TabsContent value="verify">
            <VerificationForm 
              onSubmissionComplete={() => setActiveTab('status')} 
            />
          </TabsContent>
          
          <TabsContent value="upgrade">
            <VerificationLevelUpgrade />
          </TabsContent>
        </Tabs>
        
        <div className="mt-8">
          <VerificationLevelType 
            selectedType={selectedType as 'personal' | 'business' | 'premium' | null}
            onSelectType={handleSelectType as (type: 'personal' | 'business' | 'premium') => void}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default VerificationContainer;

