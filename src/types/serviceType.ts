
// Define the ServiceType enum for reference
export enum ServiceTypeEnum {
  IN_PERSON = "in-person",
  VIRTUAL = "virtual",
  BOTH = "both",
  IN_CALL = "in-call",
  OUT_CALL = "out-call",
  MASSAGE = "massage",
  DINNER = "dinner",
  ANY = "any",
  ALL = "all"
}

// Export the ServiceTypeFilter type used throughout the app
// Make sure to include ALL variants used in the codebase
export type ServiceTypeFilter = 
  | "in-person" 
  | "virtual" 
  | "both" 
  | "in-call" 
  | "out-call" 
  | "massage" 
  | "dinner"
  | "any"
  | "all";

export type ServiceType = ServiceTypeFilter;

// Helper functions
export const isValidServiceType = (type: string): type is ServiceTypeFilter => {
  return [
    "in-person", "virtual", "both", "in-call", "out-call", 
    "massage", "dinner", "any", "all"
  ].includes(type);
};

export const getServiceTypeLabel = (type: ServiceTypeFilter): string => {
  switch (type) {
    case "in-person": return "In Person";
    case "virtual": return "Virtual";
    case "both": return "In-Person & Virtual";
    case "in-call": return "In-call";
    case "out-call": return "Out-call";
    case "massage": return "Massage";
    case "dinner": return "Dinner Date";
    case "all": return "All Services";
    case "any": return "Any Service";
    default: return "Any Service";
  }
};

export interface ServiceTypeContextType {
  serviceType: ServiceTypeFilter;
  setServiceType: (type: ServiceTypeFilter) => void;
  isInPersonService: boolean;
  isVirtualService: boolean;
  isBothServiceTypes: boolean;
  isAnyServiceType: boolean;
  clearServiceType: () => void;
  toggleServiceType?: (type: ServiceTypeFilter) => void;
  getServiceTypeLabel?: (type: ServiceTypeFilter) => string;
  specializedServiceTypes?: string[];
  selectedSpecializedTypes?: string[];
  toggleSpecializedType?: (type: string) => void;
  validateServiceName?: (name: string) => boolean;
  getSafeServiceName?: (name: string) => string;
}
