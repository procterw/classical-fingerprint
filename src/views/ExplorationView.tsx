import { WorkCard } from '../components/InfoCard/WorkCard';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Typography } from '@mui/material';
import { EpochTimeLine } from '../components/InfoCard/EpochTimeLine';
import { useWorkQueue } from '../state/useWorkQueue';
import { RatedWorkList } from '../components/RatedWorkList';
import { ComposerCard } from '../components/InfoCard/ComposerCard';
import { useWidth } from '../state/useWidth';
import { VideoWrapper } from '../components/VideoWrapper';
import { InfoCard } from '../components/InfoCard/InfoCard';

export const ExplorationView = () => {
  const {
    activeWork,
  } = useWorkQueue();

  const mq = useWidth();

  return (
    <>
      <Container
        maxWidth="xl"
        // disableGutters
        // sx={{ m: 0, p: 0 }}
      >
        
        <Grid
          container
          spacing={3}
          // rowSpacing={mq(3, 0)}
          height="100vh"
          sx={{ py: 2 }}
        >
          <Grid md={8} xs={12}
            spacing={3}
            height="100vh"
            // sx={{
            //   m: 0,
            //   p: 0,
            // }}
          >
            <Box
              display="flex"
              flexDirection="column"
              gap={4}
              // top={0}
              // bottom={0}
              // overflowY="scroll"
            >
              <VideoWrapper />
              <InfoCard />
            </Box>
          </Grid>
          <Grid md={4} xs={12}>
            
            {/* <InfoCard /> */}
            <RatedWorkList />

          </Grid>
        </Grid>
      </Container>
    </>
  );
}
