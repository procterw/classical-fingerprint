import { Button, ButtonGroup } from "@mui/material";
import { useUserRatings } from "../state/useUserRatings";
import { useWorkQueue } from "../state/useWorkQueue";
import { Favorite, FavoriteBorderOutlined, ThumbDown, ThumbDownAltOutlined, ThumbUp, ThumbUpOffAltOutlined } from "@mui/icons-material";
import { useWidth } from "../state/useWidth";

export const RatingModule = () => {
  const { activeWork } = useWorkQueue();
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
      label: 'Not for me',
      icon: <ThumbDown />,
      icon2: <ThumbDownAltOutlined /> },
    {
      rating: 2,
      label: 'I like this',
      icon: <ThumbUp />,
      icon2: <ThumbUpOffAltOutlined /> },
    {
      rating: 3,
      label: 'I love this!',
      icon: <Favorite />,
      icon2: <FavoriteBorderOutlined /> },
  ];

  return (
    <ButtonGroup
      sx={{
      }}
      disableElevation
      size={mq('small', 'large')}
      fullWidth={mq(true, false)}
    >
      { options.map(({ rating, label, icon, icon2 }) => {
        return (
          <Button
            variant={isSelectedStyle(rating) ? 'contained' : 'outlined'}
            key={rating}
            onClick={() => updateUserRatings(activeWork.id, rating)}
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

