import { Box } from "@mui/material";
import { ReactNode, useEffect, useRef, useState } from "react";



export const StickyHeader = (props: { children: ReactNode, offset?: number }) => {
  const stickyRef = useRef(null);

  const [stickyOffset, setStickyOffset] = useState(0);
  const [stickyHeight, setStickyHeight] = useState(0);
  const [stickyWidth, setStickyWidth] = useState(0);

  const rescale = () => {
    // @ts-ignore
    setStickyHeight(stickyRef?.current?.offsetHeight);
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

  console.log(stickyOffset, stickyHeight, stickyWidth);

  return (
    <>
      <Box
        ref={stickyRef}
        visibility={stickyOffset >= 0 ? 'visible' : 'hidden' }
      >
        { props.children }
      </Box>

      <Box
        display={stickyOffset < 0 ? 'block' : 'none' }
        // visibility={stickyOffset < 0 ? 'visible' : 'hidden' }
        position="fixed"
        top={0}
        zIndex={1000}
        width={stickyWidth}>
        { props.children }
      </Box>
    </>
  );
};
