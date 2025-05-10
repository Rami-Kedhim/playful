
import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/auth/useAuth';

interface DeleteAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DeleteAccountDialog: React.FC<DeleteAccountDialogProps> = ({ open, onOpenChange }) => {
  const [confirmation, setConfirmation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { deleteAccount } = useAuth();
  const { toast } = useToast();

  const handleDelete = async () => {
    if (confirmation !== 'DELETE') {
      toast({
        title: 'Error',
        description: 'Please type DELETE to confirm account deletion',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      // Pass an empty object as argument to fix the error
      await deleteAccount({});
      toast({
        title: 'Account deleted',
        description: 'Your account has been successfully deleted.',
      });
      onOpenChange(false);
    } catch (error) {
      console.error('Error deleting account:', error);
      toast({
        title: 'Error',
        description: 'Could not delete your account. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove all your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-2">
          <Label htmlFor="confirmation">
            Type <span className="font-bold">DELETE</span> to confirm
          </Label>
          <Input
            id="confirmation"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            autoComplete="off"
            placeholder="DELETE"
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={confirmation !== 'DELETE' || isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete Account'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAccountDialog;
