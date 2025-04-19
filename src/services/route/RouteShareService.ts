
import { supabase } from "@/lib/supabase";

export interface RouteLocation {
  latitude: number;
  longitude: number;
  address?: string;
  name?: string;
}

export interface RouteShare {
  id: string;
  userId: string;
  startLocation: RouteLocation;
  endLocation: RouteLocation;
  waypoints?: RouteLocation[];
  status: 'active' | 'completed' | 'cancelled' | 'expired';
  sharedWith: string[];
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  metadata?: {
    estimatedDuration?: number;
    estimatedDistance?: number;
    transportMode?: 'driving' | 'walking' | 'bicycling' | 'transit';
    purpose?: string;
    safetyCode?: string;
  };
}

class RouteShareService {
  async createRouteShare(
    userId: string,
    startLocation: RouteLocation,
    endLocation: RouteLocation,
    options: {
      waypoints?: RouteLocation[];
      sharedWith?: string[];
      expiresIn?: number; // Hours
      metadata?: Record<string, any>;
    } = {}
  ): Promise<RouteShare | null> {
    try {
      // Calculate expiration time (default 24h)
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + (options.expiresIn || 24));
      
      const routeShareData = {
        user_id: userId,
        start_location: startLocation,
        end_location: endLocation,
        waypoints: options.waypoints || [],
        shared_with: options.sharedWith || [],
        expires_at: expiresAt.toISOString(),
        metadata: options.metadata || {},
        status: 'active'
      };
      
      const { data, error } = await supabase
        .from('route_shares')
        .insert(routeShareData)
        .select('*')
        .single();
        
      if (error) {
        console.error('Failed to create route share:', error);
        return null;
      }
      
      return this.mapDatabaseRouteShare(data);
    } catch (error) {
      console.error('Error in createRouteShare:', error);
      return null;
    }
  }
  
  async getRouteShare(id: string): Promise<RouteShare | null> {
    try {
      const { data, error } = await supabase
        .from('route_shares')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error || !data) {
        console.error('Failed to fetch route share:', error);
        return null;
      }
      
      return this.mapDatabaseRouteShare(data);
    } catch (error) {
      console.error('Error in getRouteShare:', error);
      return null;
    }
  }
  
  async getActiveRouteSharesByUser(userId: string): Promise<RouteShare[]> {
    try {
      const { data, error } = await supabase
        .from('route_shares')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active')
        .gt('expires_at', new Date().toISOString());
        
      if (error) {
        console.error('Failed to fetch active route shares:', error);
        return [];
      }
      
      return data.map(this.mapDatabaseRouteShare);
    } catch (error) {
      console.error('Error in getActiveRouteSharesByUser:', error);
      return [];
    }
  }
  
  async getSharedWithMeRoutes(userId: string): Promise<RouteShare[]> {
    try {
      const { data, error } = await supabase
        .from('route_shares')
        .select('*')
        .contains('shared_with', [userId])
        .eq('status', 'active')
        .gt('expires_at', new Date().toISOString());
        
      if (error) {
        console.error('Failed to fetch routes shared with user:', error);
        return [];
      }
      
      return data.map(this.mapDatabaseRouteShare);
    } catch (error) {
      console.error('Error in getSharedWithMeRoutes:', error);
      return [];
    }
  }
  
  async updateRouteShare(
    id: string, 
    updates: Partial<RouteShare>
  ): Promise<RouteShare | null> {
    try {
      const updateData: any = {};
      
      if (updates.startLocation) updateData.start_location = updates.startLocation;
      if (updates.endLocation) updateData.end_location = updates.endLocation;
      if (updates.waypoints) updateData.waypoints = updates.waypoints;
      if (updates.status) updateData.status = updates.status;
      if (updates.sharedWith) updateData.shared_with = updates.sharedWith;
      if (updates.expiresAt) updateData.expires_at = updates.expiresAt;
      if (updates.metadata) updateData.metadata = updates.metadata;
      
      const { data, error } = await supabase
        .from('route_shares')
        .update(updateData)
        .eq('id', id)
        .select('*')
        .single();
        
      if (error) {
        console.error('Failed to update route share:', error);
        return null;
      }
      
      return this.mapDatabaseRouteShare(data);
    } catch (error) {
      console.error('Error in updateRouteShare:', error);
      return null;
    }
  }
  
  async cancelRouteShare(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('route_shares')
        .update({ status: 'cancelled' })
        .eq('id', id);
        
      if (error) {
        console.error('Failed to cancel route share:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error in cancelRouteShare:', error);
      return false;
    }
  }
  
  private mapDatabaseRouteShare(data: any): RouteShare {
    return {
      id: data.id,
      userId: data.user_id,
      startLocation: data.start_location,
      endLocation: data.end_location,
      waypoints: data.waypoints || [],
      status: data.status,
      sharedWith: data.shared_with || [],
      expiresAt: data.expires_at,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      metadata: data.metadata || {}
    };
  }
}

export const routeShareService = new RouteShareService();
