
import { faker } from '@faker-js/faker';
import { Escort, ServiceType } from '@/types/escort';
import { DatabaseGender } from '@/types/auth';

export const generateRandomProfile = (): Escort => {
  const gender = faker.helpers.arrayElement(['male', 'female']) as string;
  const firstName = gender === 'female' ? faker.person.firstName('female') : faker.person.firstName('male');
  const age = faker.number.int({ min: 21, max: 45 });
  const id = `profile-${faker.string.uuid()}`;
  
  // Create a consistent image based on the profile ID
  const imageNumber = faker.number.int({ min: 1, max: 1000 });
  const profileImage = `https://picsum.photos/id/${imageNumber}/800/1200`;
  
  const rates = {
    hourly: faker.number.int({ min: 100, max: 500 }),
    twoHours: faker.number.int({ min: 200, max: 900 }),
    overnight: faker.number.int({ min: 500, max: 2000 })
  };

  return {
    id,
    name: `${firstName}`,
    age,
    gender,
    location: faker.location.city(),
    price: rates.hourly,
    rates: rates,
    rating: faker.number.float({ min: 3.5, max: 5, precision: 0.1 }),
    reviewCount: faker.number.int({ min: 0, max: 100 }),
    reviews: faker.number.int({ min: 0, max: 100 }),
    verified: faker.datatype.boolean(),
    description: faker.lorem.paragraph(),
    bio: faker.lorem.paragraphs(2),
    tags: generateRandomTags(),
    languages: [faker.location.country(), faker.location.country()].slice(0, faker.number.int({ min: 1, max: 2 })),
    availableNow: faker.datatype.boolean(),
    avatar: profileImage,
    profileImage: profileImage,
    imageUrl: profileImage,
    avatar_url: profileImage,
    gallery: Array.from({ length: faker.number.int({ min: 3, max: 8 }) }, 
      () => `https://picsum.photos/id/${faker.number.int({ min: 1, max: 1000 })}/800/800`),
    height: faker.number.int({ min: 155, max: 190 }),
    weight: faker.number.int({ min: 45, max: 85 }),
    hairColor: faker.helpers.arrayElement(['blonde', 'brunette', 'black', 'red', 'brown']),
    eyeColor: faker.helpers.arrayElement(['blue', 'green', 'brown', 'hazel']),
    ethnicity: faker.helpers.arrayElement(['caucasian', 'asian', 'latin', 'african', 'mixed']),
    measurements: {
      bust: faker.number.int({ min: 80, max: 110 }),
      waist: faker.number.int({ min: 60, max: 90 }),
      hips: faker.number.int({ min: 85, max: 115 })
    },
    providesInPersonServices: faker.datatype.boolean(),
    providesVirtualContent: faker.datatype.boolean(),
    lastActive: faker.date.recent(),
    responseRate: faker.number.int({ min: 70, max: 100 }),
    isAI: faker.datatype.boolean(),
    videos: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () => ({
      id: faker.string.uuid(),
      url: 'https://example.com/video.mp4',
      thumbnail: `https://picsum.photos/id/${faker.number.int({ min: 1, max: 1000 })}/400/300`,
      title: faker.lorem.words(3),
      duration: faker.number.int({ min: 60, max: 300 }),
      isPublic: faker.datatype.boolean()
    }))
  };
};

const generateRandomTags = (): string[] => {
  const allServices = Object.values(ServiceType);
  const additionalTags = ['GFE', 'Couples', 'Duos', 'Fetish Friendly', 'Lingerie', 'Party', 'Travel'];
  const combinedTags = [...allServices, ...additionalTags];
  
  const numberOfTags = faker.number.int({ min: 2, max: 5 });
  let selectedTags: string[] = [];
  
  for (let i = 0; i < numberOfTags; i++) {
    const randomTag = faker.helpers.arrayElement(combinedTags);
    if (!selectedTags.includes(randomTag)) {
      selectedTags.push(randomTag);
    }
  }
  
  return selectedTags;
};

export default generateRandomProfile;
