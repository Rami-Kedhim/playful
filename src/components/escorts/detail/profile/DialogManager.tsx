
import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Escort } from '@/types/Escort';

interface DialogManagerProps {
  escort: Escort;
  open: boolean;
  type: 'booking' | 'contact' | 'share';
  onClose: () => void;
}

const DialogManager: React.FC<DialogManagerProps> = ({
  escort,
  open,
  type,
  onClose
}) => {
  // Import components dynamically based on type
  const renderDialogContent = () => {
    switch (type) {
      case 'booking':
        return <div>Booking dialog content for {escort.name}</div>;
      case 'contact':
        return <div>Contact dialog content for {escort.name}</div>;
      case 'share':
        return <div>Share dialog content for {escort.name}</div>;
      default:
        return <div>Unknown dialog type</div>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        {renderDialogContent()}
      </DialogContent>
    </Dialog>
  );
};

export default DialogManager;
