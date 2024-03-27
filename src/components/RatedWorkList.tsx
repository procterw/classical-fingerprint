import { Box, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useGetRatedWorks } from '../state/selectors';
import { group } from 'd3-array';
import { Favorite, PlayCircleOutlineRounded, ThumbDownAltOutlined, ThumbUpAlt } from '@mui/icons-material';
import { Work } from '../services/getMusicData';
import { useWorkQueue } from '../state/useWorkQueue';
import { LoaderIcon } from './LoaderIcon';

const WorkItem = (props: { work: Work, rating: number }) => {
  const { activeWork, setActiveWork } = useWorkQueue();

  if (!activeWork) return null;

  const getPlayingIcon = () => {
    if (activeWork && activeWork.id === props.work.id) {
      return (
        <ListItemIcon
          sx={{
            marginLeft: -0.1,
            marginRight: 0.1,
          }}
        >
          <LoaderIcon />
        </ListItemIcon>
      );
    }

    return (
      <ListItemIcon>
        <IconButton
          size="small"
          onClick={setActiveWork(activeWork.id)}
        >
          <PlayCircleOutlineRounded fontSize="small" />
        </IconButton>
      </ListItemIcon>
    )
  }

  const getIcon = () => {
    // if (!props.rating) return null;

    let icon = null;

    if (props.rating == 1) icon = <ThumbDownAltOutlined fontSize="small" />;
    if (props.rating == 2) icon = <ThumbUpAlt fontSize="small" />;
    if (props.rating == 3) icon = <Favorite fontSize="small" color="primary" />;

    return <ListItemIcon>{ icon }</ListItemIcon>;
  };

  return (
    <ListItem
      sx={{
        px: 2,
        py: 0.5,
      }}
    >
      { getIcon() }
      { getPlayingIcon() }
      <ListItemText 
        primary={props.work.title}
        secondary={props.work.composer.name}
        sx={{
          my: 0,
        }}
      />
    </ListItem>
  );
};

export const UnratedWorkItem = () => {
  const { activeWork } = useWorkQueue();
  const ratedWorks = useGetRatedWorks();

  if (!activeWork) return null;

  const rating = ratedWorks.find((w) => w.id === activeWork.id);

  // if (rating) return <Box height="48px" />
  if (rating) return null;

  return <WorkItem work={activeWork} rating={0} />;
}

export const RatedWorkList = () => {

  const ratedWorks = useGetRatedWorks();

  const groupedRatedWorks = Array.from(
    group(ratedWorks, d => d.rating),
    ([rating, works]) => ({ rating, works }),
  ).sort((a, b) => {
    return b.rating - a.rating;
  });

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Typography variant="h4" sx={{ mb: 2 }}>
        My Ratings
      </Typography>

      <List
        dense
        disablePadding
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          mb: 2,
        }}
      >
        <UnratedWorkItem />
      </List>

      { groupedRatedWorks.map((ratingGroup) => (
        <>
          <List
            dense
            disablePadding
            sx={{
              width: '100%',
              bgcolor: 'background.paper',
            }}
          >
            { ratingGroup.works.map((work) => {
              return (
                <WorkItem work={work} rating={ratingGroup.rating} />
              );
            })}
          </List>
        </>
      ))}
    </Box>
  );
};
