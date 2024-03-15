import { Button, ButtonGroup } from "@mui/material";
import { Work } from "../services/getMusicData";
import { useWorkRatings } from "../services/useWorkRatings";

export const RatingModule = (props: {work?: Work | null}) => {
  const { work } = props;

  if (!work) return;

  const { workRatings, updateWorkRatings } = useWorkRatings();
  
  const activeRating: number = workRatings[work.id];

  const isSelectedStyle = (n: number) => {
    if (!activeRating || activeRating !== n) return 'primary';

    return 'secondary';
  };

  const options = [
    { rating: 1, label: "I hate this" },
    { rating: 2, label: "I don't like this" },
    { rating: 3, label: "This is fun" },
    { rating: 4, label: "I like this" },
    { rating: 5, label: "I love this!" },
  ];

  return (
    <ButtonGroup variant="contained" aria-label="Basic button group" orientation="horizontal">
      { options.map(({ rating, label }) => {
        return (
          <Button
            key={rating}
            onClick={() => updateWorkRatings(work.id, rating)}
            color={isSelectedStyle(rating)}
          >
            { label }
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

