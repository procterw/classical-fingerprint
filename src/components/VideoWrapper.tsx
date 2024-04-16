import { Box } from "@mui/system";
import { useWorkQueue } from "../state/useWorkQueue";
import { WorkVideo } from "./WorkVideo";
import { RatingModule } from "./RatingModule";
import { WorkControl } from "./WorkControl";
import { useWidth } from "../state/useWidth";
import { WorkFilter } from "./WorkFilter";
import { StickyHeader } from "./StickyHeader";

export const VideoWrapper = () => {
  const { activeWork } = useWorkQueue();
  const mq = useWidth();

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
      }}
    >
      <WorkVideo work={activeWork} />

      <StickyHeader>
        <Box
          display="flex"
          flexWrap="wrap"
          flexDirection="row"
          justifyContent="right"
          // justifyContent={mq.medium("right", "space-between")}
          gap={mq.medium(1, 2)}
          py={1}
          px={mq.mobile(1, 0)}
          // sx={{ backgroundColor: 'rgb(246, 241, 234, 0.95)' }}
          // sx={{ backgroundColor: 'white' }}

        >
          {/* <WorkFilter /> */}
          <RatingModule />
          <WorkControl />
        </Box>
      </StickyHeader>
    </Box>
  )
};

