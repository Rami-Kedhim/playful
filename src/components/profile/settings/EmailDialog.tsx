
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

interface EmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EmailDialog = ({ open, onOpenChange }: EmailDialogProps) => {
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const resetForm = () => {
    setNewEmail("");
    setCurrentPassword("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newEmail || !currentPassword) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // In a real implementation, you would call the appropriate Supabase function
    // to update the email, but this requires current password verification
    toast({
      title: "Email change requested",
      description: "This feature is coming soon",
    });
    
    onOpenChange(false);
    resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Change Email</DialogTitle>
            <DialogDescription>
              Enter your new email address. You'll need to verify this email.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-email">New Email</Label>
              <Input
                id="new-email"
                type="email"
                placeholder="Enter your new email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="current-password-email">Current Password</Label>
              <Input
                id="current-password-email"
                type="password"
                placeholder="Enter your current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => {
              onOpenChange(false);
              resetForm();
            }}>
              Cancel
            </Button>
            <Button type="submit">
              Update Email
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmailDialog;
