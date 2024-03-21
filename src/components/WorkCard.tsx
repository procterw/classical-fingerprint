import { Box, Typography } from '@mui/material';
import { Work } from '../services/getMusicData';
import { ComposerCard } from './ComposerCard';

export const WorkCard = (props: { work?: Work | null }) => {

  const { work } = props;
  
  if (!work) return null;

  return (
    <Box display="flex" gap={2}>

      <ComposerCard composer={work.composer} />
      
      <Box
        display="flex"
        flexDirection="column"
        gap={0.5}
      >
        <Typography
          variant="h2"
          sx={{
            fontStyle: 'italic',
            // fontSize: 36,
          }}
        >      
          { work.title }
        </Typography>
        
        <Typography
          variant="h4"
          sx={{
            mt: 0,
            // fontStyle: 'italic',
          }} >
          { work.composer?.complete_name }
        </Typography>
      </Box>
    </Box>
  );
};
