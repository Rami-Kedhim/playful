
import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RouteShare, routeShareService } from "@/services/route/RouteShareService";
import { format, formatDistanceToNow } from "date-fns";
import { MapPin, Navigation, Clock, Calendar, AlertTriangle, ThumbsUp, PhoneCall, MessageSquare } from "lucide-react";

interface RouteShareViewerProps {
  shareId: string;
  onAction?: (action: string, shareId: string) => void;
}

const RouteShareViewer: React.FC<RouteShareViewerProps> = ({ shareId, onAction }) => {
  const [routeShare, setRouteShare] = useState<RouteShare | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const fetchRouteShare = async () => {
      try {
        const data = await routeShareService.getRouteShare(shareId);
        setRouteShare(data);
      } catch (err) {
        setError("Failed to load route details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRouteShare();
  }, [shareId]);

  useEffect(() => {
    if (!routeShare) return;

    const updateTimeLeft = () => {
      const expiryTime = new Date(routeShare.expiresAt).getTime();
      const now = new Date().getTime();
      
      if (now >= expiryTime) {
        setTimeLeft("Expired");
        return;
      }
      
      setTimeLeft(formatDistanceToNow(expiryTime, { addSuffix: true }));
    };

    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 60000);
    
    return () => clearInterval(interval);
  }, [routeShare]);

  const handleViewMap = () => {
    if (onAction) onAction("viewMap", shareId);
    // In a real app, this would open a map view
    window.open(`https://maps.google.com/?q=${routeShare?.startLocation.latitude},${routeShare?.startLocation.longitude}`, "_blank");
  };

  const handleCheckIn = () => {
    if (onAction) onAction("checkIn", shareId);
    // In a real app, this would mark the user as checked in
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="py-6">
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !routeShare) {
    return (
      <Card>
        <CardContent className="py-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <AlertTriangle className="h-12 w-12 text-destructive" />
            <h3 className="text-xl font-semibold">Failed to Load Route</h3>
            <p className="text-muted-foreground">{error || "Route information not available"}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const isExpired = new Date(routeShare.expiresAt) < new Date();
  const isActive = routeShare.status === 'active';

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5" />
            Shared Route
          </CardTitle>
          <Badge variant={isActive && !isExpired ? "success" : "secondary"}>
            {isExpired ? "Expired" : routeShare.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground">From</p>
              <p className="font-medium">{routeShare.startLocation.address || "Unknown location"}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Navigation className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground">To</p>
              <p className="font-medium">{routeShare.endLocation.address || "Unknown destination"}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Expires {timeLeft}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {format(new Date(routeShare.createdAt), "MMM d, yyyy")}
            </span>
          </div>
        </div>

        {routeShare.metadata?.safetyCode && (
          <div className="mt-4 p-2 bg-secondary/20 rounded-md">
            <p className="text-sm font-medium">Safety Code</p>
            <p className="text-2xl font-bold tracking-wider text-center py-1">
              {routeShare.metadata.safetyCode}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-2">
        {isActive && !isExpired ? (
          <>
            <Button variant="outline" className="flex-1" onClick={handleViewMap}>
              <MapPin className="mr-1 h-4 w-4" />
              View Map
            </Button>
            <Button className="flex-1" onClick={handleCheckIn}>
              <ThumbsUp className="mr-1 h-4 w-4" />
              Check In
            </Button>
          </>
        ) : (
          <Button variant="outline" className="w-full" disabled>
            This route share has {isExpired ? "expired" : "ended"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default RouteShareViewer;
