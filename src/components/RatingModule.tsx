import { Button, ButtonGroup } from "@mui/material";
import { useUserRatings } from "../state/useUserRatings";
import { useWorkQueue } from "../state/useWorkQueue";
import { Favorite, FavoriteBorderOutlined, ThumbDown, ThumbDownAltOutlined, ThumbUp, ThumbUpOffAltOutlined } from "@mui/icons-material";
import { useWidth } from "../state/useWidth";

export const RatingModule = () => {
  const { activeWork, getNextWork } = useWorkQueue();
  const { userRatings, updateUserRatings } = useUserRatings();
  const mq = useWidth();

  if (!activeWork) return null;
  
  const activeRating: number = userRatings[activeWork.id];

  const isSelectedStyle = (n: number) => {
    return (activeRating && activeRating === n);
  };

  const options = [
    {
      rating: 1,
      label: 'Not for me, next!',
      labelShort: 'Next!',
      icon: <ThumbDown fontSize="small" />,
      icon2: <ThumbDownAltOutlined fontSize="small" /> },
    {
      rating: 2,
      label: 'I like it',
      labelShort: 'Like it',
      icon: <ThumbUp fontSize="small" />,
      icon2: <ThumbUpOffAltOutlined fontSize="small" /> },
    {
      rating: 3,
      label: 'I love it!',
      labelShort: 'Love it!',
      icon: <Favorite fontSize="small" />,
      icon2: <FavoriteBorderOutlined fontSize="small" /> },
  ];

  return (
    <ButtonGroup
      sx={{
        backgroundColor: theme => theme.palette.background.paper,
        height: 43,
      }}
      disableElevation
      size="medium"
    >
      { options.map(({ rating, label, labelShort, icon, icon2 }) => {
        return (
          <Button
            variant="contained"
            key={rating}
            onClick={() => {
              updateUserRatings(activeWork.id, rating);
              // If you don't like it, move one!
              if (rating === 1) getNextWork();
            }}
            color="info"
            // color={isSelectedStyle(rating) ? 'primary' : 'info'}
            sx={{
              py: 1,
            }}
            startIcon={mq.mobile(null, isSelectedStyle(rating) ? icon : icon2)}
          >
            { mq.mobile(isSelectedStyle(rating) ? icon : icon2, mq.large(labelShort, label)) }
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

