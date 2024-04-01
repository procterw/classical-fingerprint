import { WorkCard } from '../components/WorkCard';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { WorkPreview } from '../components/WorkPreview';
import { RatingModule } from '../components/RatingModule';
import { Box, Typography } from '@mui/material';
import { EpochTimeLine } from '../components/EpochTimeLine';
import { WorkControl } from '../components/WorkControl';
import { useWorkQueue } from '../state/useWorkQueue';
import { RatedWorkList } from '../components/RatedWorkList';
import { ComposerCard } from '../components/ComposerCard';
import { useWidth } from '../state/useWidth';

export const ExplorationView = () => {
  const {
    activeWork,
  } = useWorkQueue();

  const mq = useWidth();

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
          rowSpacing={mq(3, 0)}
          height="100vh"
          sx={{ p: 0, m: 0 }}
        >
          <Grid md={7} xs={12}
            spacing={2}
            sx={{
              m: 0,
              p: 0,
            }}
          >

            <WorkPreview work={activeWork} />

            <Box display="flex" flexDirection="column" gap={3} p={mq(2,3)} mb={2}>

              <Box
                display="flex"
                justifyContent={mq('right', 'space-between')}
                flexDirection="row"
                flexWrap="wrap"
                gap={2}
              >
                <RatingModule />
                <WorkControl />
              </Box>

              <WorkCard work={activeWork} />
            </Box>
 
          </Grid>
          <Grid md={5} xs={12}>
            
            <Box p={mq(0, 3)} pb={0}>
              <Typography
                variant="h4"
                sx={{ mb: 2, pl: mq(2, 0)}}
              >
                { activeWork?.composer.complete_name }
              </Typography>

              <EpochTimeLine composer={activeWork?.composer} />

              <ComposerCard composer={activeWork?.composer} />
            </Box>

            <Box p={mq(0, 3)}>
              <Typography variant="h4" sx={{ mb: 1, pl: mq(2, 0) }}>
                My Ratings
              </Typography>
              <RatedWorkList />
            </Box>

          </Grid>
        </Grid>
      </Container>
    </>
  );
}
