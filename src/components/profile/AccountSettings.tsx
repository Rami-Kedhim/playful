
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import AccountItem from "./settings/AccountItem";
import PasswordDialog from "./settings/PasswordDialog";
import EmailDialog from "./settings/EmailDialog";
import LucoinBalance from "./settings/LucoinBalance";
import ProfileCompleteness from "./ProfileCompleteness";

interface AccountSettingsProps {
  user: any;
  profile: any;
}

const AccountSettings = ({ user, profile }: AccountSettingsProps) => {
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const { updatePassword } = useAuth();
  
  const getLastPasswordChange = () => {
    // This would typically come from the user metadata
    // For now, we'll just return 'Never' as a placeholder
    return "Never";
  };
  
  return (
    <div className="space-y-6">
      {profile && (
        <ProfileCompleteness completeness={profile.profile_completeness || 0} />
      )}

      <AccountItem 
        title="Email Address" 
        subtitle={user?.email} 
        actionLabel="Change Email"
        onAction={() => setEmailDialogOpen(true)}
      />
      
      <AccountItem 
        title="Password" 
        subtitle={`Last changed: ${getLastPasswordChange()}`} 
        actionLabel="Change Password"
        onAction={() => setPasswordDialogOpen(true)}
      />
      
      <LucoinBalance balance={profile?.lucoin_balance || 0} />
      
      <PasswordDialog 
        open={passwordDialogOpen}
        onOpenChange={setPasswordDialogOpen}
        onUpdatePassword={updatePassword}
      />

      <EmailDialog 
        open={emailDialogOpen}
        onOpenChange={setEmailDialogOpen}
      />
    </div>
  );
};

export default AccountSettings;
