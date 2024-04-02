import { Box } from "@mui/system";
import { useWorkQueue } from "../state/useWorkQueue";
import { WorkPreview } from "./WorkPreview";
import { RatingModule } from "./RatingModule";
import { WorkControl } from "./WorkControl";
import { useEffect, useRef, useState } from "react";
import debounce from "debounce";
import { useWidth } from "../state/useWidth";


export const VideoWrapper = () => {
  const { activeWork } = useWorkQueue();
  const mq = useWidth();
  // const [width, setWidth] = useState(1);
  // const [height, setHeight] = useState(1);

  const wrapperRef = useRef(null);
  const moduleRef = useRef(null);

  const [offset, setOffset] = useState(window.scrollY);

  useEffect(() => {
    window.addEventListener('scroll', () => setOffset(window.scrollY));
    return () => window.removeEventListener('scroll', () => setOffset(window.scrollY));
  }, []);

  // const resetHeight = debounce(() => {
  //   // setWidth(wrapperRef?.current?.offsetWidth);
  //   // setHeight(contentRef?.current?.offsetHeight);
  // }, 0);


  // console.log(wrapperRef?.current?.offsetWidth);


  const fullVideoHeight = (window.innerHeight * 0.5);

  // Scale down video height proportional to scroll offset until a threshold
  const videoHeight = Math.max(
    fullVideoHeight - offset,
    mq(200, 250),
  );

  // The difference in heights between the video players at 0 - max scroll
  const breakpoint = fullVideoHeight - mq(200, 250);

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
          width: wrapperRef?.current?.offsetWidth,
          height: totalHeight,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          zIndex: 1000,
        }}
      >
        <WorkPreview work={activeWork} height={videoHeight} />

        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          padding={3}
          ref={moduleRef}
        >
          <Box>
            <RatingModule />
          </Box>

          <Box>
            <WorkControl />
          </Box>
        </Box>
      </Box>
    </Box>
  )
};

