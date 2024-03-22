import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useGetRatedWorks } from '../state/selectors';
import { group } from 'd3-array';

export const RatedWorkList = () => {

  const ratedWorks = useGetRatedWorks();

  const groupedRatedWorks = Array.from(
    group(ratedWorks, d => d.rating),
    ([rating, works]) => ({ rating, works }),
  ).sort((a, b) => {
    return b.rating - a.rating;
  });

  const labels: { [key: number]: string} = {
    1: 'Not for me',
    2: 'This is fine',
    3: 'I like this',
    4: 'I LOVE this',
  };

  return (
    <Box
      sx={{
        width: '100%',
        // bgcolor: 'background.paper',
      }}
    >
      { groupedRatedWorks.map((ratingGroup) => (
        <>
          <Typography
            variant="h5"
            sx={{
              px: 2,
              mb: 1,
            }}
          >
            { labels[ratingGroup.rating] }
          </Typography>
          <List
            dense
            disablePadding
            sx={{
              width: '100%',
              mb: 2,
              bgcolor: 'background.paper',
            }}
          >
            { ratingGroup.works.map((work) => {
              return (
                <ListItem
                  sx={{
                    px: 2,
                    py: 0.5,
                  }}
                >
                  <ListItemText 
                    primary={work.title}
                    secondary={work.composer.name}
                    sx={{
                      my: 0,
                    }}
                  />
                </ListItem>
              );
            })}
          </List>
        </>
      ))}
    </Box>
  );
};