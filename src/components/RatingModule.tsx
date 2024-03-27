import { Button, Box } from "@mui/material";
import { useUserRatings } from "../state/useUserRatings";
import { useWorkQueue } from "../state/useWorkQueue";
import { Favorite, FavoriteBorderOutlined, ThumbDown, ThumbDownAltOutlined, ThumbUp, ThumbUpOffAltOutlined } from "@mui/icons-material";

export const RatingModule = () => {
  const { activeWork } = useWorkQueue();
  const { userRatings, updateUserRatings } = useUserRatings();

  if (!activeWork) return null;
  
  const activeRating: number = userRatings[activeWork.id];

  const isSelectedStyle = (n: number) => {
    return (activeRating && activeRating === n);
  };

  const options = [
    { rating: 1, label: 'Not for me', icon: <ThumbDown />, icon2: <ThumbDownAltOutlined /> },
    { rating: 2, label: 'I like this', icon: <ThumbUp />, icon2: <ThumbUpOffAltOutlined /> },
    { rating: 3, label: 'I love this!', icon: <Favorite />, icon2: <FavoriteBorderOutlined /> },
  ];

  return (
    <Box
      sx={{
        // py: 2,
      }}
    >
      { options.map(({ rating, label, icon, icon2 }) => {
        return (
          <Button
            // variant="outlined"
            key={rating}
            onClick={() => updateUserRatings(activeWork.id, rating)}
            color={isSelectedStyle(rating) ? 'primary' : 'secondary'}
            sx={{
              px: 3,
              py: 2,
              // color: isSelectedStyle(rating) ? undefined : themeOptions.palette?.text?.primary,
              // border: 'none',
            }}
            // size="large"
            startIcon={isSelectedStyle(rating) ? icon : icon2}
          >
            { label }
          </Button>
        );
      })}
    </Box>
  );
};

