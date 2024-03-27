import { WorkCard } from '../components/WorkCard';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { WorkPreview } from '../components/WorkPreview';
import { RatingModule } from '../components/RatingModule';
import { AppBar, Box, Paper, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { EpochTimeLine } from '../components/EpochTimeLine';
import { WorkControl } from '../components/WorkControl';
import { useWorkQueue } from '../state/useWorkQueue';
import { ExplorationPlaylist } from '../components/ExplorationPlaylist';
import { useState } from 'react';
import { RatedWorkList } from '../components/RatedWorkList';
import { ComposerBio } from '../components/ComposerBio';
import { UserStats } from '../components/UserStats';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const ExplorationView = () => {
  const {
    activeWork,
  } = useWorkQueue();

  const [tabValue, setTabValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <>
      {/* <Container
        maxWidth={false}
      >
        <EpochTimeLine composer={activeWork?.composer} />
      </Container> */}

      <Container maxWidth="xl">

        <Grid container spacing={3} sx={{ my: 0 }} >
          <Grid item md={7} sm={12}>

            {/* <AppBar
              position="sticky"
              sx={{
                backgroundColor: theme => theme.palette.background.default,
                boxShadow: 'none',
              }}
            > */}

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
              {/* <Paper square={true} elevation={0} sx={{ p: 2 }}> */}
                <EpochTimeLine composer={activeWork?.composer} />
                <ComposerBio composer={activeWork?.composer} />
              {/* </Paper> */}

            {/* </AppBar> */}
          </Grid>

          <Grid item md={5} sm={12}>

            {/* <AppBar> */}
              {/* <Container maxWidth={false}>
                <Toolbar disableGutters>
                  <Typography
                    variant="h4"
                  >
                    Classical Fingerprint
                  </Typography>
                </Toolbar>
              </Container> */}
            {/* </AppBar> */}

{/* 
            <WorkCard work={activeWork} />

            <Box sx={{ mb: 2 }}>
              <EpochTimeLine composer={activeWork?.composer} />
            </Box> */}

            {/* <Paper sx={{ p: 2 }}> */}
            {/* <ComposerBio composer={activeWork?.composer} /> */}
            {/* </Paper> */}

            {/* <UserStats /> */}

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

            {/* <ExplorationPlaylist /> */}

{/* 
            <Box
              display="flex"
              flexDirection="column"
              maxHeight="100%"
              overflow="hidden"
            >

              <Box
                sx={{ flexGrow: 1, overflow: 'hidden' }}
              >
                <ExplorationPlaylist />
              </Box>
            </Box> */}

            {/* <WorkCard work={activeWork} />

            <Tabs value={tabValue} onChange={handleChange}>
                <Tab label="Explore" {...a11yProps(0)} />
                <Tab label="My Favorites" {...a11yProps(1)} />
            </Tabs>

            <div style={{ marginBottom: 30, width: 1 }} />

            { tabValue === 0 && <ExplorationPlaylist /> }

            { tabValue === 1 && <RatedWorkList /> } */}

          </Grid>

        </Grid>
      </Container>
    </>
  );
}
