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
      label: 'Next!',
      icon: <ThumbDown />,
      icon2: <ThumbDownAltOutlined /> },
    {
      rating: 2,
      label: 'Like it',
      icon: <ThumbUp />,
      icon2: <ThumbUpOffAltOutlined /> },
    {
      rating: 3,
      label: 'Love it!',
      icon: <Favorite />,
      icon2: <FavoriteBorderOutlined /> },
  ];

  return (
    <ButtonGroup
      sx={{
        backgroundColor: theme => theme.palette.background.paper,
      }}
      disableElevation
      size={mq('small', 'medium')}
      // fullWidth={mq(true, false)}
      // fullWidth={true}
    >
      { options.map(({ rating, label, icon, icon2 }) => {
        return (
          <Button
            variant={isSelectedStyle(rating) ? 'contained' : 'outlined'}
            key={rating}
            onClick={() => {
              updateUserRatings(activeWork.id, rating);
              // If you don't like it, move one!
              if (rating === 1) getNextWork();
            }}
            color="secondary"
            sx={{
              borderRadius: 0,
            }}
            startIcon={isSelectedStyle(rating) ? icon : icon2}
          >
            { label }
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

