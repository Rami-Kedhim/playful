
import { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import MainLayout from "@/components/layout/MainLayout";
import { cn } from "@/lib/utils";

export interface LivecamDetailLayoutProps {
  sidebar: ReactNode;
  mainContent: ReactNode;
  chatContent?: ReactNode;
  title?: ReactNode;
  fullWidth?: boolean;
  containerClass?: string;
}

/**
 * LivecamDetailLayout provides a specialized layout for livecam detail pages
 * with a main content area, customizable sidebar, and optional chat panel.
 * It extends the MainLayout for consistency with the rest of the application.
 */
const LivecamDetailLayout = ({ 
  sidebar, 
  mainContent, 
  chatContent, 
  title,
  fullWidth = false,
  containerClass = "container mx-auto px-4 py-8"
}: LivecamDetailLayoutProps) => {
  return (
    <MainLayout 
      showHeader={false} 
      containerClass={containerClass}
      hideNavbar={false}
      hideFooter={false}
    >
      {title && <div className="mb-6">{title}</div>}
      
      <div className={cn(
        "grid grid-cols-1 lg:grid-cols-12 gap-8",
        fullWidth ? "w-full" : "max-w-full"
      )}>
        {/* Main content area - video stream and information */}
        <div className="lg:col-span-6 xl:col-span-7 order-2 lg:order-1">
          {mainContent}
        </div>
        
        {/* Chat area - only visible on larger screens by default */}
        {chatContent && (
          <div className="lg:col-span-3 xl:col-span-3 order-3 lg:order-2 hidden lg:block">
            {chatContent}
          </div>
        )}
        
        {/* Sidebar - information and actions */}
        <div className="lg:col-span-3 xl:col-span-2 order-1 lg:order-3">
          {sidebar}
        </div>
        
        {/* Mobile chat - only visible on smaller screens */}
        {chatContent && (
          <div className="col-span-1 order-4 block lg:hidden">
            {chatContent}
          </div>
        )}
      </div>
      
      <Separator className="my-8" />
    </MainLayout>
  );
};

export default LivecamDetailLayout;
