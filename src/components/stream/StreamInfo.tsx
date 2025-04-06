
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Eye, Clock, CheckCircle } from "lucide-react";

interface StreamInfoProps {
  title: string;
  escortName: string;
  avatarUrl?: string;
  viewerCount: number;
  startedAt: string;
  verified: boolean;
  description?: string;
}

const StreamInfo: React.FC<StreamInfoProps> = ({
  title,
  escortName,
  avatarUrl,
  viewerCount,
  startedAt,
  verified,
  description
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt={escortName}
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
            <div>
              <div className="flex items-center">
                <span className="font-medium">{escortName}</span>
                {verified && (
                  <CheckCircle className="h-4 w-4 text-blue-500 ml-1" />
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>{viewerCount} watching</span>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>
                Started {formatDistanceToNow(new Date(startedAt), { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge>Live</Badge>
          <Badge variant="secondary">Adult Content</Badge>
          <Badge variant="outline">Private Show Available</Badge>
        </div>
        
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
};

export default StreamInfo;
