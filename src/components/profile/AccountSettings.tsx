
import { Button } from "@/components/ui/button";

interface AccountSettingsProps {
  user: any;
  profile: any;
}

const AccountSettings = ({ user, profile }: AccountSettingsProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Email Address</h3>
            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>
          <Button variant="outline" size="sm">Change Email</Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Password</h3>
            <p className="text-sm text-gray-400">Last changed: Never</p>
          </div>
          <Button variant="outline" size="sm">Change Password</Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Lucoin Balance</h3>
            <p className="text-sm text-gray-400">{profile?.lucoin_balance || 0} LC</p>
          </div>
          <Button variant="outline" size="sm">Add Lucoins</Button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
