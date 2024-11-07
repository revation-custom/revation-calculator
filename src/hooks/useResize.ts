import { useEffect } from 'react';

const useResize = (handleResize: () => void) => {
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
};

export default useResize;
