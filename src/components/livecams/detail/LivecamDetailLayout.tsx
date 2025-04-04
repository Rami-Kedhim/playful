
import { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";

export interface LivecamDetailLayoutProps {
  sidebar: ReactNode;
  mainContent: ReactNode;
}

const LivecamDetailLayout = ({ sidebar, mainContent }: LivecamDetailLayoutProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-3/4 order-2 lg:order-1">
          {mainContent}
        </div>
        
        <div className="w-full lg:w-1/4 order-1 lg:order-2">
          {sidebar}
        </div>
      </div>
      
      <Separator className="my-8" />
    </div>
  );
};

export default LivecamDetailLayout;
