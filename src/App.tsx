import { WorkCard } from './components/WorkCard';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { WorkPreview } from './components/WorkPreview';
import { RatingModule } from './components/RatingModule';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { DefinitionList } from './components/DefinitionList';
import { EpochTimeLine } from './components/EpochTimeLine';
import { WorkControl } from './components/WorkControl';
import { useWorkQueue } from './state/useWorkQueue';
import { useUserRatings } from './state/useUserRatings';

function App() {
  const {
    activeWork,
    previousWorks,
    nextWorks,
  } = useWorkQueue();

  const { userRatings } = useUserRatings();

  return (
    <Box
      sx={{
        backgroundColor: theme => theme.palette.background.default,
        pb: 4,
      }}
    >
      <AppBar
        position="static"
        sx={{
          boxShadow: 'none',
          mb: 4,
          backgroundColor: theme => theme.palette.background.default,
          color: theme => theme.palette.text.primary,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            {/* <img src={iconUrl} style={{ width: 30, }} /> */}
            <Typography
              variant="h4"
            >
              Classical Fingerprint
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

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
          </Grid>

          <Grid item md={4} sm={12}>
            <DefinitionList work={activeWork} />
          </Grid>

        </Grid>
      </Container>

      <Container maxWidth="lg">
        <pre>
          { JSON.stringify(userRatings, null, 2) }
        </pre>
        
        <hr />

        <pre>
          { JSON.stringify(previousWorks, null, 2) }
        </pre>

        <hr />

        <pre>
          { JSON.stringify(nextWorks, null, 2) }
        </pre>
      </Container>
    </Box>
  )
}

export default App
