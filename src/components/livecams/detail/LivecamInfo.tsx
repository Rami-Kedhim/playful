
import React from "react";
import { LivecamModel } from "@/types/livecams";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LivecamStats } from "./";
import { LivecamActions } from "./";

interface LivecamInfoProps {
  model: LivecamModel;
  onTipClick: () => void;
  onStartChat?: () => void;
  onLikeAction: () => void;
  onFavoriteAction: () => void;
}

const LivecamInfo: React.FC<LivecamInfoProps> = ({ 
  model, 
  onTipClick, 
  onStartChat,
  onLikeAction,
  onFavoriteAction
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{model.displayName}</CardTitle>
            <CardDescription className="text-sm">
              {model.country && <span className="mr-2">{model.country}</span>}
              {model.categories && model.categories.map(category => (
                <Badge key={category} variant="outline" className="mr-1">{category}</Badge>
              ))}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {model.description && (
          <p className="text-sm text-muted-foreground">{model.description}</p>
        )}
        
        {model.isLive && <LivecamStats model={model} />}
        
        <LivecamActions 
          model={model} 
          onTipClick={onTipClick}
          onStartChat={onStartChat}
          onLike={onLikeAction}
          onFavorite={onFavoriteAction}
        />
      </CardContent>
    </Card>
  );
};

export default LivecamInfo;
