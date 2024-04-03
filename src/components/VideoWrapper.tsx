import { Box } from "@mui/system";
import { useWorkQueue } from "../state/useWorkQueue";
import { WorkVideo } from "./WorkVideo";
import { RatingModule } from "./RatingModule";
import { WorkControl } from "./WorkControl";
import { useEffect, useRef, useState } from "react";
import { useWidth } from "../state/useWidth";
import { WorkFilter } from "./WorkFilter";

export const VideoWrapper = () => {
  const { activeWork } = useWorkQueue();
  const mq = useWidth();

  const wrapperRef = useRef(null);
  const moduleRef = useRef(null);

  const [offset, setOffset] = useState(window.scrollY);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const rescale = () => {
    setOffset(window.scrollY);
    setWidth(wrapperRef?.current?.offsetWidth);

    setHeight((window.innerHeight * 0.5) + moduleRef?.current?.offsetHeight);
  };

  useEffect(() => {
    setOffset(window.scrollY);

    window.addEventListener('scroll', () => setOffset(window.scrollY));
    window.addEventListener('resize', () => setOffset(window.scrollY));
    return () => {
      window.removeEventListener('scroll', () => setOffset(window.scrollY));
      window.removeEventListener('resize', () => setOffset(window.scrollY));
    }
  }, []);

  const fullVideoHeight = (window.innerHeight * 0.5);

  // Scale down video height proportional to scroll offset until a threshold
  const videoHeight = Math.max(
    fullVideoHeight - offset,
    mq(200, 0),
  );

  // The difference in heights between the video players at 0 - max scroll
  const breakpoint = fullVideoHeight - mq(200, 0);

  // @ts-ignore
  const totalHeight = videoHeight + moduleRef?.current?.offsetHeight;

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        // height: totalHeight >= offset ? totalHeight + offset : totalHeight + 130
        height: totalHeight + Math.min(offset, breakpoint),
        // height: totalHeight - ((window.innerHeight * 0.5) - offset),
      }}
      ref={wrapperRef}
    >
      <Box
        sx={{
          position: 'fixed',
          // display: 'flex',
          // flexDirection: 'column',
          // gap: 2,
          // @ts-ignore
          width: wrapperRef?.current?.offsetWidth,
          height: totalHeight,
          // backgroundColor: 'rgba(255, 255, 255, 0.8)',
          zIndex: 1000,
        }}
      >
        <WorkVideo work={activeWork} height={videoHeight} />

        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          gap={2}
          ref={moduleRef}
          pt={2}
        >
          <RatingModule />
          <WorkFilter />
          <WorkControl />
        </Box>
      </Box>
    </Box>
  )
};

