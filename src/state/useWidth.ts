import debounce from "debounce";
import { useEffect, useState } from "react";

export const useWidth: Function = () => {
  const breakpoint = 600;

  const [width, setWidth] = useState(window.innerWidth);

  const resetWidth = debounce(() => setWidth(window.innerWidth), 200);

  useEffect(() => {
    window.addEventListener('resize', resetWidth);
    return () => window.removeEventListener('resize', resetWidth);
  }, []);

  return (
    small: any,
    large: any,
  ): any => {
    if (width < breakpoint) {
      return small;
    }
  
    return large;
  }
};
