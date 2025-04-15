
/**
 * Unified service types for the application
 */

export enum ServiceType {
  ESCORT = 'escort',
  CREATOR = 'creator',
  LIVECAM = 'livecam',
  AI_COMPANION = 'ai_companion'
}

export interface ServiceCapabilities {
  hasPhysicalServices: boolean;
  hasVirtualServices: boolean;
  hasLiveStreaming: boolean;
  hasContentCreation: boolean;
  hasChatting: boolean;
  hasVoiceCalls: boolean;
  hasVideoCalls: boolean;
}

export const getServiceCapabilities = (type: ServiceType): ServiceCapabilities => {
  switch (type) {
    case ServiceType.ESCORT:
      return {
        hasPhysicalServices: true,
        hasVirtualServices: true,
        hasLiveStreaming: false,
        hasContentCreation: true,
        hasChatting: true,
        hasVoiceCalls: false,
        hasVideoCalls: false,
      };
    
    case ServiceType.CREATOR:
      return {
        hasPhysicalServices: false,
        hasVirtualServices: true,
        hasLiveStreaming: true,
        hasContentCreation: true,
        hasChatting: true,
        hasVoiceCalls: false,
        hasVideoCalls: true,
      };
    
    case ServiceType.LIVECAM:
      return {
        hasPhysicalServices: false,
        hasVirtualServices: true,
        hasLiveStreaming: true,
        hasContentCreation: false,
        hasChatting: true,
        hasVoiceCalls: true,
        hasVideoCalls: true,
      };
      
    case ServiceType.AI_COMPANION:
      return {
        hasPhysicalServices: false,
        hasVirtualServices: true,
        hasLiveStreaming: false,
        hasContentCreation: false,
        hasChatting: true,
        hasVoiceCalls: true,
        hasVideoCalls: false,
      };
  }
};

// Service-specific types
export type PhysicalServiceType = 
  | 'in_person_date'
  | 'overnight'
  | 'dinner_date'
  | 'travel_companion'
  | 'massage'
  | 'gfe'
  | 'couple';

export type VirtualServiceType = 
  | 'video_call'
  | 'voice_call'
  | 'chat'
  | 'live_stream'
  | 'content_subscription'
  | 'custom_content';

// Helper function to check if a user can provide a specific service type
export const canProvideService = (
  persona: any, 
  serviceType: PhysicalServiceType | VirtualServiceType
): boolean => {
  // Physical services
  if (
    ['in_person_date', 'overnight', 'dinner_date', 'travel_companion', 'massage', 'gfe', 'couple']
    .includes(serviceType)
  ) {
    return persona.roleFlags?.isEscort && 
           (persona.providesInPersonServices || persona.capabilities?.hasBooking);
  }
  
  // Virtual services
  if (['video_call', 'voice_call', 'chat'].includes(serviceType)) {
    return persona.capabilities?.hasChat || 
           persona.roleFlags?.isLivecam || 
           persona.roleFlags?.isCreator;
  }
  
  if (serviceType === 'live_stream') {
    return persona.capabilities?.hasLiveStream || persona.roleFlags?.isLivecam;
  }
  
  if (['content_subscription', 'custom_content'].includes(serviceType)) {
    return persona.roleFlags?.isCreator || 
          (persona.roleFlags?.isEscort && persona.capabilities?.hasExclusiveContent);
  }
  
  return false;
};
