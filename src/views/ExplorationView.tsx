import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/material';
import { RatedWorkList } from '../components/RatedWorkList';
import { VideoWrapper } from '../components/VideoWrapper';
import { InfoCard } from '../components/InfoCard/InfoCard';
import { Header } from './Header';
import { useWidth } from '../state/useWidth';

export const ExplorationView = () => {
  const mq = useWidth();

  return (
    <>
      <Container maxWidth={false}>
        <Header />
      </Container>
      <Container
        maxWidth="xl"
        sx={{ mb: 4 }}
        disableGutters={mq.mobile(true, false)}
      >
        <Grid
          container
          spacing={mq.mobile(0, 4)}
          height="100vh"
          sx={{ py: 2 }}
        >
          <Grid md={8} xs={12} spacing={4}>
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
            <RatedWorkList />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
