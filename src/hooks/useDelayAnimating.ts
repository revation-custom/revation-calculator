import { useEffect, useState } from 'react';

const useDelayAnimating = (delay: number) => {
  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return { isAnimating };
};

export default useDelayAnimating;
