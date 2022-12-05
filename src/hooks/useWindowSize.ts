import { useEffect, useState, useMemo } from 'react';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  });
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const value = useMemo(() => {
    return { isMobile, windowSize };
  }, [isMobile, windowSize]);

  return value;
};

export default useWindowSize;
