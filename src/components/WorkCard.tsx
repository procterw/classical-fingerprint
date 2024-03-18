import { Typography } from '@mui/material';
import { Work } from '../services/getMusicData';

export const WorkCard = (props: { work?: Work | null }) => {

  const { work } = props;
  
  if (!work) return null;

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          // bgcolor: 'black',
          // color: 'white',
          fontStyle: 'italic',
          mb: 2,
        }}
      >
        { work.title }
      </Typography>
    </>
  );
};
