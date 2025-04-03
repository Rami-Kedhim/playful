
import React from "react";
import { LivecamModel } from "@/types/livecams";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface LivecamSidebarProps {
  model: LivecamModel;
}

const LivecamSidebar: React.FC<LivecamSidebarProps> = ({ model }) => {
  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-4">Model Info</h2>
        
        <div className="space-y-4">
          {model.language && (
            <div>
              <h3 className="text-sm font-medium text-gray-400">Language</h3>
              <p>{model.language}</p>
            </div>
          )}
          
          <div>
            <h3 className="text-sm font-medium text-gray-400">Status</h3>
            <p className={model.isLive ? "text-green-500" : "text-gray-500"}>
              {model.isLive ? "Live Now" : "Offline"}
            </p>
          </div>
          
          {model.viewerCount !== undefined && model.isLive && (
            <div>
              <h3 className="text-sm font-medium text-gray-400">Viewers</h3>
              <p>{model.viewerCount}</p>
            </div>
          )}
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {model.categories ? (
              model.categories.map((category, index) => (
                <Badge key={index} variant="outline">
                  {category}
                </Badge>
              ))
            ) : (
              <p className="text-gray-500">No tags available</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LivecamSidebar;
