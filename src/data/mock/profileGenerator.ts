
import { Escort } from "@/types/escort";
import { faker } from "@faker-js/faker";

export const generateRandomProfile = (): Escort => {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    age: faker.number.int({ min: 18, max: 45 }),
    bio: faker.lorem.paragraph(),
    location: faker.location.city(),
    profileImage: faker.image.urlPicsum(),
    avatarUrl: faker.image.avatarGitHub(),
    serviceTypes: ['in-person', 'virtual'],
    price: {
      hourly: faker.number.int({ min: 200, max: 500 }),
      twoHours: faker.number.int({ min: 350, max: 800 }),
      overnight: faker.number.int({ min: 1000, max: 2000 })
    },
    languages: [faker.location.countryCode()],
    providesInPersonServices: true,
    providesVirtualContent: true,
    isAI: false,
    profileType: 'manual'
  };
};
