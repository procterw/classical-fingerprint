import { WorkCard } from './components/WorkCard';
import { useWorkFeeder } from './services/workFeeder';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { ComposerCard } from './components/ComposerCard';
import { WorkPreview } from './components/WorkPreview';
import { RatingModule } from './components/RatingModule';
import { MusicNote } from '@mui/icons-material';
import { AppBar, Box, Icon, Toolbar, Typography } from '@mui/material';
import { DefinitionList } from './components/DefinitionList';

function App() {
  const [
    activeWork,
    getNextWork,
  ] = useWorkFeeder();

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography
              variant="h5"
              sx={{}}
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

        <ComposerCard composer={activeWork?.composer} />

      </Container>

      <Container
        sx={{
          bgcolor: 'black',
          py: 0,
        }}
        maxWidth={false}
      >
        <Container maxWidth="lg">

          <Grid container spacing={3} sx={{ my: 2 }} >
            <Grid item md={8} sm={12}>

              <WorkPreview work={activeWork} />

              <Box
                sx={{
                  pb: 3
                }}
              >
                <RatingModule work={activeWork} />
              </Box>

              <Box>
                <Button
                  startIcon={<MusicNote/>}
                  onClick={getNextWork}
                  variant="contained"
                  size="large"
                >
                  Next work
                </Button>
              </Box>
            </Grid>

            <Grid item md={4} sm={12}>
              <DefinitionList work={activeWork} />
            </Grid>

          </Grid>
        </Container>
      </Container>

      <Container maxWidth="lg" sx={{ my: 3 }}>
        {/* <ComposerCard composer={activeWork?.composer} /> */}
      </Container>
    </>
  )
}

export default App
