
/**
 * Gets random items from an array
 * @param array The array to select items from
 * @param count Number of items to select
 * @returns Array of randomly selected items
 */
export const getRandomItems = <T>(array: T[], count: number): T[] => {
  if (count >= array.length) return [...array];
  
  const result: T[] = [];
  const copyArray = [...array];
  
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * copyArray.length);
    result.push(copyArray[randomIndex]);
    copyArray.splice(randomIndex, 1);
  }
  
  return result;
};
