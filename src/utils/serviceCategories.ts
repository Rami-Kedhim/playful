
export type ServiceCategory = 
  | 'companionship'
  | 'wellness'
  | 'entertainment'
  | 'professional';

export interface ServiceMapping {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
}

export const serviceCategories: Record<ServiceCategory, { name: string; description: string }> = {
  companionship: {
    name: "Companionship",
    description: "Social companionship for various occasions"
  },
  wellness: {
    name: "Wellness",
    description: "Relaxation and wellness services"
  },
  entertainment: {
    name: "Entertainment",
    description: "Entertainment and performances"
  },
  professional: {
    name: "Professional",
    description: "Professional escort services"
  }
};

export const serviceMappings: ServiceMapping[] = [
  {
    id: "gfe",
    name: "GFE",
    category: "companionship",
    description: "Girlfriend Experience - authentic companionship"
  },
  {
    id: "massage",
    name: "Massage",
    category: "wellness",
    description: "Professional massage services"
  },
  {
    id: "dinner-date",
    name: "Dinner Date",
    category: "companionship",
    description: "Companionship for dining experiences"
  },
  {
    id: "travel-companion",
    name: "Travel Companion",
    category: "companionship",
    description: "Companionship during travel"
  },
  {
    id: "overnight",
    name: "Overnight",
    category: "companionship",
    description: "Extended companionship services"
  },
  {
    id: "roleplay",
    name: "Roleplay",
    category: "entertainment",
    description: "Creative roleplay experiences"
  },
  {
    id: "cosplay",
    name: "Cosplay",
    category: "entertainment",
    description: "Character-based entertainment"
  },
  {
    id: "dancing",
    name: "Private Dancing",
    category: "entertainment",
    description: "Private dance performances"
  },
  {
    id: "social-events",
    name: "Social Events",
    category: "companionship",
    description: "Accompaniment to events and gatherings"
  }
];

export const mapServiceToCategory = (service: string): ServiceCategory => {
  const mapping = serviceMappings.find(m => 
    m.id === service.toLowerCase().replace(/\s+/g, '-') || 
    m.name === service
  );
  
  return mapping?.category || 'professional';
};

export const getServicesByCategory = (services: string[]): Record<ServiceCategory, string[]> => {
  const result: Record<ServiceCategory, string[]> = {
    companionship: [],
    wellness: [],
    entertainment: [],
    professional: []
  };
  
  services.forEach(service => {
    const category = mapServiceToCategory(service);
    result[category].push(service);
  });
  
  return result;
};

export const getProfessionalServices = (services: string[]): string[] => {
  // Filter out inappropriate services and categorize the rest
  return services.filter(service => {
    const lowercaseService = service.toLowerCase();
    const inappropriateTerms = [
      "anal", "deepthroat", "oral", "fetish", "bdsm", "submission", 
      "domination", "spanking", "bondage"
    ];
    
    return !inappropriateTerms.some(term => lowercaseService.includes(term));
  });
};
