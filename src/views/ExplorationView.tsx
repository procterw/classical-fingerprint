import { WorkCard } from '../components/WorkCard';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { WorkPreview } from '../components/WorkPreview';
import { RatingModule } from '../components/RatingModule';
import { AppBar, Box, Tab, Tabs } from '@mui/material';
import { EpochTimeLine } from '../components/EpochTimeLine';
import { WorkControl } from '../components/WorkControl';
import { useWorkQueue } from '../state/useWorkQueue';
import { ExplorationPlaylist } from '../components/ExplorationPlaylist';
import { useState } from 'react';
import { RatedWorkList } from '../components/RatedWorkList';

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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

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
            <WorkCard work={activeWork} />

            <Tabs value={tabValue} onChange={handleChange}>
                <Tab label="Explore" {...a11yProps(0)} />
                <Tab label="My Favorites" {...a11yProps(1)} />
            </Tabs>

            <div style={{ marginBottom: 30, width: 1 }} />

            { tabValue === 0 && <ExplorationPlaylist /> }

            { tabValue === 1 && <RatedWorkList /> }

          </Grid>

        </Grid>
      </Container>
    </>
  );
}
