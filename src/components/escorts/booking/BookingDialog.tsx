
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Escort } from '@/types/escort';
import { ServiceTypeFilter } from '../filters/ServiceTypeBadgeLabel';
import ServiceTypeBadgeLabel from '../filters/ServiceTypeBadgeLabel';

interface BookingDialogProps {
  escort: Escort;
  isOpen: boolean;
  onClose: () => void;
}

const BookingDialog: React.FC<BookingDialogProps> = ({ escort, isOpen, onClose }) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  
  // Determine service type based on escort properties
  const getServiceType = (): ServiceTypeFilter => {
    if (escort.providesInPersonServices && escort.providesVirtualContent) {
      return "both";
    } else if (escort.providesInPersonServices) {
      return "in-person";
    } else if (escort.providesVirtualContent) {
      return "virtual";
    }
    return "";
  };

  const serviceType = getServiceType();
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Book an Appointment
            {serviceType && <ServiceTypeBadgeLabel type={serviceType} />}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={(date) => date < new Date()}
          />
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
