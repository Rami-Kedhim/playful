
import React from "react";
import { LivecamModel } from "@/types/livecams";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Eye, Globe, Calendar, Clock } from "lucide-react";

interface LivecamStatsProps {
  model: LivecamModel;
}

const LivecamStats: React.FC<LivecamStatsProps> = ({ model }) => {
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">Live Stats</h3>
        
        <div className="grid grid-cols-2 gap-3">
          {model.isLive && model.viewerCount !== undefined && (
            <div className="flex items-center gap-2">
              <div className="bg-muted p-2 rounded-md">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Viewers</p>
                <p className="font-medium">{model.viewerCount.toLocaleString()}</p>
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <div className="bg-muted p-2 rounded-md">
              <Eye className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Status</p>
              <p className={`font-medium ${model.isLive ? "text-green-500" : "text-muted-foreground"}`}>
                {model.isLive ? "Live" : "Offline"}
              </p>
            </div>
          </div>
          
          {model.country && (
            <div className="flex items-center gap-2">
              <div className="bg-muted p-2 rounded-md">
                <Globe className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Region</p>
                <p className="font-medium">{model.country}</p>
              </div>
            </div>
          )}
          
          {model.age && (
            <div className="flex items-center gap-2">
              <div className="bg-muted p-2 rounded-md">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Age</p>
                <p className="font-medium">{model.age}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LivecamStats;
