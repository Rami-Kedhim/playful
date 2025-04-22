
import React from "react";
import { LivecamModel } from "@/types/livecams";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LivecamBoostPanel from "./LivecamBoostPanel";
import LivecamStats from "./LivecamStats";

interface LivecamSidebarProps {
  model: LivecamModel;
  isBoosted?: boolean;
  boostStatus?: {
    timeRemaining?: number;
    intensity?: number;
  } | null;
  onBoost?: () => void;
  onCancelBoost?: () => void;
}

const LivecamSidebar: React.FC<LivecamSidebarProps> = ({ 
  model,
  isBoosted = false,
  boostStatus = null,
  onBoost = () => {},
  onCancelBoost = () => {}
}) => {
  return (
    <div className="space-y-4">
      <LivecamStats model={model} />
      
      <LivecamBoostPanel
        livecamId={model.id}
        isCurrentlyBoosted={isBoosted}
        boostStatus={boostStatus}
        onBoost={onBoost}
        onCancelBoost={onCancelBoost}
      />
      
      <Card>
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {model.categories && model.categories.length > 0 ? (
              model.categories.map((category, index) => (
                <Badge key={index} variant="outline">
                  {category}
                </Badge>
              ))
            ) : model.category ? (
              <Badge variant="outline">{model.category}</Badge>
            ) : (
              <p className="text-gray-500">No tags available</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LivecamSidebar;
