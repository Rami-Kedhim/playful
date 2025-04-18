
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import VerificationStatusTab from "./tabs/VerificationStatusTab";
import VerificationUpgradeTab from "./tabs/VerificationUpgradeTab";
import VerificationDocumentTab from "./tabs/VerificationDocumentTab";

interface VerificationContainerProps {
  userId: string;
  currentLevel: 'basic' | 'advanced' | 'premium';
  verificationStatus: {
    email: boolean;
    phone: boolean;
    identity: boolean;
    address: boolean;
    background: boolean;
  };
  onUpgrade?: (level: 'basic' | 'advanced' | 'premium') => void;
  onDocumentUpload?: (files: FileList) => Promise<boolean>;
}

export const VerificationContainer = ({
  userId,
  currentLevel,
  verificationStatus,
  onUpgrade,
  onDocumentUpload
}: VerificationContainerProps) => {
  const [activeTab, setActiveTab] = useState('status');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleUpgrade = async (level: 'basic' | 'advanced' | 'premium') => {
    if (onUpgrade) {
      setIsSubmitting(true);
      try {
        await onUpgrade(level);
        toast({
          title: "Verification Upgrade Requested",
          description: `Your upgrade to ${level} verification has been submitted.`,
        });
      } catch (error) {
        toast({
          title: "Upgrade Failed",
          description: "There was a problem processing your upgrade request.",
          variant: "destructive"
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  const handleDocumentUpload = async (files: FileList) => {
    if (onDocumentUpload) {
      setIsSubmitting(true);
      try {
        const success = await onDocumentUpload(files);
        
        if (success) {
          toast({
            title: "Documents Uploaded",
            description: "Your verification documents have been uploaded successfully.",
          });
          return true;
        } else {
          toast({
            title: "Upload Failed",
            description: "There was a problem uploading your documents.",
            variant: "destructive"
          });
          return false;
        }
      } catch (error) {
        toast({
          title: "Upload Error",
          description: "An unexpected error occurred while uploading documents.",
          variant: "destructive"
        });
        return false;
      } finally {
        setIsSubmitting(false);
      }
    }
    return false;
  };
  
  return (
    <Card className="overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="status">Verification Status</TabsTrigger>
          <TabsTrigger value="upgrade">Upgrade Level</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        
        <div className="p-6">
          <TabsContent value="status">
            <VerificationStatusTab 
              status={verificationStatus}
              currentLevel={currentLevel}
            />
          </TabsContent>
          
          <TabsContent value="upgrade">
            <VerificationUpgradeTab 
              currentLevel={currentLevel} 
              onUpgrade={handleUpgrade}
            />
          </TabsContent>
          
          <TabsContent value="documents">
            <VerificationDocumentTab
              userId={userId}
              currentLevel={currentLevel}
              onUpload={handleDocumentUpload}
              isSubmitting={isSubmitting}
            />
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  );
};

export default VerificationContainer;
