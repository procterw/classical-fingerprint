import { WorkCard } from '../components/WorkCard';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { WorkPreview } from '../components/WorkPreview';
import { RatingModule } from '../components/RatingModule';
import { Box, Paper, Typography } from '@mui/material';
import { EpochTimeLine } from '../components/EpochTimeLine';
import { WorkControl } from '../components/WorkControl';
import { useWorkQueue } from '../state/useWorkQueue';
import { RatedWorkList } from '../components/RatedWorkList';
import { ComposerBio } from '../components/ComposerBio';
import { UserStats } from '../components/UserStats';
import { ComposerCard } from '../components/ComposerCard';

export const ExplorationView = () => {
  const {
    activeWork,
  } = useWorkQueue();

  return (
    <>
    
      <Container
        maxWidth="xl"
        disableGutters
        sx={{ m: 0, p: 0 }}
      >
        <Grid
          container
          spacing={0}
          height="100vh"
          sx={{ p: 0, m: 0 }}
        >
          <Grid item md={7} sm={12}
            sx={{
              // background: '#2b2723',
              // backgroundColor: (theme) => theme.palette.text.primary,
              m: 0,
              p: 0,
            }}
          >
            <WorkPreview work={activeWork} />

            <Box p={3}>

              <WorkCard work={activeWork} />
              <Box
                display="flex"
                justifyContent="space-between"
                flexDirection="row"
                sx={{
                  mt: 3,
                  // p: 2,
                  // background: '#2b2723',
                }}
                gap={2}
              >
                {/* <Box /> */}
                <RatingModule />
                <WorkControl />
              </Box>
            </Box>

            {/* <Typography
              variant="h4"
              sx={{
                mt: 0,
              }} >
              { activeWork?.composer.complete_name }
            </Typography> */}

            <ComposerCard composer={activeWork?.composer} />

            {/* <Paper square={true} elevation={0}
              sx={{
                p: 2,
                m: 3,
                // backgroundColor: theme => theme.palette.background.default,
              }}>
 */}

                {/* <hr /> */}
            {/* </Paper>     

            <Paper square={true} elevation={0} sx={{ p: 2, m: 3, backgroundColor: theme => theme.palette.background.default }}> */}
                  {/* <ComposerCard composer={activeWork?.composer} /> */}
            {/* </Paper>        */}

            {/* <ComposerCard composer={activeWork?.composer} /> */}
             
          </Grid>
          <Grid item md={5} sm={12} sx={{ p: 3 }}>

            <EpochTimeLine composer={activeWork?.composer} />

            <RatedWorkList />

            {/* <ComposerCard composer={activeWork?.composer} /> */}

            <UserStats />

          </Grid>
        </Grid>
      </Container>

      {/* <Container maxWidth="xl">
        <EpochTimeLine composer={activeWork?.composer} />
      </Container> */}
{/* 
      <Container maxWidth="xl">
        <Grid container spacing={3} sx={{ my: 0 }} >
            <Grid item md={6} sm={12}>

            </Grid>
          </Grid>
      </Container> */}
{/* 
      <Container maxWidth="xl">

        <Grid container spacing={3} sx={{ my: 0 }} >
          <Grid item md={7} sm={12}>

              <EpochTimeLine composer={activeWork?.composer} />

              <WorkPreview work={activeWork} /> 

               <Box
                display="flex"
                justifyContent="space-between"
                flexDirection="row"
                sx={{
                  mb: 3,
                  p: 2,
                  background: '#2b2723',
                }}
                gap={2}
              >
                <Box />
                <RatingModule />
                <WorkControl />
              </Box>

              <WorkCard work={activeWork} />

              <ComposerBio composer={activeWork?.composer} />

          </Grid>

          <Grid item md={5} sm={12}>

            <Typography
              variant="h1"
              sx={{
                mb: 3,
              }}
            >
              App Name Goes Here
            </Typography>

            <RatedWorkList />

            <Box
              sx={{
                my: 3,
              }}
            >
              <UserStats />
            </Box>
          </Grid>
        </Grid>
      </Container> */}
    </>
  );
}
