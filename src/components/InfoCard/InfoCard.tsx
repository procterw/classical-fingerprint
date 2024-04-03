import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { EpochTimeLine } from "./EpochTimeLine";
import { WorkCard, WorkSummary } from "./WorkCard";
import { ComposerBio } from "./ComposerBio";
import { useWidth } from "../../state/useWidth";
import { useWorkQueue } from "../../state/useWorkQueue";
import { ComposerAvatar } from "./ComposerCard";


// Combines the timeline, composer bio, and work background
export const InfoCard = () => {
  const { activeWork } = useWorkQueue();

  if (!activeWork) return null;

  const mq = useWidth();

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <WorkCard work={activeWork} />

      <EpochTimeLine composer={activeWork.composer} />

      <Container maxWidth={false} disableGutters>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ padding: 2 }} elevation={0} square>
              <Typography
                variant="h4"
                mb={2}
              >
                Background
              </Typography>
              <WorkSummary work={activeWork} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
          <Paper sx={{ padding: 2 }} elevation={0} square>
              <Typography
                variant="h4"
                mb={2}
              >
                { activeWork?.composer.complete_name }
              </Typography>
              <Box sx={{ float: 'left', mr: 2, mb: 2 }}>
                <ComposerAvatar avatarSize={80} composer={activeWork.composer} />
              </Box>
              <ComposerBio composer={activeWork.composer} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
};
