import { Box, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { SxProps } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import { RatedWork, useGetRatedWorks } from '../state/selectors';
import { Favorite, PlayCircleOutlineRounded, ThumbDownAltOutlined, ThumbUpAlt } from '@mui/icons-material';
import { useWorkQueue } from '../state/useWorkQueue';
import { LoaderIcon } from './LoaderIcon';
import { cumsum, sum } from 'd3-array';

const WorkItem = (props: { work: RatedWork, sx?: SxProps, onRender: Function }) => {
  const { activeWork, playWork } = useWorkQueue();
  const refContainer = useRef(null);
  
  useEffect(() => {
    // TODO why do I need to ignore this?
    // @ts-ignore
    let height = refContainer?.current?.offsetHeight || 0;

    props.onRender(height);

    // TODO debounce?
    const handleResize = () => props.onRender(height);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          onClick={() => playWork(props.work.id)}
        >
          <PlayCircleOutlineRounded fontSize="small" />
        </IconButton>
      </ListItemIcon>
    )
  }

  const getIcon = () => {
    let icon = null;

    if (props.work.rating == 1) icon = <ThumbDownAltOutlined fontSize="small" />;
    if (props.work.rating == 2) icon = <ThumbUpAlt fontSize="small" />;
    if (props.work.rating == 3) icon = <Favorite fontSize="small" color="primary" />;

    return <ListItemIcon>{ icon }</ListItemIcon>;
  };

  return (
    <ListItem
      sx={props.sx}
      ref={refContainer}
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

const heights: {[key: string]: number} = {};

export const RatedWorkList = () => {
  const { activeWork } = useWorkQueue();
  const ratedWorks = useGetRatedWorks();
  const [t, setT] = useState<number>(0);

  if (!activeWork) return null;

  const cumHeights = cumsum(
    ratedWorks.map((w) => heights[w.id] || 0)
  );

  const totalHeight = cumHeights[cumHeights.length - 1];

  return (
    <Box
      sx={{
        width: '100%',
        pb: `${Math.min(450, totalHeight)}px`,
        mb: 2,
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
          position: 'absolute',
          height: Math.min(450, totalHeight),
          overflowY: 'scroll',
        }}
      >
        { ratedWorks.map((work, i) => {
          return (
            <WorkItem
              key={work.id}
              work={work}
              onRender={(height: number) => {
                heights[work.id] = height;
                setT(Date.now());
              }}
              sx={{
                position: 'absolute',
                top: `${cumHeights[i - 1] || 0}px`,
                transition: 'top 0.2s ease-out'
              }}
            />
          );
        })}
      </List>
    </Box>
  );
};
