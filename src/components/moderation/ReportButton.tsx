
import { useState } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { Flag } from 'lucide-react';
import ReportModal from './ReportModal';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/auth/useAuthContext';

export interface ReportButtonProps extends ButtonProps {
  contentType: 'profile' | 'message' | 'content' | 'comment';
  contentId: string;
  contentTitle?: string;
  iconOnly?: boolean;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}

const ReportButton = ({
  contentType,
  contentId,
  contentTitle,
  iconOnly = false,
  size = 'sm',
  variant = 'ghost',
  ...buttonProps
}: ReportButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const handleOpenModal = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to report content", {
        description: "You need to be logged in to submit reports",
        action: {
          label: "Sign In",
          onClick: () => window.location.href = "/auth"
        }
      });
      return;
    }
    setIsOpen(true);
  };

  const handleSubmitReport = async (report: {
    reason: string;
    details: string;
    contentType: string;
    contentId: string;
  }) => {
    // In a real implementation, this would send the report to your backend
    // For now we'll simulate a successful report with a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Report submitted:", {
      ...report,
      reporterId: user?.id,
      timestamp: new Date()
    });
    
    // In a real app, you would post this to your API
    // await fetch('/api/reports', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     ...report,
    //     reporterId: user?.id
    //   })
    // });
  };

  return (
    <>
      <Button
        onClick={handleOpenModal}
        size={size}
        variant={variant}
        {...buttonProps}
      >
        <Flag className="h-4 w-4 mr-2" />
        {!iconOnly && "Report"}
      </Button>
      
      <ReportModal
        open={isOpen}
        onOpenChange={setIsOpen}
        contentType={contentType}
        contentId={contentId}
        contentTitle={contentTitle}
        onSubmitReport={handleSubmitReport}
      />
    </>
  );
};

export default ReportButton;
