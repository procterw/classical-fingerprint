import debounce from "debounce";
import { useEffect, useState } from "react";

export const useWidth: Function = () => {
  // const breakpoint = 600;

  const [width, setWidth] = useState(window.innerWidth);

  const resetWidth = debounce(() => setWidth(window.innerWidth), 200);

  useEffect(() => {
    window.addEventListener('resize', resetWidth);
    return () => window.removeEventListener('resize', resetWidth);
  }, []);

  const mobile = (
    small: any,
    large: any,
  ): any => {
    if (width < 600) return small;
    return large;
  };

  const small = (
    small: any,
    large: any,
  ): any => {
    if (width < 900) return small;
    return large;
  };

  const medium = (
    small: any,
    large: any,
  ): any => {
    if (width < 1200) return small;
    return large;
  };

  const large = (
    small: any,
    large: any,
  ): any => {
    if (width < 1400) return small;
    return large;
  };

  return {
    mobile,
    small,
    medium,
    large,
  }
};
