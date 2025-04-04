
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import AccountItem from "./settings/AccountItem";
import PasswordDialog from "./settings/PasswordDialog";
import EmailDialog from "./settings/EmailDialog";
import LucoinBalance from "./settings/LucoinBalance";
import ProfileCompleteness from "./ProfileCompleteness";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Shield, Zap } from "lucide-react";
import WalletConnect from "@/components/solana/WalletConnect";
import { AuthUser } from "@/types/auth"; // Import the AuthUser type

interface AccountSettingsProps {
  user: AuthUser;
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
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Wallet Connections</CardTitle>
          <CardDescription>
            Connect your cryptocurrency wallet to use Lucoins
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M113.5,23.7L76.8,45.2L84.6,29.9L113.5,23.7z" fill="#AB9FF2"/>
                  <path d="M113.5,23.7L76.8,45.2L86.1,35.6L113.5,23.7z" fill="#E5D8FF"/>
                  <path d="M13.9,23.7L50.6,45.8L42.6,29.9L13.9,23.7z" fill="#AB9FF2"/>
                  <path d="M13.9,23.7L50.6,45.8L41.3,35.3L13.9,23.7z" fill="#E5D8FF"/>
                  <path d="M98.9,88.9L86.1,110.1l32.3-8.9l9.1-31.2L98.9,88.9z" fill="#AB9FF2"/>
                  <path d="M25.1,88.9l12.8,21.2l-32.3-8.9l-9.1-31.2L25.1,88.9z" fill="#AB9FF2"/>
                  <path d="M41.8,59.4L34.6,74.3l41.7,2l-1.6-44.8L41.8,59.4z" fill="#AB9FF2"/>
                  <path d="M85.7,59.4l-7.3,14.9l-41.7,2l1.6-44.8L85.7,59.4z" fill="#E5D8FF"/>
                  <path d="M25.1,88.9L42.6,74.3L34.6,59.4L13.7,70.1L25.1,88.9z" fill="#E5D8FF"/>
                  <path d="M98.9,88.9L81.5,74.3l7.9-14.9l20.9,10.7L98.9,88.9z" fill="#E5D8FF"/>
                  <path d="M50.6,45.8L74.7,31.5L52.7,26.1L30.1,31.5L50.6,45.8z" fill="#AB9FF2"/>
                  <path d="M76.8,45.8L52.7,31.5l22.1-5.4l22.6,5.4L76.8,45.8z" fill="#E5D8FF"/>
                </svg>
              </div>
              <div>
                <div className="font-medium">Phantom Wallet</div>
                <div className="text-sm text-muted-foreground">Connect to buy Lucoins with SOL</div>
              </div>
            </div>
            <WalletConnect />
          </div>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground flex items-center">
            <Shield className="h-4 w-4 mr-1" />
            Your wallet is only used for transactions and never shared with third parties
          </div>
        </CardFooter>
      </Card>
      
      <LucoinBalance balance={profile?.lucoin_balance || 0} />
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Zap className="h-5 w-5 text-yellow-500 mr-2" />
            Premium Features
          </CardTitle>
          <CardDescription>
            Enhance your experience with premium features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <div className="font-medium">Profile Boost</div>
                <div className="text-sm text-muted-foreground">Get more visibility with a boosted profile</div>
              </div>
            </div>
            <div className="text-sm">
              From <span className="font-bold">5 LC</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <ExternalLink className="h-5 w-5" />
              </div>
              <div>
                <div className="font-medium">Premium Content</div>
                <div className="text-sm text-muted-foreground">Access exclusive content from creators</div>
              </div>
            </div>
            <div className="text-sm">
              From <span className="font-bold">10 LC</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
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
