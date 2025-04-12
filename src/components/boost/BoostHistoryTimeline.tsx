
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Clock, Calendar, ChevronRight } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

interface BoostEvent {
  id: string;
  type: 'purchase' | 'expire' | 'cancel';
  packageName?: string;
  date: Date;
  price?: number;
  duration?: string;
}

interface BoostHistoryTimelineProps {
  events: BoostEvent[];
  loading?: boolean;
  maxEvents?: number;
}

const BoostHistoryTimeline: React.FC<BoostHistoryTimelineProps> = ({
  events,
  loading = false,
  maxEvents = 5
}) => {
  const displayEvents = events.slice(0, maxEvents);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Boost History
          </CardTitle>
          <CardDescription>
            Loading boost history...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-full bg-muted"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (events.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Boost History
          </CardTitle>
          <CardDescription>
            Your boost activity history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="rounded-full bg-muted p-3">
              <Calendar className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              No boost history found. Your boost activities will appear here.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Calendar className="mr-2 h-5 w-5" />
          Boost History
        </CardTitle>
        <CardDescription>
          Recent boost activity timeline
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-muted-foreground/20"></div>
          <div className="space-y-6">
            {displayEvents.map((event) => (
              <div key={event.id} className="relative pl-10">
                <div className="absolute left-0 top-1 h-8 w-8 rounded-full flex items-center justify-center border border-muted bg-card">
                  {event.type === 'purchase' && (
                    <Zap className="h-4 w-4 text-primary" />
                  )}
                  {event.type === 'expire' && (
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  )}
                  {event.type === 'cancel' && (
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="text-destructive"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  )}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm leading-none pt-1">
                      {event.type === 'purchase' && 'Boost Purchased'}
                      {event.type === 'expire' && 'Boost Expired'}
                      {event.type === 'cancel' && 'Boost Cancelled'}
                    </h3>
                    <div>
                      {event.type === 'purchase' && (
                        <Badge variant="outline" className="text-xs font-normal">
                          {event.price} UBX
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    {format(event.date, 'PPp')} · {formatDistanceToNow(event.date, { addSuffix: true })}
                  </div>
                  
                  {event.packageName && (
                    <div className="text-sm">
                      <span className="text-primary">{event.packageName}</span>
                      {event.duration && <span> · {event.duration}</span>}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {events.length > maxEvents && (
            <div className="mt-4 text-center">
              <Button variant="ghost" size="sm" className="text-xs">
                View All History <ChevronRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BoostHistoryTimeline;

// Import Button separately to avoid circular dependencies
import { Button } from "@/components/ui/button";
