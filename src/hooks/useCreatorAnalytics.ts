
// Fix type errors by adding type annotations and adjusting state to array when needed

import { useState, useEffect } from 'react';

export function useCreatorAnalytics() {
  const [analytics, setAnalytics] = useState<any[]>([]); // array to fix errors
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // Simulated fetch analytics function returning array
    const fetchAnalytics = async () => {
      // mock data
      const data = [
        { value: 10 },
        { value: 15 },
        { value: 25 }
      ];
      return data;
    };

    fetchAnalytics().then(data => {
      setAnalytics(data); // data is array
      setLoading(false);
    });
  }, []);

  const totalValue = analytics.reduce((acc, curr) => acc + (curr.value || 0), 0);

  return { analytics, loading, totalValue };
}

export default useCreatorAnalytics;

