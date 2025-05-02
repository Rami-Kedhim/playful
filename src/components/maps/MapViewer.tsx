
import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

interface MapViewerProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  markers?: Array<{
    id: string;
    position: {
      lat: number;
      lng: number;
    };
    title?: string;
  }>;
  onMarkerClick?: (markerId: string) => void;
  height?: string;
  width?: string;
  apiKey?: string; 
  latitude?: number; // Add missing property
  longitude?: number; // Add missing property
  markerLabel?: string; // Add missing property
}

const MapViewer: React.FC<MapViewerProps> = ({
  center,
  zoom = 14,
  markers = [],
  onMarkerClick,
  height = '400px',
  width = '100%',
  apiKey,
  latitude,
  longitude,
  markerLabel
}) => {
  // If latitude and longitude are provided, use them to create a center object
  const mapCenter = latitude && longitude 
    ? { lat: latitude, lng: longitude } 
    : center;

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey || process.env.GOOGLE_MAPS_API_KEY || ''
  });

  const mapContainerStyle = {
    width,
    height
  };

  const handleMarkerClick = (markerId: string) => {
    if (onMarkerClick) {
      onMarkerClick(markerId);
    }
  };

  // Create marker from latitude, longitude if provided
  const allMarkers = [...markers];
  if (latitude && longitude && !markers.some(m => m.position.lat === latitude && m.position.lng === longitude)) {
    allMarkers.push({
      id: 'main-marker',
      position: { lat: latitude, lng: longitude },
      title: markerLabel || 'Location'
    });
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={mapCenter}
      zoom={zoom}
      options={{
        disableDefaultUI: false,
        zoomControl: true,
        streetViewControl: true,
        fullscreenControl: true
      }}
    >
      {allMarkers.map(marker => (
        <Marker
          key={marker.id}
          position={marker.position}
          title={marker.title}
          onClick={() => handleMarkerClick(marker.id)}
        />
      ))}
    </GoogleMap>
  ) : (
    <div style={mapContainerStyle} className="bg-gray-200 flex items-center justify-center">
      <span className="text-gray-500">Loading map...</span>
    </div>
  );
};

export default MapViewer;
