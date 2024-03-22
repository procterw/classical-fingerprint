import { WorkCard } from '../components/WorkCard';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { WorkPreview } from '../components/WorkPreview';
import { RatingModule } from '../components/RatingModule';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { EpochTimeLine } from '../components/EpochTimeLine';
import { WorkControl } from '../components/WorkControl';
import { useWorkQueue } from '../state/useWorkQueue';
import { useUserRatings } from '../state/useUserRatings';
import { UserStats } from '../components/UserStats';

export const ExplorationView = () => {
  const {
    activeWork,
  } = useWorkQueue();

  const { userRatings } = useUserRatings();

  return (
    <>
      <Container
        sx={{
          py: 0,
          mb: 3,
        }}
        maxWidth="lg"
      >
        <WorkCard work={activeWork} />
      </Container>

      <Container
        maxWidth={false}
      >
        <EpochTimeLine composer={activeWork?.composer} />
      </Container>


      <Container maxWidth="lg">

        <Grid container spacing={3} sx={{ my: 2 }} >
          <Grid item md={8} sm={12}>

            {/* <AppBar position="sticky"> */}
            <WorkPreview work={activeWork} /> 

            <Box
              display="flex"
              justifyContent="space-between"
              sx={{
                my: 2,
              }}
            >
              <RatingModule />
              <WorkControl />
            </Box>

            <UserStats />

          </Grid>

          <Grid item md={4} sm={12}>

          </Grid>

        </Grid>
      </Container>
    </>
  );
}
