import { Box, Container, Grid, Typography } from "@mui/material";
import { EpochTimeLine } from "./EpochTimeLine";
import { WorkCard, WorkSummary } from "./WorkCard";
import { useWorkQueue } from "../../state/useWorkQueue";
import { ComposerCard } from "./ComposerCard";


// Combines the timeline, composer bio, and work background
export const InfoCard = () => {
  const { activeWork } = useWorkQueue();

  if (!activeWork) return null;

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <WorkCard work={activeWork} />

      <EpochTimeLine composer={activeWork.composer} />

      <Box display="flex" flexDirection="column" gap={2}
        p={2}
        sx={{ backgroundColor: theme => theme.palette.background.paper }}
        >

        <Container maxWidth={false} disableGutters>
          <Grid container spacing={3}>
            <Grid item md={12} lg={6}>
              <Typography
                variant="h4"
                mb={2}
              >
                Background
              </Typography>
              <WorkSummary work={activeWork} />
            </Grid>
            <Grid item md={12} lg={6}>
              <Typography
                variant="h4"
                mb={2}
              >
                { activeWork?.composer.complete_name }
              </Typography>
              <ComposerCard composer={activeWork.composer} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
};
