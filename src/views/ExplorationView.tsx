import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Typography } from '@mui/material';
import { RatedWorkList } from '../components/RatedWorkList';
import { VideoWrapper } from '../components/VideoWrapper';
import { InfoCard } from '../components/InfoCard/InfoCard';

export const ExplorationView = () => {
  // const mq = useWidth();

  return (
    <>
      {/* <Container>
        <
      </Container> */}
      <Container
        maxWidth="xl"
        sx={{ mb: 4 }}
      >
        <Grid
          container
          spacing={4}
          height="100vh"
          sx={{ py: 2 }}
        >
          <Grid md={8} xs={12}
            spacing={4}
          >
            <Box
              display="flex"
              flexDirection="column"
              gap={2}
            >
              <VideoWrapper />
              <InfoCard />
            </Box>
          </Grid>
          <Grid md={4} xs={12}>
            <Typography
              variant="h4"
              sx={{ mb: 2 }}
            >
              My Ratings
            </Typography>
            <RatedWorkList />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
