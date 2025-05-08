
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

export interface ServiceTypes {
  [key: string]: boolean;
}

export interface ServiceTypeOption {
  id: string;
  label: string;
  value: ServiceTypeFilter;
  description?: string;
  icon?: string;
}

export interface ServiceTypeGroup {
  id: string;
  label: string;
  options: ServiceTypeOption[];
}
