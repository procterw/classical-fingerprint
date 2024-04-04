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
  const [containerWidth, setContainerWidth] = useState(0);
  const [fullVideoHeight, setFullVideoHeight] = useState(window.innerHeight * 0.5);

  const rescale = () => {
    // @ts-ignore
    setContainerWidth(wrapperRef?.current?.offsetWidth);
    setFullVideoHeight(window.innerHeight * 0.5);
    setOffset(window.scrollY);
  };

  useEffect(() => {
    rescale();

    window.addEventListener('scroll', rescale);
    window.addEventListener('resize', rescale);
    return () => {
      window.removeEventListener('scroll', rescale);
      window.removeEventListener('resize', rescale);
    }
  }, []);

  // Scale down video height proportional to scroll offset until a threshold
  const videoHeight = Math.max(
    fullVideoHeight - offset,
    mq.mobile(0, 50),
  );

  // The difference in heights between the video players at 0 - max scroll
  const breakpoint = fullVideoHeight - mq.mobile(0, 50);

  // @ts-ignore
  const totalHeight = videoHeight + moduleRef?.current?.offsetHeight;

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: totalHeight + Math.min(offset, breakpoint),
      }}
      ref={wrapperRef}
    >
      <Box
        sx={{
          position: 'fixed',
          width: containerWidth,
          height: totalHeight,
          zIndex: 1000,
        }}
      >
        <WorkVideo work={activeWork} height={videoHeight} fullHeight={fullVideoHeight} />

        <Box
          display="flex"
          // display={mq.large("block", "flex")}
          // flexDirection={mq.small("column", "row")}
          flexWrap="wrap"
          flexDirection="row"
          justifyContent={mq.medium("right", "space-between")}
          gap={mq.medium(1, 3)}
          ref={moduleRef}
          py={2}
          sx={{ backgroundColor: 'rgb(246, 241, 234, 0.9)' }}
        >
          <RatingModule />
          <WorkFilter />
          <WorkControl />
        </Box>
      </Box>
    </Box>
  )
};

