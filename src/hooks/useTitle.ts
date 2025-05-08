
import { useEffect } from 'react';

/**
 * Custom hook to set the document title
 * @param title The title to set
 */
export const useTitle = (title: string) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
};
