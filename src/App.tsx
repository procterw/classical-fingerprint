import { WorkCard } from './components/WorkCard';
import { useWorkFeeder } from './services/workFeeder';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { ComposerCard } from './components/ComposerCard';
import { WorkPreview } from './components/WorkPreview';
import { RatingModule } from './components/RatingModule';
import { MusicNote } from '@mui/icons-material';
import { Box } from '@mui/material';

function App() {
  const [
    activeWork,
    getNextWork,
  ] = useWorkFeeder();

  return (
    <>
      <Container maxWidth="lg" sx={{ mb: 2 }}>
        <WorkCard work={activeWork} />
        <ComposerCard composer={activeWork?.composer} />
      </Container>

      <Container
        sx={{
          bgcolor: 'black',
          py: 4,
        }}
        maxWidth={false}
      >
        <Container maxWidth="lg">

          <Grid container spacing={2}>
            <Grid item md={8} sm={12}>
              <WorkPreview work={activeWork} />
            </Grid>

            <Grid item md={4} sm={12}>
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
          </Grid>
        </Container>
      </Container>
    </>
  )
}

export default App
