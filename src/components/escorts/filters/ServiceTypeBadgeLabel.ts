
/**
 * Service type filter labels and utility functions
 */

export type ServiceTypeFilter = "in-person" | "virtual" | "both" | "";

export interface ServiceTypeInfo {
  name: string;
  description?: string;
  badgeLabel?: string; // Shorter text for badges
}

/**
 * Get a user-friendly name for service type filters
 */
export const getServiceTypeName = (type: ServiceTypeFilter): string => {
  switch(type) {
    case "in-person": return "In-Person Services Only";
    case "virtual": return "Virtual Services Only";
    case "both": return "Both In-Person & Virtual";
    default: return "";
  }
};

/**
 * Get a shorter badge label for display in filter badges
 */
export const getServiceTypeBadgeLabel = (type: ServiceTypeFilter): string => {
  switch(type) {
    case "in-person": return "In-Person";
    case "virtual": return "Virtual";
    case "both": return "In-Person & Virtual";
    default: return "";
  }
};

/**
 * Get detailed information about a service type
 */
export const getServiceTypeInfo = (type: ServiceTypeFilter): ServiceTypeInfo => {
  switch(type) {
    case "in-person": 
      return {
        name: "In-Person Services Only",
        description: "Escorts who offer face-to-face meetings",
        badgeLabel: "In-Person"
      };
    case "virtual": 
      return {
        name: "Virtual Services Only",
        description: "Online content and virtual experiences",
        badgeLabel: "Virtual"
      };
    case "both": 
      return {
        name: "Both In-Person & Virtual",
        description: "Escorts who offer both in-person and virtual services",
        badgeLabel: "In-Person & Virtual"
      };
    default: 
      return {
        name: "",
        description: ""
      };
  }
};

export default getServiceTypeName;
