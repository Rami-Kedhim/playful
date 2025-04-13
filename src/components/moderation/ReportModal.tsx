
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";

const REPORT_REASONS = [
  { id: "inappropriate", label: "Inappropriate Content" },
  { id: "fraud", label: "Fraud or Scam" },
  { id: "impersonation", label: "Impersonation" },
  { id: "underage", label: "Underage Content" },
  { id: "harassment", label: "Harassment or Bullying" },
  { id: "spam", label: "Spam or Misleading" },
  { id: "other", label: "Other" }
];

export interface ReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contentType: 'profile' | 'message' | 'content' | 'comment';
  contentId: string;
  contentTitle?: string;
  onSubmitReport: (report: {
    reason: string;
    details: string;
    contentType: string;
    contentId: string;
  }) => Promise<void>;
}

const ReportModal: React.FC<ReportModalProps> = ({
  open,
  onOpenChange,
  contentType,
  contentId,
  contentTitle,
  onSubmitReport
}) => {
  const [reason, setReason] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reason) {
      toast.error("Please select a reason for your report");
      return;
    }
    
    try {
      setIsSubmitting(true);
      await onSubmitReport({
        reason,
        details,
        contentType,
        contentId
      });
      
      toast.success("Report submitted successfully");
      onOpenChange(false);
      // Reset form
      setReason("");
      setDetails("");
    } catch (error) {
      toast.error("Failed to submit report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const contentTypeFormatted = contentType.charAt(0).toUpperCase() + contentType.slice(1);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Report {contentTypeFormatted}
          </DialogTitle>
          <DialogDescription>
            {contentTitle ? 
              `Reporting "${contentTitle}"` : 
              `Submit a report for this ${contentType.toLowerCase()}`
            }
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="reason" className="font-medium">
              Reason for reporting
            </Label>
            <RadioGroup 
              value={reason} 
              onValueChange={setReason}
              className="grid grid-cols-1 gap-2"
            >
              {REPORT_REASONS.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id} className="cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="details" className="font-medium">
              Additional details (optional)
            </Label>
            <Textarea
              id="details"
              placeholder="Please provide any additional information..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>
          
          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!reason || isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReportModal;
