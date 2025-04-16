
interface MeasurementsObject {
  bust?: string | number;
  waist?: string | number;
  hips?: string | number;
}

export const formatMeasurements = (measurements: string | MeasurementsObject | undefined): string => {
  if (!measurements) {
    return 'Not specified';
  }
  
  // If measurements is a string, return it directly
  if (typeof measurements === 'string') {
    return measurements;
  }
  
  // If measurements is an object, format it as bust-waist-hips
  const bust = measurements.bust !== undefined ? measurements.bust : '?';
  const waist = measurements.waist !== undefined ? measurements.waist : '?';
  const hips = measurements.hips !== undefined ? measurements.hips : '?';
  
  return `${bust}-${waist}-${hips}`;
};

export default formatMeasurements;
