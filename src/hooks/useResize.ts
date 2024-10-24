import { useEffect } from 'react';

const useResize = (handleResize: () => void) => {
  useEffect(() => {
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
};

export default useResize;
