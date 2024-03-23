import { WorkCard } from '../components/WorkCard';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { WorkPreview } from '../components/WorkPreview';
import { RatingModule } from '../components/RatingModule';
import { AppBar, Box, Tabs, Toolbar, Typography } from '@mui/material';
import { EpochTimeLine } from '../components/EpochTimeLine';
import { WorkControl } from '../components/WorkControl';
import { useWorkQueue } from '../state/useWorkQueue';
import { useUserRatings } from '../state/useUserRatings';
import { UserStats } from '../components/UserStats';
import { RatedWorkList } from '../components/RatedWorkList';
import { ExplorationPlaylist } from '../components/ExplorationPlaylist';
import { useState } from 'react';

function a11yProps(index: string) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const ExplorationView = () => {
  const {
    activeWork,
  } = useWorkQueue();

  const { userRatings } = useUserRatings();
  
  const [tabValue, setTabValue] = useState(0);

  return (
    <>
      {/* <Container
        sx={{
          py: 0,
          mb: 3,
        }}
        maxWidth="lg"
      >
        <WorkCard work={activeWork} />
      </Container> */}

      <Container
        maxWidth={false}
      >
        <EpochTimeLine composer={activeWork?.composer} />
      </Container>


      <Container maxWidth="xl">

        <Grid container spacing={3} sx={{ my: 2 }} >
            <Grid item md={7} sm={12}>

              <AppBar
                position="sticky"
                sx={{
                  backgroundColor: theme => theme.palette.background.default,
                  boxShadow: 'none',
                }}
              >

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

                {/* <UserStats /> */}

              </AppBar>
            </Grid>

          <Grid item md={5} sm={12}>
            {/* <Tabs value={tabValue}>
                <Tab label="Explore" {...a11yProps('explore')} />
                <Tab label="My Favorites" {...a11yProps('favorites')} />
            </Tabs> */}
            <WorkCard work={activeWork} />

            <div style={{ marginBottom: 30, width: 1 }} />

            {/* <RatedWorkList /> */}

            <ExplorationPlaylist />
          </Grid>

        </Grid>
      </Container>
    </>
  );
}
