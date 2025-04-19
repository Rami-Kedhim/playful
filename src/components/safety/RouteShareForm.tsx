
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { MapPin, Navigation, Clock, Users, Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { RouteLocation, routeShareService } from "@/services/route/RouteShareService";
import mapService from "@/services/maps/MapService";
import { useAuth } from "@/hooks/auth/useAuthContext";

interface RouteShareFormProps {
  onShareCreated?: (shareId: string) => void;
}

const RouteShareForm: React.FC<RouteShareFormProps> = ({ onShareCreated }) => {
  const { user } = useAuth();
  const [startAddress, setStartAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");
  const [duration, setDuration] = useState("24");
  const [purpose, setPurpose] = useState("personal");
  const [contactsToShare, setContactsToShare] = useState<string[]>([]);
  const [isSharingLocation, setIsSharingLocation] = useState(false);
  const [isLoadingPosition, setIsLoadingPosition] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDetectCurrentLocation = async () => {
    setIsLoadingPosition(true);
    
    try {
      if (!navigator.geolocation) {
        toast({
          title: "Error",
          description: "Geolocation is not supported by your browser",
          variant: "destructive"
        });
        return;
      }
      
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        
        const address = await mapService.reverseGeocode(latitude, longitude);
        if (address) {
          setStartAddress(address);
        }
        
        setIsLoadingPosition(false);
      }, (error) => {
        console.error("Error getting location:", error);
        toast({
          title: "Location Error",
          description: "Unable to get your current location",
          variant: "destructive"
        });
        setIsLoadingPosition(false);
      });
    } catch (error) {
      console.error("Error in handleDetectCurrentLocation:", error);
      setIsLoadingPosition(false);
    }
  };

  const handleCreateRouteShare = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to share routes",
        variant: "destructive"
      });
      return;
    }
    
    if (!startAddress || !endAddress) {
      toast({
        title: "Missing Information",
        description: "Please provide both start and destination addresses",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Geocode the addresses to get coordinates
      const startLocation = await mapService.geocode(startAddress);
      const endLocation = await mapService.geocode(endAddress);
      
      if (!startLocation || !endLocation) {
        toast({
          title: "Geocoding Error",
          description: "Unable to find coordinates for the provided addresses",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }
      
      // Create route share
      const routeShare = await routeShareService.createRouteShare(
        user.id,
        startLocation as RouteLocation,
        endLocation as RouteLocation,
        {
          expiresIn: parseInt(duration),
          sharedWith: contactsToShare,
          metadata: {
            purpose,
            safetyCode: Math.random().toString(36).substring(2, 8).toUpperCase()
          }
        }
      );
      
      if (!routeShare) {
        toast({
          title: "Error",
          description: "Failed to create route share",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }
      
      toast({
        title: "Route Shared",
        description: "Your route has been shared successfully",
      });
      
      // Reset form
      setStartAddress("");
      setEndAddress("");
      setDuration("24");
      setPurpose("personal");
      
      // Call callback if provided
      if (onShareCreated) {
        onShareCreated(routeShare.id);
      }
    } catch (error) {
      console.error("Error in handleCreateRouteShare:", error);
      toast({
        title: "Error",
        description: "An error occurred while sharing your route",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="h-5 w-5" />
          Share Your Route
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="start-location">Starting Location</Label>
          <div className="flex gap-2">
            <Input
              id="start-location"
              placeholder="Enter starting address"
              value={startAddress}
              onChange={(e) => setStartAddress(e.target.value)}
              className="flex-1"
            />
            <Button
              variant="outline"
              size="icon"
              type="button"
              onClick={handleDetectCurrentLocation}
              disabled={isLoadingPosition}
            >
              <MapPin className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="destination">Destination</Label>
          <Input
            id="destination"
            placeholder="Enter destination address"
            value={endAddress}
            onChange={(e) => setEndAddress(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Share Duration</Label>
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger id="duration">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Hour</SelectItem>
              <SelectItem value="3">3 Hours</SelectItem>
              <SelectItem value="6">6 Hours</SelectItem>
              <SelectItem value="12">12 Hours</SelectItem>
              <SelectItem value="24">24 Hours</SelectItem>
              <SelectItem value="48">48 Hours</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="purpose">Purpose</Label>
          <Select value={purpose} onValueChange={setPurpose}>
            <SelectTrigger id="purpose">
              <SelectValue placeholder="Select purpose" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="appointment">Appointment</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="emergency">Emergency</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <Switch
            id="share-location"
            checked={isSharingLocation}
            onCheckedChange={setIsSharingLocation}
          />
          <Label htmlFor="share-location" className="cursor-pointer">
            Share my real-time location during trip
          </Label>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleCreateRouteShare}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sharing..." : "Share Route"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RouteShareForm;
