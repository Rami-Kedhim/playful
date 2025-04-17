
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VerificationFlowSteps from './VerificationFlowSteps';
import VerificationStatusTab from './tabs/VerificationStatusTab';
import VerificationTypeTab from './tabs/VerificationTypeTab';
import VerificationSubmitTab from './tabs/VerificationSubmitTab';
import VerificationUpgradeTab from './tabs/VerificationUpgradeTab';

const VerificationContainer = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>("status");
  const [verificationType, setVerificationType] = useState<'personal' | 'business' | 'premium' | null>(null);
  const [showRequirements, setShowRequirements] = useState(false);
  
  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);
  
  const handleStartVerification = () => {
    setActiveTab("submit");
  };

  const handleVerificationSuccess = () => {
    setActiveTab("status");
  };

  const handleSubmitVerification = (data: any) => {
    console.log("Verification form submitted:", data);
    handleVerificationSuccess();
  };

  const handleSelectType = (type: 'personal' | 'business' | 'premium') => {
    setVerificationType(type);
    setShowRequirements(true);
  };

  const handleCompleteRequirements = () => {
    setShowRequirements(false);
    setActiveTab("submit");
  };

  // Use string values instead of enum values
  const getActiveStatus = () => {
    if (activeTab === "submit") {
      return "pending";
    } else {
      return "in_review";
    }
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
      
      <div className="grid gap-6">
        <VerificationFlowSteps 
          status={getActiveStatus()}
        />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="status">Status</TabsTrigger>
            <TabsTrigger value="type">Type</TabsTrigger>
            <TabsTrigger value="submit">Submit</TabsTrigger>
            <TabsTrigger value="upgrade">Upgrade</TabsTrigger>
          </TabsList>
          
          <TabsContent value="status" className="mt-6">
            <VerificationStatusTab onStartVerification={handleStartVerification} />
          </TabsContent>
          
          <TabsContent value="type" className="mt-6">
            <VerificationTypeTab
              showRequirements={showRequirements}
              verificationType={verificationType}
              onSelectType={handleSelectType}
              onCompleteRequirements={handleCompleteRequirements}
            />
          </TabsContent>

          <TabsContent value="submit" className="mt-6">
            <VerificationSubmitTab
              onSubmit={handleSubmitVerification}
              onComplete={handleVerificationSuccess}
            />
          </TabsContent>

          <TabsContent value="upgrade" className="mt-6">
            <VerificationUpgradeTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VerificationContainer;
