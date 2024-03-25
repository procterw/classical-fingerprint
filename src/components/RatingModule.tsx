import { ButtonGroup, Button } from "@mui/material";
import { useUserRatings } from "../state/useUserRatings";
import { useWorkQueue } from "../state/useWorkQueue";
import { Favorite, ThumbDown, ThumbUp } from "@mui/icons-material";

export const RatingModule = () => {
  const { activeWork } = useWorkQueue();
  const { userRatings, updateUserRatings } = useUserRatings();

  if (!activeWork) return null;
  
  const activeRating: number = userRatings[activeWork.id];

  const isSelectedStyle = (n: number) => {
    if (!activeRating || activeRating !== n) return 'secondary';

    return 'primary';
  };

  const options = [
    { rating: 1, label: 'Not for me', icon: <ThumbDown /> },
    { rating: 2, label: 'I like this', icon: <ThumbUp /> },
    { rating: 3, label: 'I love this!', icon: <Favorite /> },
  ];

  return (
    <ButtonGroup
      variant="text"
      // orientation="horizontal"
      // fullWidth
      sx={{
        boxShadow: 'none',
        // color: 'black',
      }}
    >
      { options.map(({ rating, label, icon }) => {
        return (
          <Button
            key={rating}
            onClick={() => updateUserRatings(activeWork.id, rating)}
            color={isSelectedStyle(rating)}
            sx={{
              // px: 3
              // py: 0,
              color: 'black',
              border: 'none',
            }}
            // size="large"
            startIcon={icon}
          >
            { label }
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

