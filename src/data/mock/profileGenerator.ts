
import { faker } from '@faker-js/faker';
import { Escort } from '@/types/escort';
import { VerificationLevel } from '@/types/verification';

// Generate a random escort profile
export function generateRandomEscort(): Escort {
  const id = faker.string.uuid();
  const gender = faker.helpers.arrayElement(['male', 'female', 'non-binary']);
  const firstName = faker.person.firstName(gender === 'male' ? 'male' : 'female');
  const lastName = faker.person.lastName();
  
  return {
    id,
    user_id: id,
    name: `${firstName} ${lastName}`,
    email: faker.internet.email({ firstName, lastName }),
    avatar: faker.image.avatar(),
    gender,
    age: faker.number.int({ min: 21, max: 45 }),
    bio: faker.lorem.paragraph(),
    location: faker.location.city(),
    phone: faker.phone.number(),
    website: faker.internet.url(),
    social_media: {
      instagram: `@${firstName.toLowerCase()}${faker.number.int(1000)}`,
      twitter: `@${firstName.toLowerCase()}${faker.number.int(1000)}`,
      onlyfans: `${firstName.toLowerCase()}${faker.number.int(1000)}`
    },
    hourly_rate: faker.number.int({ min: 100, max: 500 }).toString(),
    is_verified: faker.datatype.boolean(),
    verification_level: faker.helpers.arrayElement(Object.values(VerificationLevel)),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString(),
    reviews: Array.from({ length: faker.number.int({ min: 0, max: 10 }) }, () => ({
      id: faker.string.uuid(),
      userId: faker.string.uuid(),
      userName: faker.person.fullName(),
      rating: faker.number.int({ min: 1, max: 5 }),
      comment: faker.lorem.sentence(),
      date: faker.date.recent().toISOString(),
      verifiedBooking: faker.datatype.boolean()
    })),
    services: Array.from({ length: faker.number.int({ min: 3, max: 8 }) }, () => 
      faker.helpers.arrayElement(['massage', 'companionship', 'dinner_date', 'travel', 'overnight', 'weekend'])
    ),
    languages: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => 
      faker.helpers.arrayElement(['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Japanese', 'Chinese', 'Russian'])
    ),
    height: faker.number.int({ min: 150, max: 190 }).toString(),
    weight: faker.number.int({ min: 45, max: 100 }).toString(),
    hair_color: faker.helpers.arrayElement(['black', 'blonde', 'brown', 'red', 'white', 'grey', 'other']),
    eye_color: faker.helpers.arrayElement(['blue', 'brown', 'green', 'hazel', 'grey', 'other']),
    measurements: {
      bust: faker.number.int({ min: 75, max: 110 }).toString(),
      waist: faker.number.int({ min: 50, max: 90 }).toString(),
      hips: faker.number.int({ min: 75, max: 120 }).toString()
    },
    nationality: faker.location.country(),
    availability: [
      { day: 'monday', available: faker.datatype.boolean() },
      { day: 'tuesday', available: faker.datatype.boolean() },
      { day: 'wednesday', available: faker.datatype.boolean() },
      { day: 'thursday', available: faker.datatype.boolean() },
      { day: 'friday', available: faker.datatype.boolean() },
      { day: 'saturday', available: faker.datatype.boolean() },
      { day: 'sunday', available: faker.datatype.boolean() }
    ],
    images: Array.from({ length: faker.number.int({ min: 3, max: 10 }) }, () => faker.image.url()),
    videos: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () => faker.image.url()),
    tags: Array.from({ length: faker.number.int({ min: 3, max: 8 }) }, () => 
      faker.helpers.arrayElement(['GFE', 'PSE', 'BBW', 'Fetish', 'BDSM', 'Massage', 'Duo', 'Party', 'Travel', 'Elite'])
    ),
    orientation: faker.helpers.arrayElement(['straight', 'bisexual', 'gay', 'lesbian', 'pansexual']),
    ethnicity: faker.helpers.arrayElement(['caucasian', 'black', 'asian', 'hispanic', 'middle_eastern', 'indian', 'mixed', 'other']),
    body_type: faker.helpers.arrayElement(['slim', 'athletic', 'average', 'curvy', 'bbw', 'muscular']),
    is_featured: faker.datatype.boolean(),
    rating: faker.number.int({ min: 1, max: 5 })
  };
}

// Generate multiple random escort profiles
export function generateRandomEscorts(count: number): Escort[] {
  return Array.from({ length: count }, generateRandomEscort);
}

// Export the function to be used by UberPersonaService
export const generateRandomProfile = generateRandomEscort;
