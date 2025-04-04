
import { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";

export interface LivecamDetailLayoutProps {
  sidebar: ReactNode;
  mainContent: ReactNode;
  chatContent?: ReactNode;
}

const LivecamDetailLayout = ({ sidebar, mainContent, chatContent }: LivecamDetailLayoutProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
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
    </div>
  );
};

export default LivecamDetailLayout;
