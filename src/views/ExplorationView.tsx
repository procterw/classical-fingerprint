import { WorkCard } from '../components/WorkCard';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { WorkPreview } from '../components/WorkPreview';
import { RatingModule } from '../components/RatingModule';
import { Box } from '@mui/material';
import { EpochTimeLine } from '../components/EpochTimeLine';
import { WorkControl } from '../components/WorkControl';
import { useWorkQueue } from '../state/useWorkQueue';
import { RatedWorkList } from '../components/RatedWorkList';
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
              m: 0,
              p: 0,
            }}
          >

            <WorkPreview work={activeWork} />

            <Box
              sx={{
                px: 3,
                pt: 2,
              }}
            >
              <EpochTimeLine composer={activeWork?.composer} />
            </Box>

            <Box p={3}>

              <WorkCard work={activeWork} />
              <Box
                display="flex"
                justifyContent="space-between"
                flexDirection="row"
                sx={{
                  mt: 3,
                }}
                gap={2}
              >
                <RatingModule />
                <WorkControl />
              </Box>
            </Box>

            <ComposerCard composer={activeWork?.composer} />
             
          </Grid>
          <Grid item md={5} sm={12} sx={{ p: 3 }}>

            <RatedWorkList />

          </Grid>
        </Grid>
      </Container>
    </>
  );
}
