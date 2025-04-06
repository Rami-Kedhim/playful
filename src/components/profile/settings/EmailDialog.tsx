
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/auth/useAuth";

interface EmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EmailDialog = ({ open, onOpenChange }: EmailDialogProps) => {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validate email
    if (!email.includes('@') || !email.includes('.')) {
      setError("Please enter a valid email address");
      return;
    }
    
    setLoading(true);
    
    try {
      // This would typically call a function in your auth provider
      // to update the user's email address
      // await updateEmail(email);
      
      // For now, we'll just show a toast
      toast({
        title: "Email update initiated",
        description: "Check your new email to verify the change.",
      });
      
      handleClose();
    } catch (err: any) {
      setError(err.message || "Failed to update email");
    } finally {
      setLoading(false);
    }
  };
  
  const handleClose = () => {
    setEmail("");
    setPassword("");
    setError(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Email</DialogTitle>
          <DialogDescription>
            Update your account email address. We'll send a verification link to the new email.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {error && (
            <div className="text-sm font-medium text-destructive">{error}</div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="current-email">Current Email</Label>
            <Input 
              id="current-email" 
              type="email"
              value={user?.email}
              disabled
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="new-email">New Email</Label>
            <Input 
              id="new-email" 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Confirm with Password</Label>
            <Input 
              id="password" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <DialogFooter className="pt-4">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Email"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmailDialog;
