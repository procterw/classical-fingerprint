import { Box } from "@mui/material";
import { ReactNode, useEffect, useRef, useState } from "react";



export const StickyHeader = (props: { children: ReactNode, offset?: number }) => {
  const stickyRef = useRef(null);

  const [stickyOffset, setStickyOffset] = useState(0);
  const [stickyWidth, setStickyWidth] = useState(0);

  const rescale = () => {
    // @ts-ignore
    setStickyWidth(stickyRef?.current?.offsetWidth);
  };

  const scroll = () => {
    // @ts-ignore
    setStickyOffset(stickyRef?.current?.getBoundingClientRect().y);
  }

  useEffect(() => {
    rescale();
    scroll();

    window.addEventListener('scroll', scroll);
    window.addEventListener('resize', rescale);
    return () => {
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('resize', rescale);
    }
  }, []);

  const headerHeight = 64;

  return (
    <>
      <Box
        ref={stickyRef}
        visibility={stickyOffset >= headerHeight ? 'visible' : 'hidden' }
      >
        { props.children }
      </Box>

      <Box
        display={stickyOffset < headerHeight ? 'block' : 'none' }
        position="fixed"
        top={headerHeight}
        zIndex={1000}
        width={stickyWidth}>
        { props.children }
      </Box>
    </>
  );
};
