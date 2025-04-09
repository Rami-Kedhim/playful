
/**
 * Service type filter labels and utility functions
 */

export type ServiceTypeFilter = "in-person" | "virtual" | "both" | "";

export interface ServiceTypeInfo {
  name: string;
  description: string;
  badgeLabel: string; // Shorter text for badges
  filterLabel: string; // Used in filter UI
  tooltip?: string; // Optional tooltip description
}

/**
 * Get a user-friendly name for service type filters
 */
export const getServiceTypeName = (type: ServiceTypeFilter): string => {
  switch(type) {
    case "in-person": return "In-Person Services";
    case "virtual": return "Virtual Services";
    case "both": return "In-Person & Virtual";
    default: return "All Services";
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
        name: "In-Person Services",
        description: "Escorts who offer face-to-face meetings",
        badgeLabel: "In-Person",
        filterLabel: "In-Person Only",
        tooltip: "Filter escorts who provide in-person services only"
      };
    case "virtual": 
      return {
        name: "Virtual Services",
        description: "Online content and virtual experiences",
        badgeLabel: "Virtual",
        filterLabel: "Virtual Only",
        tooltip: "Filter escorts who provide virtual services only"
      };
    case "both": 
      return {
        name: "Both In-Person & Virtual",
        description: "Escorts who offer both in-person and virtual services",
        badgeLabel: "Both Services",
        filterLabel: "Both Services",
        tooltip: "Filter escorts who provide both in-person and virtual services"
      };
    default: 
      return {
        name: "All Services",
        description: "No preference on service type",
        badgeLabel: "All Services",
        filterLabel: "No Preference",
        tooltip: "Show all service types"
      };
  }
};

export default getServiceTypeName;
