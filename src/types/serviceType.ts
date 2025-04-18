
export type ServiceType = "" | "in-person" | "virtual" | "both" | "all" | "incall" | "outcall" | "massage" | "dinner";

export interface ServiceTypeContextType {
  serviceType: ServiceType;
  setServiceType: (type: ServiceType) => void;
  isInPersonService: boolean;
  isVirtualService: boolean;
  isBothServiceTypes: boolean;
  isAnyServiceType: boolean;
  clearServiceType: () => void;
  toggleServiceType?: (type: ServiceType) => void;
  getServiceTypeLabel?: (type: ServiceType) => string;
  selectedSpecializedTypes?: string[];
  toggleSpecializedType?: (type: string) => void;
  validateServiceName?: (name: string) => boolean;
  getSafeServiceName?: (name: string) => string;
}
