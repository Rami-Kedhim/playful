
// Service categories with professional descriptions
export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  services: Service[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "companionship",
    name: "Companionship",
    description: "Social companionship services for various occasions",
    services: [
      {
        id: "dinner-date",
        name: "Dinner Date",
        description: "Sophisticated companionship for dining experiences"
      },
      {
        id: "social-events",
        name: "Social Events",
        description: "Accompaniment to social gatherings and events"
      },
      {
        id: "travel-companion",
        name: "Travel Companion",
        description: "Companionship during travel and vacations"
      },
      {
        id: "weekend-getaway",
        name: "Weekend Getaway",
        description: "Extended companionship for weekend travel"
      },
      {
        id: "gfe",
        name: "Girlfriend Experience",
        description: "Authentic connection and companionship experience"
      }
    ]
  },
  {
    id: "wellness",
    name: "Wellness & Relaxation",
    description: "Relaxation and wellness-focused services",
    services: [
      {
        id: "massage",
        name: "Massage",
        description: "Professional massage services"
      },
      {
        id: "tantric",
        name: "Tantric Experience",
        description: "Tantric wellness and meditation sessions"
      }
    ]
  },
  {
    id: "entertainment",
    name: "Entertainment",
    description: "Performance and entertainment services",
    services: [
      {
        id: "roleplay",
        name: "Roleplay",
        description: "Creative roleplaying experiences"
      },
      {
        id: "cosplay",
        name: "Cosplay",
        description: "Character and costume-based entertainment"
      },
      {
        id: "dancing",
        name: "Private Dancing",
        description: "Professional dance performances"
      }
    ]
  },
  {
    id: "specialty",
    name: "Specialty Services",
    description: "Unique and specialized services",
    services: [
      {
        id: "fetish-friendly",
        name: "Fetish Friendly",
        description: "Open to discussing various interests and preferences"
      },
      {
        id: "bdsm",
        name: "BDSM",
        description: "Bondage, discipline, and related experiences"
      },
      {
        id: "couples",
        name: "Couples Sessions",
        description: "Services for couples seeking shared experiences"
      }
    ]
  },
  {
    id: "virtual",
    name: "Virtual Services",
    description: "Remote and online services",
    services: [
      {
        id: "video-calls",
        name: "Video Calls",
        description: "Private video communication sessions"
      },
      {
        id: "virtual-date",
        name: "Virtual Date",
        description: "Online companionship experiences"
      },
      {
        id: "custom-content",
        name: "Custom Content",
        description: "Personalized digital content creation"
      }
    ]
  }
];

// Helper function to get a service by ID
export const getServiceById = (serviceId: string): Service | undefined => {
  for (const category of serviceCategories) {
    const service = category.services.find(s => s.id === serviceId);
    if (service) return service;
  }
  return undefined;
};

// Helper function to get a category by ID
export const getCategoryById = (categoryId: string): ServiceCategory | undefined => {
  return serviceCategories.find(c => c.id === categoryId);
};

// Helper function to get all services as a flat array
export const getAllServices = (): Service[] => {
  return serviceCategories.flatMap(category => category.services);
};

// Helper to convert legacy service strings to service IDs
export const mapLegacyServiceToId = (legacyName: string): string => {
  const mapping: Record<string, string> = {
    "GFE": "gfe",
    "Massage": "massage",
    "Overnight": "weekend-getaway",
    "Dinner Date": "dinner-date",
    "Travel Companion": "travel-companion",
    "Domination": "bdsm",
    "Roleplay": "roleplay",
    "BDSM": "bdsm",
    "French Kissing": "gfe",
    "Lingerie Shows": "dancing",
    "Exotic Dancing": "dancing",
    "Cosplay": "cosplay",
    "Striptease": "dancing",
    "Couples": "couples",
    "Fetish": "fetish-friendly",
    "Duo with Girl": "couples",
    "Light Domination": "bdsm",
    "Prostate Massage": "massage",
    "Tantric Massage": "tantric"
  };

  return mapping[legacyName] || legacyName.toLowerCase().replace(/\s+/g, '-');
};
