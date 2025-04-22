import { validateGlobalPrice } from './validationUtils';

export function testPricingSystem() {
  const testPrices = [0.005, 0.02, 99999, 100001];
  testPrices.forEach(price => {
    try {
      validateGlobalPrice(price);
      console.log(`Price ${price} is valid.`);
    } catch (error) {
      console.error(error);
    }
  });
  
  // Test with market reference context
  const marketReferencePrice = 100;
  const testPricesWithContext = [85, 95, 105, 115, 120];
  
  testPricesWithContext.forEach(price => {
    try {
      validateGlobalPrice(price, { marketReference: marketReferencePrice });
      console.log(`Price ${price} is valid with market reference ${marketReferencePrice}.`);
    } catch (error) {
      console.error(error);
    }
  });
}

export function testBoostPackageValidation() {
  const validPackage = {
    id: 'boost-1',
    name: 'Basic Boost',
    price: 10,
    price_ubx: 100,
    duration: '24:00:00'
  };
  
  const invalidPackages = [
    { name: 'Missing ID', price: 10 },
    { id: 'no-price' },
    { id: 'negative-price', price: -5 },
    { id: 'too-expensive', price: 1000000 }
  ];
  
  try {
    validateGlobalPrice(validPackage.price);
    console.log('Valid package price passed validation');
  } catch (error) {
    console.error('Valid package failed validation:', error);
  }
  
  invalidPackages.forEach((pkg, index) => {
    try {
      if (pkg.price) {
        validateGlobalPrice(pkg.price);
      } else {
        console.log(`Package ${index} has no price to validate`);
      }
    } catch (error) {
      console.log(`Expected validation error for package ${index}:`, error);
    }
  });
}

export default {
  testPricingSystem,
  testBoostPackageValidation
};
