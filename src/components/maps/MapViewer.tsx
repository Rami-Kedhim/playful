import React, { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, LocateFixed, Plus, Minus, Layers } from "lucide-react";
import mapService, { MapLocation } from "@/services/maps/MapService";

interface MapViewerProps {
  origin?: MapLocation;
  destination?: MapLocation;
  waypoints?: MapLocation[];
  markers?: MapLocation[];
  height?: string;
  width?: string;
  className?: string;
  showControls?: boolean;
  onMarkerClick?: (location: MapLocation) => void;
}

const MapViewer: React.FC<MapViewerProps> = ({
  origin,
  destination,
  waypoints = [],
  markers = [],
  height = "400px",
  width = "100%",
  className = "",
  showControls = true,
  onMarkerClick
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    setIsLoading(true);
    
    try {
      const initMap = async () => {
        if (!mapContainerRef.current) return;
        
        console.log('Initializing map with:', {
          origin,
          destination,
          waypoints,
          markers
        });
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setIsLoading(false);
      };
      
      initMap();
    } catch (err) {
      console.error('Error initializing map:', err);
      setError('Failed to load map');
      setIsLoading(false);
    }
  }, [origin, destination, waypoints?.length, markers?.length]);

  const handleZoomIn = () => {
    console.log('Zoom in');
  };

  const handleZoomOut = () => {
    console.log('Zoom out');
  };

  const handleMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          console.log('Current location:', { latitude, longitude });
        },
        error => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation not supported');
    }
  };

  const handleToggleLayers = () => {
    console.log('Toggle layers');
  };

  return (
    <Card className={`overflow-hidden relative ${className}`} style={{ height, width }}>
      <div
        ref={mapContainerRef}
        className="absolute inset-0"
        style={{
          backgroundColor: '#e5e7eb',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")'
        }}
      >
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-destructive mb-2">Failed to load map</p>
            <Button size="sm" variant="outline" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        ) : (
          <>
            {origin && (
              <div className="absolute left-4 top-4">
                <Badge variant="ubx" className="flex items-center gap-1.5">
                  <MapPin className="h-3 w-3" />
                  Origin
                </Badge>
              </div>
            )}
            
            {destination && (
              <div className="absolute right-4 top-4">
                <Badge variant="ubx" className="flex items-center gap-1.5">
                  <Navigation className="h-3 w-3" />
                  Destination
                </Badge>
              </div>
            )}
          </>
        )}
      </div>

      {showControls && !isLoading && !error && (
        <div className="absolute right-4 bottom-4 flex flex-col gap-2">
          <Button size="icon" variant="ubx" onClick={handleZoomIn}>
            <Plus className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ubx" onClick={handleZoomOut}>
            <Minus className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ubx" onClick={handleMyLocation}>
            <LocateFixed className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ubx" onClick={handleToggleLayers}>
            <Layers className="h-4 w-4" />
          </Button>
        </div>
      )}
    </Card>
  );
};

export default MapViewer;
