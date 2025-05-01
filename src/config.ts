
// Configuration for the application

export const config = {
  API_URL: process.env.API_URL || 'https://api.example.com',
  APP_NAME: 'Uber Personas',
  VERSION: '1.0.0',
  DEFAULT_LOCALE: 'en',
  DEFAULT_TIMEZONE: 'UTC',
  FEATURES: {
    BOOST_ENABLED: true,
    VERIFICATION_ENABLED: true,
    AI_PROFILES_ENABLED: true,
    PAYMENTS_ENABLED: false,
    MESSAGING_ENABLED: true
  },
  LIMITS: {
    MAX_DAILY_BOOSTS: 3,
    MAX_FILE_SIZE_MB: 10,
    MAX_IMAGES_PER_PROFILE: 20
  }
};
