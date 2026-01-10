import { useCallback, useEffect, useState } from "react";

export function useWidth(): number {
  const getWindowWidth = useCallback((): number => {
    if (typeof window === 'undefined') {
      return 0;
    }
    return window.innerWidth;
  }, []);

  const [width, setWidth] = useState<number>(getWindowWidth());

  useEffect(() => {
    const handleResize = (): void => {
      setWidth(getWindowWidth());
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [getWindowWidth]);

  return width;
}
