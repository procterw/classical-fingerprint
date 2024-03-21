import { Button, ButtonGroup } from "@mui/material";
import { useUserRatings } from "../state/useUserRatings";
import { useWorkQueue } from "../state/useWorkQueue";

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
    { rating: 1, label: "Not for me" },
    { rating: 2, label: "This is fine" },
    { rating: 3, label: "I like this" },
    { rating: 4, label: "I LOVE this" },
  ];

  return (
    <ButtonGroup
      variant="contained"
      orientation="horizontal"
      // fullWidth
      sx={{
        boxShadow: 'none',
      }}
    >
      { options.map(({ rating, label }) => {
        return (
          <Button
            key={rating}
            onClick={() => updateUserRatings(activeWork.id, rating)}
            color={isSelectedStyle(rating)}
            sx={{
              px: 3
            }}
            // size="large"
          >
            { label }
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

