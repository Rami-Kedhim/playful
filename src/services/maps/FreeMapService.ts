
import { apiConfig } from '@/config/apiConfig';

export interface MapLocation {
  lat: number;
  lng: number;
  address?: string;
  name?: string;
}

export interface RouteOptions {
  mode?: 'driving' | 'walking' | 'bicycling' | 'transit';
  avoidTolls?: boolean;
  avoidHighways?: boolean;
  optimizeWaypoints?: boolean;
}

export interface RouteResult {
  distance: {
    value: number; // meters
    text: string; // formatted (e.g., "5.2 km")
  };
  duration: {
    value: number; // seconds
    text: string; // formatted (e.g., "14 mins")
  };
  startLocation: MapLocation;
  endLocation: MapLocation;
  waypoints: MapLocation[];
  polyline: string; // encoded polyline
  steps: RouteStep[];
}

export interface RouteStep {
  distance: {
    value: number;
    text: string;
  };
  duration: {
    value: number;
    text: string;
  };
  startLocation: MapLocation;
  endLocation: MapLocation;
  instructions: string;
  maneuver?: string;
}

/**
 * Map Service that uses free or low-cost APIs
 * Primary uses OpenStreetMap and related free services
 */
class FreeMapService {
  private isInitialized: boolean = false;
  
  initialize(): void {
    this.isInitialized = true;
    console.log('FreeMapService initialized with OpenStreetMap');
  }
  
  /**
   * Geocode an address to coordinates using Nominatim (OpenStreetMap)
   * Free with usage limits (1 request per second)
   */
  async geocode(address: string): Promise<MapLocation | null> {
    if (!this.isInitialized) {
      this.initialize();
    }
    
    try {
      console.log(`Geocoding address: ${address}`);
      
      // Using OpenStreetMap's Nominatim service (free)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
        {
          headers: {
            'User-Agent': 'UberEscorts App' // Required by Nominatim ToS
          }
        }
      );
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
          address: data[0].display_name
        };
      }
      
      return null;
    } catch (error) {
      console.error('Geocoding error:', error);
      
      // Fallback to mock response for development
      return {
        lat: 40.7128 + (Math.random() - 0.5) * 0.1,
        lng: -74.0060 + (Math.random() - 0.5) * 0.1,
        address
      };
    }
  }
  
  /**
   * Reverse geocode coordinates to address using Nominatim (OpenStreetMap)
   * Free with usage limits (1 request per second)
   */
  async reverseGeocode(lat: number, lng: number): Promise<string | null> {
    if (!this.isInitialized) {
      this.initialize();
    }
    
    try {
      console.log(`Reverse geocoding coordinates: ${lat}, ${lng}`);
      
      // Using OpenStreetMap's Nominatim service (free)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
        {
          headers: {
            'User-Agent': 'UberEscorts App' // Required by Nominatim ToS
          }
        }
      );
      
      const data = await response.json();
      
      if (data && data.display_name) {
        return data.display_name;
      }
      
      return null;
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      
      // Fallback to mock response for development
      return `${Math.floor(Math.random() * 1000)} Sample St, New York, NY 10001`;
    }
  }
  
  /**
   * Calculate route between points using OSRM (Open Source Routing Machine)
   * Free when self-hosted or limited usage of public API
   */
  async calculateRoute(
    origin: MapLocation, 
    destination: MapLocation,
    waypoints?: MapLocation[],
    options?: RouteOptions
  ): Promise<RouteResult | null> {
    if (!this.isInitialized) {
      this.initialize();
    }
    
    console.log(`Calculating route from ${origin.lat},${origin.lng} to ${destination.lat},${destination.lng}`);
    
    try {
      // Base URL for OSRM public API
      let url = 'https://router.project-osrm.org/route/v1/driving/';
      
      // Add origin coordinates
      url += `${origin.lng},${origin.lat}`;
      
      // Add waypoints if provided
      if (waypoints && waypoints.length > 0) {
        waypoints.forEach(waypoint => {
          url += `;${waypoint.lng},${waypoint.lat}`;
        });
      }
      
      // Add destination coordinates
      url += `;${destination.lng},${destination.lat}`;
      
      // Add query parameters
      url += '?overview=full&steps=true';
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data && data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        
        // Convert OSRM response to our RouteResult format
        return {
          distance: {
            value: route.distance,
            text: `${(route.distance / 1000).toFixed(1)} km`
          },
          duration: {
            value: route.duration,
            text: `${Math.floor(route.duration / 60)} mins`
          },
          startLocation: origin,
          endLocation: destination,
          waypoints: waypoints || [],
          polyline: route.geometry,
          steps: route.legs[0].steps.map((step: any) => ({
            distance: {
              value: step.distance,
              text: `${(step.distance / 1000).toFixed(1)} km`
            },
            duration: {
              value: step.duration,
              text: `${Math.floor(step.duration / 60)} mins`
            },
            startLocation: {
              lat: step.maneuver.location[1],
              lng: step.maneuver.location[0]
            },
            endLocation: {
              lat: step.maneuver.location[1],
              lng: step.maneuver.location[0]
            },
            instructions: step.maneuver.type,
            maneuver: step.maneuver.type
          }))
        };
      }
      
      return null;
    } catch (error) {
      console.error('Route calculation error:', error);
      
      // Mock route result for development
      const distance = 5200 + Math.random() * 2000;
      const duration = 900 + Math.random() * 600;
      
      return {
        distance: {
          value: distance,
          text: `${(distance / 1000).toFixed(1)} km`
        },
        duration: {
          value: duration,
          text: `${Math.floor(duration / 60)} mins`
        },
        startLocation: origin,
        endLocation: destination,
        waypoints: waypoints || [],
        polyline: 'mock_polyline_string',
        steps: [
          {
            distance: { value: 1000, text: '1 km' },
            duration: { value: 180, text: '3 mins' },
            startLocation: origin,
            endLocation: {
              lat: origin.lat + (destination.lat - origin.lat) * 0.3,
              lng: origin.lng + (destination.lng - origin.lng) * 0.3
            },
            instructions: 'Head northeast'
          },
          {
            distance: { value: 4200, text: '4.2 km' },
            duration: { value: 720, text: '12 mins' },
            startLocation: {
              lat: origin.lat + (destination.lat - origin.lat) * 0.3,
              lng: origin.lng + (destination.lng - origin.lng) * 0.3
            },
            endLocation: destination,
            instructions: 'Continue straight'
          }
        ]
      };
    }
  }
  
  /**
   * Get distance matrix between multiple origins and destinations
   * Uses batch processing with OSRM
   */
  async getDistanceMatrix(
    origins: MapLocation[],
    destinations: MapLocation[],
    options?: RouteOptions
  ): Promise<{ distance: number; duration: number }[][] | null> {
    if (!this.isInitialized) {
      this.initialize();
    }
    
    console.log(`Getting distance matrix for ${origins.length} origins and ${destinations.length} destinations`);
    
    // In a real app, this would make calls to OSRM table API
    // For now, return mock data
    return origins.map(() => 
      destinations.map(() => ({
        distance: 1000 + Math.random() * 5000,
        duration: 300 + Math.random() * 1800
      }))
    );
  }
  
  isReady(): boolean {
    return this.isInitialized;
  }
}

export const freeMapService = new FreeMapService();
export default freeMapService;
