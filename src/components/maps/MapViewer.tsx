
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
  apiKey?: string; // Added missing apiKey prop
}

const MapViewer: React.FC<MapViewerProps> = ({
  center,
  zoom = 14,
  markers = [],
  onMarkerClick,
  height = '400px',
  width = '100%',
  apiKey // Use the provided API key
}) => {
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

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={zoom}
      options={{
        disableDefaultUI: false,
        zoomControl: true,
        streetViewControl: true,
        fullscreenControl: true
      }}
    >
      {markers.map(marker => (
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
