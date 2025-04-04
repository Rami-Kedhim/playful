
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
    description: "Social companionship services for various occasions, perfect for events, dining, and travel experiences.",
    services: [
      {
        id: "dinner-date",
        name: "Dinner Date",
        description: "Sophisticated companionship for dining experiences at restaurants and social venues."
      },
      {
        id: "social-events",
        name: "Social Events",
        description: "Professional accompaniment to parties, galas, corporate events and social gatherings."
      },
      {
        id: "travel-companion",
        name: "Travel Companion",
        description: "Experienced companionship during business or leisure travel, both domestic and international."
      },
      {
        id: "weekend-getaway",
        name: "Weekend Getaway",
        description: "Extended companionship for weekend travel and relaxing retreats."
      },
      {
        id: "gfe",
        name: "Girlfriend Experience",
        description: "Authentic connection with conversation, attention and genuine companionship."
      }
    ]
  },
  {
    id: "wellness",
    name: "Wellness & Relaxation",
    description: "Professional relaxation and wellness services focused on physical and mental rejuvenation.",
    services: [
      {
        id: "massage",
        name: "Massage",
        description: "Professional massage services including Swedish, deep tissue and aromatherapy options."
      },
      {
        id: "tantric",
        name: "Tantric Experience",
        description: "Traditional tantric wellness sessions focusing on energy, meditation and mindfulness."
      }
    ]
  },
  {
    id: "entertainment",
    name: "Entertainment",
    description: "Creative performance and entertainment services for a memorable and engaging experience.",
    services: [
      {
        id: "roleplay",
        name: "Roleplay",
        description: "Creative and imaginative roleplaying experiences customized to your preferences."
      },
      {
        id: "cosplay",
        name: "Cosplay",
        description: "Character and costume-based entertainment inspired by popular culture."
      },
      {
        id: "dancing",
        name: "Private Dancing",
        description: "Professional dance performances in various styles from classical to contemporary."
      }
    ]
  },
  {
    id: "specialty",
    name: "Specialty Services",
    description: "Unique and specialized experiences tailored to specific interests and preferences.",
    services: [
      {
        id: "fetish-friendly",
        name: "Fetish Friendly",
        description: "Open-minded professional experienced with various preferences and interests."
      },
      {
        id: "bdsm",
        name: "BDSM",
        description: "Consensual bondage, discipline and dominance experiences with safety as priority."
      },
      {
        id: "couples",
        name: "Couples Sessions",
        description: "Professional companionship services for couples seeking shared experiences."
      }
    ]
  },
  {
    id: "virtual",
    name: "Virtual Services",
    description: "Digital and remote experiences, perfect for distance connections or privacy preferences.",
    services: [
      {
        id: "video-calls",
        name: "Video Calls",
        description: "Private video communication sessions with high-quality interaction."
      },
      {
        id: "virtual-date",
        name: "Virtual Date",
        description: "Online companionship experiences including activities like watching movies together."
      },
      {
        id: "custom-content",
        name: "Custom Content",
        description: "Personalized digital content creation tailored to your specific requests."
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

// Get a list of all service IDs
export const getAllServiceIds = (): string[] => {
  return getAllServices().map(service => service.id);
};

// Get services by category ID
export const getServicesByCategoryId = (categoryId: string): Service[] => {
  const category = getCategoryById(categoryId);
  return category ? category.services : [];
};

// Function to get random popular services
export const getPopularServices = (count: number = 5): Service[] => {
  const allServices = getAllServices();
  const shuffled = [...allServices].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
