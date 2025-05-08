// Update import to use consistent casing
import { Escort } from '@/types/Escort';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SocialShareContent from './SocialShareContent';
import DirectMessageContent from './DirectMessageContent';

interface ShareProfileModalProps {
  escort: Escort;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const ShareProfileModal = ({ escort, isOpen, onOpenChange }: ShareProfileModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Profile</DialogTitle>
          <DialogDescription>
            Share this profile with your friends and followers.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="social" className="space-y-4">
          <TabsList>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="direct">Direct</TabsTrigger>
          </TabsList>
          <Separator />
          <TabsContent value="social" className="space-y-2">
            <SocialShareContent escort={escort} />
          </TabsContent>
          <TabsContent value="direct">
            <DirectMessageContent onSubmit={(phone) => {
              console.log("Sending SMS to:", phone);
              onOpenChange(false);
            }} />
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareProfileModal;
