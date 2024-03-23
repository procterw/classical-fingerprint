import { Button, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useGetWorkQueue } from "../state/selectors";
import { Favorite, PlayCircleOutline, ThumbDown, ThumbUp } from "@mui/icons-material";
import { useWorkQueue } from "../state/useWorkQueue";
import { LoaderIcon } from "./LoaderIcon";
import { useUserRatings } from "../state/useUserRatings";

export const ExplorationPlaylist = () => {

  const { activeWork, setActiveWorkIndex } = useWorkQueue();
  const workQueue = useGetWorkQueue();
  const { userRatings } = useUserRatings();

  return (
    <List
      dense
      disablePadding
      sx={{
        width: '100%',
        mb: 2,
        bgcolor: 'background.paper',
      }}
    >
      {
        workQueue.map((work, i) => {
          const isActiveTrack = work.id === activeWork?.id;
          const rating = userRatings[work.id];

          return (
            <ListItem
              sx={{
                px: 2,
                py: 0.5,
              }}
            >
              { isActiveTrack
                  ? (
                    <ListItemIcon
                      sx={{
                        marginLeft: 0.3,
                        marginRight: 1.7,
                      }}
                    >
                      <LoaderIcon />
                    </ListItemIcon>
                  )
                  : (
                    <Button
                      onClick={() => setActiveWorkIndex(i)}
                    >
                      <ListItemIcon>
                          <PlayCircleOutline fontSize="small" />
                      </ListItemIcon>
                    </Button>
                  )
                }
              <ListItemText
                primary={work.title}
                secondary={work.composer.name + ': ' + work.id}
                sx={{
                  my: 0,
                }}
              />

              { rating && (
                <ListItemIcon>
                  { rating === 1 && <ThumbDown fontSize="small" /> }
                  { rating === 2 && <ThumbUp fontSize="small" /> }
                  { rating === 3 && <Favorite fontSize="small" /> }
                </ListItemIcon>
              )}
            </ListItem>
          );
        })
      }
    </List>
  );
};
