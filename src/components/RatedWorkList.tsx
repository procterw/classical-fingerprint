import { Box, IconButton, List, ListItem, ListItemIcon, ListItemText, Tab, Tabs, Typography } from '@mui/material';
import { SxProps } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import { RatedWork, useGetRatedWorks } from '../state/selectors';
import { Favorite, PlayCircleOutlineRounded, ThumbDownAltOutlined, ThumbUpAlt } from '@mui/icons-material';
import { useWorkQueue } from '../state/useWorkQueue';
import { LoaderIcon } from './LoaderIcon';
import { cumsum, groups, sort } from 'd3-array';
import debounce from 'debounce';

const WorkItem = (props: { work: RatedWork, sx?: SxProps, onRender: Function }) => {
  const { activeWork, playWork } = useWorkQueue();
  const refContainer = useRef(null);

  // TODO why do I need to ignore this?
  // @ts-ignore
  const handleResize = debounce(() => props.onRender(refContainer?.current?.offsetHeight || 0), 500);
  
  useEffect(() => {
    // @ts-ignore
    props.onRender(refContainer?.current?.offsetHeight || 0);

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

export const RatedWorkSubList = (
  props: { works: Array<RatedWork> }
) => {

  const [_, setT] = useState<number>(0);

  const cumHeights = cumsum(
    props.works.map((w) => heights[w.id] || 0)
  );

  const totalHeight = cumHeights[cumHeights.length - 1];

  return (
    <List
      dense
      disablePadding
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        mb: 2,
        position: 'relative',
        height: totalHeight,
      }}
    >
      { props.works.map((work, i) => {
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
  );
};



function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const getEpochIndex = (epoch: string) => {
  return [
    'Medieval',
    'Renaissance',
    'Baroque',
    'Classical',
    'Early Romantic',
    'Romantic',
    'Late Romantic',
    '20th Century',
    'Post-War',
    '21st Century',
  ].indexOf(epoch);
};

export const RatedWorkList = () => {
  const { activeWork } = useWorkQueue();
  const ratedWorks = useGetRatedWorks();

  const [value, setValue] = useState(0);

  if (!activeWork) return null;

  const variations: Array<Array<[string, Array<RatedWork>]>> = [
    [['', ratedWorks]],
    sort(groups(ratedWorks, d => d.composer.epoch), d => getEpochIndex(d[0])),
    sort(groups(ratedWorks, d => d.genre), d => d[0]),
    sort(groups(ratedWorks, d => d.composer.name), d => d[0]),
  ];

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: '100%',
        mb: 2,
      }}
    >
      <Typography variant="h4" sx={{ mb: 2 }}>
        My Ratings
      </Typography>

      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
          <Tab label="All Works" {...a11yProps(0)} />
          <Tab label="By Epoch" {...a11yProps(1)} />
          <Tab label="By Genre" {...a11yProps(2)} />
          <Tab label="By Composer" {...a11yProps(3)} />
      </Tabs>

      <Box sx={{
        maxHeight: 600,
        overflowY: 'scroll',
      }}>
        { variations[value].map((variation) => {
          return (
            <>
              { variation[0] && (
                <Typography variant="h5" sx={{ mb: 1 }}>
                  { variation[0] }
                </Typography>
              )}
                <RatedWorkSubList
                  works={variation[1]}
                />
            </>
          );
        })}
      </Box>
    </Box>
  );
};
