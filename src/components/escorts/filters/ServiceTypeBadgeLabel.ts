
/**
 * Service type filter labels and utility functions
 */

export type ServiceTypeFilter = "in-person" | "virtual" | "both" | "";

export interface ServiceTypeInfo {
  name: string;
  description?: string;
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
 * Get detailed information about a service type
 */
export const getServiceTypeInfo = (type: ServiceTypeFilter): ServiceTypeInfo => {
  switch(type) {
    case "in-person": 
      return {
        name: "In-Person Services Only",
        description: "Escorts who offer face-to-face meetings"
      };
    case "virtual": 
      return {
        name: "Virtual Services Only",
        description: "Online content and virtual experiences"
      };
    case "both": 
      return {
        name: "Both In-Person & Virtual",
        description: "Escorts who offer both in-person and virtual services"
      };
    default: 
      return {
        name: "",
        description: ""
      };
  }
};

export default getServiceTypeName;
