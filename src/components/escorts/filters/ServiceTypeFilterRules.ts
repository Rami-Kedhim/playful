
export enum ServiceType {
  IN_PERSON = 'in-person',
  VIRTUAL = 'virtual',
  BOTH = 'both',
  MASSAGE = 'massage',
  DINNER = 'dinner'
}

export const ForbiddenTerms = [
  'illegal',
  'underage',
  'trafficking',
  'drugs',
  'child',
  'minor',
  'weapons',
  'force',
  'unwilling',
  'exploitation'
];

export const remapUnsafeService = (term: string): ServiceType => {
  // Check if the term contains any forbidden keywords and remap to a safe service type
  const lowerTerm = term.toLowerCase();

  if (
    lowerTerm.includes('massage') || 
    lowerTerm.includes('spa') || 
    lowerTerm.includes('therapy')
  ) {
    return ServiceType.MASSAGE;
  }
  
  if (
    lowerTerm.includes('dinner') ||
    lowerTerm.includes('date') ||
    lowerTerm.includes('companion')
  ) {
    return ServiceType.DINNER;
  }
  
  if (
    lowerTerm.includes('cam') ||
    lowerTerm.includes('virtual') ||
    lowerTerm.includes('online') ||
    lowerTerm.includes('digital') ||
    lowerTerm.includes('remote')
  ) {
    return ServiceType.VIRTUAL;
  }
  
  return ServiceType.IN_PERSON;
};

export const isAllowedServiceType = (term: string): boolean => {
  const lowerTerm = term.toLowerCase();
  
  // Check against forbidden terms
  for (const forbidden of ForbiddenTerms) {
    if (lowerTerm.includes(forbidden)) {
      return false;
    }
  }
  
  return true;
};

export const getServiceTypeDescription = (type: ServiceType): string => {
  switch (type) {
    case ServiceType.IN_PERSON:
      return 'In-person services and appointments';
    case ServiceType.VIRTUAL:
      return 'Online and digital services only';
    case ServiceType.BOTH:
      return 'Offers both in-person and virtual services';
    case ServiceType.MASSAGE:
      return 'Massage and wellness services';
    case ServiceType.DINNER:
      return 'Companionship for dining and events';
    default:
      return 'Service type not specified';
  }
};
