import { Box, IconButton, List, ListItem, ListItemIcon, ListItemText, Tab, Tabs, Typography } from '@mui/material';
import { SxProps } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import { useGetRatedWorks } from '../state/selectors';
import { Favorite, PlayCircleOutlined, ThumbDownAltOutlined, ThumbUpAlt } from '@mui/icons-material';
import { useWorkQueue } from '../state/useWorkQueue';
import { LoaderIcon } from './LoaderIcon';
import { cumsum, groups, sort } from 'd3-array';
import debounce from 'debounce';
import { StickyHeader } from './StickyHeader';
import { useWidth } from '../state/useWidth';

const WorkItem = (props: { work: RatedWork, sx?: SxProps, onRender: Function }) => {
  const { activeWork, setActiveWork } = useWorkQueue();
  const refContainer = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

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

  const getIcon = () => {
    // If work is currently playing
    if (activeWork.id === props.work.id) {
      return (
        <ListItemIcon
          sx={{
            marginLeft: -0.75,
            marginRight: -0.75,
            transform: 'scale(90%)'
          }}
        >
          <LoaderIcon />
        </ListItemIcon>
      );
    }

    // If work is hovered and not playing
    // if (props.work.title.includes('an')) {
    if (isHovered && activeWork.id !== props.work.id) {
      return (
        <IconButton
          sx={{
            marginLeft: -1,
            marginRight: 1.65,
            marginTop: -0.2,
          }}
        >
          <PlayCircleOutlined fontSize="small" />
        </IconButton>
      );
    }

    let icon = null;

    if (props.work.rating == 1) icon = <ThumbDownAltOutlined fontSize="small" />;
    if (props.work.rating == 2) icon = <ThumbUpAlt fontSize="small" />;
    if (props.work.rating == 3) icon = <Favorite fontSize="small" color="primary" />;

    return (
      <ListItemIcon
        sx={{ mr: -1.5 }}
      >
        { icon }
      </ListItemIcon>
    );
  };

  return (
    <ListItem
      sx={{
        ...props.sx,
        cursor: 'pointer',
      }}
      onClick={() => setActiveWork(props.work)}
      ref={refContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      { getIcon() }
      {/* { getPlayingIcon() } */}
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
  const mq = useWidth();

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

  const tabs = (
    <Tabs
      value={value}
      onChange={handleChange}
      indicatorColor="secondary"
      textColor="inherit"
      variant="fullWidth"
      sx={{
        backgroundColor: theme => theme.palette.background.default,
      }}
    >
        <Tab label="All" {...a11yProps(0)} />
        <Tab label="Epoch" {...a11yProps(1)} />
        <Tab label="Genre" {...a11yProps(2)} />
        <Tab label="Composer" {...a11yProps(3)} />
    </Tabs>
  );

  return (
    <>
      <Typography variant="h3" pt={3} pb={1}>
        My Ratings        
      </Typography>

      <Box
        position="relative"
        width="100%"
        borderRadius={3}
        sx={{
          backgroundColor: theme => theme.palette.background.paper,
        }}
        overflow="hidden"
      >
        { mq.small(
          tabs,
          <StickyHeader>{ tabs }</StickyHeader>,
        )}

        <Box
          maxHeight={mq.mobile(undefined, 450)}
          overflow={mq.mobile(undefined, 'scroll')}
        >
          { variations[value].map((variation) => {
            return (
              <Box key={variation[0]}>
                { variation[0] && (
                  <>
                    <Typography variant="h4" sx={{ my: 1, mx: 2 }} fontSize={15} fontWeight={500}>
                      { variation[0] }
                    </Typography>
                  </>
                )}
                  <RatedWorkSubList
                    works={variation[1]}
                  />
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
};
