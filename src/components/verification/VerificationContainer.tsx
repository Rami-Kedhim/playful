
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VerificationStatusTab from './tabs/VerificationStatusTab';
import VerificationUpgradeTab from './tabs/VerificationUpgradeTab';
import VerificationDocumentTab from './tabs/VerificationDocumentTab';

export interface VerificationContainerProps {
  userId: string;
  currentLevel: 'basic' | 'verified' | 'premium';
  verificationStatus: 'unverified' | 'pending' | 'verified' | 'rejected';
}

const VerificationContainer: React.FC<VerificationContainerProps> = ({
  userId,
  currentLevel,
  verificationStatus
}) => {
  const [activeTab, setActiveTab] = useState('status');

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid grid-cols-3">
        <TabsTrigger value="status">Status</TabsTrigger>
        <TabsTrigger value="upgrade">Upgrade</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
      </TabsList>
      
      <TabsContent value="status" className="space-y-4">
        <VerificationStatusTab 
          userId={userId}
          currentLevel={currentLevel}
          verificationStatus={verificationStatus}
        />
      </TabsContent>
      
      <TabsContent value="upgrade" className="space-y-4">
        <VerificationUpgradeTab 
          userId={userId}
          currentLevel={currentLevel}
        />
      </TabsContent>
      
      <TabsContent value="documents" className="space-y-4">
        <VerificationDocumentTab 
          userId={userId}
        />
      </TabsContent>
    </Tabs>
  );
};

export default VerificationContainer;
