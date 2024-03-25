import { Box, Typography } from '@mui/material';
import { Composer } from '../services/getMusicData';

export const ComposerBio = (props: { composer?: Composer | null }) => {

  const { composer } = props;
  
  if (!composer) return null;

  return (
    <Box>
      <Typography
        variant="body2">
        { composer.bio_preview }
      </Typography>
    </Box>
  );
};
